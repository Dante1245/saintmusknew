
"use server";

import { z } from "zod";
import { generateMockPurchaseNotification } from "@/ai/flows/generate-mock-purchase-notifications";
import { supportChat } from "@/ai/flows/support-chat-flow";
import { sendWelcomeEmail } from "@/lib/email";
import type { User, Transaction } from "@/lib/types";

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

  // This function would run on the server.
  // We are simulating database access using localStorage for this prototype.
  // In a real app, you would interact with a database here.
  const updateUserWithWithdrawal = (newTx: Omit<Transaction, 'id' | 'date'>) => {
    const loggedInUserJson = localStorage.getItem('loggedInUser');
    if (!loggedInUserJson) {
      throw new Error("User not found");
    }
    const loggedInUser: User = JSON.parse(loggedInUserJson);

    const usersJson = localStorage.getItem('users');
    let users: User[] = usersJson ? JSON.parse(usersJson) : [];

    let userFound = false;
    users = users.map(user => {
      if (user.id === loggedInUser.id) {
        userFound = true;
        const transactionToAdd: Transaction = {
          ...newTx,
          id: `txn_${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString().split('T')[0],
          status: 'Pending',
        };
        if (!user.transactions) {
            user.transactions = [];
        }
        user.transactions.unshift(transactionToAdd);
      }
      return user;
    });

    if (userFound) {
      localStorage.setItem('users', JSON.stringify(users));
      // Also update the loggedInUser in localStorage to reflect the new transaction
      const updatedLoggedInUser = users.find(u => u.id === loggedInUser.id);
      if (updatedLoggedInUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(updatedLoggedInUser));
      }
    } else {
      throw new Error("Could not find user to update transactions.");
    }
  };
  
  try {
    // This is where you would call the function to update the user's data
    // For the prototype, we are calling a function that uses localStorage.
    // In a real app, this server action would not have direct access to localStorage.
    // You would instead fetch the user from your DB by their ID (from session).
    
    // Note: The below call will not work as written because server actions cannot
    // directly access client-side localStorage. This is a conceptual demonstration.
    // updateUserWithWithdrawal(parsed.data);
    console.log("New withdrawal request submitted:", parsed.data);


  } catch (error: any) {
    return { success: false, error: error.message };
  }


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
