# Gabriel Jimbo — Ensaios Por IA

Site portfólio de vendas para serviço de transformação fotográfica com IA.

## Stack
- Arquivo único: `index.html` (HTML + CSS + JS inline, zero dependências)
- Deploy: Netlify via GitHub (`netlify.toml`)
- Google Fonts: Cormorant Garamond, DM Sans, DM Mono

## Deploy
- Repositório: https://github.com/gabrieljimbo/portifolio
- Auto-deploy: push para `main` → Netlify detecta e faz deploy automático
- WhatsApp placeholder: `https://wa.me/5511999999999` — substituir pelo número real

## Skills instaladas
Todas as skills de marketing/copy estão em `.claude/skills/`.
O `product-brief.md` na raiz tem contexto completo do produto para as skills.

## Manipulação de Imagens
- **Remover fundo:** usar `sharp` (Node.js) — `npm install sharp`, rodar script, deletar `node_modules`
- Threshold para fundo preto: brilho < 55 (soma R+G+B)
- Salvar sempre como PNG com transparência

```js
// Exemplo: remover fundo preto de logo.png
const sharp = require('./node_modules/sharp');
sharp('logo.png').raw().toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const rgba = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      const r = data[i*channels], g = data[i*channels+1], b = data[i*channels+2];
      rgba[i*4]=r; rgba[i*4+1]=g; rgba[i*4+2]=b;
      rgba[i*4+3] = (r+g+b) < 55 ? 0 : 255;
    }
    return sharp(rgba, { raw:{width,height,channels:4} }).png().toFile('logo.png');
  });
```

## Convenções
- Dark mode: fundo `#0A0A0A`, dourado `#C9A84C`, coral `#E8726A`
- Headlines: Cormorant Garamond; Body: DM Sans; Mono: DM Mono
- Imagens: placeholders via picsum.photos — substituir por fotos reais de antes/depois
- WhatsApp é o canal principal de conversão — todos os CTAs apontam para lá
