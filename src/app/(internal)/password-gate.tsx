"use client";

import { useState } from "react";

export default function PasswordGate() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      setError("Wrong password.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm"
      style={{
        background: "rgba(13,17,25,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "32px",
      }}
    >
      <h1
        className="font-display mb-6 text-xl font-bold text-white"
        style={{ letterSpacing: "-0.3px" }}
      >
        Internal Access
      </h1>
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="mb-4 w-full rounded-lg px-4 py-3 text-sm text-white outline-none"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />
      {error && (
        <p className="mb-3 text-sm" style={{ color: "#FF6B6B" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg px-4 py-3 text-sm font-semibold transition-opacity disabled:opacity-50"
        style={{ background: "#7FFF00", color: "#080B10" }}
      >
        {loading ? "Checking..." : "Enter"}
      </button>
    </form>
  );
}
