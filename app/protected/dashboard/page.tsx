import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();  // Vérifie si l'utilisateur est authentifié

  if (!session) {
    redirect("/");  // Redirige vers la page d'acceuil si l'utilisateur n'est pas authentifié
  }

  return (
    <div>
      <h1>Bienvenue sur votre tableau de bord</h1>
    </div>
  );
}
