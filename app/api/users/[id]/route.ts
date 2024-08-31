import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(user);
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const json = await req.json();
  const updatedUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      ...json,
    },
  });

  return NextResponse.json(updatedUser);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(deletedUser);
};
