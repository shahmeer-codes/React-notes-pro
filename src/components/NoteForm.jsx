const NoteForm = ({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  handleSubmit,
  editId,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl mt-5"
    >
      <h2 className="text-2xl font-bold mb-5">
        {editId ? "Edit Note" : "Create Note"}
      </h2>
       <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-zinc-800 p-3 rounded-xl outline-none mb-4"
      />

      <textarea
        placeholder="Enter note details"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-zinc-800 p-3 rounded-xl outline-none h-40 resize-none"
      />

      <div className="flex justify-between items-center mt-2 text-sm text-zinc-400">
        <p>{description.length}/500</p>
         <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-zinc-800 p-2 rounded-xl outline-none"
        >
          <option>Personal</option>
          <option>Study</option>
          <option>Work</option>
          <option>Important</option>
        </select>
      </div>

      <button className="mt-5 bg-white text-black px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
        {editId ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default NoteForm;