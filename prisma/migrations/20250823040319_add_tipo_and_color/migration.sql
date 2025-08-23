/*
  Warnings:

  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Product` table. All the data in the column will be lost.
  - Added the required column `colorId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Tipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Color" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "talla" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" REAL NOT NULL,
    "fotoUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("cantidad", "createdAt", "fotoUrl", "id", "precio", "talla", "updatedAt") SELECT "cantidad", "createdAt", "fotoUrl", "id", "precio", "talla", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Tipo_nombre_key" ON "Tipo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Color_nombre_key" ON "Color"("nombre");
