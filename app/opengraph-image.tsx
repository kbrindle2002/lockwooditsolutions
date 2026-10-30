import { ImageResponse } from "next/og";

export const alt = "Lockwood IT Solutions — Managed IT for Small Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 84px",
          color: "white",
          background: "linear-gradient(135deg, #082b59 0%, #0d4d92 62%, #0ea5c6 120%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 28,
              border: "4px solid rgba(255,255,255,.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            LIT
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 1 }}>LOCKWOOD IT SOLUTIONS</div>
            <div style={{ marginTop: 8, fontSize: 22, color: "#cfe8ff" }}>Secure. Smart. Scalable.</div>
          </div>
        </div>
        <div style={{ marginTop: 58, maxWidth: 940, fontSize: 58, lineHeight: 1.08, fontWeight: 800 }}>
          Managed IT that keeps your business working—and your data protected.
        </div>
        <div style={{ marginTop: 30, fontSize: 24, color: "#dbeafe" }}>
          Founder-led managed IT • Microsoft 365 • Cybersecurity • Backup • Networks
        </div>
      </div>
    ),
    size,
  );
}
