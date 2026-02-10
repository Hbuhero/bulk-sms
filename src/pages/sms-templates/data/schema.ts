import { z } from 'zod';

// SMS Template Schema
export const smsTemplateSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    customerName: z.string(),
    name: z.string().min(1, 'Template name is required'),
    message: z.string().min(1, 'Message is required').max(160, 'Message must be 160 characters or less'),
    status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
    dateCreated: z.string(),
    variables: z.array(z.string()).optional(),
});

export type SmsTemplate = z.infer<typeof smsTemplateSchema>;
