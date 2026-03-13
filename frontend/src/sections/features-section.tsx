import { ChartSplineIcon, LayoutPanelTopIcon, NotebookPenIcon } from "lucide-react";

interface Feature {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

export default function FeaturesSection() {

    const features: Feature[] = [
        {
            icon: LayoutPanelTopIcon,
            title: "AI Layout Generator",
            description: "Automatically creates a complete website layout from a single prompt.",
        },
        {
            icon: NotebookPenIcon,
            title: "AI Content Writer",
            description: "Generates high-quality headlines, text, and call-to-actions instantly.",
        },
        {
            icon: ChartSplineIcon,
            title: "Performance Optimization",
            description: "Ensures fast load speed, clean code, and high PageSpeed scores.",
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