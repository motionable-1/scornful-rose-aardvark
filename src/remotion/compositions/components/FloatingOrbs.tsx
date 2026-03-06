import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface OrbProps {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  phase: number;
}

const Orb: React.FC<OrbProps> = ({ x, y, size, color, speed, phase }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const cx = x + Math.sin(time * speed + phase) * 30;
  const cy = y + Math.cos(time * speed * 0.7 + phase) * 20;
  const scale = 1 + Math.sin(time * speed * 0.5 + phase * 2) * 0.15;

  return (
    <div
      style={{
        position: "absolute",
        left: `${cx}%`,
        top: `${cy}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        transform: `translate(-50%, -50%) scale(${scale})`,
        filter: `blur(${size * 0.3}px)`,
        opacity: 0.4,
      }}
    />
  );
};

export const FloatingOrbs: React.FC = () => {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <Orb x={15} y={20} size={120} color="rgba(1,113,228,0.12)" speed={0.4} phase={0} />
      <Orb x={80} y={30} size={80} color="rgba(59,130,246,0.08)" speed={0.3} phase={1.5} />
      <Orb x={50} y={75} size={100} color="rgba(1,113,228,0.06)" speed={0.35} phase={3} />
      <Orb x={85} y={80} size={60} color="rgba(96,165,250,0.1)" speed={0.5} phase={4.2} />
    </div>
  );
};
