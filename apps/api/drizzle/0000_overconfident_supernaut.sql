CREATE TYPE "public"."poll_status" AS ENUM('open', 'closed', 'reopened');--> statement-breakpoint
CREATE TYPE "public"."poll_option_status" AS ENUM('approved', 'pending');--> statement-breakpoint
CREATE TABLE "catalog_option" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"catalog_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "option_catalog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "poll" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(100) NOT NULL,
	"max_choices" integer NOT NULL,
	"close_at" timestamp with time zone NOT NULL,
	"suggestions_enabled" boolean DEFAULT false NOT NULL,
	"status" "poll_status" DEFAULT 'open' NOT NULL,
	CONSTRAINT "poll_max_choices_check" CHECK ("poll"."max_choices" >= 1 AND "poll"."max_choices" <= 5)
);
--> statement-breakpoint
CREATE TABLE "poll_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"poll_id" uuid NOT NULL,
	"status" "poll_option_status" DEFAULT 'pending' NOT NULL,
	"option_name" text NOT NULL,
	"catalog_option_id" uuid
);
--> statement-breakpoint
ALTER TABLE "catalog_option" ADD CONSTRAINT "catalog_option_catalog_id_option_catalog_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."option_catalog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "poll_options" ADD CONSTRAINT "poll_options_poll_id_poll_id_fk" FOREIGN KEY ("poll_id") REFERENCES "public"."poll"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "poll_options" ADD CONSTRAINT "poll_options_catalog_option_id_catalog_option_id_fk" FOREIGN KEY ("catalog_option_id") REFERENCES "public"."catalog_option"("id") ON DELETE no action ON UPDATE no action;