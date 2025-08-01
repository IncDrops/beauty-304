"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Journal Types
interface JournalEntry {
  id: number;
  date: string;
  content: string;
}

// To-Do Types
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// Journal Component
function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('journalEntries');
      if (saved) setEntries(JSON.parse(saved));
    } catch (error) { console.error("Could not load journal entries", error)}
  }, []);

  const saveEntries = (updatedEntries: JournalEntry[]) => {
    try {
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
        setEntries(updatedEntries);
    } catch (error) { console.error("Could not save journal entries", error)}
  };

  const handleAddEntry = () => {
    if (newEntry.trim() === '') return;
    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      content: newEntry,
    };
    saveEntries([entry, ...entries]);
    setNewEntry('');
  };

  const handleDeleteEntry = (id: number) => {
    saveEntries(entries.filter(e => e.id !== id));
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Write what's on your mind..."
        rows={4}
      />
      <Button onClick={handleAddEntry} className="w-full">
        <PlusCircle className="mr-2 h-5 w-5"/> Add Entry
      </Button>
      <div className="space-y-2 pt-4">
        {entries.map(entry => (
          <div key={entry.id} className="bg-secondary p-3 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleString()}</p>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                    <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
            </div>
            <p className="whitespace-pre-wrap">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// To-Do List Component
function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        try {
            const saved = localStorage.getItem('todoItems');
            if (saved) setTodos(JSON.parse(saved));
        } catch (error) { console.error("Could not load todos", error)}
    }, []);

    const saveTodos = (updatedTodos: TodoItem[]) => {
        try {
            localStorage.setItem('todoItems', JSON.stringify(updatedTodos));
            setTodos(updatedTodos);
        } catch (error) { console.error("Could not save todos", error)}
    };

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;
        const todo: TodoItem = { id: Date.now(), text: newTodo, completed: false };
        saveTodos([...todos, todo]);
        setNewTodo('');
    };

    const toggleTodo = (id: number) => {
        saveTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t));
    };

    const handleDeleteTodo = (id: number) => {
        saveTodos(todos.filter(t => t.id !== id));
    };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <Input 
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
        />
        <Button type="submit" size="icon"><PlusCircle className="h-5 w-5"/></Button>
      </form>
      <div className="space-y-2">
        {todos.map(todo => (
            <div key={todo.id} className="flex items-center justify-between bg-secondary p-2 rounded-lg">
                <div className="flex items-center gap-3">
                    <Checkbox id={`todo-${todo.id}`} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
                    <label htmlFor={`todo-${todo.id}`} className={`flex-grow ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>{todo.text}</label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4 text-gray-500"/>
                </Button>
            </div>
        ))}
      </div>
    </div>
  );
}


// Calendar View Component
function CalendarView() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border glassmorphic-card"
            />
        </div>
    );
}


export default function Planner() {
  return (
    <Card className="w-full max-w-2xl glassmorphic-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Planner</CardTitle>
        <CardDescription>
          Organize your thoughts, tasks, and schedule. All data is private and saved only on your device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="todo">To-Do List</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="journal" className="pt-4">
            <Journal />
          </TabsContent>
          <TabsContent value="todo" className="pt-4">
            <TodoList />
          </TabsContent>
          <TabsContent value="calendar" className="pt-4">
            <CalendarView />
          </TabsContent>
        </Tabs>
        <div className="pt-6">
            <Link href="/" passHref>
                <Button variant="outline" className="w-full">
                    Back to Home
                </Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
