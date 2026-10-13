"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Zapamiętuje UTM/gclid/fbclid z adresu wejściowego (first-touch) na dowolnej podstronie. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
