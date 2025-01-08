import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import basket from "../assets/grocery.png";
import grocery2 from "../assets/grocery2.png";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="container px-4 sm:px-6 lg:px-10 border bg-green-400">
        <div className="hidden lg:block">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:h-[18vw] gap-6">
                  <div className="text-container pb-8 lg:pb-24">
                    <Badge variant="outline" className="text-sm">
                      Sale up to 20% OFF{" "}
                    </Badge>
                    <h1 className="sm:text-5xl lg:text-7xl font-bold">
                      Get Fresh Organic{" "}
                      <span className="text-[#9334ea]">Food</span> Everyday
                    </h1>
                    <p className="mt-2 text-base sm:text-lg font-mono">
                      Search your favorite food{" "}
                    </p>
                  </div>

                  <div className="image-container flex justify-center lg:justify-end">
                    <img
                      src={basket}
                      alt="banner"
                      className="w-[300px] sm:w-[400px] lg:w-[500px] h-auto object-contain pb-8 lg:pb-14"
                    />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:h-[18vw] gap-6">
                  <div className="text-container pb-8 lg:pb-24">
                    <Badge variant="outline" className="text-sm">
                      Limited Time Offer: 15% OFF on Selected Items
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
                      Discover{" "}
                      <span className="text-[#9334ea]">Fresh</span> Produce
                      Delivered to Your Doorstep
                    </h1>
                    <p className="mt-2 text-base sm:text-lg font-mono">
                      Browse and order your favorite groceries online
                    </p>
                  </div>
                  <div className="image-container flex justify-center lg:justify-end">
                    <img
                      src={grocery2}
                      alt="banner"
                      className="w-[300px] sm:w-[400px] lg:w-[600px] h-auto object-contain"
                    />
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
