export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", background: "black", color: "white", padding: "2rem" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <a href="/" style={{ color: "white", opacity: 0.7, textDecoration: "none" }}>
          Back
        </a>

        <h1 style={{ fontSize: "2rem", marginTop: "1rem" }}>Login</h1>
        <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>
          Phase 0: account system is being built.
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ display: "block", marginTop: "0.75rem", opacity: 0.8 }}>Email</label>
          <input
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
            placeholder="••••••••"
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
            style={{
              marginTop: "1rem",
              padding: "12px 16px",
              width: "100%",
              borderRadius: 6,
              background: "white",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}