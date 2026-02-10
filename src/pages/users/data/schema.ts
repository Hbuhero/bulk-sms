import { z } from 'zod';

// User Schema
export const userSchema = z.object({
    id: z.string(),
    fullName: z.string().min(1, 'Full name is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['ADMIN', 'USER', 'MANAGER']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'DISABLED']),
    registrationDate: z.string(),
    lastLogin: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
