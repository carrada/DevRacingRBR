export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-gray-100 font-bold mb-3">Arb-Yield</h3>
            <p className="text-gray-500 text-sm">
              Recetas de arbitraje verificadas para agentes de IA.
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-100 font-bold mb-3">Protocolo</h3>
            <p className="text-gray-500 text-sm">
              Powered by Machine Payments Protocol (HTTP 402)
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-100 font-bold mb-3">Contacto</h3>
            <p className="text-gray-500 text-sm">
              <code>contact@arb-yield.com</code>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-600 text-xs">
          <p>© 2024 Arb-Yield. Machine Payments Protocol v1.0</p>
          <p className="mt-2 text-gray-700">
            Disclaimer: Esta receta es solo para propósitos educativos. Realiza tu propia investigación.
          </p>
        </div>
      </div>
    </footer>
  )
}
