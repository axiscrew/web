export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>
      <div>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          AXIS CREW IS LIVE
        </h1>
        <p style={{ opacity: 0.7 }}>
          A founding collective building a persistent world on a real Earth map.
        </p>
        <p style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.5 }}>
          Phase 0: Globe + Login + Genesis Vote
        </p>
        <div style={{ marginTop: "2rem" }}>
          <a
            href="/charter"
            style={{
              padding: "12px 24px",
              background: "white",
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "6px"
            }}
          >
            Read the Genesis Charter
          </a>
          <a
            href="/login"
            style={{
              padding: "12px 24px",
              border: "1px solid white",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "6px",
              marginLeft: "12px"
            }}
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}