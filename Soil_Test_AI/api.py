from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# =========================
# Load Trained Model
# =========================
model = joblib.load("crop_model.pkl")
encoder = joblib.load("label_encoder.pkl")

# =========================
# Initialize FastAPI
# =========================
app = FastAPI(title="Soil Crop Recommendation AI")

# =========================
# Request Body Schema
# =========================
class SoilInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# =========================
# Root Endpoint
# =========================
@app.get("/")
def home():
    return {"message": "🌱 Soil AI is Running Successfully!"}

# =========================
# Prediction Endpoint
# =========================
@app.post("/predict")
def predict_crop(data: SoilInput):

    input_data = np.array([[
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]])

    prediction = model.predict(input_data)
    crop_name = encoder.inverse_transform(prediction)[0]

    def nutrient_status(value, low, high):
        if value < low:
            return "Low"
        elif value > high:
            return "High"
        else:
            return "Optimal"

    nitrogen_status = nutrient_status(data.N, 50, 100)
    phosphorus_status = nutrient_status(data.P, 40, 80)
    potassium_status = nutrient_status(data.K, 40, 80)

    if data.ph < 5.5:
        ph_status = "Acidic"
    elif data.ph > 7.5:
        ph_status = "Alkaline"
    else:
        ph_status = "Neutral"

    MAX_NPK = 140

    nitrogen_percent = min((data.N / MAX_NPK) * 100, 100)
    phosphorus_percent = min((data.P / MAX_NPK) * 100, 100)
    potassium_percent = min((data.K / MAX_NPK) * 100, 100)

    fertilizer_advice = []
    if nitrogen_status == "Low":
        fertilizer_advice.append("Add Nitrogen-rich fertilizer")
    if phosphorus_status == "Low":
        fertilizer_advice.append("Add Phosphorus fertilizer")
    if potassium_status == "Low":
        fertilizer_advice.append("Add Potassium fertilizer")

    if not fertilizer_advice:
        fertilizer_advice.append("Soil nutrients are balanced")

    return {
        "recommended_crop": crop_name,
        "soil_analysis": {
            "nitrogen_status": nitrogen_status,
            "phosphorus_status": phosphorus_status,
            "potassium_status": potassium_status,
            "ph_status": ph_status
        },
        "nutrient_percentages": {
            "nitrogen": round(nitrogen_percent),
            "phosphorus": round(phosphorus_percent),
            "potassium": round(potassium_percent)
        },
        "fertilizer_recommendation": fertilizer_advice
    }