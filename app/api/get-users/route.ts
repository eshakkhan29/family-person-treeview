import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = new PrismaClient();
  try {
    const persons = await prisma.person.findMany({
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

    const mergedUsers = persons.map((person: any) => {
      const allSiblings = [...person.siblings, ...person.siblingOf];
      const uniqueSiblings = Array.from(
        new Map(allSiblings.map((s) => [s.id, s])).values()
      );

      return {
        ...person,
        siblings: uniqueSiblings,
      };
    });

    return NextResponse.json(mergedUsers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
