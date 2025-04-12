import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const persons = await prisma.person.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        phone: true,
        gender: true,
        fatherId: true,
        children: {
          select: {
            id: true,
            name: true,
            age: true,
            phone: true,
            gender: true,
          },
        },
      },
    });

    return NextResponse.json(persons);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
