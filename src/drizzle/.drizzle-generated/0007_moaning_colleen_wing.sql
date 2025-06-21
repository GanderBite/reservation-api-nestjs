CREATE TABLE "discount_codes" (
	"code" varchar(10) NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"value" integer NOT NULL,
	CONSTRAINT "discount_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "showtimes" (
	"duration" integer NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"movie_id" uuid NOT NULL,
	"price_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"start_time" varchar(5)
);
--> statement-breakpoint
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_price_id_prices_id_fk" FOREIGN KEY ("price_id") REFERENCES "public"."prices"("id") ON DELETE no action ON UPDATE no action;