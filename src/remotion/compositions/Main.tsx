import React from "react";
import {
  AbsoluteFill,
  Artifact,
  useCurrentFrame,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Background } from "./components/Background";
import { FloatingOrbs } from "./components/FloatingOrbs";
import { HeroScene } from "./components/HeroScene";
import { FeatureScene } from "./components/FeatureScene";
import { CTAScene } from "./components/CTAScene";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { morph } from "../library/components/layout/transitions/presentations/morph";

const ICON_URLS = {
  mic: "https://api.iconify.design/heroicons/microphone-solid.svg?color=%23ffffff&width=72",
  brain: "https://api.iconify.design/heroicons/sparkles-solid.svg?color=%23ffffff&width=72",
  infinity: "https://api.iconify.design/heroicons/infinity-solid.svg?color=%23ffffff&width=72",
};

// Scene durations (in frames at 30fps)
const TRANSITION_DURATION = 20;
const HERO_DURATION = 120;
const FEATURE1_DURATION = 110;
const FEATURE2_DURATION = 110;
const FEATURE3_DURATION = 110;
const CTA_DURATION = 120;
// Total = sum of scene durations - sum of transition durations
// 5 scenes, 4 transitions => 120+110+110+110+120 - 4*20 = 570 - 80 = 490
// Plus ~30 frame buffer at end = 520

export const Main: React.FC = () => {
  const { fontFamily } = loadFont();
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ fontFamily }}>
        {/* Persistent background layer */}
        <Background />
        <FloatingOrbs />

        {/* Scene transitions */}
        <TransitionSeries>
          {/* Hero Scene */}
          <TransitionSeries.Sequence durationInFrames={HERO_DURATION}>
            <HeroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={morph({ shape: "rounded", contract: 20, blur: 8 })}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Feature 1 - Voice-to-Text */}
          <TransitionSeries.Sequence durationInFrames={FEATURE1_DURATION}>
            <FeatureScene
              iconUrl={ICON_URLS.mic}
              title="Voice-to-Text Transcription"
              subtitle="Speak freely, capture everything"
              description="Turn meetings, walks, and brainstorming sessions into perfectly transcribed notes — with unlimited minutes."
              accentColor="#0171E4"
              index={1}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Feature 2 - AI Organization */}
          <TransitionSeries.Sequence durationInFrames={FEATURE2_DURATION}>
            <FeatureScene
              iconUrl={ICON_URLS.brain}
              title="AI-Powered Organization"
              subtitle="From chaos to clarity, instantly"
              description="Pocket's AI automatically creates action items, summaries, and tagged entries from your conversations."
              accentColor="#7C3AED"
              index={2}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={morph({ shape: "circle", contract: 30, blur: 6 })}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Feature 3 - Lifetime Access */}
          <TransitionSeries.Sequence durationInFrames={FEATURE3_DURATION}>
            <FeatureScene
              iconUrl={ICON_URLS.infinity}
              title="Lifetime Access"
              subtitle="Pay once. Use forever."
              description="No subscriptions, no monthly fees. Get unlimited transcription minutes with a single purchase."
              accentColor="#059669"
              index={3}
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* CTA Scene */}
          <TransitionSeries.Sequence durationInFrames={CTA_DURATION}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
