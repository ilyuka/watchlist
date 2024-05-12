-- DropIndex
DROP INDEX "MovieLike_userId_movieId_key";

-- AlterTable
ALTER TABLE "MovieLike" ADD CONSTRAINT "MovieLike_pkey" PRIMARY KEY ("userId", "movieId");
