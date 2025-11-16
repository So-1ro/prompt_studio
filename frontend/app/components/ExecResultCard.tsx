"use client";

import React, { useState } from "react";

type Props = {
  text: string;
  title: string;
};

export default function ExecResultCard({ text, title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #7BB8FF",
        padding: "24px",
        marginBottom: "24px",
        position: "relative",
        boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* タイトル + コピー */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {title}
        </h2>

        {/* 🔵 コピー ボタン（UI完全統一） */}
        <button
          type="button"
          onClick={handleCopy}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            backgroundColor: "#f3f4f6",
            color: "#374151",
            cursor: "pointer",
            transition:
              "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.05s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#0067c0"; // 青
            btn.style.borderColor = "#0067c0";
            btn.style.color = "#ffffff"; // 白文字
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#f3f4f6"; // 薄いグレー
            btn.style.borderColor = "#d1d5db";
            btn.style.color = "#374151";
          }}
          onMouseDown={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "translateY(1px)";
          }}
          onMouseUp={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "translateY(0)";
          }}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </header>

      {/* 結果テキスト */}
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          backgroundColor: "#f9fafb",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          fontSize: "14px",
          color: "#111827",
        }}
      >
        {text}
      </pre>
    </section>
  );
}
