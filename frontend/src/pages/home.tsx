import BuildProcess from "../sections/build-process";
import CallToAction from "../sections/call-to-action";
import FeaturesSection from "../sections/features-section";
import HeroSection from "../sections/hero-section";
import OurTestimonials from "../sections/our-testimonials";
import PricingSection from "../sections/pricing-section";
import TrustedBrand from "../sections/trusted-brand";

const Home = () => {
    return (
        <>
            <HeroSection />
            <TrustedBrand />
            <FeaturesSection />
            <BuildProcess />
            <PricingSection />
            <OurTestimonials />
            <CallToAction />
        </>
    );
};

export default Home;