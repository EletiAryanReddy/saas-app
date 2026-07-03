"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<any[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const workspaceId =
    "6a2c2c86bd54aa6fdf34690a";

  const createdBy =
    "6a2c2bf8bd54aa6fdf346908";

  const loadProjects = async () => {
    const res = await fetch(
      `${API}/projects/workspace/${workspaceId}`
    );

    const data = await res.json();

    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async () => {
    await fetch(`${API}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workspaceId,
        name,
        description,
        createdBy,
        members: [createdBy],
      }),
    });

    setName("");
    setDescription("");
    loadProjects();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="bg-white p-5 rounded shadow mb-6">
        <input
          className="border p-2 w-full mb-3"
          placeholder="Project name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Project description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createProject}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-5 rounded shadow"
          >
            <h2 className="text-xl font-semibold">
              {project.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {project.description}
            </p>

            <p className="text-sm mt-3">
              Status: {project.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}