import { Figtree } from 'next/font/google'

import getSongsByUserId from '@/actions/getSongsByUserId'
import Sidebar from '@/components/Sidebar'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'
import './globals.css'

const figtree = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone!',
  description: 'Listen to music!',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body className={`${figtree.className} selection:bg-[#78FEE0]  selection:text-gray-800`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
