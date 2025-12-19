import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import TodoItem from './TodoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([]); // always array
  const [text, setText] = useState('');

  // Load tasks from AsyncStorage
  useEffect(() => {
    const getTasksfromAsync = async () => {
      try {
        const items = await AsyncStorage.getItem('Task');
        const parsedItems = items ? JSON.parse(items) : [];
        setTasks(parsedItems);
        console.log('New Items: ', parsedItems);
      } catch (e) {
        setTasks([]);
      }
    };
    getTasksfromAsync();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!text.trim()) return;

    const newTask = { id: Date.now(), text, completed: false };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    await AsyncStorage.setItem('Task', JSON.stringify(updatedTasks));
    setText('');
  };

  // Delete Task
  const deleteTask = async id => {
    const updatedTasks = tasks.filter(task => task.id !== id);

    setTasks(updatedTasks);
    await AsyncStorage.setItem('Task', JSON.stringify(updatedTasks));
  };

  // Toggle Task Completion
  const toggleCompleted = async id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setTasks(updatedTasks);
    await AsyncStorage.setItem('Task', JSON.stringify(updatedTasks));
  };

  // Render TodoList Component
  return (
    <View>
      {tasks.length > 0
        ? tasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          ))
        : null}

      <TextInput value={text} onChangeText={setText} placeholder="New Task" />
      <Button title="Add" onPress={addTask} />
    </View>
  );
}

export default TodoList;
