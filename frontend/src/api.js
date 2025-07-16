const BACKEND_URL = "http://localhost:5000"; // Or use deployed backend link

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BACKEND_URL}/upload_pdf`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

export async function sendPrompt(prompt) {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  return await response.json();
}
