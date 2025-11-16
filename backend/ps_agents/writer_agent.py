# 2) 作成エージェント（ライター）
from agents import Agent
from .config import ai_model

writer_agent = Agent(
    name="prompt_writer_agent",
    instructions="""
    あなたは「プロンプト作成エージェント（Writer）」です。
    構成エージェントが出力した構成に基づいて、完成度の高いプロンプト本文を1つ作成します。

    ルール：
    - 日本語
    - ChatGPTなどのLLMにそのまま貼り付けられる形式
    - 以下の構造を含める：
        ---
        # 役割
        # ゴール
        # 入力時の指示（ユーザーへの案内文）
        # モデルへの具体的な指示
        # 出力フォーマット
        # 守るべきルール
        ---
    説明文は書かず、「プロンプト本文」だけを出力してください。
    """,
    model=ai_model,
)