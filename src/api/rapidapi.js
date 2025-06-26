export const askGemini = async (message) => {
  try {
    const response = await fetch("https://chatgpt-42.p.rapidapi.com/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "x-rapidapi-key": `${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        model: "gpt-4o-mini",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ RapidAPI Error:", data);
      throw new Error(data.message || "API error");
    }

    return data.choices?.[0]?.message?.content || "No reply received.";
  } catch (err) {
    console.error("🔥 Failed to fetch:", err);
    return "Failed to get a response. Please try again.";
  }
};
