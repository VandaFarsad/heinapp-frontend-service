"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { parseApiError } from "../../api/helpers";
import { CheckIcon } from "../icons";
import { contactFormSchema, type ContactFormData } from "./contactFormSchema";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [generalError, setGeneralError] = useState("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setGeneralError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        throw new Error(`Server-Fehler (${response.status}): Ungültige Antwort vom Server`);
      }

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setSubmitMessage(result.message || "Vielen Dank für deine Nachricht! Wir werden uns bald bei dir melden.");
        form.reset();
      } else {
        // Handle DRF validation errors wrapped in { success: false, errors: {...} }
        const errorMsg =
          result.error ||
          result.message ||
          (result.errors && parseApiError(result.errors, `HTTP ${response.status}: ${response.statusText}`)) ||
          `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      setGeneralError(
        error instanceof Error ? error.message : "Fehler beim Senden der Nachricht. Bitte versuche es später erneut.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmitMessage("");
    setGeneralError("");
    form.reset();
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-white p-10 text-center shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Nachricht gesendet!</h3>
        <p className="mb-8 text-lg leading-relaxed text-gray-600">{submitMessage}</p>
        <button
          onClick={resetForm}
          className="transform rounded-full bg-green-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-700 hover:shadow-xl"
        >
          Neue Nachricht senden
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="shadcn-form rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl md:p-10"
    >
      {generalError && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          <p className="text-sm font-medium">{generalError}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vorname</FormLabel>
                  <FormControl>
                    <Input placeholder="Dein Vorname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nachname</FormLabel>
                  <FormControl>
                    <Input placeholder="Dein Nachname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail-Adresse *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="deine.email@beispiel.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Betreff *</FormLabel>
                <FormControl>
                  <Input placeholder="Worum geht es?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachricht *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Deine Nachricht..." rows={6} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full transform rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                Wird gesendet...
              </div>
            ) : (
              "Nachricht senden"
            )}
          </button>
        </form>
      </Form>
    </motion.div>
  );
}
