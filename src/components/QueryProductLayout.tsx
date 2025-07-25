import React, { ReactNode, Suspense } from "react";
import ProductSkeletonGrid from "./Product/ProductSkeleton";
import Container from "./Container";

function QueryProductLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Container>
      <h3 className="text-xl font-bold">{title}</h3>
      <Suspense fallback={<ProductSkeletonGrid />}>{children}</Suspense>
    </Container>
  );
}

export default QueryProductLayout;
