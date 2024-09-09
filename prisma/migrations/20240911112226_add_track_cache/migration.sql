-- CreateTable
CREATE TABLE "TrackCache" (
    "uri" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackCache_uri_key" ON "TrackCache"("uri");
