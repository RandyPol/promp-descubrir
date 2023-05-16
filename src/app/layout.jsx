import '@styles/globals.css'

import Nav from '@components/Nav'
import Footer from '@components/Footer'
import Provider from '@components/Provider'

export const metadata = {
  title: 'PrompDescubrir',
  description: 'Descubre y Comparte Consignas de IA Efectivas.',
}
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
