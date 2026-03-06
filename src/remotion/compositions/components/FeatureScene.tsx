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
  FadeInChars,
} from "../../library/components/text/TextAnimation";
import { AnimatedGlow } from "../../library/components/effects/Glow";

interface FeatureSceneProps {
  iconUrl: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor?: string;
  index: number;
}

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  iconUrl,
  title,
  subtitle,
  description,
  accentColor = "#0171E4",
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });
  const numOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const iconDelay = 6;
  const iconScale = spring({
    frame: Math.max(0, frame - iconDelay),
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.7 },
  });
  const iconOpacity = interpolate(
    frame,
    [iconDelay, iconDelay + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const iconFloat = Math.sin((frame / fps) * 2) * 6;

  const lineDelay = 10;
  const lineWidth = spring({
    frame: Math.max(0, frame - lineDelay),
    fps,
    config: { damping: 20, stiffness: 80, mass: 1 },
  });

  const circleScale = spring({
    frame: Math.max(0, frame - 3),
    fps,
    config: { damping: 15, stiffness: 60, mass: 1.2 },
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          width: 700,
        }}
      >
        <div
          style={{
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Feature 0{index}
          </span>
        </div>

        <FadeInWords
          startFrom={12}
          stagger={0.07}
          duration={0.5}
          ease="power3.out"
          style={{ display: "block" }}
        >
          <h2
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#0a0a0a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {title}
          </h2>
        </FadeInWords>

        <div
          style={{
            width: `${lineWidth * 80}px`,
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        <FadeInChars
          startFrom={22}
          stagger={0.02}
          duration={0.4}
          ease="power2.out"
          style={{ display: "block" }}
        >
          <p
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#333",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </p>
        </FadeInChars>

        <BlurReveal
          startFrom={35}
          stagger={0.03}
          duration={0.5}
          style={{ display: "block", marginTop: 12 }}
        >
          <p
            style={{
              fontSize: 22,
              color: "#666",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: 520,
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        </BlurReveal>
      </div>

      <div
        style={{
          position: "absolute",
          right: 200,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
            border: `2px solid ${accentColor}15`,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${circleScale})`,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            border: `1px solid ${accentColor}10`,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${circleScale}) rotate(${frame * 0.5}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: accentColor,
              top: -5,
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: `0 0 12px ${accentColor}60`,
            }}
          />
        </div>

        <AnimatedGlow
          color={accentColor}
          intensity={20}
          duration={0.8}
          delay={0.2}
          pulsateAfter
          pulseDuration={3}
        >
          <div
            style={{
              opacity: iconOpacity,
              transform: `scale(${iconScale}) translateY(${iconFloat}px)`,
            }}
          >
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 32,
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 20px 50px ${accentColor}30`,
              }}
            >
              <Img
                src={iconUrl}
                style={{ width: 72, height: 72 }}
              />
            </div>
          </div>
        </AnimatedGlow>
      </div>
    </AbsoluteFill>
  );
};
