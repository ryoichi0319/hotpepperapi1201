import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getAuthSession } from '@/lib/nextauth'
import AuthProvider from '@/components/providers/AuthProviders'
import TrpcProvider from '@/components/providers/TrpcProviders'
import ToastProvider from '@/components/providers/ToastProviders'
import Navigation from '@/components/auth/Navigation'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'hotpepper-search',
  description: 'hotpepper-api-search',
}
interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children}:RootLayoutProps ){
  const user = await getAuthSession()
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className='flex  min-h-screen flex-col '>
          <AuthProvider>
            <TrpcProvider>
              <div className=' container max-w-full mx-auto px-2'>
          <Navigation  user={user}/>
          </div>
          <ToastProvider />
          <main  className='  container max-w-full mx-auto flex-1 px-2 h-14 '>
        {children}
        </main>

       

        <footer className=' '>
        <div className=' justify-end flex mr-5 '>
            <a  
            href="http://webservice.recruit.co.jp/">
              <Image
              
                src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif"
                alt="ホットペッパーグルメ Webサービス"
                width="135"
                height="17"
                title="ホットペッパーグルメ Webサービス"
              />
            </a>
          </div>
          <div className=' text-center text-sm'>
            Copyright ©︎ All rights reserved | {" "}
            <a 
                href='/'
                      target=' _blank'
                      rel=' noopener noreferrer'
                       className=' underline'>
                      RyoHotPepperSearch

            </a>

          </div>
        </footer>
        </TrpcProvider>
        </AuthProvider>
        </div>

        </body>
      
    </html>
  )
}
