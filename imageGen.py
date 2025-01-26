from openai import OpenAI
import requests
from io import BytesIO

openai = OpenAI(
    api_key="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"
)

def generate_image(prompt):
    response = openai.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    return image_url

def save_to_file(file_path, content): #writes the url to a text.txt file for html to access
    with open(file_path, "w") as file:
        file.write(content)

def read_file(file_path): #reads the prompt from prompt file for openai api to access
    with open(file_path, "r") as file:
        prompt = file.readline()
    return prompt

if __name__ == "__main__":
    # Define your prompt for image generation
    prompt = read_file('prompt')
    # Generate image
    image_url = generate_image(prompt)
    save_to_file("test.txt", image_url)
    # Display the image
    print(image_url)