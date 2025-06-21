CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50)
);
--> statement-breakpoint
ALTER TABLE "seats" DROP CONSTRAINT "uniqueRowCol";--> statement-breakpoint
ALTER TABLE "seats" ADD COLUMN "room_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "uniqueRowColRoom" UNIQUE("row","col","room_id");