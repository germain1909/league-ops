import { createContext } from "react";
import type { Session, User } from "@supabase/supabase-js";

export interface UseAuthResult {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<UseAuthResult | undefined>(undefined);


// shelf where auth info is stored and can be accessed by any component that needs it. 
// It provides a way to share the authentication state and methods across the 
// application without having to pass props down through multiple levels of components. 
// The context is created using React's createContext function, 
// and it defines the shape of the authentication state and methods 
// through the UseAuthResult interface.