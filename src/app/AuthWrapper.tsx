"use client";

import { PropsWithChildren } from "react";
import { AuthProvider } from "react-oidc-context";

export default function AuthWrapper(props: PropsWithChildren) {
  return (
    <AuthProvider
      {...{
        authority: process.env.BASE_PATH + "/api",
        client_id: "b1228af77dda4977a094e8dbd73406c3",
        redirect_uri: process.env.BASE_PATH + "/admin",
        scope: "user-modify-playback-state",
        onSigninCallback: () => {
          console.log("Hello");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        },
      }}
    >
      {props.children}
    </AuthProvider>
  );
}
