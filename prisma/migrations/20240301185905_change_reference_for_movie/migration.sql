/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MovieOnList" DROP CONSTRAINT "MovieOnList_movieId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- AddForeignKey
ALTER TABLE "MovieOnList" ADD CONSTRAINT "MovieOnList_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("tmdbId") ON DELETE CASCADE ON UPDATE CASCADE;
