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

// Transaction Schema (used for both paid and pending tabs)
export const transactionSchema = z.object({
    id: z.string(),
    invoiceNumber: z.string(),
    billNumber: z.string(),
    customerId: z.string(),
    customerName: z.string(),
    method: z.enum(['M-PESA', 'BANK_TRANSFER', 'CREDIT_CARD', 'AIRTEL_MONEY', 'TIGO_PESA']),
    smsQuantity: z.number().int().positive(),
    amount: z.number().positive(),
    status: z.enum(['PAID', 'PENDING', 'FAILED', 'CANCELLED']),
    paymentDate: z.string(),
    description: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;

// Tariff Schema
export const tariffSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Tariff name is required'),
    description: z.string().optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']),
    dateCreated: z.string(),
});

export type Tariff = z.infer<typeof tariffSchema>;

// Tariff Band Schema
export const tariffBandSchema = z.object({
    id: z.string(),
    tariffId: z.string(),
    tariffName: z.string(),
    fromAmount: z.number().int().nonnegative(),
    toAmount: z.number().int().positive(),
    pricePerSms: z.number().positive(),
    expirationDays: z.number().int().positive(),
    status: z.enum(['ACTIVE', 'INACTIVE']),
});

export type TariffBand = z.infer<typeof tariffBandSchema>;

// Account Management Schema
export const accountSchema = z.object({
    id: z.string(),
    fullName: z.string().min(1, 'Full name is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['ADMIN', 'USER', 'MANAGER', 'SUPER_ADMIN']),
    smsMonthlyLimit: z.number().int().positive(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
    lastLogin: z.string().optional(),
    dateCreated: z.string(),
});

export type Account = z.infer<typeof accountSchema>;
