-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER,
    "gender" "Gender" NOT NULL,
    "mother" TEXT,
    "profession" TEXT,
    "nid_number" INTEGER,
    "present_address" TEXT,
    "permanent_address" TEXT,
    "fatherId" INTEGER,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SiblingRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SiblingRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Person_phone_key" ON "Person"("phone");

-- CreateIndex
CREATE INDEX "_SiblingRelation_B_index" ON "_SiblingRelation"("B");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiblingRelation" ADD CONSTRAINT "_SiblingRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiblingRelation" ADD CONSTRAINT "_SiblingRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
