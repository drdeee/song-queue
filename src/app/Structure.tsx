"use client";
import { PropsWithChildren, ReactNode } from "react";

export default function Structure(
  props: PropsWithChildren<{ title: string; top?: ReactNode }>
) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-5">{props.title}</h1>
      {props.top && <div className="mb-5">{props.top}</div>}
      {props.children}
    </div>
  );
}
