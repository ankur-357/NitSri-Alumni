from flask import Flask, request, jsonify
import docx2txt
import PyPDF2
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def extract_text_from_pdf(file):
    text = ""
    reader = PyPDF2.PdfReader(file)
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file):
    return docx2txt.process(file)

def extract_text_from_txt(file):
    return file.read().decode('utf-8')

def extract_text(file, filename):
    if filename.endswith('.pdf'):
        return extract_text_from_pdf(file)
    elif filename.endswith('.docx'):
        return extract_text_from_docx(file)
    elif filename.endswith('.txt'):
        return extract_text_from_txt(file)
    else:
        return ""

@app.route('/matcher', methods=['POST'])
def matcher():
    if request.method == 'POST':
        job_description = request.form['job_description']
        resume_files = request.files.getlist('resumes')

        resumes = []
        for resume_file in resume_files:
            filename = resume_file.filename
            file_content = resume_file.stream
            resumes.append(extract_text(file_content, filename))

        if not resumes or not job_description:
            return jsonify({"message": "Please upload resumes and enter a job description."}), 400

        # Vectorize job description and resumes
        vectorizer = TfidfVectorizer().fit_transform([job_description] + resumes)
        vectors = vectorizer.toarray()

        # Calculate cosine similarities
        job_vector = vectors[0]
        resume_vectors = vectors[1:]
        similarities = cosine_similarity([job_vector], resume_vectors)[0]

        # Get top 5 resumes and their similarity scores
        top_indices = similarities.argsort()[-5:][::-1]
        top_resumes = [resume_files[i].filename for i in top_indices]
        similarity_scores = [round(similarities[i], 2) for i in top_indices]

        return jsonify({
            "message": "Top matching resumes:",
            "top_resumes": top_resumes,
            "similarity_scores": similarity_scores
        }), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 7000))
    app.run(host='0.0.0.0', port=port, debug=True)
