import { StarIcon } from "lucide-react";
import Marquee from "react-fast-marquee";

interface Testimonial {
    review: string;
    name: string;
    date: string;
    rating: number;
    image: string;
}

export default function OurTestimonials() {
  const data: Testimonial[] = [
    {
        review:
            "LawAdda made understanding complex legal documents incredibly simple. I uploaded my case file and got a clear explanation within seconds.",
        name: "Rahul Verma",
        date: "12 Jan 2026",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
        review:
            "As a law student, this platform is a game changer. The AI summaries and explanations save me hours of reading every day.",
        name: "Priya Sharma",
        date: "18 Feb 2026",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
        review:
            "The multilingual support is amazing. I uploaded a Hindi legal document and got an accurate explanation in English instantly.",
        name: "Amit Kumar",
        date: "25 Feb 2026",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
        review:
            "Clean UI, fast processing, and highly accurate insights. LawAdda feels like having a personal legal assistant.",
        name: "Sneha Gupta",
        date: "10 Mar 2026",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
        review:
            "I used LawAdda to analyze contracts before signing. It highlighted key clauses I would have completely missed.",
        name: "Rohit Singh",
        date: "15 Mar 2026",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
        review:
            "Super intuitive and powerful. Upload, ask questions, and get precise answers instantly. Perfect for both beginners and professionals.",
        name: "Ananya Patel",
        date: "20 Mar 2026",
        rating: 5,
        image:
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    },
];

    return (
        <section className="flex flex-col items-center justify-between max-w-6xl mx-auto mt-32 px-4">
            <h3 className="font-domine text-3xl">OUR TESTIMONIALS</h3>
            <p className="mt-4 text-sm/6 text-gray-500 max-w-md text-center">
                We've been using our site and have received
                overwhelmingly positive feedback from our users.
            </p>

            <Marquee pauseOnHover className="mt-16" gradient speed={30}>
                {data.map((item, index) => (
                    <TestimonialCard key={index} item={item} />
                ))}
            </Marquee>
            <Marquee pauseOnHover className="mt-6" direction="right" gradient speed={30}>
                {data.map((item, index) => (
                    <TestimonialCard key={index} item={item} />
                ))}
            </Marquee>
        </section>
    );
}

function TestimonialCard({ item }: { item: Testimonial }) {
    return (
        <div className="w-full max-w-88 mx-2 space-y-4 rounded-md border border-gray-200 bg-white p-3 text-gray-500">
            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, index) => (
                        <StarIcon
                            key={index}
                            className="size-4 fill-gray-800 text-gray-800"
                        />
                    ))}
                </div>
                <p>{item.date}</p>
            </div>

            <p>“{item.review}”</p>

            <div className="flex items-center gap-2 pt-3">
                <img
                    className="size-8 rounded-full"
                    width={40}
                    height={40}
                    src={item.image}
                    alt={item.name}
                />
                <p className="font-medium text-gray-800">{item.name}</p>
            </div>
        </div>
    );
}
