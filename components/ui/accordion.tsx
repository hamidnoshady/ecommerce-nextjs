"use client";

import { useState } from "react";

type AccordionItem = { title: string; content: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.title ?? null);

  return (
    <div className="divide-y divide-brand-100 rounded-xl border border-brand-100">
      {items.map((item) => (
        <div key={item.title}>
          <button className="flex w-full items-center justify-between p-4 text-left text-sm font-medium" onClick={() => setOpen(open === item.title ? null : item.title)}>
            {item.title}
            <span>{open === item.title ? "−" : "+"}</span>
          </button>
          {open === item.title && <p className="px-4 pb-4 text-sm text-neutral-600">{item.content}</p>}
        </div>
      ))}
    </div>
  );
}
