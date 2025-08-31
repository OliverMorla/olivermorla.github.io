"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function CalScheduler() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <Cal
      calLink="oliver-morla/15min"
      style={{
        width: "100%",
        minHeight: "100vh",
        overflow: "scroll",
      }}
      config={{ layout: "month_view" }}
    />
  );
}
