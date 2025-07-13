from openai import OpenAI
from flask import current_app


def is_content_flagged(content: str) -> bool:
    try:
        client = OpenAI(api_key=current_app.config["OPENAI_API_KEY"])
        response = client.moderations.create(input=content)
        return response.results[0].flagged
    except Exception as e:
        print(f"Moderation API error: {e}")
        return False
