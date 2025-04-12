import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const {
    name,
    phone,
    age,
    gender,
    fatherId,
    mother,
    siblingsIds,
    profession,
    nid_number,
    present_address,
    permanent_address,
  }: any = body || {};

  try {
    const existingUser = await prisma.person.findUnique({ where: { phone } });

    if (existingUser) {
      return NextResponse.json(
        { message: "Phone number already exists" },
        {
          status: 400,
        }
      );
    }

    const newUser = await prisma.person.create({
      data: {
        name,
        phone,
        age,
        gender,
        mother,
        profession,
        nid_number,
        present_address,
        permanent_address,
        father: fatherId ? { connect: { id: fatherId } } : undefined,
        siblings: siblingsIds?.length
          ? { connect: siblingsIds.map((id: any) => ({ id })) }
          : undefined,
      },
    });

    const user = await prisma.person.findUnique({
      where: { id: newUser.id },
      select: {
        id: true,
        name: true,
        age: true,
        mother: true,
        gender: true,
        profession: true,
        nid_number: true,
        present_address: true,
        permanent_address: true,
        father: true,
        siblings: true,
      },
    });

    return NextResponse.json(
      { message: "User created", user },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Error creating user" },
      { status: 500 }
    );
  }
};
