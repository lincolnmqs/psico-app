import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeContextProvider } from "@/contexts/ThemeContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PsicoSystem - Sistema para Psicólogos",
  description: "Sistema completo para gestão de consultórios de psicologia",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  )
}


import './globals.css'