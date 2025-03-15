import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PDFSummaryView = ({ summary, onSave }) => {
  const [editedSummary, setEditedSummary] = useState(summary);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleHighlight = () => {
    const selection = window.getSelection().toString();
    if (selection) {
      const highlightedText = `<span style="background-color: yellow;">${selection}</span>`;
      setEditedSummary(editedSummary.replace(selection, highlightedText));
    }
  };

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">PDF Summary</h2>
        <div
          contentEditable
          dangerouslySetInnerHTML={{ __html: editedSummary }}
          onInput={(e) => setEditedSummary(e.target.innerHTML)}
          className="p-4 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={handleHighlight}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Highlight Selected Text
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">Comments</h3>
        <div className="space-y-2">
          {comments.map((comment, index) => (
            <div key={index} className="p-2 bg-purple-50 rounded-lg">
              {comment}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full mt-2 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add Comment
        </button>
      </div>

      <button
        onClick={() => onSave(editedSummary, comments)}
        className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transition-all"
      >
        Save Changes
      </button>
    </div>
  );
};

const Notes = () => {
  const [pdfText, setPdfText] = useState('');
  const [pdfSummaries, setPdfSummaries] = useState([]);
  const [selectedSummaryId, setSelectedSummaryId] = useState(null); // Track the selected summary ID

  useEffect(() => {
    const savedSummaries = JSON.parse(localStorage.getItem('pdfSummaries')) || [];
    setPdfSummaries(savedSummaries);
  }, []);

  const loadPDF = async () => {
    const file = document.getElementById('pdfInput').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (e) {
      const pdfData = new Uint8Array(e.target.result);
      try {
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map((item) => item.str).join(' ') + '\n';
        }

        const truncatedText = fullText.slice(0, 3000);
        setPdfText(truncatedText);
        document.getElementById('pdfPreview').textContent =
          'PDF loaded (' + truncatedText.length + ' characters)';

        // Create a new summary block
        const newSummary = {
          id: Date.now(),
          title: file.name,
          description: 'PDF summary',
          content: truncatedText,
          comments: [],
        };
        setPdfSummaries([...pdfSummaries, newSummary]);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSaveSummary = (id, content, comments) => {
    const updatedSummaries = pdfSummaries.map((summary) =>
      summary.id === id ? { ...summary, content, comments } : summary
    );
    setPdfSummaries(updatedSummaries);
    localStorage.setItem('pdfSummaries', JSON.stringify(updatedSummaries));
  };

  const toggleSummaryView = (id) => {
    if (selectedSummaryId === id) {
      // If the same summary is clicked again, close it
      setSelectedSummaryId(null);
    } else {
      // Open the clicked summary
      setSelectedSummaryId(id);
    }
  };

  const sendMessage = async () => {
    const input = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    if (!input) {
      responseDiv.innerHTML = 'Please enter a question.';
      return;
    }

    responseDiv.innerHTML = 'Loading...';

    try {
      const context = pdfText
        ? `Document Context: ${pdfText}\n\nQuestion: ${input}`
        : input;

      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer sk-or-v1-0c3f4738bee57a0ec73ee1aa1491b2900eaa1352313c553f9b',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1-distill-llama-70b:free',
            messages: [
              {
                role: 'user',
                content: `Answer based on the provided document: ${context}`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const markdownText =
        data.choices?.[0]?.message?.content || 'No response received.';
      responseDiv.innerHTML = marked.parse(markdownText);
    } catch (error) {
      responseDiv.innerHTML = 'Error: ' + error.message;
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-10">
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"></script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-8">
          Your Notes
        </h1>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-6">
            Pdf on steroids!
          </h2>

          {/* PDF Upload Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="pdfInput"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-300 rounded-2xl cursor-pointer hover:bg-purple-50 transition-colors"
              >
                <svg
                  className="w-12 h-12 text-purple-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
                <p className="text-neutral-600">
                  Drag & drop a PDF or{' '}
                  <span className="text-purple-600 font-semibold">
                    browse files
                  </span>
                </p>
              </label>
              <input
                type="file"
                id="pdfInput"
                accept="application/pdf"
                className="hidden"
              />
            </div>
            <button
              onClick={loadPDF}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 active:scale-95"
            >
              Load PDF
            </button>
            <div
              id="pdfPreview"
              className="mt-4 p-4 bg-purple-50 text-purple-800 rounded-lg text-sm"
            ></div>
          </div>

          {/* PDF Summary Blocks */}
          <div className="space-y-4">
            {pdfSummaries.map((summary) => (
              <div
                key={summary.id}
                className="p-4 bg-purple-50 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold text-neutral-900">
                  {summary.title}
                </h3>
                <p className="text-neutral-600">{summary.description}</p>
                <button
                  onClick={() => toggleSummaryView(summary.id)}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {selectedSummaryId === summary.id ? 'Close Summary' : 'View Summary'}
                </button>
              </div>
            ))}
          </div>

          {/* PDF Summary View */}
          {selectedSummaryId && (
            <div className="mt-8">
              <PDFSummaryView
                summary={
                  pdfSummaries.find((summary) => summary.id === selectedSummaryId)
                    ?.content || ''
                }
                comments={
                  pdfSummaries.find((summary) => summary.id === selectedSummaryId)
                    ?.comments || []
                }
                onSave={(content, comments) =>
                  handleSaveSummary(selectedSummaryId, content, comments)
                }
              />
            </div>
          )}

          {/* Chat Input Section */}
          <div className="mb-8">
            <input
              type="text"
              id="userInput"
              placeholder="Enter your question..."
              className="w-full px-6 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>

          {/* Ask Button */}
          <button
            onClick={sendMessage}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 active:scale-95"
          >
            Ask!
          </button>

          {/* Response Section */}
          <div
            id="response"
            className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-inner text-neutral-700"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Notes;