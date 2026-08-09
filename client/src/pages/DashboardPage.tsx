import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getHealth } from "../services/health.service";

interface HealthStatus {
  status: string;
  service: string;
  timestamp: string;
  uptime: number;
}

function DashboardPage() {
  const { user, signOut } = useAuth();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await getHealth();
        setHealth(data);
        setApiOnline(true);
      } catch (error) {
        console.error(error);
        setApiOnline(false);
      }
    }

    loadHealth();
  }, []);

  return (
    <div>
      <h1>LeagueOps Dashboard</h1>
      <p>Signed in as {user?.email}</p>
      <button type="button" onClick={signOut}>
        Logout
      </button>

      <h2>API Status</h2>
      {apiOnline === null && <p>Checking...</p>}
      {apiOnline === true && <p>LeagueOps API is online</p>}
      {apiOnline === false && <p>LeagueOps API is offline</p>}
      {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
    </div>
  );
}

export default DashboardPage;
