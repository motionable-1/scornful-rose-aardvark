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
import { Glow } from "../../library/components/effects/Glow";

const LOGO_URL =
  "https://cdn.instant.so/sites/r1dHd7d1EAbe6pss/assets/tXHzG8wQ09MCrwV4/pocket-icon.png?width=400";
const DEVICE_URL =
  "https://v3b.fal.media/files/b/0a90fc9d/tVy7NA8LiF1237zDQDg-__gl5gW5Zh.png";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100, mass: 0.8 } });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const titleDelay = 12;

  const productDelay = 20;
  const productY = spring({
    frame: Math.max(0, frame - productDelay),
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });
  const productOpacity = interpolate(frame, [productDelay, productDelay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const productFloat = Math.sin((frame / fps) * 1.5) * 8;

  const subtitleDelay = 30;

  const pillDelay = 42;
  const pillScale = spring({
    frame: Math.max(0, frame - pillDelay),
    fps,
    config: { damping: 15, stiffness: 150, mass: 0.6 },
  });
  const pillOpacity = interpolate(frame, [pillDelay, pillDelay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
          width: 700,
        }}
      >
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 24,
          }}
        >
          <Glow color="#0171E4" intensity={15} pulsate pulseDuration={3}>
            <Img
              src={LOGO_URL}
              style={{ width: 72, height: 72, borderRadius: 16 }}
            />
          </Glow>
        </div>

        <FadeInWords
          startFrom={titleDelay}
          stagger={0.08}
          duration={0.6}
          ease="power3.out"
          style={{ display: "block" }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#0a0a0a",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Your Personal{" "}
            <span style={{ color: "#0171E4" }}>AI Assistant</span>
          </h1>
        </FadeInWords>

        <BlurReveal
          startFrom={subtitleDelay}
          stagger={0.04}
          duration={0.6}
          style={{ display: "block", marginTop: 20 }}
        >
          <p
            style={{
              fontSize: 24,
              color: "#555",
              lineHeight: 1.5,
              margin: 0,
              fontWeight: 400,
              maxWidth: 500,
            }}
          >
            Transform conversations into organized notes, action items, and
            searchable content — in real-time.
          </p>
        </BlurReveal>

        <div
          style={{
            marginTop: 32,
            opacity: pillOpacity,
            transform: `scale(${pillScale})`,
            transformOrigin: "left center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 100,
              background: "rgba(1,113,228,0.08)",
              border: "1px solid rgba(1,113,228,0.15)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#0171E4",
                boxShadow: "0 0 8px rgba(1,113,228,0.5)",
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#0171E4",
                letterSpacing: "0.02em",
              }}
            >
              No Subscription • Unlimited Minutes
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 60,
          top: "50%",
          transform: `translateY(${-50 + (1 - productY) * 30}%) translateY(${productFloat}px)`,
          opacity: productOpacity,
          width: 850,
        }}
      >
        <Img
          src={DEVICE_URL}
          style={{
            width: "100%",
            filter: "drop-shadow(0 30px 60px rgba(1,113,228,0.15))",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
