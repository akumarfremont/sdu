import { ImageResponse } from "next/og";
import { event } from "@/data/event";

export const runtime = "nodejs";
export const alt = event.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The preview card people see when the link is pasted into WhatsApp.
 * Generated at build time from the same data as the rest of the site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FEF6E8 0%, #FDFAF4 45%, #EAF4F3 100%)",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C97F16",
          }}
        >
          A Golden Anniversary
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 82,
            fontWeight: 700,
            color: "#3B2141",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Celebrating 50 Years of
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            color: "#3B2141",
          }}
        >
          {event.coupleShort}
        </div>
        <div style={{ display: "flex", marginTop: 30, height: 2, width: 320, background: "#EFB65B" }} />
        <div style={{ display: "flex", marginTop: 30, fontSize: 34, color: "#6B5F55" }}>
          {event.dateRange}
        </div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 26, color: "#A2958A" }}>
          {event.venue.name} · {event.venue.city} · Main days {event.mainDaysLabel}
        </div>
      </div>
    ),
    size,
  );
}
