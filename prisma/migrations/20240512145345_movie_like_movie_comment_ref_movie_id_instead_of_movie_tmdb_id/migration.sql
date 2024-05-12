-- DropForeignKey
ALTER TABLE "MovieComment" DROP CONSTRAINT "MovieComment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieLike" DROP CONSTRAINT "MovieLike_movieId_fkey";

-- AddForeignKey
ALTER TABLE "MovieComment" ADD CONSTRAINT "MovieComment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieLike" ADD CONSTRAINT "MovieLike_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
