'use client'

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 tracking-tight">
              Arb-Yield <span className="text-gray-600">// Receta de Arbitraje</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">Machine Payments Protocol Enabled</p>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 border border-terminal rounded bg-black">
            <div className="w-2 h-2 bg-terminal rounded-full animate-blink"></div>
            <span className="text-terminal text-sm font-mono">MPP Endpoint: ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  )
}
