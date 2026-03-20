import HeroSection from "./HeroSection/HeroSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import AboutUs from "./AboutUs/AboutUs";
import Newsletter from "./Newsletter/Newsletter";

export default function HomeLayout(){
    return(
        <>
        <HeroSection/>
        <HowItWorks/>
        <AboutUs/>
        <Newsletter/>
        </>
    )
}