---
name: carrossel-instagram
description: Gera carrosséis editoriais 1080×1080 para o Instagram do Dr Antonio Eduardo (oftalmologista), seguindo o brandbook real do site em index.html. Use quando o usuário pedir um carrossel, post, ou publicação editorial sobre qualquer tema médico/oftalmológico (ex. "carrossel sobre glaucoma", "post de catarata", "publicação sobre miopia"). Cada carrossel é um arquivo HTML único + 9 PNGs renderizados.
---

# Carrossel Instagram · Dr Antonio

Esta skill produz carrosséis editoriais para o Instagram do Dr Antonio Eduardo Barbosa da Silva (oftalmologista, CRM/SP 244412, CRM/SC 27365), seguindo o brandbook real embutido em `index.html`.

## Quando usar

Acione esta skill quando o usuário pedir:
- "Cria um carrossel sobre [tema]" (glaucoma, catarata, miopia, ceratocone, retinopatia diabética, etc.)
- "Faz uma publicação editorial sobre [tema]"
- "Quero um post de 9 slides sobre [tema]"
- Variantes em português envolvendo Instagram + tema médico oftalmológico

## Arquivos desta skill

- `brandbook.md` — Especificação canônica do brand (cores, tipografia, símbolos SVG, voz, regras invioláveis). **Leia antes de começar.**
- `template.html` — Carrossel de referência completo (`carrossel-descolamento-retina.html`). Use como ponto de partida — copie e adapte o conteúdo, mantendo estrutura, classes CSS e elementos visuais.
- `render.js` — Script Puppeteer que renderiza cada slide como PNG 1080×1080.

## Fluxo de trabalho

### 1. Coletar contexto do tema
Se o usuário não forneceu detalhes suficientes, pergunte o mínimo necessário (use `AskUserQuestion` quando fizer sentido):
- **Tema clínico** (obrigatório, ex. "Glaucoma")
- **Estatística-âncora** opcional (será o slide 5)
- **Tom desejado** se ambíguo (alerta / informativo / preventivo)

Não invente dados clínicos. Se faltar uma estatística confiável, omita o slide 5 ou substitua por outro recorte (ex. "1 milhão de brasileiros convivem com X" só se for verídico).

### 2. Estrutura editorial de 9 slides

A ordem é canônica. Sinta-se livre para reescrever copy, mas mantenha o **arco narrativo**:

| # | Tema do slide | Fundo | Função |
|---|---|---|---|
| 01 | Capa | tinta | Título do tema + tagline "Um olhar que vê além da visão" + assinatura |
| 02 | Definição | papiro | O que é o problema? — corpo explicativo |
| 03 | Classificação / tipos | verdete | Subdivisões com numeração i. ii. iii. |
| 04 | Sintomas / sinais | papiro | Grid 2×2 com pupilas como marcadores |
| 05 | Dado clínico / estatística | verdete | Número gigante em Fraunces itálico 300 âmbar |
| 06 | Fatores de risco / quem atinge | papiro | Lista com pupilas + anotações em mono |
| 07 | Diagnóstico / exame | tinta | Corpo + sunburst SVG decorativo de fundo + CTA-pergunta em âmbar |
| 08 | Tratamento / conduta | papiro | Corpo + bloco verdete inferior com princípio editorial |
| 09 | CTA final | tinta | Logo + contatos completos (WhatsApp, IG, cidades, CRM) |

Adapte rótulos conforme o tema (ex. "Tipos" pode virar "Estágios" para glaucoma; "Sinais de alerta" pode virar "Sintomas frequentes" para catarata).

### 3. Gerar o arquivo HTML

1. Copie `.claude/skills/carrossel-instagram/template.html` para a raiz do repo como `carrossel-<slug-do-tema>.html` (slug em kebab-case, sem acentos).
2. Substitua **somente o conteúdo textual** dentro de cada `<section class="slide-N">`. **Não altere** os tokens CSS, símbolos SVG (sunburst), nem a estrutura `.slide` / `.slide-inner` / `.dot-pattern`.
3. Atualize `<title>` e a faixa fixa do `.toolbar-title`.
4. Mantenha o slide 9 com os contatos reais (CRMs, WhatsApp, IG, 6 cidades) — verifique se ainda batem com `index.html` antes de finalizar.

### 4. Renderizar PNGs

Rode o Puppeteer:
```bash
mkdir -p /tmp/render-out
node .claude/skills/carrossel-instagram/render.js carrossel-<slug>.html /tmp/render-out
```

Saída: 9 arquivos `slide-01.png … slide-09.png` em 1080×1080.

Se o Puppeteer não estiver instalado: `cd /tmp/render && npm install puppeteer --silent`.

### 5. Revisar pelo menos slide 1, 5 e 9

Use `Read` nos PNGs gerados para inspecionar antes de entregar. Conferir:
- Nenhum elemento sobrepondo título
- Cor do âmbar é terracota (#C9772A) e não amarelo
- Tipografia é Fraunces **itálico**, peso 300/400 — nunca bold 700/900
- Símbolos sunburst e pupila aparecem onde esperado

### 6. Entregar
- Mostre os 9 PNGs via `SendUserFile` com caption descritiva.
- Commit + push do HTML na branch ativa (não na main sem permissão).
- Pergunte se quer ajustes em copy específica.

## Regras invioláveis (do brand)

- ❌ Sem emojis em nenhum slide
- ❌ Sem ícones médicos genéricos (cruz vermelha, estetoscópio)
- ❌ Sem gradientes em fundos
- ❌ Sem `border-radius` em botões (mas o header CTA do site usa pill — só nele)
- ❌ Sem Fraunces 700/900 (não estão carregados no brand)
- ❌ Sem cores fora dos 5 tokens da paleta
- ✅ Itálico Fraunces 300/400 como display dominante
- ✅ Numeração em romanos minúsculos (i. ii. iii.)
- ✅ JetBrains Mono para eyebrows, dados técnicos, contatos
- ✅ Composição editorial com espaço negativo generoso
- ✅ Pupila como marcador de lista; sunburst como assinatura

## Variantes possíveis

- **Post único** (não carrossel): mesma linguagem, apenas slide-9 com CTA forte
- **Story** (1080×1920): alterar `aspect-ratio: 9/16` no `.slide`, ajustar `cqw` proporcionalmente
- **Reels cover** (1080×1350): `aspect-ratio: 4/5`

Em todos os casos, pergunte antes de mudar de formato.
