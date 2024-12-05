"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Chargement...</div>
  }

  if (session) {
    return (
      <div>
        Connecté en tant que {session.user?.email}
        <button onClick={() => signOut()}>Se déconnecter</button>
      </div>
    )
  }

  return <button onClick={() => signIn("google")}>Se connecter avec Google</button>
}