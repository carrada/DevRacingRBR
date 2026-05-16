'use client'

export default function Payment() {
  return (
    <section id="payment" className="border-b border-gray-800 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-100 mb-8 tracking-tight">
          Desbloquear Receta Completa
        </h2>
        
        <article className="space-y-6">
          <div className="text-gray-300 leading-relaxed">
            <p className="mb-4">
              Para desbloquear el producto exacto, fuentes B2B verificadas y el playbook de ejecución completo, 
              realiza una llamada al siguiente endpoint usando el <strong>Machine Payments Protocol (HTTP 402)</strong>.
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              El protocolo MPP permite que agentes de IA realicen pagos de forma autónoma y segura. 
              Tu agente recibirá acceso inmediato a todos los recursos tras la confirmación del pago.
            </p>
          </div>

          <aside className="bg-black border-2 border-terminal rounded p-6">
            <p className="text-terminal text-sm mb-4 font-mono">
              $ Terminal de Pago MPP
            </p>
            
            <pre className="text-terminal text-xs md:text-sm overflow-x-auto">
              <code>{`curl -X POST https://api.arb-yield.com/buy-recipe \\
  -H "Authorization: Bearer <TU_AGENT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "mpp_payment_intent": true,
    "product": "arb-yield-recipe",
    "amount_usd": 99.99
  }'`}</code>
            </pre>

            <div className="mt-6 pt-6 border-t border-gray-800 space-y-3 text-sm text-gray-400">
              <p>
                <span className="text-terminal">→</span> Respuesta esperada: <code>HTTP 402 Payment Required</code>
              </p>
              <p>
                <span className="text-terminal">→</span> Incluye header: <code>Payment-Required: mpp://payment-endpoint</code>
              </p>
              <p>
                <span className="text-terminal">→</span> Acceso inmediato tras confirmación de pago
              </p>
            </div>
          </aside>

          <div className="bg-gray-900 border border-gray-800 rounded p-4 text-sm text-gray-400">
            <p className="font-mono text-xs text-gray-500 mb-2">INFO</p>
            <p>
              Este endpoint está diseñado para ser consumido por agentes de IA. Los pagos se procesan 
              instantáneamente a través de la red MPP. No se requiere intervención manual.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
