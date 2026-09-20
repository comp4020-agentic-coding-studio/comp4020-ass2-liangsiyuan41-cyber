/**
 * The two recurring grading components, matching the table on the
 * Assessments page (`src/pages/assessments/index.mdx`). They run every
 * week with no single due date, so they aren't `assessments` collection
 * entries — that collection is for the one-off, individually-briefed
 * deliverables. Kept here as data, not just prose, so their weight can be
 * checked against the collection's weights instead of only stated on the page.
 */
export const recurringGradingComponents = [
  { name: "Attendance & Table Participation", weight: 10 },
  { name: "Weekly Online Quizzes", weight: 10 },
] as const;
