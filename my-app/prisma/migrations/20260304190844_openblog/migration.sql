/*
  Warnings:

  - A unique constraint covering the columns `[email,token]` on the table `EmailVerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EmailVerificationToken_email_key";

-- AlterTable
ALTER TABLE "EmailVerificationToken" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_email_token_key" ON "EmailVerificationToken"("email", "token");
