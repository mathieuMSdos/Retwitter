import { z } from "zod"

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.unknown().optional()
})

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string()
})