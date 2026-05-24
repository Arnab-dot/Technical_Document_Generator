import asyncio
from typing import List
from google import genai
from google.genai import types


class GeminiService:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)
        self.model = "gemini-2.5-flash"

    async def _call_with_retries(self, system_prompt: str, user_prompt: str, max_retries: int = 3) -> str:
        """
        Helper method to call the Gemini API with exponential backoff.
        Runs the synchronous SDK call in a thread pool to remain async-compatible.
        """
        delay = 1.0
        for attempt in range(max_retries + 1):
            try:
                response = await asyncio.to_thread(
                    self.client.models.generate_content,
                    model=self.model,
                    contents=user_prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=system_prompt,
                        max_output_tokens=8192,
                        temperature=0.2,
                    ),
                )
                return response.text
            except Exception as e:
                if attempt == max_retries:
                    raise e
                await asyncio.sleep(delay)
                delay *= 2

    async def generate_documentation(
        self,
        chunks: List[str],
        filename: str,
        language: str,
        system_prompt: str,
        user_prompt_template: str,
    ) -> str:
        """
        Processes a list of code chunks through Gemini, returning a concatenated markdown string.
        """
        all_responses = []

        for i, chunk in enumerate(chunks):
            # Using replace instead of .format() to avoid KeyErrors from literal curly braces in the prompts
            user_prompt = (
                user_prompt_template.replace("{filename}", filename)
                                    .replace("{language}", language)
                                    .replace("{code_content}", chunk)
                                    .replace("{part_number}", f"Part {i+1} of {len(chunks)}")
            )

            response_text = await self._call_with_retries(
                system_prompt=system_prompt,
                user_prompt=user_prompt,
            )
            all_responses.append(response_text)

        return "\n\n".join(all_responses)

    async def merge_documentation(self, existing_docs: str, new_chunk: str) -> str:
        """
        Accepts an existing documentation string and a new code chunk.
        Returns an updated version of the documentation merging the new information
        without duplicating existing insights.
        """
        system_prompt = (
            "You are an expert technical writer. Your task is to update an existing "
            "documentation document with new insights extracted from a provided code chunk. "
            "Merge the new information seamlessly and logically into the existing structure. "
            "Do not duplicate information that already exists. "
            "Return only the updated documentation in Markdown format, with no conversational filler."
        )

        user_prompt = (
            f"Here is the existing documentation:\n"
            f"---\n{existing_docs}\n---\n\n"
            f"Here is the new code chunk to analyze and merge:\n"
            f"---\n{new_chunk}\n---\n\n"
            f"Output the updated documentation."
        )

        return await self._call_with_retries(system_prompt, user_prompt)
