export default function Metrics() {
  const metrics = [
    {
      label: 'Industria',
      value: 'Edge Computing / Hardware',
    },
    {
      label: 'Inversión Requerida',
      value: '$50 - $150 USD',
    },
    {
      label: 'Margen Neto Estimado',
      value: '40% - 60%',
    },
    {
      label: 'Tiempo de Ejecución',
      value: '5-7 días',
    },
    {
      label: 'Dificultad',
      value: 'Baja (Logística estándar)',
    },
    {
      label: 'Verificación',
      value: 'Completada ✓',
    },
  ]

  return (
    <section id="metrics" className="border-b border-gray-800 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-100 mb-8 tracking-tight">
          Métricas Públicas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <article 
              key={idx}
              className="border border-gray-800 bg-black p-6 hover:border-terminal transition-colors"
            >
              <header>
                <h3 className="text-gray-500 text-sm font-mono uppercase tracking-wider mb-2">
                  {metric.label}
                </h3>
              </header>
              <p className="text-terminal text-lg font-bold">
                {metric.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
