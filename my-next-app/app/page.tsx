"use client";
import React from "react";

import { FlipWords } from "@/components/ui/flip-words";

const words = [
  "Hello,",
  "I'm",
  "a",
  "Frontend",
  "Developer",

]

export default function LampDemo() {
  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Build
        <FlipWords words={words} /> <br />
        websites with Aceternity UI
      </div>
    </div>
  );
}
