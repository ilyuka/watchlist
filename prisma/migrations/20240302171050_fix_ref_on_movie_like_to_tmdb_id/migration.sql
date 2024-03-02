-- DropForeignKey
ALTER TABLE "MovieLike" DROP CONSTRAINT "MovieLike_movieId_fkey";

-- AddForeignKey
ALTER TABLE "MovieLike" ADD CONSTRAINT "MovieLike_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE;
