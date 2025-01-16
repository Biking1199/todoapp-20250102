import { User } from "@supabase/supabase-js";
import React, { useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
};
