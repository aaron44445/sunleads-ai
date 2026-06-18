"use client";

import { useEffect } from "react";

const BOOKING_WIDGET_URL =
  "https://api.leadconnectorhq.com/widget/booking/eNLEbcTw42cqH0HQNZat";

export default function Booking() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="v2-booking-frame">
      <iframe
        src={BOOKING_WIDGET_URL}
        id="eNLEbcTw42cqH0HQNZat_1781287782780"
        title="Book a strategy call"
        scrolling="no"
        style={{
          width: "100%",
          border: "none",
          overflow: "hidden",
          minHeight: "760px",
          display: "block",
        }}
      />
    </div>
  );
}
