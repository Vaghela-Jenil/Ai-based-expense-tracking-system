import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
    id: "welth-app",
    name: "Welth App",
    retryFunction: async (attempt) => ({
        delay: Math.pow(2, attempt) * 1000, // Exponential backoff
        maxAttempts: 5, 
    })
});
