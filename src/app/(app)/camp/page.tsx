import type { Metadata } from "next";
import { CampClient } from "./camp-client";

export const metadata: Metadata = {
  title: "The Camp — Emberwake",
  description: "Your quest log, attributes, and bonfire, all in one place.",
};

export default function CampPage() {
  return <CampClient />;
}
