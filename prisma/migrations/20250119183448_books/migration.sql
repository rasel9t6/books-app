-- CreateTable
CREATE TABLE "SavedBook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "publishedDate" TEXT,
    "pageCount" INTEGER,
    "downloadLink" TEXT,
    "webReader" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedBook_bookId_key" ON "SavedBook"("bookId");
