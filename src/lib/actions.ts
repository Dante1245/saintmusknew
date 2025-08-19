
"use server";

import { z } from "zod";
import { generateMockPurchaseNotification } from "@/ai/flows/generate-mock-purchase-notifications";
import { supportChat } from "@/ai/flows/support-chat-flow";
import { sendWelcomeEmail, sendWithdrawalRequestEmail } from "@/lib/email";
import type { User, Transaction } from "@/lib/types";

const withdrawalSchema = z.object({
  amount: z.coerce.number().positive(),
  asset: z.string(),
  address: z.string().min(10),
});

type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

// This is a server-side representation of database access.
// In a real app, you would replace these with actual database calls.
const db = {
  getUsers: (): User[] => {
    // In a real scenario, this would be a database query.
    // For this prototype, we just return an empty array if no users are in "storage".
    return [];
  },
  saveUsers: (users: User[]) => {
    // This would be a DB write operation.
  },
  getLoggedInUser: () => {
    // This would fetch the user from a session or token.
    return null;
  }
};

export async function submitWithdrawalRequest(values: WithdrawalFormValues, userId: string) {
    const parsed = withdrawalSchema.safeParse(values);

    if (!parsed.success) {
      return { success: false, error: "Invalid data provided." };
    }

    try {
      // In a real app, you'd find the user by their ID from the session
      // const user = await db.getUserById(userId);
      // Here we simulate it, but this part is conceptual
      
      const withdrawalData = parsed.data;

      // Send email to admin
      await sendWithdrawalRequestEmail({
          userId: userId,
          amount: withdrawalData.amount,
          asset: withdrawalData.asset.toUpperCase(),
          address: withdrawalData.address
      });
      
      return { success: true, message: "Withdrawal request submitted." };

    } catch (error: any) {
        console.error("Error submitting withdrawal request:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}


export async function getMockNotification() {
  try {
    const notification = await generateMockPurchaseNotification();
    return { success: true, notification };
  } catch (error) {
    // Silently fail if Genkit isn't running or rate-limited
    // console.error("Error generating mock notification:", error);
    return { success: false, error: "Failed to generate notification." };
  }
}

const supportChatSchema = z.object({
    message: z.string(),
});

export async function submitSupportMessage(values: z.infer<typeof supportChatSchema>) {
    const parsed = supportChatSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Invalid message" };
    }
    try {
        const response = await supportChat(parsed.data);
        return { success: true, response };
    } catch (error) {
        console.error("Error getting support response:", error);
        return { success: false, error: "Failed to get response from support bot." };
    }
}
