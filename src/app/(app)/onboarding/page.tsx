import type { Metadata } from "next";
import { OnboardingClient } from "./onboarding-client";

export const metadata: Metadata = {
  title: "First Steps — Emberwake",
  description: "Choose your path, swear your first oaths, and enter the Camp.",
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}
