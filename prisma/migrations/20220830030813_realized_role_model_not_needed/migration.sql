/*
  Warnings:

  - You are about to drop the column `roleId` on the `ContactsOnProjects` table. All the data in the column will be lost.
  - You are about to drop the `ContactRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `ContactsOnProjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContactsOnProjects" DROP CONSTRAINT "ContactsOnProjects_roleId_fkey";

-- AlterTable
ALTER TABLE "ContactsOnProjects" DROP COLUMN "roleId",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "ContactRole";
