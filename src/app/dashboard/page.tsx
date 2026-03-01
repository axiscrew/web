"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    setEmail(data.user.email ?? "");
    setLoading(false);
  }

  load();
}, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main style={{ minHeight: "100vh", background: "black", color: "white", padding: "2rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <a href="/" style={{ color: "white", opacity: 0.7, textDecoration: "none" }}>
          Back
        </a>

        <h1 style={{ fontSize: "2.5rem", marginTop: "1rem" }}>Dashboard</h1>

        {loading ? (
          <p style={{ opacity: 0.7, marginTop: "1rem" }}>Loading...</p>
        ) : email ? (
          <p style={{ opacity: 0.85, marginTop: "1rem" }}>
            Signed in as: <strong>{email}</strong>
          </p>
        ) : (
          <p style={{ opacity: 0.85, marginTop: "1rem" }}>
            Not signed in. <a href="/login" style={{ color: "white" }}>Go to login</a>
          </p>
        )}

        <a
          href="/vote"
          style={{
            display: "inline-block",
            margin: "2rem",
            padding: "12px 16px",
            borderRadius: 6,
            background: "white",
            color: "black",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Cast Genesis Vote
        </a>

        <button
          onClick={logout}
          style={{
            margin: "2rem",
            padding: "12px 16px",
            borderRadius: 6,
            background: "white",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}