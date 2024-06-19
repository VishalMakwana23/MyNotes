import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addNote, deleteNote} from '../redux/notesSlice';

const NotesScreen = () => {
  const [noteContent, setNoteContent] = useState('');
  const notes = useSelector(state => state.notes);
  const dispatch = useDispatch();

  const handleAddNote = useCallback(() => {
    if (noteContent.trim()) {
      dispatch(addNote(noteContent));
      setNoteContent('');
    }
  }, [dispatch, noteContent]);

  const handleDeleteNote = useCallback(
    id => {
      dispatch(deleteNote(id));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.noteItem}>
        <Text style={styles.noteContent}>{item.content}</Text>
        <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleDeleteNote],
  );

  const memoizedNotes = useMemo(() => notes, [notes]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter note"
        value={noteContent}
        onChangeText={setNoteContent}
      />
      <Button
        title="Add Note"
        onPress={handleAddNote}
        disabled={!noteContent}
      />
      <FlatList
        data={memoizedNotes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  noteContent: {
    flex: 1,
  },
  deleteButton: {
    color: 'red',
  },
});

export default NotesScreen;
