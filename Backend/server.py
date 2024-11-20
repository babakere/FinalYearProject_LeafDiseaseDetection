from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part", "success": False}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected", "success": False}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        image = image.resize((225, 225))
        image_array = img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array /= 255

        model = load_model('best_model_new.h5')
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        predicted_accuracy = float(predictions[0][predicted_class])
        labels = {
            0: 'Black_rot',
            1: 'Esca_(Black_Measles)',
            2: 'Leaf_blight_(Isariopsis_Leaf_Spot)',
            3: 'healthy'
        }
        predicted_label = labels[predicted_class]

        return jsonify({"prediction": predicted_label, "accuracy": predicted_accuracy, "success": True})
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
