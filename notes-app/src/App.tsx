import {useState} from 'react';
import './App.css';

type Note = {
   id: number
        title: string 
        content: string
};


const App = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [notes, setNotes] = useState<Note[]>([
      {
        id: 1,
        title: "test note 1",
        content: "bla bla note1"
      },
         {
        id: 2,
        title: "test note 2",
        content: "bla bla note2"
      },
       {
  id: 3,
  title: "test note 3",
  content: "bla bla note3",
},
{
  id: 4,
  title: "test note 4 ",
  content: "bla bla note4",
},
{
  id: 5,
  title: "test note 5",
  content: "bla bla note5",
},
{
  id: 6,
  title: "test note 6",
  content: "bla bla note6",
}
    ]);

    const handleAddNote = (e: React.FormEvent) => {
      e?.preventDefault();
      const newNote = {
        id: notes.length+1, 
        title, 
        content
      }
        setNotes(notes => [...notes, newNote]);
      handleCancel();
    }

    const handleNoteClick = (note: Note) => {
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
    }

    const handleUpdateNote = (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedNote) {
        return;
      }
      // else we know we have something to update
      const updatedNote = {
        id: selectedNote.id,
        title: title,
        content: content
      };

      const updatedNotesList = (notes.map((note) => note.id === updatedNote.id ? note = updatedNote: note = note));
   
      setNotes(updatedNotesList);
      handleCancel();
    }

    const handleCancel = () => {
          setTitle("");
      setContent("");
      setSelectedNote(null);
    }

    const handleDeleteNote = (e: React.FormEvent, noteId: number) => {
      e.stopPropagation(); // dont interfere with the click event, use to avoid nested onClick funkiness

      const updatedNotes = notes.filter((note) => note.id !== noteId );

      setNotes(updatedNotes);
    }
 


    return (
    <div className="app-container">
      <form className="note-form" onSubmit={(e) => selectedNote ? handleUpdateNote(e) : handleAddNote(e)}>
        <input 
          placeholder="Title"
          value={title}
          name="noteTitle" 
          required 
          className="title"
          onChange={(event) => setTitle(event.target.value)}>
        </input>
        <textarea 
          placeholder="Content" 
          value={content}
            rows={10} 
            name="noteContent"
            onChange={(event) => setContent(event.target.value)} 
            required={true}>

        </textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : 
        <button type="submit" onClick={handleAddNote}>Add Note</button>
      }
      </form>
      <div className='notes-grid'>
        {notes.map((note) => (
   <div className="note-item"
        key={`note-id: ${note.id}`}
        onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
            <button onClick={(e) => handleDeleteNote(e, note.id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
          </div>

    </div>
  );
}

export default App;
