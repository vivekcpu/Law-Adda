import { Loader2Icon, SparklesIcon, TrendingUpIcon, UploadCloudIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

interface Prompt {
    label: string;
    prompt: string;
}

export default function HeroSection() {
    const [prompt, setPrompt] = useState("");
    const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    //  FILE STATE
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file && !prompt) {
            alert("Upload a PDF or enter a prompt");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            if (file) formData.append("file", file);
            formData.append("prompt", prompt || "");
            formData.append("mode", selected || "general");

            const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("Response:", data);

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
            setPrompt("");
            setSelected(null);
            setFile(null);
        }
    };

    const placeholders = [
        "Upload a legal document...",
        "Summarize this contract...",
        "Explain this legal notice...",
        "Analyze clauses in my agreement...",
        "Ask anything about law...",
    ];

    const prompts: Prompt[] = [
        {
            label: "Summarize Document",
            prompt: "Summarize this legal document into simple, easy-to-understand key points",
        },
        {
            label: "Explain Legal Terms",
            prompt: "Explain complex legal terms and clauses in simple language with examples",
        },
        {
            label: "Contract Analysis",
            prompt: "Analyze this contract and highlight important clauses, risks, and obligations",
        },
        {
            label: "Case Explanation",
            prompt: "Explain this legal case in simple terms including facts, judgment, and reasoning",
        },
        {
            label: "Legal Q&A",
            prompt: "Answer my legal question clearly with proper explanation and relevant context",
        },
        {
            label: "Clause Breakdown",
            prompt: "Break down each clause of this agreement and explain its meaning and impact",
        },
        {
            label: "Risk Detection",
            prompt: "Identify potential risks, hidden clauses, and legal issues in this document",
        },
        {
            label: "Multilingual Translation",
            prompt: "Translate this legal document into another language while preserving its meaning",
        },
        {
            label: "Simplify Document",
            prompt: "Convert this legal document into plain English that a non-lawyer can understand",
        },
    ];

    useEffect(() => {
        if (prompt) return;

        const currentWord = placeholders[textIndex];

        if (!deleting && charIndex === currentWord.length) {
            setTimeout(() => setDeleting(true), 2000);
            return;
        }

        if (deleting && charIndex === 0) {
            setDeleting(false);
            setTextIndex((prev) => (prev + 1) % placeholders.length);
            return;
        }

        const timeout = setTimeout(() => {
            setCharIndex((prev) => prev + (deleting ? -1 : 1));
        }, 50);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, textIndex, prompt]);

    const animatedPlaceholder = placeholders[textIndex].substring(0, charIndex);

    return (
        <section id="home" className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-gray-500 mt-32">
                <TrendingUpIcon className="size-4.5" />
                <span>Trusted by legal professionals & learners</span>
            </div>

            <h1 className="text-center text-5xl/17 md:text-[64px]/20 font-semibold max-w-2xl m-2">
                Your AI-powered legal assistant
            </h1>

            <p className="text-center text-base text-gray-500 max-w-md mt-2">
                No legal background required. Upload documents, ask questions, and get instant, easy-to-understand answers.
            </p>

            <form onSubmit={handleSubmit} className="focus-within:ring-2 focus-within:ring-gray-300 border border-gray-200 rounded-xl max-w-2xl w-full mt-8">
                <textarea
                    className="w-full resize-none p-4 outline-none text-gray-600"
                    placeholder={`Create a ${animatedPlaceholder}`}
                    rows={3}
                    minLength={10}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                />

                {/*  FILE NAME DISPLAY */}
                {file && (
                    <p className="text-sm text-gray-500 px-4">
                        Uploaded: {file.name}
                    </p>
                )}

                <div className="flex items-center justify-between p-4 pt-0">
                    <label htmlFor="file" className="border border-gray-200 text-gray-500 p-1.5 rounded-md cursor-pointer">
                        <input
                            type="file"
                            id="file"
                            hidden
                            accept="application/pdf"
                            onChange={(e) => {
                                const selectedFile = e.target.files?.[0];

                                if (selectedFile) {
                                    if (selectedFile.type !== "application/pdf") {
                                        alert("Only PDF files are allowed");
                                        return;
                                    }
                                    setFile(selectedFile);
                                }
                            }}
                        />
                        <UploadCloudIcon className="size-4.5" />
                    </label>

                    <button className={`flex items-center bg-linear-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition px-4 h-9 text-white rounded-lg ${loading ? "cursor-not-allowed opacity-80" : ""}`}>
                        {loading ? (
                            <Loader2Icon className="size-5 animate-spin" />
                        ) : (
                            <>
                                <SparklesIcon className="size-4" />
                                <span className="ml-2">Create</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <Marquee gradient speed={30} pauseOnHover className="max-w-2xl w-full mt-3">
                {prompts.map((item) => {
                    const isSelected = selected === item.label;

                    return (
                        <button
                            key={item.label}
                            onClick={() => {
                                setPrompt(item.prompt);
                                setSelected(item.label);
                            }}
                            className={`px-4 py-1.5 mx-2 border rounded-full transition
                                ${isSelected
                                    ? "bg-gray-200 text-gray-800 border-gray-300 cursor-not-allowed"
                                    : "text-gray-500 bg-gray-50 border-gray-200 hover:bg-gray-100"
                                }
                            `}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </Marquee>
        </section>
    );
}