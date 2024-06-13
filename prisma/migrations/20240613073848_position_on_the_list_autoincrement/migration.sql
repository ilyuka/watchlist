-- AlterTable
CREATE SEQUENCE movieonlist_positiononthelist_seq;
ALTER TABLE "MovieOnList" ALTER COLUMN "positionOnTheList" SET DEFAULT nextval('movieonlist_positiononthelist_seq');
ALTER SEQUENCE movieonlist_positiononthelist_seq OWNED BY "MovieOnList"."positionOnTheList";
