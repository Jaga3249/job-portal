import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const LandingPage = () => {
  const plugin = useRef(Autoplay({ delay: 1000, stopOnInteraction: true }));
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section>
        <h1 className="text-center flex flex-col justify-center items-center gradient-title text-4xl sm:text-6xl lg:8xl  font-extrabold tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img src="/logo.png" alt="logo" className="h-14 sm:h-24 lg:h-32" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl text-center">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex items-center justify-center gap-6">
        <Link to={"/jobs"}>
          <Button variant={"blue"} size={"xl"}>
            Find jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant={"destructive"} size={"xl"}>
            Post a job
          </Button>
        </Link>
      </div>
      {/* carosel */}
      <Carousel className="w-full py-10" plugins={[plugin.current]}>
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map((item, index) => (
            <CarouselItem key={index} className="basis-1/3 sm:basis-1/6">
              <img
                src={item.path}
                alt=""
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src="/banner.jpeg" alt="" className="w-full" />
      <section>{/* cards */}</section>
      {/* accordion */}
    </main>
  );
};
export default LandingPage;
