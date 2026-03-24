#!/usr/bin/env node
/**
 * sync-fotos.js
 *
 * Lê clientes/{pasta}/config.json de cada cliente,
 * escaneia clientes/{pasta}/feito/ e regenera clientes.json.
 *
 * Uso local:   node sync-fotos.js
 * CI (Action): rodado automaticamente pelo GitHub Actions
 *              a cada push em clientes/**
 *
 * ─── Como adicionar um novo cliente ───────────────────────
 * 1. Crie a pasta:  clientes/{nome}/
 * 2. Crie o config: clientes/{nome}/config.json  (copie o template abaixo)
 * 3. Crie a pasta:  clientes/{nome}/feito/
 * 4. Suba as fotos prontas para feito/
 * 5. Faça push → o Action roda e atualiza clientes.json automaticamente
 *
 * ─── Template config.json ─────────────────────────────────
 * {
 *   "phone":        "11999999999",   <- só dígitos
 *   "name":         "Nome Completo",
 *   "pet":          "Nome do Pet (raça)",  <- ou null se não for pet
 *   "label":        "Ensaio Pet",    <- Pet | Newborn | Gestante | Casal | Profissional | Família
 *   "pkg_name":     "⭐ Popular",
 *   "package":      { "total": 5, "bonus": 0 },
 *   "price":        49.90,           <- valor pago (usado no pixel)
 *   "status":       "andamento",     <- "andamento" | "concluido"
 *   "eta":          "até DD de mês",
 *   "download_url": null             <- link do Drive/Dropbox quando concluir
 * }
 */

const fs   = require('fs');
const path = require('path');

const ROOT          = __dirname;
const CLIENTES_DIR  = path.join(ROOT, 'clientes');
const CLIENTES_PATH = path.join(ROOT, 'clientes.json');
const IMG_EXTS      = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// Carrega clientes.json atual (para comparar depois)
const oldData = fs.existsSync(CLIENTES_PATH)
  ? JSON.parse(fs.readFileSync(CLIENTES_PATH, 'utf8'))
  : {};

const newData = {};

// Escaneia cada pasta dentro de clientes/
const folders = fs.readdirSync(CLIENTES_DIR).filter(name => {
  const full = path.join(CLIENTES_DIR, name);
  return fs.statSync(full).isDirectory();
});

for (const folder of folders) {
  const configPath = path.join(CLIENTES_DIR, folder, 'config.json');

  if (!fs.existsSync(configPath)) {
    console.log(`[${folder}] Sem config.json — pulando.`);
    continue;
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    console.error(`[${folder}] Erro ao ler config.json: ${e.message}`);
    continue;
  }

  const { phone } = config;
  if (!phone) {
    console.error(`[${folder}] config.json sem campo "phone" — pulando.`);
    continue;
  }

  // Escaneia fotos prontas
  const feitoPath = path.join(CLIENTES_DIR, folder, 'feito');
  let photos = [];
  if (fs.existsSync(feitoPath)) {
    photos = fs.readdirSync(feitoPath)
      .filter(f => IMG_EXTS.has(path.extname(f).toLowerCase()))
      .sort(naturalSort);
  }

  // Auto-marcar concluído quando todas as fotos estão prontas
  const totalEsperado = config.package.total + (config.package.bonus || 0);
  let status = config.status || 'andamento';
  if (photos.length >= totalEsperado && status !== 'concluido') {
    status = 'concluido';
    // Atualiza config.json para refletir o novo status
    config.status = 'concluido';
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
    console.log(`[${config.name}] ✓ status atualizado para "concluido" em config.json`);
  }

  newData[phone] = {
    name:         config.name,
    pet:          config.pet   || null,
    label:        config.label || 'Ensaio',
    pkg_name:     config.pkg_name,
    package:      config.package,
    price:        config.price || 0,
    status,
    eta:          config.eta          || '',
    folder:       `clientes/${folder}/feito`,
    photos,
    download_url: config.download_url || null,
  };

  // Log de diferenças
  const old = oldData[phone];
  if (!old) {
    console.log(`[${config.name}] Novo cliente adicionado (${photos.length} fotos)`);
  } else if (JSON.stringify(old.photos) !== JSON.stringify(photos)) {
    const added   = photos.filter(f => !old.photos.includes(f));
    const removed = old.photos.filter(f => !photos.includes(f));
    console.log(`[${config.name}] ${old.photos.length} → ${photos.length} fotos`);
    if (added.length)   console.log(`  + adicionadas: ${added.join(', ')}`);
    if (removed.length) console.log(`  - removidas:   ${removed.join(', ')}`);
  } else {
    console.log(`[${config.name}] Sem mudanças (${photos.length} fotos)`);
  }
}

// Verifica se houve mudança real antes de escrever
if (JSON.stringify(oldData) !== JSON.stringify(newData)) {
  fs.writeFileSync(CLIENTES_PATH, JSON.stringify(newData, null, 2) + '\n');
  console.log('\nclientes.json atualizado.');
} else {
  console.log('\nNenhuma mudança detectada.');
}
