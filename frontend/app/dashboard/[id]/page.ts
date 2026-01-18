"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");

  const loadTasks = async () => {
    const res = await api.get(`/tasks/${projectId}`);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    await api.post("/tasks", { title: taskTitle, projectId });
    setTaskTitle("");
    await loadTasks();
  };

  const toggleTask = async (id: string) => {
    await api.patch(`/tasks/${id}`);
    await loadTasks();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Project Tasks</h1>

      {/* Add task */}
      <form onSubmit={addTask} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="New task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button className="bg-black text-white px-4 rounded">Add</button>
      </form>

      {/* Task list */}
      <div className="space-y-2">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="border rounded p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
              />
              <p className={t.completed ? "line-through text-gray-500" : ""}>
                {t.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
