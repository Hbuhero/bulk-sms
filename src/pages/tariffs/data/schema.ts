import { z } from 'zod';

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
    fromAmount: z.number().int().min(0),
    toAmount: z.number().int().positive(),
    pricePerSms: z.number().positive(),
    expirationDays: z.number().int().positive(),
    status: z.enum(['ACTIVE', 'INACTIVE']),
});

export type TariffBand = z.infer<typeof tariffBandSchema>;
