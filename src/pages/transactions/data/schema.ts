import { z } from 'zod';

// Transaction Schema (used for both paid and pending tabs)
export const transactionSchema = z.object({
    id: z.string(),
    invoiceNumber: z.string(),
    billNumber: z.string(),
    customerId: z.string(),
    customerName: z.string(),
    msisdn: z.string(),
    method: z.enum(['M-PESA', 'BANK_TRANSFER', 'CREDIT_CARD', 'AIRTEL_MONEY', 'TIGO_PESA']),
    smsQuantity: z.number().int().positive(),
    amount: z.number().positive(),
    status: z.enum(['PAID', 'PENDING', 'FAILED', 'CANCELLED']),
    paymentDate: z.string(),
    description: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
