import { z } from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z.string().email("Please enter a valid email address"),

  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must be less than 15 digits")
    .regex(/^\+?[\d\s-]+$/, "Please enter a valid contact number"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),

  photo: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Photo is required")
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "Max file size is 5MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          files[0]?.type
        ),
      "Only .jpg, .jpeg, .png and .gif formats are supported"
    ),

  cv: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "CD file is required")
    .refine(
      (files) => files[0]?.size <= 10 * 1024 * 1024,
      "Max file size is 10MB"
    )
    .refine(
      (files) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(files[0]?.type),
      "Only PDF and Word documents are allowed"
    ),
});

export type UserFormData = z.infer<typeof userFormSchema>;
