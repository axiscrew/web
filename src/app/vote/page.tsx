"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VotePage() {
  const [loading, setLoading] = useState(true);
  const [existingVote, setExistingVote] = useState<"NS" | "EW" | null>(null);
  const [msg, setMsg] = useState("");
  const [nsCount, setNsCount] = useState(0);
  const [ewCount, setEwCount] = useState(0);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: totals } = await supabase.rpc("get_genesis_vote_totals");

      if (totals && totals.length > 0) {
        setNsCount(totals[0].ns_count);
        setEwCount(totals[0].ew_count);
      }

      const { data: voteRow } = await supabase
        .from("genesis_votes")
        .select("axis")
        .eq("user_id", user.id)
        .maybeSingle();

      if (voteRow?.axis === "NS" || voteRow?.axis === "EW") {
        setExistingVote(voteRow.axis);
      }

      setLoading(false);
    }

    load();
  }, []);

  async function castVote(axis: "NS" | "EW") {
    setMsg("");

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase.from("genesis_votes").insert({
      user_id: user.id,
      axis,
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    setExistingVote(axis);
    setMsg("Vote recorded.");
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "black", color: "white", padding: "2rem" }}>
        <p style={{ opacity: 0.7 }}>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "black", color: "white", padding: "2rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <a href="/dashboard" style={{ color: "white", opacity: 0.7, textDecoration: "none" }}>
          Back
        </a>

        <h1 style={{ fontSize: "2.5rem", marginTop: "1rem" }}>Genesis Vote</h1>
        <p style={{ opacity: 0.75, marginTop: "0.5rem" }}>
          First decision: split the world North/South or East/West. One account, one vote.
        </p>

        {existingVote ? (
          <div style={{ marginTop: "2rem" }}>
            <p style={{ opacity: 0.9 }}>
              Your vote:{" "}
              <strong>{existingVote === "NS" ? "North / South" : "East / West"}</strong>
            </p>
            <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>Locked.</p>
          </div>
        ) : (
          <div style={{ marginTop: "2rem", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => castVote("NS")}
              style={{
                padding: "12px 16px",
                borderRadius: 6,
                background: "white",
                color: "black",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              North / South
            </button>

            <button
              onClick={() => castVote("EW")}
              style={{
                padding: "12px 16px",
                borderRadius: 6,
                border: "1px solid white",
                background: "transparent",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              East / West
            </button>
          </div>
        )}

        {msg ? <p style={{ marginTop: "1rem", opacity: 0.8 }}>{msg}</p> : null}
        <div style={{ marginTop: "2rem", opacity: 0.85 }}>
            <h3>Current Totals</h3>
            <p>North / South: {nsCount}</p>
            <p>East / West: {ewCount}</p>
        </div>
      </div>
    </main>
  );
}