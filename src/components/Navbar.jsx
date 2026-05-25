const Navbar = ({ totalNotes }) => {
  return (
    <div className="border-b border-zinc-800 bg-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-5 flex justify-between items-center">
        <h1 className="text-3xl font-black">Notes App</h1>

        <div className="bg-zinc-800 px-4 py-2 rounded-xl font-bold">
          Total Notes: {totalNotes}
        </div>
      </div>
    </div>
  );
};

export default Navbar;