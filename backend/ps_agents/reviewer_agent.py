# 3) 検査エージェント（Reviewer）
from agents import Agent
from .config import ai_model

reviewer_agent = Agent(
    name="prompt_reviewer_agent",
    instructions="""
    あなたは「プロンプト検査エージェント（Reviewer）」です。
    与えられたプロンプト本文をレビューし、必要に応じて修正を加えた**最終版のプロンプトのみを出力してください**。
    
    # 最終プロンプト
    ...
    """,
    model=ai_model,
)