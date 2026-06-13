ALTER TABLE `cultural_entities` MODIFY COLUMN `logoUrl` varchar(1000);--> statement-breakpoint
ALTER TABLE `cultural_entities` MODIFY COLUMN `status` enum('active','pending','archived') NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `slug` varchar(255);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `entityType` varchar(100);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `tags` text;--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `country` varchar(100) DEFAULT 'Saudi Arabia';--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `coverImageUrl` varchar(1000);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `gallery` text;--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `instagram` varchar(255);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `twitter` varchar(255);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `contactEmail` varchar(320);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `phone` varchar(50);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `socialLinks` text;--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `published` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `foundedYear` int;--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `partnershipLevel` varchar(50);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `activityLevel` varchar(50);--> statement-breakpoint
ALTER TABLE `cultural_entities` ADD `updatedBy` int;--> statement-breakpoint
ALTER TABLE `events` ADD `coverImageUrl` varchar(1000);--> statement-breakpoint
ALTER TABLE `events` ADD `communityLogoUrl` varchar(1000);--> statement-breakpoint
ALTER TABLE `events` ADD `capacity` int;--> statement-breakpoint
ALTER TABLE `events` ADD `published` boolean DEFAULT true NOT NULL;