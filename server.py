from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_talisman import Talisman
import subprocess
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
Talisman(app)  # Enforce HTTPS

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    app.logger.debug("Received data: %s", data)
    logo_description = data.get("logoDescription")

    if not logo_description:
        app.logger.error("No prompt provided")
        return jsonify({"error": "No prompt provided"}), 400

    # Run `imageGen.py` directly with the prompt as an argument
    try:
        app.logger.debug("Running imageGen.py with argument: %s", logo_description)
        output = subprocess.check_output(["python3", "imageGen.py", logo_description], stderr=subprocess.STDOUT).decode("utf-8").strip()
        app.logger.debug("Subprocess output: %s", output)
        return jsonify({"image_url": output})
    except subprocess.CalledProcessError as e:
        app.logger.error("Subprocess error: %s", e.output.decode("utf-8"))
        return jsonify({"error": "Failed to generate image"}), 500
    except Exception as e:
        app.logger.error("Unexpected error: %s", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Replace 'path/to/cert.pem' and 'path/to/key.pem' with the actual paths to your SSL certificate and key files
    app.run(host='0.0.0.0', port=3000, ssl_context=('path/to/cert.pem', 'path/to/key.pem'))