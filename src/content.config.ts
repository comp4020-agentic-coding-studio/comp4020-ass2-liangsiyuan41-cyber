import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { courseNodeSchema } from "astro-course-university/schemas";

const weekSchema = z.coerce.number().int().min(1).max(12);
const courseNodeLoader = (dir: string) =>
  glob({ pattern: ["**/*.{md,mdx}", "!**/CLAUDE.md"], base: `src/content/${dir}` });
const teacherRefs = z.array(reference("people")).min(1);

const weightedMarking = z
  .object({
    mode: z.literal("weighted"),
    criteria: z
      .array(z.object({ name: z.string().trim().min(1), weight: z.number().positive() }))
      .min(1),
  })
  .superRefine((marking, ctx) => {
    const total = marking.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    if (total !== 100) {
      ctx.addIssue({
        code: "custom",
        path: ["criteria"],
        message: `criterion weights sum to ${total}, not 100`,
      });
    }
  });

const holisticMarking = z.object({
  mode: z.literal("holistic"),
  description: z.string().trim().min(40),
});

export const collections = {
  sessions: defineCollection({
    loader: courseNodeLoader("sessions"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        date: z.coerce.date(),
        teachers: teacherRefs.optional(),
        // Optional link to a PDF lecture slide deck under public/slides/,
        // rendered as a "View Lecture Slides" button on the session page ---
        // separate from the `lectures` collection's `slides` field, which
        // only accepts the astromotion Reveal.js deck path shape.
        slides: z
          .string()
          .regex(/^\/slides\/[a-z0-9-]+\.pdf$/)
          .optional(),
        // Every week follows the same five-stage structure, so these are
        // required rather than freeform body content --- a week authored
        // without one fails the build instead of silently shipping thin.
        objectives: z.array(z.string().trim().min(1)).min(1),
        learn: z.string().trim().min(1),
        see: z.string().trim().min(1),
        think: z.string().trim().min(1),
        play: z.string().trim().min(1),
        tableCheck: z.string().trim().min(1),
      })
      .loose(),
  }),

  assessments: defineCollection({
    loader: courseNodeLoader("assessments"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        due: z.coerce.date(),
        weight: z.coerce.number().positive().max(100),
        marking: z.discriminatedUnion("mode", [weightedMarking, holisticMarking]).optional(),
      })
      .loose(),
  }),

  lectures: defineCollection({
    loader: courseNodeLoader("lectures"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        date: z.coerce.date(),
        teachers: teacherRefs.optional(),
        slides: z
          .string()
          .regex(/^\/decks\/[a-z0-9-]+\/$/)
          .optional(),
      })
      .loose(),
  }),

  // Dedicated per-week quiz pages, rendered at /quizzes/<slug>/ from
  // src/pages/quizzes/[slug].astro. File ids match the `sessions` collection
  // (week-01 … week-12), so a session links to its quiz by convention
  // (`/quizzes/${session.id}/`) with no reference field, and
  // astro-broken-links-checker (run by `pnpm check`) verifies every link
  // actually resolves.
  quizzes: defineCollection({
    loader: courseNodeLoader("quizzes"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        multipleChoice: z
          .array(
            z.object({
              question: z.string().trim().min(1),
              options: z.array(z.string().trim().min(1)).min(2).max(6),
            }),
          )
          .length(2),
        shortAnswer: z.object({ question: z.string().trim().min(1) }),
      })
      .loose(),
  }),

  people: defineCollection({
    loader: courseNodeLoader("people"),
    schema: ({ image }) =>
      z
        .object({
          title: z.string().trim().min(1),
          description: z.string().trim().min(40),
          role: z.string().trim().min(1),
          contact: z.string().trim().min(1).optional(),
          affiliation: z.string().trim().min(1).optional(),
          email: z.email().optional(),
          url: z.url().optional(),
          photo: image().optional(),
          photoAlt: z.string().trim().optional(),
          published: z.coerce.boolean().default(true),
        })
        .superRefine((person, ctx) => {
          if (person.photo && !person.photoAlt) {
            ctx.addIssue({
              code: "custom",
              path: ["photoAlt"],
              message: "describe the photo when one is supplied",
            });
          }
        }),
  }),
};
