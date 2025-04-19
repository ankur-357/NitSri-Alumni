import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select an Excel file first!");
            return;
        }

        setLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload-excel`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sheetData),
                });

                if (response.ok) {
                    alert("Data uploaded successfully!");
                } else {
                    alert("Failed to upload data.");
                }
            } catch (error) {
                console.error("Error uploading data:", error);
                alert("An error occurred.");
            } finally {
                setLoading(false);
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="w-full">
            <div className="p-4 my-10 w-fit mx-auto">
                <h1 className="text-2xl font-bold mb-4">Upload Alumni Data using Excel File</h1>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
};

export default ExcelUploader;
