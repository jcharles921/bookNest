CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`author` text NOT NULL,
	`image` text NOT NULL,
	`read` integer DEFAULT false NOT NULL,
	`createAt` integer NOT NULL,
	`rating` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `preferences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sortingOrder` text NOT NULL,
	`preferredTheme` text NOT NULL
);
