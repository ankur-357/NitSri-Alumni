import React, { useState } from 'react';

const JobFit = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [resumes, setResumes] = useState([]);
    const [message, setMessage] = useState('');
    const [topResumes, setTopResumes] = useState([]);
    const [similarityScores, setSimilarityScores] = useState([]);

    const handleFileChange = (e) => {
        setResumes(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('job_description', jobDescription);
        for (let i = 0; i < resumes.length; i++) {
            formData.append('resumes', resumes[i]);
        }

        try {
            const response = await fetch('http://127.0.0.1:7000/matcher', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message || 'Matching complete!');
                setTopResumes(result.top_resumes || []);
                setSimilarityScores(result.similarity_scores || []);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Error matching resumes. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setMessage('Error matching resumes. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg mt-5">
                <div className="bg-blue-600 p-4 rounded-t-xl text-white text-center mt-10">
                    <h2 className="text-2xl font-semibold">JobFit Insight</h2>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="job_description" className="block text-white mb-2">Job Description:</label>
                            <textarea
                                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="job_description"
                                rows="5"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="resumes" className="block text-white mb-2">Upload Resumes:</label>
                            <p className="text-gray-400">Please Upload Resumes (More than 5)...</p>
                            <input
                                type="file"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="resumes"
                                multiple
                                onChange={handleFileChange}
                                required
                                accept=".pdf, .docx, .txt"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition duration-300"
                        >
                            Match Resumes
                        </button>
                    </form>

                    {message && (
                        <div className="bg-blue-600 text-white p-4 mt-4 rounded-lg">
                            <p>{message}</p>
                            <ul className="mt-2">
                                {topResumes.map((resume, index) => (
                                    <li key={index} className="bg-gray-700 rounded-lg p-2 mb-2">
                                        {resume} (Similarity Score: {similarityScores[index]})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobFit;
