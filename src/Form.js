import { useState } from "react";
import "./Form.css";

function Form() {
  const [form, setForm] = useState({
    pregnancies: "",
    glucose: "",
    blood_presure: "",
    skin_thickness: "",
    insulin_level: "",
    bmi: "",
    diabetes_pedigree: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = new FormData();
    Object.values(form).forEach((val, i) => form_data.append(String(i + 1), val));

    setLoading(true);
    const res = await fetch("https://checkdieabetes.onrender.com/predict", {
      method: "POST",
      body: form_data,
    });
    const html = await res.text();
    setResult(html);
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({
      pregnancies: "",
      glucose: "",
      blood_presure: "",
      skin_thickness: "",
      insulin_level: "",
      bmi: "",
      diabetes_pedigree: "",
      age: "",
    });
    setResult("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="prediction-form">
        <h2>🩺 Diabetes Prediction</h2>
        <p className="subtitle">Enter your health details to check the risk</p>

        {Object.keys(form).map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace("_", " ").toUpperCase()}
            required
          />
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "⏳ Predicting..." : "🔍 Predict"}
        </button>

        {result && (
          <>
            <span className="clear-btn" onClick={handleClear}>
              Clear Prediction
            </span>
            <div
              className={`result ${
                result.includes("Positive") ? "danger" : "safe"
              }`}
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </>
        )}

        <p className="disclaimer">
          ⚠️ This is an example prediction. Please consult a doctor.
        </p>
        <p className="credit">👨‍💻 Developed by Ganesh</p>
      </form>
    </div>
  );
}

export default Form;
