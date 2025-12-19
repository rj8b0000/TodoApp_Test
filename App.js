import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import TodoItem from './TodoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  // Function to Add Task

  useEffect(() => {
    const getTasksfromAsync = async () => {
      const items = await AsyncStorage.getItem('Task');
      setTasks(JSON.parse(items));
      console.log('New Items: ', items);
    };
    getTasksfromAsync();
  }, []);

  const addTask = async () => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    await AsyncStorage.setItem('Task', JSON.stringify(tasks));
    setText('');
  };
  // Function to Delete Task
  const deleteTask = async id => {
    setTasks(tasks.filter(task => task.id !== id));
    await AsyncStorage.setItem('Task', JSON.stringify(tasks));
  };
  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
  // Render TodoList Component
  return (
    <View>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
      <TextInput value={text} onChangeText={setText} placeholder="New Task" />
      <Button title="Add" onPress={addTask} />
    </View>
  );
}
export default TodoList;
