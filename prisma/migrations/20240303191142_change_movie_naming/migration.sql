/*
  Warnings:

  - You are about to drop the column `backdropPath` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `originalLanguage` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `originalTitle` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `posterPath` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `original_language` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_title` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ListLike" DROP CONSTRAINT "ListLike_listId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "backdropPath",
DROP COLUMN "originalLanguage",
DROP COLUMN "originalTitle",
DROP COLUMN "posterPath",
DROP COLUMN "releaseDate",
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "original_language" TEXT NOT NULL,
ADD COLUMN     "original_title" TEXT NOT NULL,
ADD COLUMN     "poster_path" TEXT,
ADD COLUMN     "release_date" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ListLike" ADD CONSTRAINT "ListLike_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
