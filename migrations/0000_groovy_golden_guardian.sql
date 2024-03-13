CREATE TABLE IF NOT EXISTS "folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"data" text,
	"folder_owner" uuid NOT NULL
);
