import React, { useState, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import { askGemini } from "../../api/rapidapi";

const Main = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showCards, setShowCards] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowCards(false);
    setIsLoading(true);

    try {
      const reply = await askGemini(userMessage.content);
      const botMessage = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Could not get response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (text) => {
    setInput(text);
    setShowCards(false);
  };

  return (
    <div className="flex-1 h-screen bg-white flex flex-col overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between text-[22px] p-5 text-[#585858] shadow-sm">
        <p className="font-semibold">Femini</p>
        <img
          src={assets.user_icon}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl mb-4 p-3 rounded-lg ${
              msg.role === "user" ? "bg-[#d1f3ff] ml-auto" : "bg-[#f0f0f0]"
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="max-w-xl mb-4 p-3 rounded-lg bg-[#f0f0f0]">
            <p className="text-sm animate-pulse">Typing...</p>
          </div>
        )}
        <div ref={messagesEndRef} />

        {showCards && (
          <div className="text-center mt-8">
            <p className="text-2xl font-semibold text-gray-800 mb-1">
              Hello, <span className="text-blue-600">Chakkare</span>
            </p>
            <p className="text-gray-500 text-sm mb-4">
              How can I help you today?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
              <Card
                text="Suggest the best name in the world"
                icon={assets.compass_icon}
                onClick={handleCardClick}
              />
              <Card
                text="Ronaldo or Messi?"
                icon={assets.compass_icon}
                onClick={handleCardClick}
              />
              <Card
                text="Get free followers on Instagram"
                icon={assets.compass_icon}
                onClick={handleCardClick}
              />
              <Card
                text="Who is the most beautiful girl?"
                icon={assets.compass_icon}
                onClick={handleCardClick}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-5 border-t shadow-sm bg-white">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <input
            type="text"
            placeholder="Ask Gemini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 h-10 px-6 py-4 rounded-3xl border border-gray-300 outline-none text-base shadow-sm focus:ring-2 focus:ring-blue-200"
          />
          <img
            src={assets.send_icon}
            alt="Send"
            onClick={handleSend}
            className="w-7 h-7 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ text, icon, onClick }) => (
  <div
    onClick={() => onClick(text)}
    className="flex items-center justify-between p-4 rounded-xl bg-[#f0f4f9] hover:bg-[#e2e6eb] cursor-pointer transition"
  >
    <p className="text-sm text-gray-700">{text}</p>
    <img src={icon} alt="icon" className="w-6 h-6" />
  </div>
);

export default Main;
