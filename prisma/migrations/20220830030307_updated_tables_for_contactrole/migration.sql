/*
  Warnings:

  - You are about to drop the column `role` on the `ContactsOnProjects` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `ContactsOnProjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactsOnProjects" DROP COLUMN "role",
ADD COLUMN     "roleId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ContactRole";

-- CreateTable
CREATE TABLE "ContactRole" (
    "id" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "ContactRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactsOnProjects" ADD CONSTRAINT "ContactsOnProjects_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ContactRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
