from flask import Flask, request, jsonify
from flask_cors import CORS  # <- import CORS
import pandas as pd
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load crop dataset
csv_path = "Crop_recommendation.csv"
df = pd.read_csv(csv_path)

# OpenWeatherMap API Key
API_KEY = "1e3e8f230b6064d27976e41163a82b77"

def get_weather(city):
    """Fetch temperature, humidity, and rainfall from OpenWeatherMap."""
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        temperature = data["main"]["temp"]
        humidity = data["main"]["humidity"]
        rainfall = data.get("rain", {}).get("1h", 0)
        return temperature, humidity, rainfall
    else:
        return None, None, None

@app.route("/get_weather")
def fetch_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"success": False, "error": "City not provided"}), 400

    temperature, humidity, rainfall = get_weather(city)
    
    if temperature is not None:
        return jsonify({
            "success": True,
            "temperature": temperature,
            "humidity": humidity,
            "rainfall": rainfall
        })
    else:
        return jsonify({"success": False, "error": "Could not fetch weather"}), 500

@app.route("/recommend_crop", methods=["POST"])
def recommend_crop():
    try:
        data = request.form
        nitrogen = float(data.get("nitrogen", 0))
        phosphorus = float(data.get("phosphorus", 0))
        potassium = float(data.get("potassium", 0))
        temperature = float(data.get("temperature", 0))
        humidity = float(data.get("humidity", 0))
        ph = float(data.get("ph", 0))
        rainfall = float(data.get("rainfall", 0))

        # Compute similarity
        df["similarity"] = (
            (df["N"] - nitrogen) ** 2 +
            (df["P"] - phosphorus) ** 2 +
            (df["K"] - potassium) ** 2 +
            (df["temperature"] - temperature) ** 2 +
            (df["humidity"] - humidity) ** 2 +
            (df["ph"] - ph) ** 2 +
            (df["rainfall"] - rainfall) ** 2
        )

        best_crop = df.loc[df["similarity"].idxmin(), "label"]
        return jsonify({"success": True, "recommended_crop": best_crop})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
