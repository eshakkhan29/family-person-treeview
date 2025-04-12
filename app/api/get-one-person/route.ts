import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const person = await prisma.person.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        age: true,
        phone: true,
        gender: true,
        mother: true,
        children: {
          select: {
            id: true,
            name: true,
            age: true,
            phone: true,
            gender: true,
          },
        },
        father: {
          select: {
            id: true,
            name: true,
            age: true,
            phone: true,
          },
        },
        siblings: {
          select: {
            id: true,
            name: true,
            age: true,
            phone: true,
            gender: true,
          },
        },
        siblingOf: {
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

    if (!person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    const allSiblings = [
      ...(person.siblings || []),
      ...(person.siblingOf || []),
    ];
    const uniqueSiblings = Array.from(
      new Map(allSiblings.map((sibling) => [sibling.id, sibling])).values()
    );

    // Create new object without siblingOf
    const { siblingOf, ...rest } = person;
    const formattedPerson = {
      ...rest,
      siblings: uniqueSiblings,
    };

    return NextResponse.json(formattedPerson);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
