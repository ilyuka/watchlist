/*
  Warnings:

  - Added the required column `backdropPath` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalLanguage` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "backdropPath" TEXT NOT NULL,
ADD COLUMN     "originalLanguage" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL;
