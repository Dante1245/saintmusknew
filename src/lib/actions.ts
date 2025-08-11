"use server";

import { z } from "zod";
import { generateMockPurchaseNotification } from "@/ai/flows/generate-mock-purchase-notifications";

const withdrawalSchema = z.object({
  amount: z.coerce.number().positive(),
  asset: z.string(),
  address: z.string().min(10),
});

export async function submitWithdrawal(values: z.infer<typeof withdrawalSchema>) {
  const parsed = withdrawalSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid data provided." };
  }

  // In a real application, you would:
  // 1. Verify user's balance
  // 2. Save withdrawal request to the database
  // 3. Send an email confirmation to the user
  // 4. Notify admins of the new withdrawal request
  console.log("New withdrawal request submitted:", parsed.data);

  return { success: true, message: "Your withdrawal request has been submitted for processing." };
}

export async function getMockNotification() {
  try {
    const notification = await generateMockPurchaseNotification();
    return { success: true, notification };
  } catch (error) {
    console.error("Error generating mock notification:", error);
    return { success: false, error: "Failed to generate notification." };
  }
}
