ALTER TABLE "vote" DROP CONSTRAINT "vote_option_id_poll_options_id_fk";
--> statement-breakpoint
ALTER TABLE "vote" DROP CONSTRAINT "vote_voter_id_poll_voter_id_fk";
--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_option_id_poll_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."poll_options"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_voter_id_poll_voter_id_fk" FOREIGN KEY ("voter_id") REFERENCES "public"."poll_voter"("id") ON DELETE cascade ON UPDATE no action;