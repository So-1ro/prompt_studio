"use client";

type Props = {
  userRequest: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  loading: boolean;
  error: string | null;
};

export default function PromptEditorCard({
  userRequest,
  onChange,
  onGenerate,
  onClear,
  loading,
  error,
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
      {/* ヘッダー部分 */}
      <header
        style={{
          marginBottom: "12px",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "4px",
            color: "#111827",
          }}
        >
          プロンプト設計書
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "#6b7280",
            lineHeight: 1.5,
          }}
        >
          「どのようなプロンプトを作りたいか」を日本語で自由に記載してください。<br />
          この内容をもとに、最適なプロンプトを自動で設計します。
        </p>
      </header>

      {/* テキストエリア */}
      <textarea
        style={{
          width: "100%",
          minHeight: "180px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          padding: "12px",
          fontSize: "14px",
          outline: "none",
          resize: "vertical",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          backgroundColor: "#f3f4f6",
        }}
        placeholder="例：与えられた情報をもとに、読みやすく整理された文章を自動生成するプロンプトを作りたい。"
        value={userRequest}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#3b82f6";
          e.currentTarget.style.boxShadow =
            "0 0 0 1px rgba(59, 130, 246, 0.4)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      {/* ボタン行 */}
      <div
        style={{
          marginTop: "14px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {/* プロンプト生成開始 */}
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          style={{
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
            if (!loading) {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = "#0067c0";
              btn.style.borderColor = "#0067c0";
              btn.style.color = "#ffffff";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = "#f3f4f6";
              btn.style.borderColor = "#d1d5db";
              btn.style.color = "#374151";
            }
          }}
          onMouseDown={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(1px)";
            }
          }}
          onMouseUp={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }
          }}
        >
          {loading ? "生成中..." : "プロンプト生成開始"}
        </button>

        {/* 入力内容クリア */}
        <button
          type="button"
          onClick={onClear}
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
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.backgroundColor = "#0067c0";
            btn.style.borderColor = "#0067c0";
            btn.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.backgroundColor = "#f3f4f6";
            btn.style.borderColor = "#d1d5db";
            btn.style.color = "#374151";
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(1px)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }}
        >
          入力内容をクリア
        </button>
      </div>

      {error && (
        <p
          style={{
            marginTop: "8px",
            fontSize: "13px",
            color: "#b91c1c",
          }}
        >
          エラー: {error}
        </p>
      )}
    </section>
  );
}
