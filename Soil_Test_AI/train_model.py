import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# =========================
# 1. Load Dataset
# =========================
df = pd.read_csv("Crop_recommendation.csv")

print("Dataset Loaded Successfully")
print("Shape:", df.shape)

# =========================
# 2. Separate Features & Target
# =========================
X = df.drop("label", axis=1)
y = df["label"]

# =========================
# 3. Encode Target Labels
# =========================
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# =========================
# 4. Train-Test Split
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# =========================
# 5. Train Model
# =========================
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# =========================
# 6. Evaluate Model
# =========================
predictions = model.predict(X_test)

print("\nModel Accuracy:", accuracy_score(y_test, predictions))
print("\nClassification Report:\n")
print(classification_report(y_test, predictions))

# =========================
# 7. Save Model
# =========================
joblib.dump(model, "crop_model.pkl")
joblib.dump(encoder, "label_encoder.pkl")

print("\nModel and Encoder saved successfully!")