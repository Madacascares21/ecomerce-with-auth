import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="w-full border-0 ">
          <Skeleton className="h-48 w-full rounded-t-md" />
          <CardContent className="space-y-2 pt-4">
            <Skeleton className="h-4 w-2/3" /> {/* Title */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" /> {/* Rating */}
              <Skeleton className="h-4 w-10" /> {/* (4.8) */}
            </div>
            <Skeleton className="h-4 w-24" /> {/* Price */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
