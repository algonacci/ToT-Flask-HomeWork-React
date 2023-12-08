import React, { useState } from "react";

function PredictionForm() {
  const [inputData, setInputData] = useState({
    RM: Number(),
    LSTAT: Number(),
    PTRATIO: Number(),
  });
  const [medvResult, setMedvResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setInputData({
      RM: Number(),
      LSTAT: Number(),
      PTRATIO: Number(),
    });
    setMedvResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      setMedvResult(data.data.medv);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="RM" className="block font-semibold mb-2">
            RM:
          </label>
          <input type="text" id="RM" name="RM" value={inputData.RM} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="LSTAT" className="block font-semibold mb-2">
            LSTAT:
          </label>
          <input type="text" id="LSTAT" name="LSTAT" value={inputData.LSTAT} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="PTRATIO" className="block font-semibold mb-2">
            PTRATIO:
          </label>
          <input type="text" id="PTRATIO" name="PTRATIO" value={inputData.PTRATIO} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleClear}>
          Predict
        </button>
      </form>
      {medvResult !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Predicted MEDV:</h3>
          <p className="mt-2">{medvResult}</p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
