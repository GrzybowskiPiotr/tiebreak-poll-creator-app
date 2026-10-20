ALTER TABLE "poll_options" DROP CONSTRAINT "poll_options_poll_id_poll_id_fk";
--> statement-breakpoint
ALTER TABLE "poll_voter" DROP CONSTRAINT "poll_voter_poll_id_poll_id_fk";
--> statement-breakpoint
ALTER TABLE "poll_options" ADD CONSTRAINT "poll_options_poll_id_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."poll"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "poll_voter" ADD CONSTRAINT "poll_voter_poll_id_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."poll"("id") ON DELETE cascade ON UPDATE no action;