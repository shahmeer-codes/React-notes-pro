import { motion } from "framer-motion";
import { Trash2, Pencil, Pin } from "lucide-react";

const NoteCard = ({
  note,
  handleDelete,
  handleEdit,
  togglePin,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
    >
      <div>
        <div className="flex justify-between items-start gap-3">
          <h2 className="text-2xl font-bold break-words">
            {note.title}
          </h2>
                    <button onClick={() => togglePin(note.id)}>
            <Pin
              className={`${note.pinned ? "fill-white" : ""}`}
            />
          </button>
        </div>

        <p className="text-zinc-300 mt-4 break-words">
          {note.description}
        </p>

        <div className="mt-5 flex justify-between items-center text-sm text-zinc-400">
          <span>{note.category}</span>
          <span>{note.createdAt}</span>
        </div>
      </div>
  <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleEdit(note)}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300"
        >
          <Pencil size={18} /> Edit
        </button>

        <button
          onClick={() => handleDelete(note.id)}
          className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300"
        >
          <Trash2 size={18} /> Delete
        </button>
      </div>
    </motion.div>
  );
};

export default NoteCard;