import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../libs/prisma.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ msg: "Email Already Exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    res.status(201).json({ msg: "User registered Successfully", user });
  } catch (error) {
    console.error("Halkan waa Error-ka:", error)
    res.status(500).json({ msg: "Register Failed", error:error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credential" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string, 
      {expiresIn: "7d"});
    res.json(
      {
        msg: "Login Successfully",
        token
      }
    );
  } catch (error) {
    res.status(500).json({ msg: "Register Failed" });
  }
};
