from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, Optional

import asyncio
from prompt_designer import design_prompt
from ps_agents.execution_agent import execution_agent
from agents import Runner 


class PromptRequest(BaseModel):
    userRequest: str


class RunPromptRequest(BaseModel):
    finalPrompt: str

class RunPromptRequest(BaseModel):
    finalPrompt: str
    formValues: Optional[Dict[str, Any]] = None


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://promptstudio-gold.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/design_prompt")
async def design_prompt_endpoint(body: PromptRequest):
    result = await design_prompt(body.userRequest)
    return result


@app.post("/run_prompt")
async def run_prompt_endpoint(body: RunPromptRequest):
    """
    完成済みのプロンプトを実行し、その結果を返す。
    """
    try:
        # フォーム入力をきれいなテキストに整形
        extra_context = ""
        if body.formValues:
            lines = []
            for key, value in body.formValues.items():
                lines.append(f"- {key}: {value}")
            extra_context = (
                "\n\n--- フォームから渡された入力 ---\n"
                + "\n".join(lines)
                + "\n"
            )

        execution_input = f"""{body.finalPrompt}

{extra_context}
"""

        result = await Runner.run(
            execution_agent,
            execution_input,
        )

        return {
            "result": result.final_output
        }

    except Exception as e:
        return {
            "result": f"Error: {str(e)}"
        }




# ローカル実行用
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
