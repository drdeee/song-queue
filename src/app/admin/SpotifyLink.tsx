"use client";

import { useAuth } from "react-oidc-context";

export default function SpotifyLink() {
  const auth = useAuth();

  return (
    <div>
      <div>
        {!auth.isAuthenticated ? (
          <button
            onClick={() => {
              auth.signinPopup();
            }}
          >
            Mit Spotify verbinden
          </button>
        ) : (
          <button onClick={() => auth.signoutRedirect()}>
            Von Spotify trennen
          </button>
        )}
      </div>
    </div>
  );
}
