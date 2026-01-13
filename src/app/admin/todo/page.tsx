'use client';

import { useState } from 'react';

export default function AdminTodo() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review new product images for Summer Collection', completed: false, tag: 'Work' },
    { id: 2, text: 'Call supplier regarding silk shipment delay', completed: true, tag: 'High Priority' },
    { id: 3, text: 'Update homepage banner for Weekend Sale', completed: false, tag: 'Marketing' },
    { id: 4, text: 'Schedule maintenance for server', completed: false, tag: 'Tech' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), text: newTask, completed: false, tag: 'General' }, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="todo-page">
      <div className="page-header">
        <h1 className="page-title">Task List</h1>
        <p className="subtitle">Manage your daily goals and errands.</p>
      </div>

      <div className="todo-container">
        
        {/* Add Task Input */}
        <form onSubmit={addTask} className="add-task-form">
          <input 
            type="text" 
            placeholder="Add a new task..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">
            <span className="material-symbols-outlined">add</span>
          </button>
        </form>

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <span className="material-symbols-outlined icon">check_circle</span>
              <p>All tasks completed! Great job.</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="checkbox-wrapper" onClick={() => toggleTask(task.id)}>
                   {task.completed ? (
                     <span className="material-symbols-outlined checked">check_box</span>
                   ) : (
                     <span className="material-symbols-outlined unchecked">check_box_outline_blank</span>
                   )}
                </div>
                <div className="task-content">
                  <span className="text">{task.text}</span>
                  <span className={`tag ${task.tag.replace(' ', '-').toLowerCase()}`}>{task.tag}</span>
                </div>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

      </div>

      <style jsx>{`
        .page-header { margin-bottom: 2rem; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; color: #1a1a1a; margin: 0; }
        .subtitle { color: #666; margin-top: 0.5rem; }

        .todo-container { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); max-width: 800px; margin: 0 auto; overflow: hidden; }

        .add-task-form { display: flex; align-items: center; padding: 1.5rem; border-bottom: 1px solid #f0f0f0; background: #fafafa; }
        .add-task-form input { flex: 1; padding: 0.8rem 1rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; outline: none; }
        .add-task-form input:focus { border-color: #d32f2f; }
        .add-task-form button { margin-left: 1rem; width: 45px; height: 45px; background: #1a1a1a; color: white; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .add-task-form button:hover { background: #d32f2f; }

        .task-list { padding: 1rem 0; }
        .empty-state { padding: 3rem; text-align: center; color: #888; }
        .empty-state .icon { font-size: 3rem; color: #ddd; margin-bottom: 1rem; }

        .task-item { display: flex; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #f9f9f9; transition: background 0.2s; }
        .task-item:last-child { border-bottom: none; }
        .task-item:hover { background: #fdfdfd; }

        .checkbox-wrapper { cursor: pointer; display: flex; align-items: center; margin-right: 1rem; color: #ccc; }
        .checkbox-wrapper .checked { color: #d32f2f; }
        
        .task-content { flex: 1; display: flex; align-items: center; gap: 1rem; }
        .text { font-size: 1rem; color: #333; transition: color 0.2s; }
        .completed .text { text-decoration: line-through; color: #aaa; }

        .tag { font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 12px; font-weight: 500; background: #f3f4f6; color: #4b5563; }
        .tag.high-priority { background: #fee2e2; color: #991b1b; }
        .tag.work { background: #e0e7ff; color: #3730a3; }
        .tag.marketing { background: #fef3c7; color: #92400e; }

        .delete-btn { background: none; border: none; color: #ddd; cursor: pointer; transition: color 0.2s; padding: 0.5rem; }
        .delete-btn:hover { color: #ef4444; }
      `}</style>
    </div>
  );
}
