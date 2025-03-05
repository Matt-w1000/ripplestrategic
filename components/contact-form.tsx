"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ContactFormData } from "@/lib/types"
import { submitContactForm } from "@/lib/actions"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(8, { message: "Please enter a valid phone number" }),
  organisation: z.string().min(2, { message: "Organisation must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      organisation: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormData) {
    try {
      setIsSubmitting(true)
      setError(null)

      const result = await submitContactForm(data)

      if (result.success) {
        setIsSuccess(true)
        form.reset()
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <div className="rounded-[8px] overflow-hidden relative bg-gray-100 dark:bg-zinc-900">
          <div className="p-8 sm:p-12">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-daybreak-light/10 dark:from-daybreak/10 to-transparent" />
            </div>
            <div className="relative z-10 text-center space-y-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-daybreak-light/10 dark:bg-daybreak/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-daybreak-light dark:text-daybreak" />
              </div>
              <div className="space-y-4">
                <h3 className="text-h2-mobile sm:text-h2-sm font-bold text-nightshift dark:text-white tracking-[-0.03em]">
                  Thank you for your enquiry
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-[18px] lg:text-xl xl:text-[1.3rem] font-light leading-relaxed">
                  We will be in touch with you shortly.
                </p>
              </div>
              <Button
                onClick={() => {
                  setIsSuccess(false)
                  form.reset()
                }}
                className="rounded-full bg-nightshift text-white dark:bg-white dark:text-black hover:bg-nightshift/80 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black text-base font-semibold border-none mt-4"
              >
                Send another message
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="rounded-[6px] bg-white dark:bg-white/10 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="rounded-[6px] bg-white dark:bg-white/10 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Organisation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Organisation"
                    className="rounded-[6px] bg-white dark:bg-white/10 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="rounded-[6px] bg-white dark:bg-white/10 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Message"
                  className="rounded-[6px] bg-white dark:bg-white/10 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/50 rounded-lg p-3">
            {error}
          </div>
        )}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-nightshift text-white dark:bg-white dark:text-black hover:bg-nightshift/80 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black w-full sm:w-auto text-base font-semibold border-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

