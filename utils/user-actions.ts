import { AuthContextType } from "@/providers/AuthProvider"

export function isLoggedIn(authState: AuthContextType) {
  return authState.user !== null
}
