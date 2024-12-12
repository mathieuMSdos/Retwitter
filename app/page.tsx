import { signIn } from "@/auth"

export default function Home() {
  return (
    <div>
      <form
        action={async () => {
          "use server"
          await signIn("google", {
            redirectTo: "/protected/dashboard",
            redirect: true
          })
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  )
}