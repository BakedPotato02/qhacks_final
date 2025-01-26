import sys
from openai import OpenAI
from flask_cors import CORS

openai = OpenAI(api_key="YOUR_OPENAI_API_KEY")

def generate_image(prompt):
    response = openai.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    return response.data[0].url

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No prompt provided")
        sys.exit(1)

    prompt = sys.argv[1]
    image_url = generate_image(prompt)
    print(image_url)  # This output is captured by `server.py`
