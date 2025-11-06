import { Geist } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const geist = Geist({ subsets: ["latin"] })



export const metadata = {
  title: "Jantrik", 
  description: "Jantrik Tools offers a wide range of high-quality mechanical and power tools — from saws, drills, and wrenches to construction and repair equipment. Built for durability and performance, our tools help professionals and DIY users get the job done efficiently..",
  generator: "Alaa haled",
  icons: {
    icon: "/logo2.jpg",        
    apple: "/logo2.jpg", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" > 
      <head>
      
      </head>
      <body className={`${geist.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}