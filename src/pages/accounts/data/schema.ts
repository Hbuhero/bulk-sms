import { z } from 'zod';

// Account Schema
export const accountSchema = z.object({
    id: z.string(),
    fullName: z.string().min(1, 'Full name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER']),
    smsMonthlyLimit: z.number().int().positive(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
    lastLogin: z.string().optional(),
    dateCreated: z.string(),
});

export type Account = z.infer<typeof accountSchema>;
