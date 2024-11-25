/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_ownerId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "ownerId",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
