import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
};

export const POST = async (req: Request) => {
  const json = await req.json();
  const { name, email, password } = json;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return NextResponse.json(user);
};
