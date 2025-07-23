import CategorySection from "@/components/CategorySection";
import HeroCarousel from "@/components/Hero/HeroCarousel";
import BestDiscountsProductSection from "@/components/Sections/BestDiscountProducts";
import BestSellerProductSection from "@/components/Sections/BestSellerProducts";
import NewProductSection from "@/components/Sections/ProductSection";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <HeroCarousel />
      <CategorySection />
      <Suspense fallback={<>Loading...</>}>
        <NewProductSection />
      </Suspense>
      <Suspense fallback={<>Loading...</>}>
        <BestDiscountsProductSection />
      </Suspense>
      <Suspense fallback={<>Loading...</>}>
        <BestSellerProductSection />
      </Suspense>
    </>
  );
};

export default page;
