import os
import asyncio
import json
from dotenv import load_dotenv
from agents import Agent, Runner, trace, enable_verbose_stdout_logging

from ps_agents.structure_agent import structure_agent
from ps_agents.writer_agent import writer_agent
from ps_agents.reviewer_agent import reviewer_agent

load_dotenv()
enable_verbose_stdout_logging()


async def design_prompt(user_request: str):
    """
    ユーザーの要望から
    1) 構成 → 2) プロンプト作成 → 3) レビュー
    を1つの trace として実行する
    """

    with trace(workflow_name="PromptDesigner", metadata={"user_request": user_request}):

        # ① 構成エージェント
        structure_input = (
            "ユーザーの要望：\n"
            f"{user_request}\n\n"
            "この要望に基づき、指定されたJSON形式でプロンプト構成と入力項目を出力してください。"
        )
        structure_result = await Runner.run(structure_agent, structure_input)
        raw_structure = structure_result.final_output.strip()

        # JSONとして解釈
        try:
            structure_json = json.loads(raw_structure)
        except json.JSONDecodeError:
            # うまくJSONにならなかった場合のフォールバック
            structure_json = {
                "structure": {"raw": raw_structure},
                "fields": [],
            }

        structure_text = json.dumps(
            structure_json.get("structure", {}),
            ensure_ascii=False,
            indent=2,
        )
        fields = structure_json.get("fields", [])

        # ② 作成エージェント
        writer_input = f"""
以下がプロンプト構成です。この構成に厳密に沿ってプロンプト本文を作成してください。

【ユーザーの要望】
{user_request}

【プロンプト構成（JSON）】
{structure_text}

【重要ルール】
- このプロンプトは、フロントエンドから渡される「フォーム入力（fields）」と組み合わせて実行されます。
- プロンプト内では、必要な入力を「フォームから渡される」と想定し、
  ユーザーに追加質問をしないでください。
"""
        writer_result = await Runner.run(writer_agent, writer_input)
        draft_prompt = writer_result.final_output

        # ③ レビュアー
        reviewer_input = f"""
以下のプロンプトをレビューし、必要に応じて修正した最終版を出力してください。

【ユーザーの要望】
{user_request}

【プロンプト構成（JSON）】
{structure_text}

【作成済みプロンプト】
{draft_prompt}

【重要ルール】
- ユーザーに追加質問するのではなく、
  フォームから渡される入力だけで一発回答できるプロンプトにしてください。
"""
        review_result = await Runner.run(reviewer_agent, reviewer_input)
        review_text = review_result.final_output

    return {
        "structure": structure_text,
        "draft_prompt": draft_prompt,
        "review": review_text,
        "fields": fields,  # 👈 これをフロントに返す
    }
