import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f8fafc",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg width="154" height="154" viewBox="0 0 256 256">
          <path d="M128 8 232 44v92c0 61-42 96-104 120C66 232 24 197 24 136V44Z" fill="#082b59" />
          <path d="M82 112c0-22 18-40 40-40 16 0 30 9 36 23 5-3 11-5 17-5 19 0 34 15 34 34s-15 34-34 34H88c-21 0-38-16-38-37 0-18 14-34 32-36Z" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <g fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round">
            <path d="M95 157v48" />
            <path d="M128 157v67" />
            <path d="M162 157v48" />
          </g>
          <g fill="#082b59" stroke="#fff" strokeWidth="8">
            <circle cx="95" cy="153" r="10" />
            <circle cx="128" cy="153" r="10" />
            <circle cx="162" cy="153" r="10" />
            <circle cx="95" cy="210" r="10" />
            <circle cx="128" cy="229" r="10" />
            <circle cx="162" cy="210" r="10" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
