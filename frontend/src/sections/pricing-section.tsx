import { CheckIcon, ShieldCheckIcon, SparklesIcon, ZapIcon } from "lucide-react";

interface PricingItem {
    title: string;
    description: string;
    mostPopular?: boolean;
    price: string;
    buttonText: string;
    features: string[];
}

export default function PricingSection() {
    const data: PricingItem[] = [
        {
            title: "Pro Plan",
            description: "Perfect for medium business and personal use",
            price: "$49",
            buttonText: "Get Started",
            features: [
                "Enjoy unlimited AI task usage",
                "Integrate API for smooth workflow",
                "Create text and image outputs",
                "Get priority chat and email help",
                "View detailed analytics and reports",
            ],
        },
        {
            title: "Custom Plan",
            mostPopular: true,
            description: "Perfect for organizations and personal use",
            price: "$149",
            buttonText: "Contact Sales",
            features: [
                "Build fully customized AI models",
                "Manage teams with shared access",
                "Get a dedicated account manager",
                "Integrate private APIs securely",
                "Guaranteed uptime with support",
                "Customize pricing and features",
            ],
        },
    ];
    return (
        <section id="pricing" className="flex flex-col md:flex-row gap-14 items-start justify-between max-w-7xl mx-auto mt-32 px-4">
            <div className="max-w-sm">
                <h3 className="font-domine text-3xl">OUR PRICING</h3>
                <p className="mt-4 text-sm/6 text-gray-500">Choose a plan that fits your goals and scale. Every plan includes powerful AI features, fast performance, and all the tools you need without limits.</p>
                <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-gray-500">
                        <div className="p-2.5 border border-gray-200 rounded-md">
                            <SparklesIcon className="size-5" />
                        </div>
                        <p>Advanced AI features included</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                        <div className="p-2.5 border border-gray-200 rounded-md">
                            <ZapIcon className="size-5" />
                        </div>
                        <p>Lightning fast load speed always</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                        <div className="p-2.5 border border-gray-200 rounded-md">
                            <ShieldCheckIcon className="size-5" />
                        </div>
                        <p>Clear honest usage with limits</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap items-end justify-center gap-10'>
                {data.map((item, index) => (
                    <div key={index} className={`group w-full max-w-80 rounded-xl p-6 pb-10 ${item.mostPopular ? 'bg-gray-800 text-white' : 'bg-white border border-slate-200'}`}>
                        <div className={`flex flex-col items-center justify-center text-center`}>
                            <h3 className='text-lg font-semibold'>{item.title}</h3>
                            <p className={item.mostPopular ? 'text-gray-400' : 'text-gray-500'}>{item.description}</p>
                            <p className='mt-4 text-2xl font-semibold'>
                                {item.price} <span className={`text-sm font-normal ${item.mostPopular ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                            </p>
                            <button className={`mt-4 w-full rounded-lg bg-gray-100 py-2.5 font-medium text-gray-800 transition ${item.mostPopular ? 'hover:opacity-90' : 'hover:bg-gray-200/70'}`}>{item.buttonText}</button>
                        </div>
                        <div className='mt-2 flex flex-col'>
                            {item.features.map((feature, index) => (
                                <div key={index} className={`flex items-center gap-2 border-b py-3 ${item.mostPopular ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className={`rounded-full p-1 ${item.mostPopular ? 'bg-white/10' : 'bg-gray-800'}`}>
                                        <CheckIcon className='size-3 text-white' strokeWidth={2.5} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}