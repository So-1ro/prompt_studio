"use client";

import React from "react";
import { FieldDef } from "../types/FieldDef";

type Props = {
  fields: FieldDef[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  onExecute: () => void;
  loading: boolean;
};

export default function ExtraInfoFormCard({
  fields,
  values,
  onChange,
  onExecute,
  loading,
}: Props) {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #7BB8FF",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* タイトル */}
      <header style={{ marginBottom: "12px" }}>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "4px",
            color: "#111827",
          }}
        >
          追加情報の入力
        </h2>
      </header>

      {/* ⚠ fields が空 → 何も入力不要 */}
      {fields.length === 0 && (
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          このプロンプトでは追加情報の入力は必要ありません。
        </p>
      )}

      {/* 入力フィールド */}
      {fields.map((f) => (
        <div key={f.id} style={{ marginBottom: "16px" }}>
          <label
            style={{
              fontSize: "14px",
              fontWeight: 500,
              marginBottom: "6px",
              display: "block",
            }}
          >
            {f.label}
          </label>

          {f.type === "textarea" ? (
            <textarea
              value={values[f.id] || ""}
              onChange={(e) => onChange(f.id, e.target.value)}
              style={{
                width: "100%",
                minHeight: "100px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f3f4f6",
                padding: "10px",
              }}
            />
          ) : (
            <input
              type="text"
              value={values[f.id] || ""}
              onChange={(e) => onChange(f.id, e.target.value)}
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f3f4f6",
                padding: "10px",
              }}
            />
          )}
        </div>
      ))}

      {/* 実行ボタン（fields がある時だけ表示） */}
      {fields.length > 0 && (
        <button
          type="button"
          onClick={onExecute}
          disabled={loading}
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            backgroundColor: loading ? "#93c5fd" : "#f3f4f6",
            color: "#374151",
            cursor: loading ? "default" : "pointer",
            transition:
              "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.05s ease",
          }}
          onMouseEnter={(e) => {
            if (loading) return;
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.backgroundColor = "#0067c0";
            btn.style.borderColor = "#0067c0";
            btn.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            if (loading) return;
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.backgroundColor = "#f3f4f6";
            btn.style.borderColor = "#d1d5db";
            btn.style.color = "#374151";
          }}
          onMouseDown={(e) => {
            if (loading) return;
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(1px)";
          }}
          onMouseUp={(e) => {
            if (loading) return;
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }}
        >
          {loading ? "実行中..." : "情報を入力しプロンプトを実行"}
        </button>
      )}
    </section>
  );
}
