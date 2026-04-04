import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "ai";
    content: string;
}

export default function Chat() {
    const { docId } = useParams();
    const location = useLocation();
    const hasSentInitial = useRef(false);

    const initialPrompt = location.state?.initialPrompt;

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    //  Auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    //  Initial prompt trigger
    useEffect(() => {
        if (initialPrompt && docId) {
            hasSentInitial.current = true;
            sendMessage(initialPrompt, true);
        }
    }, [initialPrompt, docId]);

    // ✨ Typing animation
    const typeText = async (text: string) => {
        let current = "";
        for (let i = 0; i < text.length; i++) {
            current += text[i];

            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "ai",
                    content: current,
                };
                return updated;
            });

            await new Promise((res) => setTimeout(res, 10)); // speed
        }
    };

    //  Main send function
    const sendMessage = async (promptText: string, isInitial = false) => {
        if (loading) return;
        if (!promptText.trim() || !docId) return;

        const userMessage: Message = {
            role: "user",
            content: promptText,
        };

        setMessages((prev) => (isInitial ? [userMessage] : [...prev, userMessage]));
        setLoading(true);

        // placeholder AI message for typing effect
        setMessages((prev) => [
            ...(isInitial ? [userMessage] : prev),
            { role: "ai", content: "" },
        ]);

        try {
            const res = await fetch("http://localhost:5000/api/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    docId,
                    prompt: promptText,
                }),
            });

            const data = await res.json();

            await typeText(data.answer || "No response");

        } catch (error) {
            console.error(error);

            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "ai",
                    content: "Something went wrong.",
                };
                return updated;
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSend = async () => {
        const promptText = input;
        setInput("");
        sendMessage(promptText);
    };

   return (
    <div className="flex flex-col h-full min-h-0 bg-white">

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-10 py-6 space-y-6">

            {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20 text-sm sm:text-base">
                    Start asking questions about your document...
                </div>
            )}

            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                    <div
                        className={`max-w-[85%] sm:max-w-[75%] md:max-w-[60%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed
                        ${
                            msg.role === "user"
                                ? "bg-gray-800 text-white rounded-br-none"
                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }
                    `}
                    >
                        <div className="prose [&_ul]:list-disc [&_ul]:ml-5">
                            <ReactMarkdown>
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            ))}

            {/* Loader */}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-gray-500 px-4 py-3 rounded-2xl text-white text-sm flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce [animation-delay:0.2s]">.</span>
                        <span className="animate-bounce [animation-delay:0.4s]">.</span>
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-1 border border-gray-200 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-gray-300"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                    }}
                />

                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-50 text-sm sm:text-base"
                >
                    Send
                </button>
            </div>
        </div>
    </div>
);
}