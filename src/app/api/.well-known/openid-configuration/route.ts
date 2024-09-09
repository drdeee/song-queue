import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    (
      await axios.get(
        "https://accounts.spotify.com/.well-known/openid-configuration"
      )
    ).data
  );
}
