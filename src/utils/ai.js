export const evaluateWithGemini = async (prompt, systemInstruction = "You are an expert Indian Armed Forces SSB (Services Selection Board) psychologist. Evaluate the candidate's response for Officer Like Qualities (OLQs). Be strict, direct, and constructive.") => {
  const apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error('API Key not found. Please add your Gemini API Key in the Settings tab.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch AI evaluation.');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Evaluation Error:", error);
    throw error;
  }
};
