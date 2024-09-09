-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isLive" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "TrackProposal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "albumName" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "queued" BIGINT,
    "hits" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "TrackProposal_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artist" (
    "uri" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistToTrackProposal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ArtistToTrackProposal_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist" ("uri") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArtistToTrackProposal_B_fkey" FOREIGN KEY ("B") REFERENCES "TrackProposal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_uri_key" ON "Artist"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToTrackProposal_AB_unique" ON "_ArtistToTrackProposal"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToTrackProposal_B_index" ON "_ArtistToTrackProposal"("B");
