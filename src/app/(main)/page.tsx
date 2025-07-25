import CategorySection from "@/components/CategorySection";
import HeroCarousel from "@/components/Hero/HeroCarousel";
import QueryProductLayout from "@/components/QueryProductLayout";
import BestDiscountsProductSection from "@/components/Sections/BestDiscountProducts";
import BestSellerProductSection from "@/components/Sections/BestSellerProducts";
import NewProductSection from "@/components/Sections/ProductSection";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <HeroCarousel />
      {/* <CategorySection /> */}

      <QueryProductLayout title="Cele mai vandute">
        <BestSellerProductSection />
      </QueryProductLayout>

      <QueryProductLayout title="Produse Noi">
        <NewProductSection />
      </QueryProductLayout>

      <QueryProductLayout title="Discount">
        <BestDiscountsProductSection />
      </QueryProductLayout>
    </>
  );
};

export default page;
