import type { Customer } from '@/pages/customers/data/schema';
import type { User } from '@/pages/users/data/schema';
import type { SenderId } from '@/pages/sender-id/data/schema';
import type { SmsTemplate } from '@/pages/sms-templates/data/schema';
import type { Transaction } from '@/pages/transactions/data/schema';
import type { Tariff, TariffBand } from '@/pages/tariffs/data/schema';
import type { Account } from '@/pages/accounts/data/schema';
import {
    dummyCustomers,
    dummyUsers,
    dummySenderIds,
    dummySmsTemplates,
    dummyTransactions,
    dummyTariffs,
    dummyTariffBands,
    dummyAccounts,
} from '@/data/dummy-data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Customer API Functions
export const getCustomers = async (): Promise<Customer[]> => {
    await delay(500);
    return dummyCustomers;
};

export const getCustomerById = async (id: string): Promise<Customer | undefined> => {
    await delay(300);
    return dummyCustomers.find(customer => customer.id === id);
};

export const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    await delay(500);
    const newCustomer: Customer = {
        ...customer,
        id: String(dummyCustomers.length + 1),
    };
    dummyCustomers.push(newCustomer);
    return newCustomer;
};

export const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<Customer> => {
    await delay(500);
    const index = dummyCustomers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');
    dummyCustomers[index] = { ...dummyCustomers[index], ...customer };
    return dummyCustomers[index];
};

export const deleteCustomer = async (id: string): Promise<void> => {
    await delay(500);
    const index = dummyCustomers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');
    dummyCustomers.splice(index, 1);
};

// User API Functions
export const getUsers = async (): Promise<User[]> => {
    await delay(500);
    return dummyUsers;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    await delay(300);
    return dummyUsers.find(user => user.id === id);
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    await delay(500);
    const newUser: User = {
        ...user,
        id: String(dummyUsers.length + 1),
    };
    dummyUsers.push(newUser);
    return newUser;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    await delay(500);
    const index = dummyUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    dummyUsers[index] = { ...dummyUsers[index], ...user };
    return dummyUsers[index];
};

export const deleteUser = async (id: string): Promise<void> => {
    await delay(500);
    const index = dummyUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    dummyUsers.splice(index, 1);
};

// Sender ID API Functions
export const getSenderIds = async (): Promise<SenderId[]> => {
    await delay(500);
    return dummySenderIds;
};

export const getSenderIdById = async (id: string): Promise<SenderId | undefined> => {
    await delay(300);
    return dummySenderIds.find(senderId => senderId.id === id);
};

export const createSenderId = async (senderId: Omit<SenderId, 'id'>): Promise<SenderId> => {
    await delay(500);
    const newSenderId: SenderId = {
        ...senderId,
        id: String(dummySenderIds.length + 1),
    };
    dummySenderIds.push(newSenderId);
    return newSenderId;
};

export const updateSenderId = async (id: string, senderId: Partial<SenderId>): Promise<SenderId> => {
    await delay(500);
    const index = dummySenderIds.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Sender ID not found');
    dummySenderIds[index] = { ...dummySenderIds[index], ...senderId };
    return dummySenderIds[index];
};

export const deleteSenderId = async (id: string): Promise<void> => {
    await delay(500);
    const index = dummySenderIds.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Sender ID not found');
    dummySenderIds.splice(index, 1);
};

// SMS Template API Functions
export const getSmsTemplates = async (): Promise<SmsTemplate[]> => {
    await delay(500);
    return dummySmsTemplates;
};

export const getSmsTemplateById = async (id: string): Promise<SmsTemplate | undefined> => {
    await delay(300);
    return dummySmsTemplates.find(template => template.id === id);
};

export const createSmsTemplate = async (template: Omit<SmsTemplate, 'id'>): Promise<SmsTemplate> => {
    await delay(500);
    const newTemplate: SmsTemplate = {
        ...template,
        id: String(dummySmsTemplates.length + 1),
    };
    dummySmsTemplates.push(newTemplate);
    return newTemplate;
};

export const updateSmsTemplate = async (id: string, template: Partial<SmsTemplate>): Promise<SmsTemplate> => {
    await delay(500);
    const index = dummySmsTemplates.findIndex(t => t.id === id);
    if (index === -1) throw new Error('SMS Template not found');
    dummySmsTemplates[index] = { ...dummySmsTemplates[index], ...template };
    return dummySmsTemplates[index];
};

export const deleteSmsTemplate = async (id: string): Promise<void> => {
    await delay(500);
    const index = dummySmsTemplates.findIndex(t => t.id === id);
    if (index === -1) throw new Error('SMS Template not found');
    dummySmsTemplates.splice(index, 1);
};

// Transaction API Functions
export const getTransactions = async (): Promise<Transaction[]> => {
    await delay(500);
    return dummyTransactions;
};

export const getTransactionById = async (id: string): Promise<Transaction | undefined> => {
    await delay(300);
    return dummyTransactions.find(transaction => transaction.id === id);
};

// Tariff API Functions
export const getTariffs = async (): Promise<Tariff[]> => {
    await delay(500);
    return dummyTariffs;
};

export const getTariffById = async (id: string): Promise<Tariff | undefined> => {
    await delay(300);
    return dummyTariffs.find(tariff => tariff.id === id);
};

export const createTariff = async (tariff: Omit<Tariff, 'id'>): Promise<Tariff> => {
    await delay(500);
    const newTariff: Tariff = {
        ...tariff,
        id: String(dummyTariffs.length + 1),
    };
    dummyTariffs.push(newTariff);
    return newTariff;
};

export const updateTariff = async (id: string, tariff: Partial<Tariff>): Promise<Tariff> => {
    await delay(500);
    const index = dummyTariffs.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Tariff not found');
    dummyTariffs[index] = { ...dummyTariffs[index], ...tariff };
    return dummyTariffs[index];
};

export const deleteTariff = async (id: string): Promise<void> => {
    await delay(500);
    const index = dummyTariffs.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Tariff not found');
    dummyTariffs.splice(index, 1);
};

// Tariff Band API Functions
export const getTariffBands = async (): Promise<TariffBand[]> => {
    await delay(500);
    return dummyTariffBands;
};

export const getTariffBandsByTariffId = async (tariffId: string): Promise<TariffBand[]> => {
    await delay(500);
    return dummyTariffBands.filter(band => band.tariffId === tariffId);
};

export const getTariffBandById = async (id: string): Promise<TariffBand | undefined> => {
    await delay(300);
    return dummyTariffBands.find(band => band.id === id);
};

export const createTariffBand = async (band: Omit<TariffBand, 'id'>): Promise<TariffBand> => {
    await delay(500);
    const newBand: TariffBand = {
        ...band,
        id: String(dummyTariffBands.length + 1),
    };
    dummyTariffBands.push(newBand);
    return newBand;
};

export const updateTariffBand = async (id: string, band: Partial<TariffBand>): Promise<TariffBand> => {
    await delay(500);
    const index = dummyTariffBands.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Tariff Band not found');
    dummyTariffBands[index] = { ...dummyTariffBands[index], ...band };
    return dummyTariffBands[index];
};

export const deleteTariffBand = async (id: string): Promise<void> => {
    await delay(500);
    const index = dummyTariffBands.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Tariff Band not found');
    dummyTariffBands.splice(index, 1);
};

// Account API Functions
export const getAccounts = async (): Promise<Account[]> => {
    await delay(500);
    return dummyAccounts;
};

export const getAccountById = async (id: string): Promise<Account | undefined> => {
    await delay(300);
    return dummyAccounts.find(account => account.id === id);
};

export const createAccount = async (account: Omit<Account, 'id'>): Promise<Account> => {
    await delay(500);
    const newAccount: Account = {
        ...account,
        id: String(dummyAccounts.length + 1),
    };
    dummyAccounts.push(newAccount);
    return newAccount;
};

export const updateAccount = async (id: string, account: Partial<Account>): Promise<Account> => {
    await delay(500);
    const index = dummyAccounts.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Account not found');
    dummyAccounts[index] = { ...dummyAccounts[index], ...account };
    return dummyAccounts[index];
};

export const deleteAccount = async (id: string): Promise<void> => {
    await delay(500);
    const index = dummyAccounts.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Account not found');
    dummyAccounts.splice(index, 1);
};
