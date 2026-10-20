CREATE TABLE "poll_voter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"voter_name" varchar(100) NOT NULL,
	"avatar" varchar(250),
	"poll_id" uuid NOT NULL,
	"token_hash" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vote" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"option_id" uuid NOT NULL,
	"voter_id" uuid NOT NULL,
	CONSTRAINT "vote_voter_option_unique" UNIQUE("option_id","voter_id")
);
--> statement-breakpoint
ALTER TABLE "poll_voter" ADD CONSTRAINT "poll_voter_poll_id_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."poll"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_option_id_poll_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."poll_options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_voter_id_poll_voter_id_fk" FOREIGN KEY ("voter_id") REFERENCES "public"."poll_voter"("id") ON DELETE no action ON UPDATE no action;