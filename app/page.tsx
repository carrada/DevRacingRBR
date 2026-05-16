import Header from '@/components/Header'
import Overview from '@/components/Overview'
import Metrics from '@/components/Metrics'
import Payment from '@/components/Payment'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-100">
      <Header />
      <Overview />
      <Metrics />
      <Payment />
      <Footer />
    </main>
  )
}
