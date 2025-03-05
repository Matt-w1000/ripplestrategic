import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#08132D",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
      }}
    >
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-32x32-6vD1u2X5Ump6ajsBlmwaKXCUNW4TCw.png"
        alt="Ripple Icon"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>,
    {
      ...size,
    },
  )
}

