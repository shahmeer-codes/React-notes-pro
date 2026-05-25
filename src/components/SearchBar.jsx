import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative mt-5">
      <Search className="absolute left-4 top-3 text-zinc-400" />

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-3 pl-12 outline-none"
      />
    </div>
  );
};

export default SearchBar;