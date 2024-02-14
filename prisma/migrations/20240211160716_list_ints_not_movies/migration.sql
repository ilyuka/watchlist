/*
  Warnings:

  - You are about to drop the `_ListToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ListToMovie" DROP CONSTRAINT "_ListToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToMovie" DROP CONSTRAINT "_ListToMovie_B_fkey";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "movies" INTEGER[];

-- DropTable
DROP TABLE "_ListToMovie";
