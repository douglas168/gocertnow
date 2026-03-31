import { BookOpen, Swords } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/sample-data";

interface SyllabusAccordionProps {
  sections: Section[];
  className?: string;
}

export function SyllabusAccordion({
  sections,
  className,
}: SyllabusAccordionProps) {
  return (
    <Accordion className={cn("w-full", className)}>
      {sections.map((section, idx) => (
        <AccordionItem key={idx} value={`section-${idx}`}>
          <AccordionTrigger className="cursor-pointer text-sm font-semibold hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <span>{section.title}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {section.lessons.length} 堂課
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 pb-2">
              {section.lessons.map((lesson) => (
                <li
                  key={lesson.slug}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground"
                >
                  <BookOpen className="size-3.5 shrink-0" />
                  <span>{lesson.title}</span>
                </li>
              ))}
              {section.hasQuiz && (
                <li className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-amber-400">
                  <Swords className="size-3.5 shrink-0" />
                  <span>小怪戰鬥（小測驗）</span>
                </li>
              )}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
