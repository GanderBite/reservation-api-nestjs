CREATE TABLE "prices" (
	"category" text NOT NULL,
	"currency" varchar(3) NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"value" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "seats" ADD COLUMN "price_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_price_id_prices_id_fk" FOREIGN KEY ("price_id") REFERENCES "public"."prices"("id") ON DELETE no action ON UPDATE no action;