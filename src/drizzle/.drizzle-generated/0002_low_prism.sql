CREATE TABLE "movies" (
	"duration" integer NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	CONSTRAINT "movies_title_unique" UNIQUE("title")
);
