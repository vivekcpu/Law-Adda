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


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            alert("Service is currently unavailable. Please try again later.");
            setLoading(false);
            setPrompt("");
            setSelected(null);
        }, 10000);
    };

    const placeholders = [
        "portfolio website...",
        "e-commerce store...",
        "business landing page...",
        "personal blog...",
        "startup website...",
    ];


    const prompts: Prompt[] = [
        {
            label: "Portfolio Website",
            prompt: "Create a modern portfolio website to showcase my skills, projects, experience, and personal brand professionally",
        },
        {
            label: "E-commerce Website",
            prompt: "Build a fast, secure e-commerce website with product listings, cart system, payments, and admin dashboard",
        },
        {
            label: "Blog",
            prompt: "Create a clean, SEO-optimized blog website for writing articles, managing content, and growing audience online",
        },
        {
            label: "Landing Page",
            prompt: "Design a high-conversion landing page with strong hero section, CTA buttons, and lead capture form",
        },
        {
            label: "Resume Website",
            prompt: "Generate a professional resume website with skills, experience, education, projects, and downloadable CV section",
        },
        {
            label: "Personal Website",
            prompt: "Create a personal branding website with about section, social links, blogs, and contact form",
        },
        {
            label: "Business Website",
            prompt: "Build a professional business website with services, testimonials, pricing section, and customer inquiry form",
        },
        {
            label: "Marketing Website",
            prompt: "Create a marketing-focused website optimized for conversions, analytics tracking, funnels, and campaign integrations",
        },
        {
            label: "Educational Website",
            prompt: "Build an educational website with courses, student dashboard, lesson pages, progress tracking, and quizzes",
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
                <span>Trusted by 2,000+ founders</span>
            </div>

            <h1 className="text-center text-5xl/17 md:text-[64px]/20 font-semibold max-w-2xl m-2">
                Build custom apps with AI
            </h1>

            <p className="text-center text-base text-gray-500 max-w-md mt-2">
                “No code. No design skills. Just describe your idea and launch instantly.”
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

                <div className="flex items-center justify-between p-4 pt-0">
                    <label htmlFor="file" className="border border-gray-200 text-gray-500 p-1.5 rounded-md cursor-pointer">
                        <input type="file" id="file" hidden />
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

            <Marquee gradient speed={30} pauseOnHover className="max-w-2xl w-full mt-3" >
                {prompts.map((item) => {
                    const isSelected = selected === item.label;

                    return (
                        <button key={item.label}
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