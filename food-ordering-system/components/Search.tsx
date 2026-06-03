"use client";

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Search({
  search,
  setSearch,
}: SearchProps) {
  return (
   <input
  type="text"
  placeholder=" Search food..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
/>
  );
}