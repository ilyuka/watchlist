-- DropForeignKey
ALTER TABLE "MovieComment" DROP CONSTRAINT "MovieComment_movieId_fkey";

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "isWatchlist" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "MovieComment" ADD CONSTRAINT "MovieComment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE;
