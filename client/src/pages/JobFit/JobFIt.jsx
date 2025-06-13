import React, { useState } from 'react';
import { FiUploadCloud, FiBriefcase, FiFileText, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { BsFileEarmarkPdf, BsFileEarmarkWord, BsFileEarmarkText } from 'react-icons/bs';
import { BiLoaderAlt } from 'react-icons/bi';
import { HiOutlineDocumentSearch, HiOutlineSparkles } from 'react-icons/hi';

const JobFit = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [resumes, setResumes] = useState([]);
    const [message, setMessage] = useState('');
    const [topResumes, setTopResumes] = useState([]);
    const [similarityScores, setSimilarityScores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        setResumes(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            setResumes(e.dataTransfer.files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('job_description', jobDescription);
        for (let i = 0; i < resumes.length; i++) {
            formData.append('resumes', resumes[i]);
        }

        try {
            const response = await fetch('https://nitsri-alumni-2.onrender.com/matcher', {
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
        } finally {
            setIsLoading(false);
        }
    };

    const getFileIcon = (fileName) => {
        if (fileName.endsWith('.pdf')) return <BsFileEarmarkPdf className="text-red-400" />;
        if (fileName.endsWith('.docx')) return <BsFileEarmarkWord className="text-blue-400" />;
        return <BsFileEarmarkText className="text-gray-400" />;
    };

    const getScoreColor = (score) => {
        if (score >= 0.8) return 'from-green-500 to-emerald-500';
        if (score >= 0.6) return 'from-blue-500 to-cyan-500';
        if (score >= 0.4) return 'from-yellow-500 to-amber-500';
        return 'from-red-500 to-pink-500';
    };

    const getScoreEmoji = (score) => {
        if (score >= 0.8) return '🌟';
        if (score >= 0.6) return '✨';
        if (score >= 0.4) return '👍';
        return '📋';
    };

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                {/* Header */}
                <div className="text-center mb-8 mt-20">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/25">
                            <HiOutlineDocumentSearch className="text-4xl text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-2">
                        JobFit <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Insight</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        AI-powered resume matching to find the perfect candidates for your job
                    </p>
                </div>

                {/* Main Card */}
                <div className="w-full max-w-2xl">
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                            <div className="flex items-center justify-center gap-3">
                                <FiBriefcase className="text-2xl text-white" />
                                <h2 className="text-2xl font-semibold text-white">Resume Matcher</h2>
                                <HiOutlineSparkles className="text-2xl text-white" />
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Job Description */}
                                <div className="group">
                                    <label htmlFor="job_description" className="flex items-center gap-2 text-gray-300 mb-3 font-medium">
                                        <FiFileText className="text-blue-400" />
                                        Job Description
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            className="w-full p-4 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300 resize-none"
                                            id="job_description"
                                            rows="6"
                                            placeholder="Paste the job description here..."
                                            value={jobDescription}
                                            onChange={(e) => setJobDescription(e.target.value)}
                                            required
                                        />
                                        <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
                                            {jobDescription.length} characters
                                        </div>
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div className="group">
                                    <label htmlFor="resumes" className="flex items-center gap-2 text-gray-300 mb-3 font-medium">
                                        <FiUploadCloud className="text-purple-400" />
                                        Upload Resumes
                                        <span className="text-sm text-gray-500">(PDF, DOCX, TXT)</span>
                                    </label>
                                    <div
                                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${isDragging
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                                            }`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                    >
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            id="resumes"
                                            multiple
                                            onChange={handleFileChange}
                                            required
                                            accept=".pdf, .docx, .txt"
                                        />
                                        <FiUploadCloud className="mx-auto text-5xl text-gray-600 mb-3" />
                                        <p className="text-gray-400 mb-2">
                                            Drag and drop resumes here or click to browse
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Please upload at least 5 resumes for better matching
                                        </p>
                                    </div>

                                    {/* File List */}
                                    {resumes.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-gray-400 text-sm font-medium">
                                                {resumes.length} file(s) selected:
                                            </p>
                                            <div className="max-h-32 overflow-y-auto space-y-1">
                                                {Array.from(resumes).map((file, index) => (
                                                    <div key={index} className="flex items-center gap-2 text-gray-300 text-sm bg-gray-800/30 px-3 py-2 rounded-lg">
                                                        {getFileIcon(file.name)}
                                                        <span className="truncate">{file.name}</span>
                                                        <span className="text-gray-500 text-xs ml-auto">
                                                            {(file.size / 1024).toFixed(1)} KB
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <BiLoaderAlt className="animate-spin text-xl" />
                                            Matching Resumes...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-3">
                                            <HiOutlineDocumentSearch className="text-xl" />
                                            Match Resumes
                                        </span>
                                    )}
                                </button>
                            </form>

                            {message && (
                                <div className="bg-blue-600 text-white p-4 mt-4 rounded-lg">
                                    <p>{message}</p>
                                    <ul className="mt-2">
                                        {topResumes.map((resume, index) => {
                                            const score = similarityScores[index];
                                            const percentage = (score * 100).toFixed(1);
                                            const gradient = getScoreColor(score);

                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-md`}
                                                >
                                                    <div className="flex items-center gap-3 truncate">
                                                        {getFileIcon(resume)}
                                                        <span className="font-medium truncate">{resume}</span>
                                                    </div>
                                                    <div className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                                                        {percentage}% match
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobFit;
