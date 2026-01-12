import { Request, Response } from "express";
import prisma from "src/libs/prisma.js";

export const createTask = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { title, projectId, assignedTo } = req.body;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const task = await prisma.task.create({
    data: {
      title,
      projectId,
      assignedTo,
    },
  });

  res.status(201).json(task);
};


export const getProjectTasks = async (
    req: Request,
    res: Response
  ) => {
    const { projectId } = req.params;
  
    const tasks = await prisma.task.findMany({
      where: { projectId } as any,
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  
    res.json(tasks);
  };
  

  export const toggleTask = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;
  
    const task = await prisma.task.update({
      where: { id } as any,
      data: {
        completed: { set: true },
      },
    });
  
    res.json(task);
  };
  
