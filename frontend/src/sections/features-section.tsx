import { ScaleIcon, FileTextIcon, LanguagesIcon } from "lucide-react";

interface Feature {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

export default function FeaturesSection() {

    const features: Feature[] = [
        {
            icon: FileTextIcon,
            title: "AI Document Analysis",
            description: "Upload legal documents and get instant summaries, key points, and simplified explanations.",
        },
        {
            icon: ScaleIcon,
            title: "Legal Insights & Risk Detection",
            description: "Identify important clauses, obligations, and potential risks hidden inside agreements.",
        },
        {
            icon: LanguagesIcon,
            title: "Multilingual Support",
            description: "Understand legal documents in multiple languages with accurate AI-powered translation and explanation.",
        },
    ];

    return (
        <div id="features" className="grid border mt-42 rounded-lg max-w-6xl mx-auto border-gray-200/70 grid-cols-1 divide-y divide-gray-200/70 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {features.map((item, index) => (
                <div key={index} className="flex flex-col items-start gap-4 hover:bg-gray-50 transition duration-300 p-8 pb-14">
                    <div className="flex items-center gap-2 text-gray-500">
                        <item.icon className="size-5" />
                        <h2 className="font-medium text-base">{item.title}</h2>
                    </div>
                    <p className="text-gray-500 text-sm/6 max-w-72">{item.description}</p>
                </div>
            ))}
        </div>
    );
}