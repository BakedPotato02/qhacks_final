import sys
from openai import OpenAI
from flask_cors import CORS

openai = OpenAI(api_key="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")

def generate_image(prompt):
    try:
        response = openai.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        return response.data[0].url
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No prompt provided")
        sys.exit(1)

    prompt = sys.argv[1]
    image_url = generate_image(prompt)
    print(image_url)  # This output is captured by `server.py`
