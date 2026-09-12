import type { Metadata } from "next";
import { ChronicleClient } from "./chronicle-client";

export const metadata: Metadata = {
  title: "The Chronicle — Emberwake",
  description: "Every fire you have lit, and every night you let one die.",
};

export default function ChroniclePage() {
  return <ChronicleClient />;
}
