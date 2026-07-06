"use client";

import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "Der Vorname muss mindestens 2 Zeichen lang sein",
    }),
  last_name: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "Der Nachname muss mindestens 2 Zeichen lang sein",
    }),
  email: z.email({ message: "Bitte gib eine gültige E-Mail-Adresse ein" }),
  subject: z.string().min(3, "Der Betreff muss mindestens 3 Zeichen lang sein"),
  message: z.string().min(10, "Die Nachricht muss mindestens 10 Zeichen lang sein"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
