"use client";

import { useState } from "react";
import { createEvent } from "../actions";

export default function CreateEvent() {
  const [name, setName] = useState("");
  return (
    <div className="mb-5">
      <div className="text-2xl font-bold mb-5">Neues Event erstellen</div>
      <form className="flex w-full" action={createEvent}>
        <div className="flex-grow mr-5">
          <input
            name="name"
            value={name}
            onChange={(c) => setName(c.target.value)}
            className="w-full bg-transparent border-0 border-b-2 border-foreground focus:ring-0"
            type="text"
            placeholder="Name des Events"
          />
        </div>
        <div>
          <input
            className="bg-foreground p-2 px-3 text-background cursor-pointer disabled:cursor-default"
            type="submit"
            disabled={name === ""}
            value="Event erstellen"
          />
        </div>
      </form>
    </div>
  );
}
