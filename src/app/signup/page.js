"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const supabase = supabaseClient();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const signup = () => {
    supabase.auth.signUp({
      email: email,
      password: password,
    });
    alert("success");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500">Sign up to get started.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <button
          onClick={signup}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-sm"
        >
          Sign Up
        </button>

        <div className="text-center text-sm text-slate-500 pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
