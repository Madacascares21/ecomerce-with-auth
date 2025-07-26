export default function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
    >
      <option value="none">Sortează după</option>
      <option value="price-asc">Preț (crescător)</option>
      <option value="price-desc">Preț (descrescător)</option>
      <option value="name-asc">Alfabetic (A-Z)</option>
      <option value="name-desc">Alfabetic (Z-A)</option>
    </select>
  );
}
