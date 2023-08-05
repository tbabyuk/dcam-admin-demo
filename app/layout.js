import Header from './components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { FirebaseContextProvider } from './context/FirebaseContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DCAM Admin',
  description: 'Da Capo Academy of Music - Admin App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <FirebaseContextProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </FirebaseContextProvider>
    </html>
  )
}
