-- CreateTable
CREATE TABLE `t2k_user` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(256) NOT NULL,
    `lastName` VARCHAR(256) NOT NULL,
    `phoneNumber` VARCHAR(256) NOT NULL,
    `totalScore` INTEGER NOT NULL,

    UNIQUE INDEX `t2k_user_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t2k_workout` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME NOT NULL,
    `description` LONGTEXT NOT NULL,
    `minutes` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `type` VARCHAR(256) NOT NULL,
    `imageUrl` VARCHAR(256) NULL,
    `totalLikes` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `t2k_workout_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t2k_workout_comment` (
    `id` VARCHAR(191) NOT NULL,
    `comment` LONGTEXT NULL,
    `workoutId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `t2k_workout_comment_workoutId_idx`(`workoutId`),
    INDEX `t2k_workout_comment_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t2k_workout_like` (
    `id` VARCHAR(191) NOT NULL,
    `workoutId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `t2k_workout_like_workoutId_idx`(`workoutId`),
    INDEX `t2k_workout_like_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t2k_session` (
    `id` VARCHAR(191) NOT NULL,
    `start` DATETIME NOT NULL,
    `end` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_t2k_sessionTot2k_user` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_t2k_sessionTot2k_user_AB_unique`(`A`, `B`),
    INDEX `_t2k_sessionTot2k_user_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
