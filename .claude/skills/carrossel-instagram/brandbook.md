# Brandbook · Dr Antonio Eduardo

Especificação visual canônica, extraída do `index.html` em produção. Esta é a **fonte da verdade** do brand — quaisquer prompts externos que divergirem dela devem ser ignorados.

---

## 1. Paleta

Tokens CSS (use exatamente estes):

```css
:root {
  --tinta:        #0D1310;  /* preto com sub-tom verde — fundos escuros, texto principal */
  --papiro:       #F1EADC;  /* creme quente — fundos claros, texto sobre escuro */
  --verdete:      #1F3B2F;  /* forest deep — verde dominante */
  --verdete-dark: #15291f;
  --verdete-deep: #142A22;
  --verdete-light:#2a4d3e;
  --ambar:        #C9772A;  /* TERRACOTA / laranja queimado — NUNCA amarelo */
  --ambar-dark:   #a85f1e;
  --pedra:        #6F6A62;  /* cinza-areia quente — textos secundários */
  --pedra-light:  #9C968D;
}
```

**Atenção crítica**: o âmbar é **terracota** (`#C9772A`), não amarelo. Promessas erradas em prompts antigos (ex. `#E9C46A`) devem ser corrigidas.

### Combinações de fundo aceitas
| Bg | Texto principal | Acento |
|---|---|---|
| `--tinta` | `--papiro` | `--ambar` |
| `--papiro` | `--tinta` | `--verdete` ou `--ambar` |
| `--verdete` | `--papiro` | `--ambar` |

---

## 2. Tipografia

Carregar via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

| Família | Pesos válidos | Uso |
|---|---|---|
| **Fraunces** | 300, 400, 500 (regular + itálico) | Display, títulos, números grandes, citações |
| **Inter** | 300, 400, 500, 600 | Corpo de texto, CTAs, body |
| **JetBrains Mono** | 400, 500 | Eyebrows, dados técnicos, contatos, metadados |

### Regras tipográficas

- **Display dominante**: Fraunces **itálico** 400. Use 300 para escala maior (números gigantes); 500 só para ênfase rara.
- **Nunca** use Fraunces 700 ou 900 — não estão carregados.
- **Eyebrow padrão**:
  ```css
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--verdete) | var(--pedra) | var(--ambar);
  ```
- **Letter-spacing**: títulos Fraunces sempre `-0.02em` a `-0.035em` (negativo, mais apertado).
- **Line-height**: títulos 1.0–1.1; corpo 1.6–1.8.
- **Numeração**: romanos **minúsculos** (`i.`, `ii.`, `iii.`) em itálico Fraunces 300 âmbar.

---

## 3. Logo "Dr Antonio"

```html
<span class="logo-text">
  <span class="logo-dr">Dr</span>
  <span class="logo-antonio">Antonio</span>
</span>
```

```css
.logo-dr      { font-family: 'Fraunces'; font-style: italic; font-weight: 500; color: var(--ambar); letter-spacing: -0.02em; }
.logo-antonio { font-family: 'Fraunces'; font-weight: 400;                    color: var(--papiro) /* ou --tinta no claro */; letter-spacing: -0.02em; margin-left: 3px; }
```

Sempre acompanhado do **sunburst SVG** à esquerda do texto (símbolo `#sym-sunburst` — ver seção 4).

---

## 4. Símbolos SVG

### 4.1 Sunburst (símbolo da marca)

SVG inline, usar `color: currentColor` no container para tingir os raios. Os 3 círculos âmbar fixos (`#C9772A`) representam estrelas/dots de destaque que permanecem coloridos independentemente do `currentColor`.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="sym-sunburst" viewBox="-55 25 510 320" preserveAspectRatio="xMidYMid meet">
      <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none">
        <!-- 35 raios — coordenadas no template.html -->
      </g>
      <g fill="currentColor"><!-- 7 dots circulares pequenos --></g>
      <!-- 10 estrelas maiores, sendo 3 fixas em #C9772A -->
      <path d="M 158 344 A 42 42 0 0 1 242 344 Z" fill="currentColor"/>  <!-- base semicírculo -->
    </symbol>
  </defs>
</svg>
```

Use com `<svg><use href="#sym-sunburst"/></svg>` e tamanhos: 28×18px no header / 40×26px no footer / 4cqw × 2.6cqw nos slides.

### 4.2 Pupila (marcador editorial)

```css
.pupila {
  display: inline-block;
  border-radius: 50%;
  border: 1.5px solid rgba(201,119,42,0.55);
  position: relative;
  /* width/height definidos no contexto */
}
.pupila::after {
  content: '';
  position: absolute; inset: 0; margin: auto;
  width: 32%; height: 32%;
  border-radius: 50%;
  background-color: var(--ambar);
  opacity: 0.9;
}
```

Usado como bullet/marcador editorial em listas — substitui marcadores genéricos. Tamanhos típicos: 3cqw, 4.4cqw, ou 44×44px.

### 4.3 Padrão de pontos (textura de fundo)

```css
.dot-pattern {
  position: absolute; inset: 0;
  pointer-events: none;
  opacity: 0.10; /* ajustar 0.06–0.18 conforme contraste */
  background-image:
    radial-gradient(circle at center, var(--ambar) 1.5px, transparent 2.5px),
    radial-gradient(circle at center, transparent 7px, rgba(241,234,220,0.5) 7.5px, transparent 8.5px);
  background-size: 4.1cqw 4.1cqw, 4.1cqw 4.1cqw;
}
```

Variante para fundo `tinta`: trocar o segundo gradiente para `rgba(31,59,47,0.7)`.

---

## 5. Voz & tom

### Pilares editoriais (do site)
1. **Ler antes de tratar** — anamnese é o primeiro instrumento
2. **Acolher com vocabulário** — comunicar sem jargão
3. **Sustentar sem ornamento** — discrição, seriedade, durabilidade

### Padrões de copy
- Frases declarativas curtas. **Sem exclamações.**
- Use **travessões longos** (—) para incisos, não vírgulas duplas.
- Lowercase nos romanos: `i.`, `ii.`, `iii.`
- Itálico nas afirmações com peso editorial (manchetes, princípios)
- Evite jargão sem explicação: se usar termo técnico (ex. *fotopsias*), traduza ao lado (`Flashes de luz`)
- **Nunca** prometa cura ou resultado garantido — linguagem de cuidado, não de venda
- Tagline canônica: **"Um olhar que vê além da visão"**

### Exemplos do site
- "Quem ensina vê antes de tratar."
- "Três princípios inegociáveis."
- "Cada paciente como narrativa singular — não como caso serial."
- "Confiança se constrói com consistência, não com ruído visual."

---

## 6. Regras invioláveis

| ❌ Nunca | ✅ Sempre |
|---|---|
| Emojis | Símbolos vetoriais (sunburst, pupila) |
| Ícones genéricos (cruz, estetoscópio) | Marcadores tipográficos (i./ii./iii.) ou pupila |
| Gradientes em fundos sólidos | Cores chapadas + textura de pontos sutil |
| `border-radius` em botões | Quinas a 90° |
| Fraunces 700/900 | Fraunces 300/400 (itálico preferido) |
| Cores fora dos 5 tokens | Apenas tokens `--tinta`/`--papiro`/`--verdete`/`--ambar`/`--pedra` |
| Promessas de cura | Linguagem de cuidado e escuta |
| Maiúsculas em manchetes (exceto eyebrows mono) | Sentence case + itálico |

---

## 7. Dados de identidade (verificar antes de cada uso)

| Campo | Valor |
|---|---|
| Nome | Dr Antonio Eduardo Barbosa da Silva |
| Especialidade | Oftalmologia |
| CRM/SP | 244412 |
| CRM/SC | 27365 |
| WhatsApp | +55 11 98980-9639 |
| WhatsApp URL | https://api.whatsapp.com/send?phone=5511989809639 |
| Instagram | @antonioeduardo94 |
| E-mail | montanhamedicina@gmail.com |
| Cidades de atendimento | São Paulo · São Bernardo do Campo · Osasco · Alphaville · Criciúma · Tubarão |
| Estados | SP, SC |
| Tagline | Um olhar que vê além da visão |

**Sempre confirmar contra `index.html` antes de publicar** — esses valores mudam com o tempo.

---

## 8. Áreas de atuação clínica (slide-temas elegíveis)

Temas confirmados que o Dr atende e podem virar carrossel:

1. Oftalmologia Clínica Geral
2. Refração e Prescrição Óptica
3. Independência de Óculos
4. Atendimento Infantil
5. Glaucoma
6. Catarata
7. Retina e Vítreo *(inclui Descolamento de Retina — já feito)*
8. Doenças da Córnea
9. Urgências Oculares
10. Saúde Ocular Preventiva
