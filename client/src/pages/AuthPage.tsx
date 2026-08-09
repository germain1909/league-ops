import { useState } from "react";
import type { SubmitEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type AuthMode = "login" | "signup";

function AuthPage() {
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    const { error } =
      mode === "login" ? await signIn(email, password) : await signUp(email, password);

    if (error) {
      setError(error);
    } else if (mode === "signup") {
      setMessage("Check your email to confirm your account.");
    }

    setSubmitting(false);
  }

  function toggleMode() {
    setMode((current) => (current === "login" ? "signup" : "login"));
    setError(null);
    setMessage(null);
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h1>LeagueOps</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && <p role="alert">{error}</p>}
        {message && <p>{message}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <button type="button" onClick={toggleMode}>
        {mode === "login" ? "Need an account? Sign Up" : "Have an account? Login"}
      </button>
    </div>
  );
}

export default AuthPage;
