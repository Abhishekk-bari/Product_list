import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import basket from '../assets/grocery.png'
import grocery2 from '../assets/grocery2.png'

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="container pl-10 border bg-green-400 ">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="grid grid-cols-2 items-center h-[18vw] ">
                <div className="text-container pb-24">
                  <Badge variant="outline" className="text-sm ">
                    Sale up to 20% OFF{" "}
                  </Badge>
                  <h1 className="text-7xl font-bold ">
                    Get Fresh Organic Food Everyday
                  </h1>
                  <p className="mt-4 text-lg font-mono">Search your favorite food </p>
                </div>

                <div className="image-container flex justify-end  ">
                  <img
                    src={basket}
                    alt="banner"
                    className="w-[500px] h-[400px] object-contain pb-14"
                  />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
  <div className="grid grid-cols-2 items-center h-[18vw] ">
    <div className="text-container pb-24">
      <Badge variant="outline" className="text-sm ">
        Limited Time Offer: 15% OFF on Selected Items
      </Badge>
      <h1 className="text-5xl font-bold ">
        Discover Fresh Produce Delivered to Your Doorstep
      </h1>
      <p className="mt-2 text-lg font-mono">Browse and order your favorite groceries online</p>
    </div>
    <div className="image-container flex justify-end">
      <img
        src={grocery2}
        alt="banner"
        className="w-[600px] h-[400px] object-contain"
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
  );
};

export default HeroSection;