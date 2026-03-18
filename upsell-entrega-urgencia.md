# Upsell: Taxa de Entrega Urgência — Gabriel Jimbo: Ensaios Por IA
### Pós-venda imediato · Black · Alta conversão · Remarketing incluído

> **DNA do comprador pós-pagamento:**
> Ele acabou de abrir a carteira. Isso muda tudo.
> O estado mental é: "quero ver logo" + "já tô investido nisso".
> A ansiedade de esperar 24h é maior do que o custo de R$9,90.
> Esse é o único momento em que ele compra sem precisar ser convencido —
> ele só precisa de uma desculpa racional pra fazer o que já quer fazer.

> **Regra de ouro do upsell:** Nunca peça antes de confirmar o pagamento.
> Confirme o PIX → espere 30 segundos → apresente.
> A janela de alta conversão dura menos de 10 minutos após o pagamento.

---

## ARQUITETURA

```
[6] PAGAMENTO confirmado
    ↓
[U1] UPSELL — Urgência (imediato, 30s após confirmar PIX)
    ↓
    Aceita → [U-OK] Confirmação + antecipação
    Não agora → [U2] BUMP SOFT (10 min depois)
    ↓
    Ainda não → aguardar entrega
    ↓
[U3] PÓS-ENTREGA — Reativação (logo após entregar o resultado)
    ↓
    Ignora → [BLACK U1] (24h depois)
    Ignora → [BLACK U2] (72h depois)
    Ignora → [BLACK U3] (7 dias depois)
```

---

## LEGENDA

```
💬 TEXTO   → mensagem escrita
🎙️ ÁUDIO   → gravar e enviar como mensagem de voz
📸 MÍDIA   → enviar imagem
⬅️ SE      → condição de resposta do lead
➡️ IR      → próximo passo
🔗 LINK    → substituir pelo link real
```

---

## [U1] UPSELL PRINCIPAL — Imediato após PIX

> Enviar exatamente 30 segundos após confirmar o recebimento.
> Nunca antes. A confirmação cria o pico emocional — o upsell surfa nele.

💬 **TEXTO:**
```
Pagamento confirmado! 🐾

Seu ensaio já entrou na fila de produção.
Prazo: até 24h a partir de agora.

—

Uma coisa rápida antes de a gente começar:

Tem uma opção de Entrega Urgência aqui.

Em vez de 24h — você recebe em até 2h.
Mesma qualidade. Mesmo resultado. Só que hoje.

É + R$9,90 no mesmo PIX.

Quer que a gente coloque na frente da fila?
```

⬅️ *"Sim" / "Quero" / qualquer confirmação → [U-OK]*
⬅️ *"Não" / "Tá bom assim" / silêncio → [U2]*

---

## [U-OK] — Confirmação do Upsell

💬 **TEXTO:**
```
Perfeito. ⚡

Chave PIX: 🔗 [SEU_PIX_AQUI]
Valor: R$9,90

Manda o comprovante e a gente já coloca na frente.
Você recebe ainda hoje.
```

⬅️ *Envia comprovante → priorizar na fila e entregar em até 2h*

---

## [U2] — Bump Soft (10 minutos após o "não" ou silêncio)

> Tom: leveza, sem pressão. Uma última menção, não um argumento.

💬 **TEXTO:**
```
Tudo certo — já tô com a foto aqui. 🐾

Só confirmando: você vai receber em até 24h no horário normal.

Se em algum momento quiser antecipar pra hoje — é só me falar.
A janela de urgência fica aberta até eu começar a produção.
```

⬅️ *Aceita → [U-OK]*
⬅️ *Ignora / "Não precisa" → aguardar e entregar normalmente*

---

## [U3] — Reativação Pós-Entrega (logo após enviar o resultado)

> Melhor momento secundário de upsell: ele acabou de ver o resultado e amou.
> A emoção está no pico. Usar esse momento pra vender a próxima foto — com urgência.

💬 **TEXTO:**
```
Ficou do jeito que você esperava? 🎊

Pergunto porque muita gente que recebe o resultado
quer transformar uma segunda foto logo em seguida —
enquanto ainda tá com aquela sensação.

Se quiser fazer mais uma ainda hoje,
a gente faz com Entrega Urgência: recebe em 2h.

Quer ver os preços?
```

⬅️ *"Sim" → [UPSELL pacotes completos do funil principal]*
⬅️ *Silêncio / "Vou pensar" → [BLACK U1]*

---

---

## MENSAGENS BLACK — REMARKETING URGÊNCIA
### Para leads que viram tudo, pagaram o Starter e não compraram o upsell

> Aguardar os intervalos indicados. Nunca enviar dois seguidos no mesmo dia.
> Tom: direto, sem enrolação, zero desculpa.

---

### ⚫ BLACK U1 — O preço vai subir (24h após entrega)

💬 **TEXTO:**
```
Oi.

Só pra te avisar:

A Entrega Urgência por R$9,90 é um teste que a gente tá rodando
com novos clientes.

Não vai ficar nesse preço.

Se você quiser usar na próxima foto — é agora.
```

---

### ⚫ BLACK U2 — Você já sabe o resultado (72h após entrega)

🎙️ **GRAVAR ÁUDIO — 25 a 35 segundos**

🎙️ **SCRIPT:**
```
"Oi. Uma coisa rápida.

Você já viu o resultado. Você já sabe o que a gente entrega.

A dúvida foi embora.

Então se tiver uma segunda foto que você queria transformar —
não faz sentido esperar 24h sendo que dá pra ter hoje.

Urgência aqui custa R$9,90. Resultado em 2h.

Quando quiser, é só me mandar a foto."
```

⬅️ *Resposta → [U-OK]*

---

### ⚫ BLACK U3 — A foto que você deixou pra depois (7 dias após entrega)

💬 **TEXTO:**
```
Aquela foto que você disse "vou mandar depois"

— ela ainda tá no seu celular.

Envia hoje. A gente processa em 2h com a Urgência
ou em 24h no horário normal.

Qual prefere?
```

⬅️ *Escolhe urgência → [U-OK]*
⬅️ *Escolhe normal → [6] Pagamento do funil principal*

---

---

## VARIAÇÕES POR CONTEXTO

### Versão Pet (adaptar "foto" para "ele/ela")

💬 **TEXTO — U1 versão pet:**
```
Pagamento confirmado! 🐾

O [nome do pet se souber] já entrou na fila.
Prazo: até 24h.

—

Uma coisa antes de começar:

Você quer receber ainda hoje?

Tem a opção Urgência: + R$9,90 e você recebe em 2h.
Mesma qualidade. A gente só coloca na frente da fila.

Quer?
```

---

### Versão Newborn / Gestante (emocional máximo)

💬 **TEXTO — U1 versão newborn:**
```
Pagamento confirmado. 🌙

Que momento lindo de registrar.

Seu ensaio já entrou. Prazo: até 24h.

—

Uma pergunta:

Você quer ver hoje?

Por + R$9,90 a gente coloca na frente da fila
e você recebe em até 2h.

Faz sentido?
```

---

### Versão Profissional / LinkedIn (objetividade)

💬 **TEXTO — U1 versão profissional:**
```
PIX confirmado. ✅

Foto recebida. Prazo: 24h.

—

Opção rápida:

Entrega Urgência por + R$9,90 → você recebe em 2h.

Útil se tiver usando a foto hoje — entrevista, atualização de perfil, proposta.

Quer priorizar?
```

---

---

## REGRAS DO UPSELL URGÊNCIA

| Regra | Motivo |
|-------|--------|
| Nunca oferecer antes de confirmar o pagamento | Antes de pagar, o lead está em modo de decisão. Depois de pagar, está em modo de expectativa — muito mais receptivo |
| Máximo 2 tentativas antes da entrega | Mais do que isso vira pressão e quebra a relação |
| Não justificar o preço de R$9,90 | É barato demais pra precisar de justificativa — explicar demais parece insegurança |
| Usar o nome do pet se souber | Personalização aumenta conversão em ~20% nesse nicho |
| Confirmar a entrega rápida com exatidão | "Em até 2h" é mais crível que "rapidinho" ou "logo mais" |
| Black só após a entrega | Antes de entregar, o lead está esperando — não pressionar. Após entregar, ele tem prova do valor |

---

## MÉTRICAS ESPERADAS — Upsell Urgência

| Etapa | Taxa esperada |
|-------|--------------|
| U1 (imediato pós-pagamento) | 25–40% conversão |
| U2 bump soft (10 min depois) | +8–12% dos que não compraram em U1 |
| U3 reativação pós-entrega | 15–25% conversão |
| BLACK U1 (24h) | 10–18% |
| BLACK U2 (72h, áudio) | 8–15% |
| BLACK U3 (7 dias) | 5–10% |
| **Conversão total do upsell (acumulada)** | **45–65% dos compradores** |

> Upsell pós-pagamento converte mais que qualquer outra etapa do funil
> porque elimina as duas maiores objeções: confiança (já pagou) e valor (já viu o portfólio).
> O único obstáculo é a urgência — e o produto resolve exatamente isso.

---

## LINKS PARA SUBSTITUIR

| Placeholder | O que colocar |
|-------------|--------------|
| `🔗 [SEU_PIX_AQUI]` | Sua chave PIX (CPF, telefone ou e-mail) |
| `🔗 [LINK DO SITE]` | URL do site |
| `[nome do pet se souber]` | Nome que o lead mencionou na conversa |

---

## INTEGRAÇÃO COM O FUNIL PRINCIPAL

```
funil-whatsapp-pet.md
    └── [6] PAGAMENTO confirmado
              └── → upsell-entrega-urgencia.md [U1]
                        └── Aceita → [U-OK]
                        └── Não → [U2] → [U3 após entrega]
                                   └── Ignora → BLACK U1, U2, U3
```
