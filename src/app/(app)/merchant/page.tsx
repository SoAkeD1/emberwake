import type { Metadata } from "next";
import { MerchantClient } from "./merchant-client";

export const metadata: Metadata = {
  title: "The Wandering Merchant — Emberwake",
  description: "Spend your runes on weapons, armor, and consumables.",
};

export default function MerchantPage() {
  return <MerchantClient />;
}
