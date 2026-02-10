import { z } from 'zod';

// Customer Schema (used for both pre-paid and post-paid tabs)
export const customerSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    type: z.enum(['PRE_PAID', 'POST_PAID']),
    paymentStatus: z.enum(['ACTIVE', 'PENDING', 'OVERDUE']),
    status: z.enum(['ACTIVE', 'INACTIVE']),
    dateRegistered: z.string(),
    balance: z.number().optional(),
    creditLimit: z.number().optional(),
});

export type Customer = z.infer<typeof customerSchema>;
