"use client";

import React from "react";

export default function FeatureOverview() {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        padding: "24px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <h2
        style={{
          fontSize: "15px",
          fontWeight: 600,
          marginBottom: "4px",
          color: "#111827",
        }}
      >
        機能概要
      </h2>

      <p
        style={{
          fontSize: "13px",
          color: "#6b7280",
          marginBottom: "16px",
        }}
      >
        PromptStudio は、プロンプト作成を「シンプル」「効率的」「再利用しやすい」形でサポートします。
        <br />
        業務・学習・AI活用のあらゆるシーンに最適なプロンプトを、誰でも短時間で生成できます。
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          fontSize: "13px",
          color: "#374151",
        }}
      >
        {/* プロンプト設計 */}
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
            プロンプト設計
          </h3>
          <ul style={{ paddingLeft: "16px", margin: 0 }}>
            <li>
              <strong>要件ベースの自動プロンプト生成</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - 入力内容に応じて最適なプロンプトを自動生成します。
                </li>
              </ul>
            </li>

            <li>
              <strong>プロンプト構造化</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - 実務で使いやすい構造に整理し、テンプレート化します。
                </li>
              </ul>
            </li>

            <li>
              <strong>クオリティチェック</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - 曖昧さや過不足を自動チェックし、精度を向上します。
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* 出力・コピー */}
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
            出力・コピー
          </h3>
          <ul style={{ paddingLeft: "16px", margin: 0 }}>
            <li>
              <strong>最終プロンプトのみをクリーン表示</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - 余計な説明等を除去した純粋なプロンプトだけを抽出
                </li>
              </ul>
            </li>

            <li>
              <strong>ワンクリックコピー</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - ChatGPTやClaudeなど各ツールに貼り付けやすい形で出力
                </li>
              </ul>
            </li>

            <li>
              <strong>LLM向け最適化フォーマット</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - 曖昧さや過不足を自動チェックし、精度を向上します。
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* 利用シーン */}
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
            利用シーン
          </h3>
          <ul style={{ paddingLeft: "16px", margin: 0 }}>
            <li>
              <strong>自社業務プロセスのプロンプト標準化</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - レポート生成／問い合わせ対応／ナレッジ整理など
                </li>
              </ul>
            </li>

            <li>
              <strong>社内向け AI 活用ガイドの作成</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - AI教育用プロンプトの整備・テンプレート化
                </li>
              </ul>
            </li>

            <li>
              <strong>個人の作業フロー効率化・自動化</strong>
              <ul
                style={{
                  paddingLeft: "16px",
                  marginTop: "4px",
                  marginBottom: "8px",
                }}
              >
                <li style={{ fontSize: "14px", color: "#555" }}>
                  - プロンプトの再利用／テンプレート管理／日常業務の効率UP
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
