import '@styles/globals.css'

export const metadata = {
  title: 'PrompDescubrir',
  description: 'Descubre y Comparte Consignas de IA Efectivas.',
}
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
