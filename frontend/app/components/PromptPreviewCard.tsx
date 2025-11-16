"use client";

type Props = {
  finalBody: string;
  copied: boolean;
  onCopy: () => void;
};

export default function PromptPreviewCard({
  finalBody,
  copied,
  onCopy,
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
      {/* タイトル + コピー */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            プロンプト生成結果
          </h2>
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            あなたの理想のプロンプト出力されます。<br />
            以下に求められた「追加情報」を入力し、プロンプトを実行しましょう。
          </p>
        </div>

        {/* 🔵 Copyボタン（生成ボタンと完全同じUI） */}
        <button
          type="button"
          onClick={onCopy}
          disabled={!finalBody}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            backgroundColor: finalBody
              ? copied
                ? "#16a34a" // コピー済み → 緑
                : "#f3f4f6" // 通常グレー
              : "#e5e7eb",
            color: finalBody
              ? copied
                ? "#ffffff"
                : "#374151"
              : "#9ca3af",
            cursor: finalBody ? "pointer" : "default",
            transition:
              "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.05s ease",
          }}
          onMouseEnter={(e) => {
            if (!finalBody || copied) return;
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#0067c0"; // 青
            btn.style.borderColor = "#0067c0";
            btn.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            if (!finalBody || copied) return;
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#f3f4f6"; // 薄いグレー
            btn.style.borderColor = "#d1d5db";
            btn.style.color = "#374151";
          }}
          onMouseDown={(e) => {
            if (!finalBody || copied) return;
            const btn = e.currentTarget;
            btn.style.transform = "translateY(1px)";
          }}
          onMouseUp={(e) => {
            if (!finalBody || copied) return;
            const btn = e.currentTarget;
            btn.style.transform = "translateY(0)";
          }}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {/* 内容 */}
      <div
        style={{
          borderRadius: "8px",
          backgroundColor: "#f3f4f6",
          color: "#111827",
          padding: "12px",
          fontSize: "13px",
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          minHeight: "200px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {finalBody || "ここに最終プロンプトが表示されます。"}
      </div>
    </section>
  );
}