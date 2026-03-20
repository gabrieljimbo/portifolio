/**
 * Netlify Function — Meta Conversions API (CAPI) Proxy
 *
 * Recebe eventos do browser (JavaScript do index.html) e os encaminha
 * server-side para a Meta Conversions API, adicionando:
 *   - client_ip_address  → extraído dos headers da requisição
 *   - action_source      → "website" (obrigatório pelo Meta)
 *
 * Deduplicação: o mesmo event_id é enviado pelo browser pixel (fbq)
 * e por aqui. O Meta deduplica automaticamente, contando o evento
 * apenas uma vez, mas com dados mais completos.
 *
 * SETUP NECESSÁRIO:
 *   1. Gere um Access Token em:
 *      Meta Business → Events Manager → seu Pixel → Settings → Conversions API
 *   2. Adicione a variável de ambiente no Netlify:
 *      Site Settings → Environment Variables → META_CAPI_TOKEN = <seu token>
 *   3. (Opcional) Para validar sem afetar dados reais, use test_event_code:
 *      META_CAPI_TEST_CODE = TEST12345 (pegar no Events Manager → Test Events)
 */

const PIXEL_ID = '1624314842024242';
const META_API_VERSION = 'v19.0';
const META_CAPI_URL = `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events`;

exports.handler = async function (event, context) {
  // Só aceita POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    // Sem token configurado: retorna 200 silencioso para não quebrar o beacon do browser
    console.warn('[CAPI] META_CAPI_TOKEN não configurado. Evento ignorado.');
    return { statusCode: 200, body: JSON.stringify({ status: 'skipped', reason: 'no_token' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_json' }) };
  }

  // ------------------------------------------------------------------
  // Extrai IP do cliente a partir dos headers da requisição
  // Netlify popula x-forwarded-for com o IP real do visitante
  // ------------------------------------------------------------------
  const clientIp = (
    event.headers['x-forwarded-for'] ||
    event.headers['x-real-ip'] ||
    event.headers['client-ip'] ||
    ''
  ).split(',')[0].trim();

  // ------------------------------------------------------------------
  // Monta user_data enriquecido com dados server-side
  // ------------------------------------------------------------------
  const browserUserData = payload.user_data || {};
  const enrichedUserData = {
    ...(browserUserData.fbp        ? { fbp: browserUserData.fbp }                       : {}),
    ...(browserUserData.fbc        ? { fbc: browserUserData.fbc }                       : {}),
    ...(browserUserData.external_id? { external_id: [browserUserData.external_id] }     : {}),
    ...(clientIp                   ? { client_ip_address: clientIp }                    : {}),
    ...(browserUserData.client_user_agent ? { client_user_agent: browserUserData.client_user_agent } : {}),
    // country: infere do locale enviado pelo browser (ex: 'pt-BR' → 'br')
    ...(browserUserData.locale
      ? { country: [browserUserData.locale.slice(-2).toLowerCase()] }
      : { country: ['br'] }
    )
  };

  // ------------------------------------------------------------------
  // Monta o evento no formato exigido pelo Meta
  // ------------------------------------------------------------------
  const metaEvent = {
    event_name: payload.event_name,
    event_time: payload.event_time || Math.floor(Date.now() / 1000),
    event_id: payload.event_id,                    // chave de deduplicação
    event_source_url: payload.event_source_url,
    action_source: 'website',
    user_data: enrichedUserData,
    ...(payload.custom_data && Object.keys(payload.custom_data).length > 0
      ? { custom_data: payload.custom_data }
      : {})
  };

  // ------------------------------------------------------------------
  // Monta o body para a Meta API
  // ------------------------------------------------------------------
  const metaBody = {
    data: [metaEvent],
    access_token: token
  };

  // Modo de teste (opcional): adiciona test_event_code se configurado
  const testCode = process.env.META_CAPI_TEST_CODE;
  if (testCode) {
    metaBody.test_event_code = testCode;
  }

  // ------------------------------------------------------------------
  // Envia para o Meta
  // ------------------------------------------------------------------
  try {
    const response = await fetch(META_CAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metaBody)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[CAPI] Erro Meta API:', JSON.stringify(result));
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'meta_api_error', detail: result })
      };
    }

    console.log(`[CAPI] Evento "${payload.event_name}" enviado. events_received: ${result.events_received}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'ok', events_received: result.events_received })
    };

  } catch (err) {
    console.error('[CAPI] Erro de rede:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'network_error' }) };
  }
};
