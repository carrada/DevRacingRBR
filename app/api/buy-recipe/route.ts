import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * CORS Headers Configuration
 * Allows agents from any origin to make requests to this API
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-mpp-token',
}

/**
 * Load Profit Recipe from file system
 * Compatible with Vercel serverless environment using process.cwd()
 */
function loadProfitRecipe(): string {
  try {
    const filePath = join(process.cwd(), 'data', 'profit-recipe.md')
    const content = readFileSync(filePath, 'utf-8')
    return content
  } catch (error) {
    console.error('[MPP API] Failed to load profit recipe:', error)
    // Fallback to embedded recipe if file read fails
    return `# Receta: Raspberry Pi 5 (4GB) Hardware Arbitrage

## Arbitraje Retail B2B/Especializado → MercadoLibre D2C
> **Documento creado**: 2026-05-16
> **Para**: Cris / Agentes de IA (capital $250-500 USD, vendedor MX)
> **Producto**: Raspberry Pi 5 (4GB RAM) - Placa de desarrollo / Edge AI

---

## TL;DR (lee esto primero)

| Concepto | Valor |
|---|---|
| **Inversión inicial recomendada** | $276 USD (~$4,700 MXN) por 3 unidades |
| **Profit realista por batch de 3u** | $80 - $90 USD netos |
| **Profit optimista (sell-through 100% + Q4 demand)** | $120 USD netos |
| **ROI esperado** | 28% - 43% sobre capital invertido (rotación rápida) |
| **Tiempo: orden a primera venta** | 5-7 días (envío nacional) |
| **Tiempo: ciclo completo del batch** | 10-15 días |
| **Riesgo** | Muy Bajo — Hardware estandarizado, sin riesgo de aduanas, demanda inelástica en CS/Devs |
| **Ventana de oportunidad** | Perenne. Picos en inicio de semestres universitarios y boom de IA local. |

⚠️ **Aviso importante**: La asimetría de precios no se basa en traer barato de China, sino en un "Distribution Gap" geográfico.`
  }
}

/**
 * Profit Recipe: Hardware B2B to D2C Arbitrage
 *
 * This Markdown document contains the complete arbitrage strategy,
 * including supplier sources, pricing analysis, logistics, and execution timeline.
 * Designed for AI agents to execute autonomous arbitrage operations.
 */
const PROFIT_RECIPE_MARKDOWN = loadProfitRecipe()


/**
 * POST /api/buy-recipe
 * 
 * Machine Payments Protocol (HTTP 402) Implementation
 * 
 * Flow:
 * 1. Client sends POST request with optional payment token
 * 2. If no valid payment token → Return 402 Payment Required with payment instructions
 * 3. If valid payment token → Return 200 OK with recipe Markdown payload
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract headers from incoming request with null coalescing
    const authHeader = request.headers.get('authorization') || ''
    const mppToken = request.headers.get('x-mpp-token') || ''

    // Parse request body with strict validation
    let requestBody: Record<string, unknown> = {}
    try {
      const contentType = request.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        try {
          requestBody = await request.json()
        } catch (parseError) {
          // JSON malformado con Content-Type: application/json
          return NextResponse.json(
            {
              error: 'Bad Request',
              message: 'Invalid JSON in request body',
              details: parseError instanceof Error ? parseError.message : 'Unknown parse error',
              status: 'failed',
            },
            { status: 400, headers: CORS_HEADERS }
          )
        }
      }
    } catch (error) {
      // Fallback para errores inesperados en parsing
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Failed to parse request',
          status: 'failed',
        },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    /**
     * VALIDATION LOGIC: Check for valid payment token
     *
     * For hackathon purposes, we accept:
     * - Authorization header with "Bearer " prefix (minimum 7 chars after Bearer)
     * - Non-empty x-mpp-token header
     * - mpp_payment_intent: true in request body
     */
    const hasValidPaymentToken =
      (authHeader.trim().startsWith('Bearer ') && authHeader.trim().length > 7) ||
      (mppToken.trim().length > 0) ||
      (requestBody.mpp_payment_intent === true)

    // CAMINO A: No Payment Token → Return HTTP 402 Payment Required
    if (!hasValidPaymentToken) {
      return NextResponse.json(
        {
          error: 'Payment Required',
          message: 'This resource requires payment via Machine Payments Protocol (HTTP 402)',
          price: '1.00',
          price_description: 'One-time access to complete arbitrage recipe and playbook',
          price_unit: 'USD per access',
          currency: 'USD',
          product: 'arb-yield-recipe',
          mpp_payment_url: 'https://pay.mpp.dev/checkout?product=arb-yield-recipe&amount=1.00',
          payment_instructions: {
            method: 'POST',
            endpoint: 'https://api.arb-yield.com/buy-recipe',
            headers: {
              'Authorization': 'Bearer <YOUR_AGENT_TOKEN>',
              'Content-Type': 'application/json',
              'x-mpp-token': '<OPTIONAL_MPP_TOKEN>',
            },
            body: {
              mpp_payment_intent: true,
            },
          },
          retry_after: 3600,
          status: 'payment_required',
        },
        { status: 402, headers: CORS_HEADERS }
      )
    }

    // CAMINO B: Valid Payment Token → Return HTTP 200 OK with Recipe
    return NextResponse.json(
      {
        status: 'success',
        message: 'Payment verified. Recipe unlocked.',
        product: 'arb-yield-recipe',
        version: '1.0',
        data: PROFIT_RECIPE_MARKDOWN,
        metadata: {
          format: 'markdown',
          size_bytes: PROFIT_RECIPE_MARKDOWN.length,
          checksum: generateChecksum(PROFIT_RECIPE_MARKDOWN),
          checksum_algorithm: 'sha256',
          timestamp: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        },
        access_token: generateAccessToken(),
      },
      { status: 200, headers: CORS_HEADERS }
    )
  } catch (error) {
    // Error handling: Log and return 500 Internal Server Error
    console.error('[MPP API Error]', error)

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while processing your request',
        status: 'failed',
      },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}

/**
 * OPTIONS /api/buy-recipe
 *
 * Handles CORS preflight requests
 * Returns 200 OK with CORS headers to allow cross-origin requests
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  })
}

/**
 * Utility: Generate SHA-256 checksum for the recipe
 * Used for integrity verification by the client
 */
function generateChecksum(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

/**
 * Utility: Generate a mock access token for the client
 * In production, this would be a JWT or similar secure token
 */
function generateAccessToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `mpp_${timestamp}_${random}`
}
