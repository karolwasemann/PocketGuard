CREATE TABLE IF NOT EXISTS "spentGoal" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"spent_goal" numeric NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "goal_idx" ON "spentGoal" ("user_id");