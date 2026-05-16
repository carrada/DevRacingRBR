# Arb-Yield // Receta de Arbitraje

Landing page para vender recetas de arbitraje financiero a Agentes de IA usando Machine Payments Protocol (HTTP 402).

## Descripción

**Arb-Yield** es una landing page brutalista diseñada para presentar oportunidades de arbitraje verificadas. Utiliza el protocolo MPP (Machine Payments Protocol) para permitir que agentes de IA realicen pagos autónomos y accedan a recetas de arbitraje.

### Características

- ✓ Diseño brutalista minimalista con estética terminal/hacker
- ✓ Semántica HTML estricta para parseo de IA
- ✓ Integración con Machine Payments Protocol (HTTP 402)
- ✓ Indicador de estado parpadeante MPP ACTIVE
- ✓ Secciones: Overview, Métricas, Terminal de Pago
- ✓ Tipografía monoespaciada exclusiva
- ✓ Paleta: Negro, blanco, verde terminal (#00FF41)

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Lenguaje**: TypeScript
- **Tipografía**: Monoespaciada (ui-monospace, SFMono, Menlo, Monaco, Consolas)

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/DevRacingRBR.git
cd DevRacingRBR

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
├── app/
│   ├── layout.tsx          # Layout raíz
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Estilos globales
│   └── favicon.ico
├── components/
│   ├── Header.tsx          # Header con indicador MPP
│   ├── Overview.tsx        # Sección de propuesta de valor
│   ├── Metrics.tsx         # Grid de métricas públicas
│   ├── Payment.tsx         # Terminal de pago MPP
│   └── Footer.tsx          # Footer
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## Secciones de la Landing

### 1. Header
- Título: "Arb-Yield // Receta de Arbitraje"
- Indicador parpadeante: "MPP Endpoint: ACTIVE"

### 2. Overview (Hero)
- H1: "Oportunidad de Arbitraje: Hardware B2B a D2C"
- Descripción de la receta verificada
- Lista de componentes incluidos

### 3. Metrics
- Grid de 6 métricas públicas
- Industria, inversión, margen, tiempo, dificultad, verificación

### 4. Payment (Terminal)
- Instrucciones para consumir el endpoint MPP
- Bloque `<pre><code>` con ejemplo de curl
- Información sobre respuesta HTTP 402

### 5. Footer
- Links y contacto
- Disclaimer

## Requisitos de Semántica HTML

Todas las secciones utilizan etiquetas semánticas estrictas:
- `<main>` para contenido principal
- `<section>` para secciones temáticas
- `<article>` para contenido independiente
- `<header>` y `<footer>` para encabezados y pies
- `<aside>` para contenido complementario
- `<pre>` y `<code>` para bloques de código

Esto permite que LLMs y parsers de IA extraigan información sin esfuerzo.

## Desarrollo

```bash
# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## Protocolo MPP (Machine Payments Protocol)

El endpoint de pago espera:
- **Método**: POST
- **Header**: Authorization: Bearer <TU_AGENT_TOKEN>
- **Content-Type**: application/json
- **Body**: { "mpp_payment_intent": true }

**Respuesta esperada**: HTTP 402 Payment Required con header `Payment-Required: mpp://payment-endpoint`

## Licencia

MIT

## Autor

DevRacingRBR Team
