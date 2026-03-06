import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  interpolate,
} from "remotion";
import {
  FadeInWords,
  BlurReveal,
} from "../../library/components/text/TextAnimation";
import { AnimatedGlow } from "../../library/components/effects/Glow";

const LOGO_URL =
  "https://cdn.instant.so/sites/r1dHd7d1EAbe6pss/assets/tXHzG8wQ09MCrwV4/pocket-icon.png?width=400";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const btnDelay = 30;
  const btnScale = spring({
    frame: Math.max(0, frame - btnDelay),
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.7 },
  });
  const btnOpacity = interpolate(
    frame,
    [btnDelay, btnDelay + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const urlDelay = 40;
  const urlOpacity = interpolate(
    frame,
    [urlDelay, urlDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const pulseScale = 1 + Math.sin((frame / fps) * 2) * 0.05;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
        }}
      >
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 32,
          }}
        >
          <AnimatedGlow
            color="#0171E4"
            intensity={25}
            duration={0.6}
            pulsateAfter
            pulseDuration={2.5}
            layers={2}
          >
            <Img
              src={LOGO_URL}
              style={{
                width: 96,
                height: 96,
                borderRadius: 24,
                boxShadow: "0 20px 60px rgba(1,113,228,0.2)",
              }}
            />
          </AnimatedGlow>
        </div>

        <FadeInWords
          startFrom={10}
          stagger={0.08}
          duration={0.6}
          ease="power3.out"
          style={{ display: "block" }}
        >
          <h2
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#0a0a0a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Get <span style={{ color: "#0171E4" }}>Pocket</span> Today
          </h2>
        </FadeInWords>

        <BlurReveal
          startFrom={22}
          stagger={0.03}
          duration={0.5}
          style={{ display: "block", marginTop: 16 }}
        >
          <p
            style={{
              fontSize: 26,
              color: "#555",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Your thoughts, organized. No subscription needed.
          </p>
        </BlurReveal>

        <div
          style={{
            marginTop: 40,
            opacity: btnOpacity,
            transform: `scale(${btnScale * pulseScale})`,
          }}
        >
          <div
            style={{
              padding: "18px 56px",
              borderRadius: 100,
              background: "linear-gradient(135deg, #0171E4, #0058B6)",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.02em",
              boxShadow:
                "0 12px 40px rgba(1,113,228,0.35), 0 4px 12px rgba(1,113,228,0.2)",
            }}
          >
            Shop Now
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
            opacity: urlOpacity,
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "#999",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            heypocket.com
          </span>
        </div>
      </div>

      {[400, 550, 700].map((size, i) => {
        const ringScale = spring({
          frame: Math.max(0, frame - 5 * i),
          fps,
          config: { damping: 20, stiffness: 40, mass: 1.5 },
        });
        const ringOpacity = interpolate(
          frame,
          [5 * i, 5 * i + 20],
          [0, 0.08 - i * 0.02],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              borderRadius: "50%",
              border: "1.5px solid #0171E4",
              opacity: ringOpacity,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
