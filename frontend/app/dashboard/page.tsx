"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description?: string | null;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadProjects = async () => {
    const res = await api.get("/projects?limit=50");
    setProjects(res.data.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await api.post("/projects", { title, description });
    setTitle("");
    setDescription("");
    await loadProjects();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Projects</h1>

      {/* Create Project */}
      <form onSubmit={createProject} className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Create Project</h2>
        <input
          className="w-full border p-2 rounded"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/dashboard/projects/${p.id}`}
            className="border p-4 rounded hover:shadow"
          >
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            {p.status && (
              <p className="text-xs mt-2">
                Status: <span className="font-medium">{p.status}</span>
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
