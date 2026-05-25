import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";
import EmptyState from "./components/EmptyState";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Personal");

  // FIXED: Load notes directly from localStorage
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editId, setEditId] = useState(null);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedNotes = notes.map((note) =>
        note.id === editId
          ? {
              ...note,
              title,
              description,
              category,
            }
          : note
      );

      setNotes(updatedNotes);
      setEditId(null);
      toast.success("Note Updated");
    } else {
      const newNote = {
        id: uuidv4(),
        title,
        description,
        category,
        pinned: false,
        createdAt: new Date().toLocaleString(),
      };

      setNotes([newNote, ...notes]);
      toast.success("Note Added");
    }

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("Personal");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this note?");

    if (!confirmDelete) return;

    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note Deleted");
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setCategory(note.category);
    setEditId(note.id);
  };

  const togglePin = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            pinned: !note.pinned,
          }
        : note
    );

    setNotes(updatedNotes);
  };

  // Filter + sort notes
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <ToastContainer position="top-right" autoClose={2000} />

      <Navbar totalNotes={notes.length} />

      <div className="max-w-7xl mx-auto p-5">
        <SearchBar search={search} setSearch={setSearch} />

        <NoteForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          category={category}
          setCategory={setCategory}
          handleSubmit={handleSubmit}
          editId={editId}
        />

        {filteredNotes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                togglePin={togglePin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;