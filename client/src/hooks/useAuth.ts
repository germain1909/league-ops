import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { UseAuthResult } from "../context/AuthContext";

export function useAuth(): UseAuthResult {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
