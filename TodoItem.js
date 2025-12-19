// components/TodoItem.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          style={styles.checkbox}
        />
        <Text
          style={[styles.taskText, task.completed && styles.completedTask]}
          numberOfLines={2}
        >
          {task.text}
        </Text>
      </View>
      <Button title="X" onPress={() => deleteTask(task.id)} color="#ff3b30" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
