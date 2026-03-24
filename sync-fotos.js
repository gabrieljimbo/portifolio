#!/usr/bin/env node
/**
 * sync-fotos.js
 * Escaneia as pastas clientes/{id}/feito/ e atualiza clientes.json
 * automaticamente com as fotos encontradas.
 *
 * Uso local:   node sync-fotos.js
 * CI (Action): rodado automaticamente a cada push em clientes/**
 */

const fs   = require('fs');
const path = require('path');

const ROOT          = __dirname;
const CLIENTES_PATH = path.join(ROOT, 'clientes.json');
const IMG_EXTS      = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

// Natural sort: "08.png" < "09.png" < "10.png"
function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

if (!fs.existsSync(CLIENTES_PATH)) {
  console.error('clientes.json não encontrado.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(CLIENTES_PATH, 'utf8'));

let changed = false;

for (const phone of Object.keys(data)) {
  const client     = data[phone];
  const folderPath = path.join(ROOT, client.folder);

  if (!fs.existsSync(folderPath)) {
    console.log(`[${client.name}] Pasta não encontrada: ${client.folder}`);
    continue;
  }

  const files = fs.readdirSync(folderPath)
    .filter(f => IMG_EXTS.has(path.extname(f).toLowerCase()))
    .sort(naturalSort);

  const before = JSON.stringify(client.photos);
  const after  = JSON.stringify(files);

  if (before !== after) {
    const added   = files.filter(f => !client.photos.includes(f));
    const removed = client.photos.filter(f => !files.includes(f));

    client.photos = files;
    changed = true;

    console.log(`[${client.name}] ${JSON.parse(before).length} → ${files.length} fotos`);
    if (added.length)   console.log(`  + adicionadas: ${added.join(', ')}`);
    if (removed.length) console.log(`  - removidas:   ${removed.join(', ')}`);

    // Auto-marcar como concluído quando todas as fotos estiverem prontas
    const totalEsperado = client.package.total + client.package.bonus;
    if (files.length >= totalEsperado && client.status !== 'concluido') {
      client.status = 'concluido';
      console.log(`  ✓ Status atualizado para "concluido" (${files.length}/${totalEsperado} fotos)`);
    }
  } else {
    console.log(`[${client.name}] Sem mudanças (${files.length} fotos)`);
  }
}

if (changed) {
  fs.writeFileSync(CLIENTES_PATH, JSON.stringify(data, null, 2) + '\n');
  console.log('\nclientes.json atualizado.');
} else {
  console.log('\nNenhuma mudança detectada.');
}
