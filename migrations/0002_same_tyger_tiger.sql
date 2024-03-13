CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"file_owner" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"data" text,
	"folder_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collaborators" DROP CONSTRAINT "collaborators_file_id_folders_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
