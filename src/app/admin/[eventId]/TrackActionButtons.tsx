"use client";
import { acceptProposal, rejectProposal } from "@/app/actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "react-oidc-context";

export default function TrackActionButtons(props: {
  trackId: string;
  trackUri: string;
}) {
  const router = useRouter();
  const auth = useAuth();

  async function queueSong() {
    await axios.post(
      "https://api.spotify.com/v1/me/player/queue?uri=" +
        encodeURIComponent(props.trackUri),
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      }
    );
    await acceptProposal(props.trackId);
    router.refresh();
  }
  return (
    <div className="flex flex-row">
      <a
        onClick={async () => {
          await rejectProposal(props.trackId);
          router.refresh();
        }}
        className="block p-2 bg-red-600 mr-1 text-foreground cursor-pointer"
      >
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </a>
      <button
        onClick={queueSong}
        disabled={!auth.isAuthenticated}
        className={
          "block p-2 bg-green-600 disabled:bg-gray-500 disabled:cursor-default text-foreground cursor-pointer"
        }
      >
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
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
    </div>
  );
}
