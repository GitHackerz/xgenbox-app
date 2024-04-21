import { getSession } from "@/lib/auth";
import { useEffect, useState } from "react";
import { User } from "@/types/User";

export default function useSession() {
  const [userSession, setUserSession] = useState<User | null>(null);
  const [tokenSession, setTokenSession] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (!session) return;
      const { user, token } = session;
      setUserSession(user);
      setTokenSession(token);
    }
    fetchSession().then(() => setLoading(false));
  }, []);

  return { token: tokenSession, user: userSession, loading };
}
