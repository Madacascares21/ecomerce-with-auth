import { Button } from "@/components/ui/button";

export default function EmptyState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        Nu au fost găsite produse cu filtrele selectate.
      </p>
      <Button variant="outline" className="mt-4 bg-transparent" onClick={onReset}>
        Resetează filtrele
      </Button>
    </div>
  );
}
