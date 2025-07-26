// components/ProductCategorySkeleton.tsx

import Container from "@/components/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCategorySkeleton() {
  return (
    <Container className="flex gap-6 ">
      {/* Sidebar Filters */}
      <aside className="w-64 space-y-6">
        {/* Price Filter */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" /> {/* "Preț" label */}
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>

        {/* Size Filter */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" /> {/* "Mărimi" label */}
          <div className="space-y-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-52 w-full rounded-md" /> {/* Image */}
            <Skeleton className="h-4 w-3/4" /> {/* Title */}
            <Skeleton className="h-4 w-1/2" /> {/* Price */}
            <Skeleton className="h-4 w-1/4" /> {/* Rating */}
          </div>
        ))}
      </section>
    </Container>
  )
}
