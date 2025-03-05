import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 180,
  height: 180,
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
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-touch-icon-yRGhJDPwtrFOB8Tcin9qPW5Wbp6bWB.png"
        alt="Ripple Apple Icon"
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

