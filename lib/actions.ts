"use server"

import { Resend } from "resend"
import { z } from "zod"
import type { ContactFormData } from "./types"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email template for form submissions
function getEmailTemplate(data: ContactFormData) {
  return `
    New Contact Form Submission

    Name: ${data.name}
    Phone: ${data.phone}
    Organisation: ${data.organisation}
    Email: ${data.email}
    Message: ${data.message}
  `
}

// Validation schema
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  organisation: z.string().min(2, "Organisation must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate the data
    const validatedData = schema.parse(data)

    // Send email using Resend
    await resend.emails.send({
      from: "Ripple Strategic Website <contact@ripplestrategic.com.au>",
      to: ["stuart@ripplestrategic.com.au"],
      subject: "New Contact Form Submission - Ripple Strategic",
      text: getEmailTemplate(validatedData),
      reply_to: validatedData.email,
    })

    return { success: true }
  } catch (error) {
    console.error("Form submission error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Please check your input and try again.",
      }
    }

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

