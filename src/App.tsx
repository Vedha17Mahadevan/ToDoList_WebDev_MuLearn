import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Check, Circle, CheckCircle2, ListTodo } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTasks(prev => [newTask, ...prev]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl shadow-lg">
              <ListTodo className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          </div>
          <p className="text-gray-600 text-lg ml-16">Stay organized and get things done</p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <form onSubmit={addTask} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                maxLength={100}
              />
            </div>
            <button
              type="submit"
              disabled={inputValue.trim() === ''}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </form>
        </div>

        {/* Task Stats */}
        {totalCount > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{totalCount}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</div>
                <div className="text-sm text-gray-500">Remaining</div>
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Add your first task above to get started on your productive journey!
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-4 p-6">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0"
                    aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg transition-all duration-300 ${
                        task.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.text}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {task.createdAt.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    aria-label="Delete task"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;