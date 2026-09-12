import type { Metadata } from "next";
import { MomentsClient } from "./moments-client";

export const metadata: Metadata = {
  title: "Moments — Emberwake",
  description: "The four beats the whole app is built to earn.",
};

export default function MomentsPage() {
  return <MomentsClient />;
}
