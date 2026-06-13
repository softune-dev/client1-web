"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarIconProps {
  name: string;
  className?: string;
}

export function SidebarIcon({ name, className }: SidebarIconProps) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (!name) return;

    fetch(`/icons/${name}.svg`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch SVG icon: ${name}`);
        }
        return res.text();
      })
      .then((text) => {
        // Convert any hardcoded dark fills or strokes to currentColor
        let processed = text
          .replace(/fill="black"/g, 'fill="currentColor"')
          .replace(/fill="#000000"/g, 'fill="currentColor"')
          .replace(/fill="#262626"/g, 'fill="currentColor"')
          .replace(/stroke="black"/g, 'stroke="currentColor"')
          .replace(/stroke="#000000"/g, 'stroke="currentColor"');

        // Remove width and height from the root <svg> tag so CSS can control it
        processed = processed.replace(/<svg([^>]*?)(width|height)="[^"]*"/g, '<svg$1');
        processed = processed.replace(/<svg([^>]*?)(width|height)="[^"]*"/g, '<svg$1');

        setSvgContent(processed);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [name]);

  if (!svgContent) {
    return <div className={cn("shrink-0 animate-pulse bg-white/10 rounded-sm h-[18px] w-[18px]", className)} />;
  }

  return (
    <div
      className={cn("shrink-0 [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-current", className)}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
