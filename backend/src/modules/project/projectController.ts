import { Request, Response } from "express";
import prisma from "src/libs/prisma.js";

export const createProject = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { title, description } = req.body;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      ownerId: req.user.id,
    },
  });

  res.status(201).json(project);
};

export const getMyProjects = async (
  req: Request & { user?: any },
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = String(req.query.search || "");

  const projects = await prisma.project.findMany({
    where: {
      ownerId: req.user.id,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.project.count({
    where: {
      ownerId: req.user.id,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  res.json({
    data: projects,
    meta: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
};


export const updateProject = async (
    req: Request & { user?: any },
    res: Response
  ) => {
    const { id } = req.params;
  
    const project = await prisma.project.findUnique({ where: { id } as any });
  
    if (!project || project.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
  
    const updated = await prisma.project.update({
      where: { id } as any,
      data: req.body,
    });
  
    res.json(updated);
  };

  
  export const deleteProject = async (
    req: Request & { user?: any },
    res: Response
  ) => {
    const { id } = req.params;
  
    const project = await prisma.project.findUnique({ where: { id } as any });
  
    if (!project || project.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
  
    await prisma.project.delete({ where: { id } as any });
  
    res.json({ message: "Project deleted" });
  };
  
