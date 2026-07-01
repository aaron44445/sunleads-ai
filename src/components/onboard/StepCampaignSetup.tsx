"use client";

import { useState } from "react";
import type { OnboardingData } from "@/lib/types";
import GlassCard from "./GlassCard";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = ["Morning (8–12)", "Afternoon (12–5)", "Evening (5–8)"];

const DEALBREAKERS = [
  { key: "dealbreaker_tile_roof", label: "Tile roofs" },
  { key: "dealbreaker_mobile_home", label: "Mobile homes" },
  { key: "dealbreaker_hoa", label: "Strict HOAs" },
] as const;

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default function StepCampaignSetup({
  companyName,
  data,
  onNext,
  loading,
}: {
  companyName: string;
  data: OnboardingData;
  onNext: (data: Record<string, unknown>) => void;
  loading: boolean;
}) {
  const [threshold, setThreshold] = useState(data.bill_threshold ?? 100);
  const [selectedDays, setSelectedDays] = useState<string[]>(
    data.appointment_days ? data.appointment_days.split(",") : []
  );
  const [selectedTimes, setSelectedTimes] = useState<string[]>(
    data.appointment_times ? data.appointment_times.split(",") : []
  );
  const [dealbreakers, setDealbreakers] = useState({
    dealbreaker_tile_roof: data.dealbreaker_tile_roof ?? false,
    dealbreaker_mobile_home: data.dealbreaker_mobile_home ?? false,
    dealbreaker_hoa: data.dealbreaker_hoa ?? false,
  });
  const [formError, setFormError] = useState("");

  function toggleDay(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function toggleTime(time: string) {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  }

  function handleSubmit() {
    setFormError("");

    const zips = (document.getElementById("target_zips") as HTMLTextAreaElement)
      ?.value?.trim();

    if (!zips) {
      setFormError("Enter at least one zip code or county.");
      return;
    }
    if (selectedDays.length === 0) {
      setFormError("Pick at least one day for appointments.");
      return;
    }
    if (selectedTimes.length === 0) {
      setFormError("Pick at least one time slot.");
      return;
    }

    onNext({
      target_zips: zips,
      bill_threshold: threshold,
      appointment_days: selectedDays.join(","),
      appointment_times: selectedTimes.join(","),
      ...dealbreakers,
    });
  }

  return (
    <GlassCard>
      <div className="mb-6">
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#7FFF00" }}
        >
          Let&apos;s build your campaign
        </p>
        <h2
          className="mt-1 font-display text-xl font-bold text-white sm:text-2xl"
          style={{ letterSpacing: "-0.5px" }}
        >
          {companyName}, tell us who you want to reach.
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#8B95A8" }}>
          This takes 2 minutes. We use these answers to build your first ad
          campaign and start booking qualified appointments.
        </p>
      </div>

      {formError && (
        <div
          className="mb-4 rounded-lg p-3 text-sm"
          style={{
            background: "rgba(255,107,107,0.1)",
            border: "1px solid rgba(255,107,107,0.2)",
            color: "#FF6B6B",
          }}
        >
          {formError}
        </div>
      )}

      <div className="space-y-6">
        {/* Service area */}
        <div>
          <label
            className="mb-1 block text-xs font-medium"
            style={{ color: "#8B95A8" }}
          >
            Target zip codes or counties{" "}
            <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <textarea
            id="target_zips"
            rows={2}
            placeholder="e.g. 85001, 85003, 85004 or Maricopa County"
            defaultValue={data.target_zips || ""}
            className="w-full resize-none rounded-lg px-4 py-3 text-sm text-white outline-none"
            style={inputStyle}
          />
        </div>

        {/* Bill threshold slider */}
        <div>
          <label
            className="mb-1 block text-xs font-medium"
            style={{ color: "#8B95A8" }}
          >
            Minimum monthly electric bill{" "}
            <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <p className="mb-3 text-xs" style={{ color: "#4A5568" }}>
            We only book homeowners whose bill is at or above this amount.
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={50}
              max={300}
              step={25}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
            <span
              className="min-w-[60px] rounded-lg px-3 py-1.5 text-center text-sm font-bold"
              style={{
                background: "rgba(127,255,0,0.08)",
                border: "1px solid rgba(127,255,0,0.2)",
                color: "#7FFF00",
              }}
            >
              ${threshold}+
            </span>
          </div>
        </div>

        {/* Appointment availability — days */}
        <div>
          <label
            className="mb-2 block text-xs font-medium"
            style={{ color: "#8B95A8" }}
          >
            What days can you take appointments?{" "}
            <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const active = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    background: active
                      ? "rgba(127,255,0,0.08)"
                      : "rgba(255,255,255,0.03)",
                    border: active
                      ? "1px solid rgba(127,255,0,0.2)"
                      : "1px solid rgba(255,255,255,0.06)",
                    color: active ? "#7FFF00" : "#EAEAEA",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appointment availability — times */}
        <div>
          <label
            className="mb-2 block text-xs font-medium"
            style={{ color: "#8B95A8" }}
          >
            Preferred time slots{" "}
            <span style={{ color: "#F5A623" }}>*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = selectedTimes.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleTime(slot)}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    background: active
                      ? "rgba(127,255,0,0.08)"
                      : "rgba(255,255,255,0.03)",
                    border: active
                      ? "1px solid rgba(127,255,0,0.2)"
                      : "1px solid rgba(255,255,255,0.06)",
                    color: active ? "#7FFF00" : "#EAEAEA",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Deal-breaker toggles */}
        <div>
          <label
            className="mb-2 block text-xs font-medium"
            style={{ color: "#8B95A8" }}
          >
            Any deal-breakers? Tap to exclude.
          </label>
          <div className="flex flex-wrap gap-2">
            {DEALBREAKERS.map(({ key, label }) => {
              const active = dealbreakers[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setDealbreakers((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    background: active
                      ? "rgba(255,107,107,0.08)"
                      : "rgba(255,255,255,0.03)",
                    border: active
                      ? "1px solid rgba(255,107,107,0.2)"
                      : "1px solid rgba(255,255,255,0.06)",
                    color: active ? "#FF6B6B" : "#EAEAEA",
                  }}
                >
                  {active ? "No " : ""}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full rounded-lg px-6 py-3.5 text-sm font-bold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </GlassCard>
  );
}
