"use client";

import { useState } from "react";

import PromptEditorCard from "./components/PromptEditorCard";
import PromptPreviewCard from "./components/PromptPreviewCard";
import ExtraInfoCard from "./components/ExtraInfoForm";
import ExecResultCard from "./components/ExecResultCard";
import { FieldDef } from "./types/FieldDef"; 

type DesignResult = {
  structure: string;
  draftPrompt: string;
  review: string;
  fields?: FieldDef[];
};

type RunResult = {
  result: string;
};

export default function Home() {
  const [userRequest, setUserRequest] = useState("");
  const [finalBody, setFinalBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [execLoading, setExecLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [execResult, setExecResult] = useState("");
  const [requiredFields, setRequiredFields] = useState<FieldDef[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // 🔹 プロンプト生成
  const handleGenerate = async () => {
    if (!userRequest.trim()) return;

    setLoading(true);
    setError(null);
    setFinalBody("");
    setCopied(false);
    setExecResult("");
    setRequiredFields([]);
    setFormValues({});

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/design_prompt`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userRequest }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "API Error");
      }

      const data = (await res.json()) as DesignResult;

      if (data.review) {
        setFinalBody(data.review.trim());
      } else {
        setFinalBody(
          typeof data === "string" ? data : JSON.stringify(data, null, 2)
        );
      }

      if (data.fields && Array.isArray(data.fields)) {
        setRequiredFields(data.fields);

        const init: Record<string, string> = {};
        data.fields.forEach((f) => {
          init[f.id] = "";
        });
        setFormValues(init);
      } else {
        setRequiredFields([]);
        setFormValues({});
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "プロンプト生成中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 完成したプロンプトを実行
  const handleExecute = async () => {
    if (!finalBody.trim()) {
      setError("先にプロンプトを生成してください。");
      return;
    }

    setExecLoading(true);
    setError(null);
    setExecResult("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/run_prompt`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ finalPrompt: finalBody, formValues }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "API Error");
      }

      const data = (await res.json()) as RunResult;

      setExecResult(data.result ?? "");
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "プロンプト実行中にエラーが発生しました。");
    } finally {
      setExecLoading(false);
    }
  };

  const handleClear = () => {
    setUserRequest("");
    setFinalBody("");
    setExecResult("");
    setError(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!finalBody) return;

    try {
      await navigator.clipboard.writeText(finalBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("コピーに失敗しました:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* ヘッダー */}
        <header style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#111827",
            }}
          >
            Prompt Studio ~ 誰でも理想のプロンプトを生成 ~
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            あなたの「〇〇ができるプロンプトを作りたい」という要望から、
            実際に使える完成プロンプトを自動生成します。
          </p>
        </header>

        {/* ① プロンプト設計（入力カード） */}
        <PromptEditorCard
          userRequest={userRequest}
          onChange={(v) => setUserRequest(v)}
          onGenerate={handleGenerate}
          onClear={handleClear}
          loading={loading}
          error={error}
        />

        {/* ② プロンプト生成結果カード */}
        <PromptPreviewCard
          finalBody={finalBody}
          copied={copied}
          onCopy={handleCopy}
        />

        {/* ③ 追加情報フォームカード */}
        <ExtraInfoCard
          fields={requiredFields}
          values={formValues}
          onChange={(key, v) =>
            setFormValues((prev) => ({
              ...prev,
              [key]: v,
            }))
          }
          onExecute={handleExecute}
          loading={execLoading}
        />

        {/* ④ 実行結果カード */}
        <ExecResultCard text={execResult} title="プロンプト実行結果" />
      </div>
    </div>
  );
}