"use client";

const { supabaseClient } = require("@/lib/supabase/client");
const { useState } = require("react");

const signUp = () => {
  const supabase = supabaseClient();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signup = () => {
    supabase.auth.signUp({
      email: email,
      password: password,
    });
    alert("success");
  };
  return (
    <div>
      <input
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={signup}>Sign Up</button>
    </div>
  );
};

export default signUp;
