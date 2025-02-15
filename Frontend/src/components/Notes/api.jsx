import React from "react";
import { Helmet } from "react-helmet";

function Api() {
  let pdfText = '';

  async function loadPDF() {
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
          fullText += textContent.items.map(item => item.str).join(' ') + '\n';
        }

        pdfText = fullText.slice(0, 3000); // Truncate to ~3000 characters
        document.getElementById('pdfPreview').textContent = 'PDF loaded (' + pdfText.length + ' characters)';
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function sendMessage() {
    const input = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    if (!input) {
      responseDiv.innerHTML = 'Please enter a question.';
      return;
    }

    responseDiv.innerHTML = 'Loading...';

    try {
      const context = pdfText ? `Document Context: ${pdfText}\n\nQuestion: ${input}` : input;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-distill-llama-70b:free",
          "messages": [
            {
              "role": "user",
              "content": `Answer based on the provided document: ${context}`
            }
          ]
        })
      });

      const data = await response.json();
      const markdownText = data.choices?.[0]?.message?.content || 'No response received.';
      responseDiv.innerHTML = marked.parse(markdownText);
    } catch (error) {
      responseDiv.innerHTML = 'Error: ' + error.message;
    }
  }

  return (
    <>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"></script>
      </Helmet>

      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Free ChatBot with PDF</h2>

          <div className="pdf-section mb-6">
            <input
              type="file"
              id="pdfInput"
              accept="application/pdf"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => loadPDF()}
            >
              Load PDF
            </button>
            <div id="pdfPreview" className="mt-2 p-3 border border-gray-300 rounded min-h-[50px]"></div>
          </div>

          <div className="form-group mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              id="userInput"
              placeholder="Enter your question"
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => sendMessage()}
          >
            Ask!
          </button>
          <div id="response" className="mt-4 p-3 border border-gray-300 rounded min-h-[50px]"></div>
        </div>
      </div>
    </>
  );
}

export default Api;