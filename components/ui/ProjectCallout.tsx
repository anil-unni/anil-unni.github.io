"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motionVariants";

interface ProjectCalloutProps {
  title: string;
  outcome: string;
  metric: string;
  tags: string[];
}

export default function ProjectCallout({ title, outcome, metric, tags }: ProjectCalloutProps) {
  return (
    <motion.article
      variants={staggerItem}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors duration-300"
      aria-label={`Project: ${title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-foreground leading-snug">{title}</h3>
        <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase text-accent">
          {metric}
        </span>
      </div>
      <p className="text-xs text-muted leading-relaxed">{outcome}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-muted tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
