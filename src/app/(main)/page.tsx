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
      
      <QueryProductLayout title="Produse Noi">
        <NewProductSection href="/produse-noi" />
      </QueryProductLayout>

      <QueryProductLayout title="Cele mai vandute">
        <BestSellerProductSection href="/cele-mai-vandute" />
      </QueryProductLayout>
    </>
  );
};

export default page;
