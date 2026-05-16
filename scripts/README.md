# AI Buyer Agent Simulator

Script de simulación end-to-end del protocolo Machine Payments Protocol (HTTP 402) para pruebas de automatización QA.

## Descripción

El script `simulate-agent.js` actúa como un Agente de IA Comprador autónomo que ejecuta el flujo completo del protocolo MPP:

1. **Intento 1 (Sin Pago)**: Envía una solicitud POST sin token de autenticación
2. **Captura HTTP 402**: Valida que el servidor responda con status 402 Payment Required
3. **Extracción de Datos**: Obtiene la URL de pago y el precio de la respuesta
4. **Simulación de Pago**: Espera 1.5 segundos (simulando procesamiento de pago en red MPP)
5. **Generación de Token**: Crea un token de autenticación mockeado
6. **Intento 2 (Con Pago)**: Reintenta la solicitud con el token en el header `Authorization`
7. **Validación HTTP 200**: Verifica que la respuesta sea 200 OK con la receta desbloqueada
8. **Resumen de Éxito**: Muestra los primeros 200 caracteres de la receta en la consola

## Requisitos

- **Node.js**: v18.0.0 o superior (recomendado v24.3.0+)
- **Servidor Local**: El endpoint debe estar disponible en `http://localhost:3000/api/buy-recipe`

## Instalación

No requiere dependencias externas. El script utiliza `fetch` nativo de Node.js.

## Uso

### Ejecución básica

```bash
node scripts/simulate-agent.js
```

### Ejecución con permisos ejecutables

```bash
chmod +x scripts/simulate-agent.js
./scripts/simulate-agent.js
```

## Flujo de Ejecución

```
┌─────────────────────────────────────────────────────────────┐
│ SIMULADOR DE AGENTE DE IA COMPRADOR - PROTOCOLO MPP        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ INTENTO 1: Sin Pago │
                  └─────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │  HTTP 402 Recibido  │
                  │ Extrae URL y Precio │
                  └─────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ Simula Pago (1.5s)  │
                  │ Genera Token MPP    │
                  └─────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ INTENTO 2: Con Pago │
                  │ Header Authorization│
                  └─────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │  HTTP 200 Recibido  │
                  │ Receta Desbloqueada │
                  └─────────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │ Resumen de Éxito    │
                  │ Vista Previa Receta │
                  └─────────────────────┘
```

## Salida Esperada

```
======================================================================
SIMULADOR DE AGENTE DE IA COMPRADOR - PROTOCOLO MPP (HTTP 402)
======================================================================

[22:15:30] 🤖 [AGENTE]: Iniciando prueba end-to-end del protocolo Machine Payments...
[22:15:30] 🤖 [AGENTE]: Endpoint: http://localhost:3000/api/buy-recipe

======================================================================
INTENTO 1: Solicitud sin Pago
======================================================================

[22:15:30] 🤖 [AGENTE]: Enviando POST a http://localhost:3000/api/buy-recipe...
[22:15:30] 🤖 [AGENTE]: Respuesta recibida: HTTP 402
[22:15:30] 🤖 [AGENTE]: ✓ Status 402 detectado. Pago requerido.
[22:15:30] 🤖 [AGENTE]: Extrayendo URL de pago y precio...
[22:15:30] 🤖 [AGENTE]: Producto: arb-yield-recipe
[22:15:30] 🤖 [AGENTE]: Precio: $99.99 USD
[22:15:30] 🤖 [AGENTE]: URL de pago: https://pay.mpp.dev/checkout?product=arb-yield-recipe&amount=99.99

======================================================================
INTENTO 2: Solicitud con Pago
======================================================================

[22:15:32] 🤖 [AGENTE]: Enviando POST con token de autenticación...
[22:15:32] 🤖 [AGENTE]: Authorization: Bearer mpp_auth_token_success_2026
[22:15:32] 🤖 [AGENTE]: Respuesta recibida: HTTP 200
[22:15:32] 🤖 [AGENTE]: ✓ HTTP 200 OK - Pago verificado
[22:15:32] 🤖 [AGENTE]: Mensaje: Payment verified. Recipe unlocked.

======================================================================
✓ FLUJO COMPLETADO EXITOSAMENTE
======================================================================

[22:15:32] 🤖 [AGENTE]: Producto: arb-yield-recipe
[22:15:32] 🤖 [AGENTE]: Versión: 1.0
[22:15:32] 🤖 [AGENTE]: Estado: success
[22:15:32] 🤖 [AGENTE]: Tamaño de receta: 3847 bytes
[22:15:32] 🤖 [AGENTE]: Checksum: a1b2c3d4
[22:15:32] 🤖 [AGENTE]: Timestamp: 2026-05-16T22:15:32.123Z
[22:15:32] 🤖 [AGENTE]: Expira en: 2026-06-15T22:15:32.123Z
[22:15:32] 🤖 [AGENTE]: Token de acceso: mpp_1715900132123_abc123def456

--- VISTA PREVIA DE RECETA (primeros 200 caracteres) ---
# Arb-Yield: Hardware B2B to D2C Arbitrage Recipe

## Executive Summary
This recipe outlines a verified arbitrage opportunity in the edge computing hardware market.
Buy from B2B suppliers at wholesale prices and distribute directly to consumers (D2C) with 40-60% margins.
--- FIN DE VISTA PREVIA ---

[22:15:32] 🤖 [AGENTE]: 🎉 Agente completó el flujo MPP exitosamente
```

## Configuración

Puedes modificar los parámetros en la sección `CONFIG` del script:

```javascript
const CONFIG = {
  BASE_URL: 'http://localhost:3000',           // URL base del servidor
  ENDPOINT: '/api/buy-recipe',                 // Endpoint a probar
  PAYMENT_SIMULATION_DELAY: 1500,              // Delay de simulación de pago (ms)
  RECIPE_PREVIEW_LENGTH: 200,                  // Caracteres de vista previa
};
```

## Validaciones Implementadas

✓ Valida que el status HTTP 402 se reciba en el primer intento  
✓ Extrae correctamente `mpp_payment_url` y `price` de la respuesta 402  
✓ Genera un token de autenticación válido  
✓ Valida que el status HTTP 200 se reciba en el segundo intento  
✓ Extrae correctamente los datos de la receta  
✓ Muestra un resumen completo con metadatos  
✓ Manejo robusto de errores con mensajes descriptivos  

## Colores en Terminal

El script utiliza códigos ANSI para colorear la salida:

- 🔵 **AZUL**: Información de solicitudes HTTP
- 🟢 **VERDE**: Operaciones exitosas
- 🟡 **AMARILLO**: Advertencias y simulaciones
- 🔴 **ROJO**: Errores
- 🟣 **MAGENTA**: Vista previa de receta
- ⚪ **GRIS**: Información detallada (DIM)

## Troubleshooting

### Error: "Cannot find module 'fetch'"
- Asegúrate de usar Node.js v18.0.0 o superior
- Verifica con: `node --version`

### Error: "Connection refused"
- Verifica que el servidor esté corriendo en `http://localhost:3000`
- Inicia el servidor con: `npm run dev`

### Error: "Invalid JSON response"
- Verifica que el endpoint `/api/buy-recipe` esté correctamente implementado
- Revisa los logs del servidor para más detalles

## Casos de Uso

- ✅ Pruebas end-to-end del protocolo MPP
- ✅ Validación de implementación HTTP 402
- ✅ Simulación de agentes de IA autónomos
- ✅ Integración continua (CI/CD)
- ✅ Demostración de flujo de pago máquina-a-máquina

## Licencia

Parte del proyecto DevRacingRBR - Hackathon 2026
