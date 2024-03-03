/*
  Warnings:

  - A unique constraint covering the columns `[listId,movieId,positionOnTheList]` on the table `MovieOnList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MovieOnList_listId_movieId_key";

-- AlterTable
ALTER TABLE "MovieOnList" ADD COLUMN     "positionOnTheList" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "MovieOnList_listId_movieId_positionOnTheList_key" ON "MovieOnList"("listId", "movieId", "positionOnTheList");
