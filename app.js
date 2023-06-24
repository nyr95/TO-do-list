import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { configureStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "MARK_TODO_AS_COMPLETED":
      return state.map((todo) => (
        todo.id === action.payload.id ? { ...todo, completed: true } : todo
      ));
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload.id);
    default:
      return state;
  }
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const store = configureStore(combineReducers({ todos }));

  useEffect(() => {
    setTodos(store.getState().todos);
  }, [store]);

  const addTodo = () => {
    const newTodo = {
      text: "",
      completed: false,
    };

    store.dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  const handleComplete = (id) => {
    store.dispatch({ type: "MARK_TODO_AS_COMPLETED", payload: { id } });
  };

  const handleDelete = (id) => {
    store.dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>To Do List</Text>
      </View>
      <View style={styles.list}>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.item}>
            <Text style={styles.text}>{todo.text}</Text>
            <Button
              onPress={() => handleComplete(todo.id)}
              title={todo.completed ? "Uncomplete" : "Complete"}
            />
            <Button
              onPress={() => handleDelete(todo.id)}
              title="Delete"
            />
          </View>
        ))}
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Add a new todo..."
          onChange={handleChange}
        />
        <Button onPress={addTodo} title="Add" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
  item: {
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  input: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default App;
