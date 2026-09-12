-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('VIGIL', 'OATH', 'BOUNTY');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('TRIVIAL', 'STANDARD', 'HARD', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('VIGOR', 'MIND', 'ENDURANCE', 'STRENGTH', 'DEXTERITY');

-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('VIRTUE', 'VICE');

-- CreateEnum
CREATE TYPE "ItemSlot" AS ENUM ('HEAD', 'CHEST', 'HANDS', 'LEGS', 'MAIN_HAND', 'OFF_HAND', 'RING', 'TALISMAN', 'REALM', 'FRAME');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "dayStartHour" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "lifetimeRunes" INTEGER NOT NULL DEFAULT 0,
    "runesHeld" INTEGER NOT NULL DEFAULT 0,
    "health" INTEGER NOT NULL DEFAULT 50,
    "focus" INTEGER NOT NULL DEFAULT 0,
    "emberFlasks" INTEGER NOT NULL DEFAULT 3,
    "statPoints" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDay" TIMESTAMP(3),
    "lastRolloverAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "runeCache" INTEGER NOT NULL DEFAULT 0,
    "runeCacheExpires" TIMESTAMP(3),
    "restingUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeStat" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "attribute" "Attribute" NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "allocated" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AttributeStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "QuestType" NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "attribute" "Attribute" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "schedule" JSONB,
    "dueDate" TIMESTAMP(3),
    "checklist" JSONB,
    "tags" TEXT[],
    "position" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestCompletion" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "direction" "Direction" NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayKey" TEXT NOT NULL,
    "runesAwarded" INTEGER NOT NULL,
    "xpAwarded" INTEGER NOT NULL,
    "idempotencyKey" TEXT NOT NULL,

    CONSTRAINT "QuestCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dayKey" TEXT NOT NULL,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    "missedVigils" INTEGER NOT NULL DEFAULT 0,
    "flaskUsed" BOOLEAN NOT NULL DEFAULT false,
    "bonfireLit" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DayLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slot" "ItemSlot" NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "price" INTEGER NOT NULL,
    "levelReq" INTEGER NOT NULL DEFAULT 1,
    "statBonuses" JSONB,
    "iconKey" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "equipped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indulgence" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Indulgence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relic" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "criteria" JSONB NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "iconKey" TEXT NOT NULL,

    CONSTRAINT "Relic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRelic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "relicKey" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRelic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raven" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Raven_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Character_userId_key" ON "Character"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeStat_characterId_attribute_key" ON "AttributeStat"("characterId", "attribute");

-- CreateIndex
CREATE INDEX "Quest_userId_type_archived_idx" ON "Quest"("userId", "type", "archived");

-- CreateIndex
CREATE UNIQUE INDEX "QuestCompletion_idempotencyKey_key" ON "QuestCompletion"("idempotencyKey");

-- CreateIndex
CREATE INDEX "QuestCompletion_userId_dayKey_idx" ON "QuestCompletion"("userId", "dayKey");

-- CreateIndex
CREATE UNIQUE INDEX "DayLog_userId_dayKey_key" ON "DayLog"("userId", "dayKey");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_userId_itemId_key" ON "InventoryItem"("userId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Relic_key_key" ON "Relic"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UserRelic_userId_relicKey_key" ON "UserRelic"("userId", "relicKey");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeStat" ADD CONSTRAINT "AttributeStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestCompletion" ADD CONSTRAINT "QuestCompletion_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestCompletion" ADD CONSTRAINT "QuestCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayLog" ADD CONSTRAINT "DayLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indulgence" ADD CONSTRAINT "Indulgence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelic" ADD CONSTRAINT "UserRelic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelic" ADD CONSTRAINT "UserRelic_relicKey_fkey" FOREIGN KEY ("relicKey") REFERENCES "Relic"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raven" ADD CONSTRAINT "Raven_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
