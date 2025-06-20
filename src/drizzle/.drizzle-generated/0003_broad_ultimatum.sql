CREATE TABLE "seats" (
	"col" integer NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"row" varchar(1) NOT NULL,
	CONSTRAINT "uniqueRowCol" UNIQUE("row","col")
);
