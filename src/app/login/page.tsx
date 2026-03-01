"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    if (!email || !password) {
      setMsg("Enter email and password.");
      return;
    }
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } =
        mode === "signup"
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMsg(error.message);
        return;
      }

      if (mode === "signup") {
        setMsg("Account created. Check email if confirmation is required.");
      } else {
        setMsg("Signed in.");
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error(err);
      setMsg(err?.message || "Unexpected error. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "black", color: "white", padding: "2rem" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <a href="/" style={{ color: "white", opacity: 0.7, textDecoration: "none" }}>
          Back
        </a>

        <h1 style={{ fontSize: "2rem", marginTop: "1rem" }}>Login</h1>
        <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>
          Create an account to join Phase 0.
        </p>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => setMode("signup")}
            style={{
              padding: "10px 14px",
              background: mode === "signup" ? "white" : "transparent",
              color: mode === "signup" ? "black" : "white",
              border: "1px solid white",
              borderRadius: 6,
              cursor: "pointer",
              flex: 1,
            }}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{
              padding: "10px 14px",
              background: mode === "login" ? "white" : "transparent",
              color: mode === "login" ? "black" : "white",
              border: "1px solid white",
              borderRadius: 6,
              cursor: "pointer",
              flex: 1,
            }}
          >
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <label style={{ display: "block", marginTop: "0.75rem", opacity: 0.8 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #444",
              background: "#111",
              color: "white",
            }}
          />

          <label style={{ display: "block", marginTop: "0.75rem", opacity: 0.8 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="minimum 6 characters"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #444",
              background: "#111",
              color: "white",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "1rem",
              padding: "12px 16px",
              width: "100%",
              borderRadius: 6,
              background: loading ? "#999" : "white",
              color: "black",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Working..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>

          {msg ? <p style={{ marginTop: "1rem", opacity: 0.8 }}>{msg}</p> : null}
        </form>
      </div>
    </main>
  );
}