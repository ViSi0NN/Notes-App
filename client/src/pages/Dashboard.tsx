import { useState, useEffect, useCallback } from 'react';
import * as noteService from '../services/noteService';
import { useApi } from '../hooks/useApi';

// Redux imports
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logout } from '../store/authSlice';

import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import CreateNote from '../components/dashboard/CreateNote';
import NoteItem from '../components/dashboard/NoteItem';

interface Note {
  _id: string;
  title: string;
}

const Dashboard = () => {
  // Use Redux state and dispatch
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [notes, setNotes] = useState<Note[]>([]);

  const getNotesApi = useApi<Note[]>(noteService.getNotes);
  const createNoteApi = useApi<Note>(noteService.createNote);
  const deleteNoteApi = useApi(noteService.deleteNote);

  const fetchNotes = useCallback(async () => {
    const fetchedNotes = await getNotesApi.request();
    if (fetchedNotes) {
      setNotes(fetchedNotes);
    }
  }, []); 
  useEffect(() => {
    if (user) fetchNotes();
  }, [user, fetchNotes]);

  const handleCreateNote = async (title: string) => {
    const newNote = await createNoteApi.request(title);
    if (newNote) {
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNoteApi.request(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  if (!user) return null; // Or a redirect to login

  return (
    <div className="min-h-screen bg-gray-100 sm:bg-white">
      <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 py-8">
        <WelcomeHeader user={user} onSignOut={handleSignOut} />

        <main className="space-y-6">
          <CreateNote onCreate={handleCreateNote} loading={createNoteApi.loading} />

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 px-4 sm:px-0">Notes</h2>
            <div className="space-y-3">
              {getNotesApi.loading && <p className="text-gray-500 px-4 sm:px-0">Loading notes...</p>}
              {notes.map((note) => (
                <NoteItem key={note._id} note={note} onDelete={handleDeleteNote} />
              ))}
              {!getNotesApi.loading && notes.length === 0 && (
                <p className="text-gray-500 px-4 sm:px-0">You haven't created any notes yet.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;