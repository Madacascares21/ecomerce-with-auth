"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Container from "../Container";

const slides = [
  {
    content: (
      <div className={`relative w-full h-full py-4 px-10 bg-purple-600`}>
        <Image src={"/images/banner.jpg"} alt="ss" fill className="object-cover"/>
        <Container className="grid lg:grid-cols-2 gap-8 items-center h-full sr-only">
          {/* Content */}
          <div className="text-white space-y-6 z-10 relative">
            <div className="space-y-2">
              <p className="text-sm md:text-base font-medium opacity-90 flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                Latest Tech Deals
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Premium Electronics{" "}
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-md">
                Get the newest gadgets and electronics with exclusive discounts
                and free shipping.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant={"secondary"}
                className="text-base px-8 py-3 h-auto"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Explore Deals
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white border-white hover:bg-white/20 text-base px-8 py-3 h-auto"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
            <Image
              src={"/images/shoe.png"}
              alt={"asasfa"}
              fill
              className="object-contain rounded-lg "
            />
          </div>
        </Container> 
      </div>
    ),
  },
];

export default function HeroCarousel() {
  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem key={idx}>
              <div
                className={`relative w-full h-[500px] md:h-[600px] overflow-hidden  `}
              >
                {slide.content}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm" />
      </Carousel>
    </div>
  );
}
