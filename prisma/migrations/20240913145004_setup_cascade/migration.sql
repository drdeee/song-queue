-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrackProposal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "albumName" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'pending',
    "hits" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "TrackProposal_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TrackProposal" ("albumName", "createdAt", "eventId", "hits", "id", "imageUri", "name", "state", "uri") SELECT "albumName", "createdAt", "eventId", "hits", "id", "imageUri", "name", "state", "uri" FROM "TrackProposal";
DROP TABLE "TrackProposal";
ALTER TABLE "new_TrackProposal" RENAME TO "TrackProposal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
