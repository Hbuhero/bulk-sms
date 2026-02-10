import { z } from 'zod';

// Sender ID Schema (used for both approved and requested tabs)
export const senderIdSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    customerName: z.string(),
    senderId: z.string().min(1, 'Sender ID is required').max(11, 'Sender ID must be 11 characters or less'),
    status: z.enum(['APPROVED', 'REQUESTED', 'REJECTED']),
    dateRegistered: z.string(),
    rejectionReason: z.string().optional(),
});

export type SenderId = z.infer<typeof senderIdSchema>;
