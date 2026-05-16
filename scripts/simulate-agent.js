#!/usr/bin/env node

/**
 * AI Buyer Agent Simulator - Machine Payments Protocol (HTTP 402) E2E Test
 * 
 * This script simulates an autonomous AI agent executing the MPP protocol flow:
 * 1. Initial request without payment (HTTP 402 response expected)
 * 2. Payment simulation and token generation
 * 3. Retry with payment token (HTTP 200 response expected)
 * 4. Recipe extraction and validation
 */

// ANSI Color codes for terminal output
const COLORS = {
  RESET: '\x1b[0m',
  BRIGHT: '\x1b[1m',
  DIM: '\x1b[2m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  CYAN: '\x1b[36m',
};

// Configuration
const CONFIG = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINT: '/api/buy-recipe',
  PAYMENT_SIMULATION_DELAY: 1500, // 1.5 seconds
  RECIPE_PREVIEW_LENGTH: 200,
};

/**
 * Log with timestamp and agent prefix
 */
function log(message, color = COLORS.RESET) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  console.log(`${color}[${timestamp}] 🤖 [AGENTE]: ${message}${COLORS.RESET}`);
}

/**
 * Log section header
 */
function logSection(title) {
  console.log(`\n${COLORS.BRIGHT}${COLORS.CYAN}${'='.repeat(70)}${COLORS.RESET}`);
  console.log(`${COLORS.BRIGHT}${COLORS.CYAN}${title}${COLORS.RESET}`);
  console.log(`${COLORS.BRIGHT}${COLORS.CYAN}${'='.repeat(70)}${COLORS.RESET}\n`);
}

/**
 * Simulate payment processing
 * Returns a mocked MPP auth token
 */
async function simulatePayment(paymentUrl, price) {
  log(`Iniciando simulación de pago...`, COLORS.YELLOW);
  log(`URL de pago: ${paymentUrl}`, COLORS.DIM);
  log(`Precio: $${price} USD`, COLORS.YELLOW);
  log(`Procesando transacción en red MPP...`, COLORS.YELLOW);

  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, CONFIG.PAYMENT_SIMULATION_DELAY));

  // Generate mocked MPP auth token
  const token = `mpp_auth_token_success_${new Date().getFullYear()}`;
  log(`✓ Pago procesado exitosamente`, COLORS.GREEN);
  log(`Token de autenticación generado: ${token}`, COLORS.GREEN);

  return token;
}

/**
 * Attempt 1: Request without payment token
 * Expected: HTTP 402 Payment Required
 */
async function attemptWithoutPayment() {
  logSection('INTENTO 1: Solicitud sin Pago');

  try {
    log(`Enviando POST a ${CONFIG.BASE_URL}${CONFIG.ENDPOINT}...`, COLORS.BLUE);

    const response = await fetch(`${CONFIG.BASE_URL}${CONFIG.ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    log(`Respuesta recibida: HTTP ${response.status}`, COLORS.BLUE);

    // Validate HTTP 402
    if (response.status !== 402) {
      log(
        `❌ ERROR: Se esperaba HTTP 402, pero se recibió HTTP ${response.status}`,
        COLORS.RED
      );
      return null;
    }

    log(`✓ Status 402 detectado. Pago requerido.`, COLORS.GREEN);
    log(`Extrayendo URL de pago y precio...`, COLORS.YELLOW);

    // Extract payment details
    const paymentUrl = data.mpp_payment_url;
    const price = data.price;
    const currency = data.currency;

    if (!paymentUrl || !price) {
      log(`❌ ERROR: Datos de pago incompletos en respuesta`, COLORS.RED);
      return null;
    }

    log(`Producto: ${data.product}`, COLORS.DIM);
    log(`Precio: $${price} ${currency}`, COLORS.YELLOW);
    log(`URL de pago: ${paymentUrl}`, COLORS.DIM);

    return {
      paymentUrl,
      price,
      currency,
    };
  } catch (error) {
    log(`❌ ERROR en Intento 1: ${error.message}`, COLORS.RED);
    return null;
  }
}

/**
 * Attempt 2: Request with payment token
 * Expected: HTTP 200 OK with recipe data
 */
async function attemptWithPayment(authToken) {
  logSection('INTENTO 2: Solicitud con Pago');

  try {
    log(`Enviando POST con token de autenticación...`, COLORS.BLUE);
    log(`Authorization: Bearer ${authToken}`, COLORS.DIM);

    const response = await fetch(`${CONFIG.BASE_URL}${CONFIG.ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    log(`Respuesta recibida: HTTP ${response.status}`, COLORS.BLUE);

    // Validate HTTP 200
    if (response.status !== 200) {
      log(
        `❌ ERROR: Se esperaba HTTP 200, pero se recibió HTTP ${response.status}`,
        COLORS.RED
      );
      return null;
    }

    log(`✓ HTTP 200 OK - Pago verificado`, COLORS.GREEN);
    log(`Mensaje: ${data.message}`, COLORS.GREEN);

    // Extract recipe data
    const recipe = data.data;
    if (!recipe) {
      log(`❌ ERROR: Datos de receta no encontrados en respuesta`, COLORS.RED);
      return null;
    }

    return {
      status: data.status,
      message: data.message,
      product: data.product,
      version: data.version,
      recipe: recipe,
      metadata: data.metadata,
      accessToken: data.access_token,
    };
  } catch (error) {
    log(`❌ ERROR en Intento 2: ${error.message}`, COLORS.RED);
    return null;
  }
}

/**
 * Display success summary with recipe preview
 */
function displaySuccessSummary(recipeData) {
  logSection('✓ FLUJO COMPLETADO EXITOSAMENTE');

  log(`Producto: ${recipeData.product}`, COLORS.GREEN);
  log(`Versión: ${recipeData.version}`, COLORS.GREEN);
  log(`Estado: ${recipeData.status}`, COLORS.GREEN);

  if (recipeData.metadata) {
    log(`Tamaño de receta: ${recipeData.metadata.size_bytes} bytes`, COLORS.DIM);
    log(`Checksum: ${recipeData.metadata.checksum}`, COLORS.DIM);
    log(`Timestamp: ${recipeData.metadata.timestamp}`, COLORS.DIM);
    log(`Expira en: ${recipeData.metadata.expires_at}`, COLORS.DIM);
  }

  log(`Token de acceso: ${recipeData.accessToken}`, COLORS.DIM);

  // Display recipe preview
  console.log(`\n${COLORS.BRIGHT}${COLORS.MAGENTA}--- VISTA PREVIA DE RECETA (primeros ${CONFIG.RECIPE_PREVIEW_LENGTH} caracteres) ---${COLORS.RESET}`);
  console.log(`${COLORS.MAGENTA}${recipeData.recipe.substring(0, CONFIG.RECIPE_PREVIEW_LENGTH)}...${COLORS.RESET}`);
  console.log(`${COLORS.MAGENTA}--- FIN DE VISTA PREVIA ---${COLORS.RESET}\n`);

  log(`🎉 Agente completó el flujo MPP exitosamente`, COLORS.GREEN);
}

/**
 * Main execution flow
 */
async function main() {
  console.clear();
  logSection('SIMULADOR DE AGENTE DE IA COMPRADOR - PROTOCOLO MPP (HTTP 402)');

  log(`Iniciando prueba end-to-end del protocolo Machine Payments...`, COLORS.CYAN);
  log(`Endpoint: ${CONFIG.BASE_URL}${CONFIG.ENDPOINT}`, COLORS.DIM);

  // Step 1: Attempt without payment
  const paymentDetails = await attemptWithoutPayment();
  if (!paymentDetails) {
    log(`Abortando: No se pudo obtener detalles de pago`, COLORS.RED);
    process.exit(1);
  }

  // Step 2: Simulate payment
  const authToken = await simulatePayment(paymentDetails.paymentUrl, paymentDetails.price);

  // Step 3: Attempt with payment
  const recipeData = await attemptWithPayment(authToken);
  if (!recipeData) {
    log(`Abortando: No se pudo obtener la receta`, COLORS.RED);
    process.exit(1);
  }

  // Step 4: Display success summary
  displaySuccessSummary(recipeData);

  logSection('PRUEBA COMPLETADA');
  log(`Todas las validaciones pasaron correctamente ✓`, COLORS.GREEN);
  process.exit(0);
}

// Execute main function
main().catch((error) => {
  log(`Error fatal: ${error.message}`, COLORS.RED);
  console.error(error);
  process.exit(1);
});
