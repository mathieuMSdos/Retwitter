// app/(protected)/layout.tsx
'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    }
    

  })



  if (status === "loading") {
    return <div>Chargement...</div>
  }

  return <>{children}</>
}