-- DropForeignKey
ALTER TABLE "MovieOnList" DROP CONSTRAINT "MovieOnList_movieId_fkey";

-- AddForeignKey
ALTER TABLE "MovieOnList" ADD CONSTRAINT "MovieOnList_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
