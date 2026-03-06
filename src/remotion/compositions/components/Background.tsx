import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const orbX1 = 30 + Math.sin(time * 0.3) * 15;
  const orbY1 = 25 + Math.cos(time * 0.25) * 10;
  const orbX2 = 70 + Math.sin(time * 0.2 + 1) * 12;
  const orbY2 = 65 + Math.cos(time * 0.35 + 2) * 10;
  const orbX3 = 50 + Math.sin(time * 0.15 + 3) * 20;
  const orbY3 = 80 + Math.cos(time * 0.3 + 1) * 8;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "60%",
          left: `${orbX1}%`,
          top: `${orbY1}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(1,113,228,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "50%",
          left: `${orbX2}%`,
          top: `${orbY2}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(1,113,228,0.06) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "40%",
          height: "40%",
          left: `${orbX3}%`,
          top: `${orbY3}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(1,113,228,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: interpolate(frame, [0, 30], [0, 0.6], {
            extrapolateRight: "clamp",
          }),
        }}
      />
    </div>
  );
};
