import { apiClient } from './api';

export const getNotes = () => {
  return apiClient.get('/notes');
};

export const createNote = (title: string) => {
  return apiClient.post('/notes', { title });
};

export const deleteNote = (id: string) => {
  return apiClient.delete(`/notes/${id}`);
};