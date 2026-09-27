"use client";

const { supabaseClient } = require("@/lib/supabase/client");
const { useState } = require("react");

const Login = () => {
  const supabase = supabaseClient();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = () => {
    supabase.auth.signInWithPassword({
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
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
