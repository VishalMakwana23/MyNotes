import {createSlice} from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      state.push({id: Date.now().toString(), content: action.payload});
    },
    deleteNote: (state, action) => {
      return state.filter(note => note.id !== action.payload);
    },
  },
});

export const {addNote, deleteNote} = notesSlice.actions;
export default notesSlice.reducer;
