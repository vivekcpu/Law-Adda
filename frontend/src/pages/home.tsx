import BuildProcess from "../sections/build-process";
import CallToAction from "../sections/call-to-action";
import FeaturesSection from "../sections/features-section";
import HeroSection from "../sections/hero-section";
import OurTestimonials from "../sections/our-testimonials";



const Home = () => {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <BuildProcess />
            <OurTestimonials />
            <CallToAction />
        </>
    );
};

export default Home;