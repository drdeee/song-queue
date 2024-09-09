"use client";

import { classes } from "@/util";
import { TrackProposal } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { proposeTrack } from "../actions";

export default function Search(props: { eventId: string }) {
  const [query, setQuery] = useState("");
  const [timeout, saveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [results, setResults] = useState<Partial<TrackProposal>[]>([]);

  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [proposalSuccess, setProposalSuccess] = useState<number | null>(null);

  const search = async () => {
    console.log("search");
    saveTimeout(null);
    if (query !== "") {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&e=${props.eventId}`
      );
      setResults(await response.json());
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="w-full bg-transparent border-0 border-b-2 border-foreground focus:ring-0"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (timeout === null) {
              saveTimeout(setTimeout(search, 1500));
            }
          }}
          placeholder="Song suchen..."
        />
      </div>
      <div>
        {results.map((track) => (
          <div>
            <a
              key={track.uri}
              className={classes(
                "flex flex-row items-center p-2 duration-100 cursor-pointer",
                {
                  "bg-foreground text-background": selectedTrack === track.uri,
                  "opacity-20":
                    selectedTrack !== null && selectedTrack !== track.uri,
                }
              )}
              onClick={() =>
                setSelectedTrack(
                  selectedTrack === track.uri ? null : track.uri!
                )
              }
            >
              <div className="flex flex-row items-center mr-3 ml-1">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
                <div className="text-sm ml-1">{track.hits}</div>
              </div>
              <div>
                <Image
                  src={track.imageUri!}
                  alt={`Cover Image ${track.name}`}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex-grow ml-2">
                <div className="text-bold">{track.name}</div>
                <div className="text-sm">
                  {(track as any).artists.map((a: any) => a.name).join(", ")} |{" "}
                  {track.albumName}
                </div>
              </div>
              {selectedTrack === track.uri && (
                <div className="flex flex-row">
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTrack(null);
                    }}
                    className="block p-2 bg-red-600 mr-1 rounded-md text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </a>
                  <a
                    onClick={async (e) => {
                      console.log("hey");
                      e.stopPropagation();
                      console.log("hey");
                      const result = await proposeTrack(
                        props.eventId,
                        track.uri!
                      );
                      setProposalSuccess(result);
                      setTimeout(() => setProposalSuccess(null), 5000);
                    }}
                    className="block p-2 bg-green-600 mr-2 rounded-md text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </a>
            {selectedTrack === track.uri &&
              proposalSuccess &&
              proposalSuccess > 0 && (
                <div className="my-2 bg-green-600 p-2">
                  Dein Songwunsch ist eingegangen!
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
