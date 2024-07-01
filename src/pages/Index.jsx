import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

const Index = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", isEditing: false },
    { id: 2, text: "Build a Todo App", isEditing: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, isEditing: false }]);
    setNewTodo("");
  };

  const handleEditTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleEditTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="mr-2"
            />
            <Button onClick={handleAddTodo}>Add Todo</Button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center mb-2">
                {todo.isEditing ? (
                  <Input
                    value={todo.text}
                    onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                    className="mr-2"
                  />
                ) : (
                  <span className="flex-1">{todo.text}</span>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => toggleEditTodo(todo.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;