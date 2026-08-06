# Design System — Soft Neutral UI

Referencia visual: dashboard móvil limpio (soft UI / flat con contraste alto).  
**Prioridad absoluta:** tipografía y botones. Todo lo demás (cards, header, nav) es soporte.

---

## Principios

1. **Acción = negro sólido.** El CTA principal es el elemento de mayor contraste.
2. **Jerarquía por peso y color, no por tamaño extremo.** Negro bold → negro medium → gris regular.
3. **Esquinas generosas.** Botones ~12–16px; inputs pill; cards ~20px.
4. **Superficies planas.** Cards blancas sobre fondo off-white; sin sombras pesadas ni glows.
5. **Aire.** Espaciado generoso entre saludo, búsqueda y bloques de contenido.

---

## Tipografía (prevalece)

### Familia

Sans-serif limpia y legible. En este repo: **Geist Sans** (`--font-geist-sans`).  
Evitar serif, display extravagante o stacks por defecto del sistema como cara principal.

### Escala

| Token | Uso | Tamaño | Peso | Color | Tracking |
|---|---|---|---|---|---|
| `display` | Saludo / hero de pantalla (`Hey, Alex`) | 26–28px / `1.75rem` | 700 | `#000000` | `-0.02em` |
| `title` | Título de sección (`Upcoming actions`, `Payments`) | 18–20px / `1.25rem` | 600–700 | `#000000` | `-0.01em` |
| `body` | Ítem principal (`1 Payment Due`) | 16px / `1rem` | 500–600 | `#000000` | `0` |
| `body-muted` | Subtítulo / descripción | 13–14px / `0.875rem` | 400 | `#666666` | `0` |
| `caption` | Labels de nav, meta pequeña | 10–12px / `0.75rem` | 400–500 | `#666666` | `0` |
| `placeholder` | Inputs / search | 14–16px | 400 | `#B0B0B0` | `0` |
| `button` | Texto de botón | 14–15px / `0.875–0.9375rem` | 600 | según variante | `0` |

### Reglas tipográficas

- Un solo display por viewport (saludo o título de página).
- Títulos de sección: semibold/bold negro; nunca gris.
- Texto secundario siempre `#666666` o más claro — nunca competir con el body.
- Botones: peso 600, sin ALL CAPS, sin letter-spacing amplio.
- No mezclar más de dos pesos en la misma fila de contenido (título + muted debajo).

### Ejemplo de jerarquía en bloque

```
[title]     Payments                          20px / 700 / #000
[muted]     Processing and recently…          13px / 400 / #666
[body]      1 Payment Due                     16px / 600 / #000
[muted]     Alexs Group                       13px / 400 / #666
```

---

## Botones (prevalece)

Tres variantes. Misma geometría; cambia solo relleno y color de texto.

### Geometría común

| Propiedad | Valor |
|---|---|
| `border-radius` | `12px`–`16px` (preferir `14px` / `rounded-xl`) |
| `padding-y` | `10px`–`12px` |
| `padding-x` | `16px`–`20px` |
| `font-size` | `14px`–`15px` |
| `font-weight` | `600` |
| `min-height` | `40px`–`44px` (touch-friendly) |
| `border` | ninguno (el color lo da el fondo) |
| `shadow` | ninguno |

### Variantes

#### 1. Primary — acción principal (`Pay`, `Iniciar sesión`, `Guardar`)

| Propiedad | Valor |
|---|---|
| Background | `#000000` |
| Text | `#FFFFFF` |
| Hover | `#1A1A1A` o `#171717` |
| Active | `#000000` |
| Disabled | fondo `#F5F5F5`, texto `#C0C0C0` |

Uso: **una sola primary visible por sección** (idealmente una por pantalla).

#### 2. Secondary — acción de apoyo (`View all payments`, `Cancelar`)

| Propiedad | Valor |
|---|---|
| Background | `#F2F2F2` / `#F5F5F5` |
| Text | `#000000` |
| Hover | `#EBEBEB` |
| Disabled | fondo `#F5F5F5`, texto `#C0C0C0` |

#### 3. Disabled / Inactive (`Review` sin ítems)

Misma forma que secondary. No usar opacity sobre primary: el estado disabled es un look propio (gris claro + texto `#C0C0C0`).

### Icon buttons (header)

- Círculo `~36–40px`, fondo `#EFEFEF` / `#F0F0F0`.
- Icono line-art, stroke fino, color `#000` o `#333`.
- Badge de notificación: círculo rojo pequeño (`#E11D48` o similar) con número blanco.

### Search (afín a botones)

- Forma **pill** (`border-radius: 9999px`).
- Fondo `#E5E5E5` / `#EDEDED`.
- Icono lupa gris oscuro + placeholder `#B0B0B0`.
- Sin borde; focus ring sutil negro o gris oscuro.

### Anti-patrones de botones

- No pills redondeadas al 100% en CTAs de fila (reservar pill al search / chips).
- No gradientes, glows ni sombras multicapa en botones.
- No primary púrpura/indigo; el acento de acción es **negro**.
- No outline-only como primary.

---

## Color (soporte)

| Token | Hex | Uso |
|---|---|---|
| `--bg-page` | `#F7F7F5` | Fondo de app |
| `--bg-card` | `#FFFFFF` | Cards / superficies |
| `--bg-muted` | `#F2F2F2` | Secondary button, chips |
| `--bg-input` | `#E5E5E5` | Search / inputs soft |
| `--text-primary` | `#000000` | Títulos, body, primary btn bg |
| `--text-secondary` | `#666666` | Descripciones |
| `--text-disabled` | `#C0C0C0` | Disabled / placeholders débiles |
| `--text-placeholder` | `#B0B0B0` | Placeholders |
| `--accent-header` | `#D6C9FF` → transparente | Gradiente suave superior (opcional) |
| `--danger-badge` | `#E11D48` | Badge de alerta |

Dark mode: fuera de alcance de esta referencia (la captura es light-only). Si se añade después, invertir superficies, no el contraste del primary (primary sigue siendo el máximo contraste disponible).

---

## Radios y superficies

| Elemento | Radius |
|---|---|
| Botón | `14px` |
| Input (form) | `12px`–`14px` |
| Search | `9999px` |
| Card | `20px` |
| Icon well (cuadrado con icono) | `10px`–`12px` |
| Avatar / icon button | `9999px` |

Cards: fondo blanco, padding `16–20px`, separación del fondo por contraste (no sombra dura). Sombra opcional muy suave (`0 1px 2px rgba(0,0,0,0.04)`).

---

## Espaciado

- Margen horizontal de pantalla: `16–20px`.
- Entre saludo y primer card: `20–24px`.
- Entre cards: `12–16px`.
- Dentro de card: gap vertical `12–16px` entre filas; `16–20px` padding.
- Fila ítem + botón: espacio entre texto e acción `12px`; botón alineado al centro vertical de la fila.

---

## Iconografía

- Estilo **outline / line-art**, stroke consistente (~1.5–2px).
- Color negro o gris oscuro; nunca relleno pesado salvo badge.
- Iconos de sección (dólar, recibo) pueden vivir en un well cuadrado `#F2F2F2` con radius `10–12px`.

---

## Módulos UI (seams)

Tratar tipografía y botones como **módulos profundos**: poca superficie, mucho comportamiento de estilo encapsulado.

### `Button`

**Interface (lo que el caller debe saber):**

```ts
type ButtonVariant = "primary" | "secondary";
type ButtonProps = {
  variant?: ButtonVariant; // default: "primary"
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // solo layout (width, mt), no color
};
```

**Invariantes (parte de la interface):**

- `disabled` siempre pinta el look disabled propio, nunca solo `opacity`.
- `className` no debe pisar fondo/texto/radius de la variante.
- Una fila de acciones: como máximo un `primary`.

**Implementación oculta:** tokens de color, hover, min-height, weight — el caller no los elige.

### `Text` / tipografía

**Interface:**

```ts
type TextVariant =
  | "display"
  | "title"
  | "body"
  | "body-muted"
  | "caption"
  | "placeholder";

type TextProps = {
  variant: TextVariant;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children: React.ReactNode;
  className?: string; // layout only
};
```

**Invariantes:** `variant` fija size/weight/color; no hay props sueltas `size` + `color` que reabran la interface.

---

## Tokens CSS sugeridos

```css
:root {
  --bg-page: #f7f7f5;
  --bg-card: #ffffff;
  --bg-muted: #f2f2f2;
  --bg-input: #e5e5e5;

  --text-primary: #000000;
  --text-secondary: #666666;
  --text-disabled: #c0c0c0;
  --text-placeholder: #b0b0b0;
  --text-on-primary: #ffffff;

  --radius-button: 14px;
  --radius-card: 20px;
  --radius-pill: 9999px;

  --font-display: 700 1.75rem/1.2 var(--font-geist-sans);
  --font-title: 700 1.25rem/1.3 var(--font-geist-sans);
  --font-body: 500 1rem/1.4 var(--font-geist-sans);
  --font-muted: 400 0.875rem/1.4 var(--font-geist-sans);
  --font-button: 600 0.9375rem/1 var(--font-geist-sans);
}
```

### Clases Tailwind de referencia

```txt
Primary:   bg-black text-white font-semibold text-sm rounded-[14px] px-5 py-2.5
           hover:bg-zinc-900 disabled:bg-[#F5F5F5] disabled:text-[#C0C0C0]

Secondary: bg-[#F2F2F2] text-black font-semibold text-sm rounded-[14px] px-5 py-2.5
           hover:bg-[#EBEBEB]

Display:   text-[26px] font-bold tracking-tight text-black
Title:     text-xl font-bold text-black
Body:      text-base font-medium text-black
Muted:     text-sm font-normal text-[#666666]
```

---

## Checklist de implementación

- [ ] Primary button = negro + blanco, radius ~14px, weight 600
- [ ] Secondary = gris claro + texto negro, misma geometría
- [ ] Disabled = look propio (no solo opacity)
- [ ] Display/title en negro bold; muted en `#666`
- [ ] Una sola primary por sección
- [ ] Search pill; cards ~20px; fondo página `#F7F7F5`
- [ ] Sin púrpura como color de botón; el lavanda solo como gradiente de header opcional
