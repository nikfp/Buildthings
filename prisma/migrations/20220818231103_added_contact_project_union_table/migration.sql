/*
  Warnings:

  - You are about to drop the `_ContactToProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ContactRole" AS ENUM ('SUPERINTENDENT', 'PROJECT_MANAGER', 'OWNER', 'OTHER');

-- DropForeignKey
ALTER TABLE "_ContactToProject" DROP CONSTRAINT "_ContactToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactToProject" DROP CONSTRAINT "_ContactToProject_B_fkey";

-- DropTable
DROP TABLE "_ContactToProject";

-- CreateTable
CREATE TABLE "ContactsOnProjects" (
    "contactId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "role" "ContactRole" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "ContactsOnProjects_pkey" PRIMARY KEY ("contactId","projectId")
);

-- AddForeignKey
ALTER TABLE "ContactsOnProjects" ADD CONSTRAINT "ContactsOnProjects_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactsOnProjects" ADD CONSTRAINT "ContactsOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
