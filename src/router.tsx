import { createBrowserRouter, Outlet } from 'react-router-dom';
import RequireAuth from './helper/require-auth';

export const router = createBrowserRouter([
    // Public routes
    {
        path: '/',
        lazy: async () => ({
            Component: (await import('./pages/Index')).default,
        }),
    },
    {
        path: '/signup',
        lazy: async () => ({
            Component: (await import('./pages/SignUp')).default,
        }),
    },
    {
        path: '/signin',
        lazy: async () => ({
            Component: (await import('./pages/SignIn')).default,
        }),
    },
    {
        path: '/forgot-password',
        lazy: async () => ({
            Component: (await import('./pages/ForgotPassword')).default,
        }),
    },
    {
        path: '/pricing',
        lazy: async () => ({
            Component: (await import('./pages/Pricing')).default,
        }),
    },
    {
        path: '/about',
        lazy: async () => ({
            Component: (await import('./pages/About')).default,
        }),
    },
    {
        path: '/contact',
        lazy: async () => ({
            Component: (await import('./pages/Contact')).default,
        }),
    },
    {
        path: '/api',
        lazy: async () => ({
            Component: (await import('./pages/ApiTesting')).default,
        }),
    },

    // Protected routes
    {
        // element: <RequireAuth><Outlet /></RequireAuth>,
        children: [
            {
                path: '/dashboard',
                lazy: async () => ({
                    Component: (await import('./components/app-shell')).default,
                }),
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import('./pages/Dashboard')).default,
                        }),
                    },
                    {
                        path: 'customers',
                        lazy: async () => ({
                            Component: (await import('./pages/customers')).default,
                        }),
                    },
                    {
                        path: 'customers/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/customers/components/customer-detail')).default,
                        }),
                    },
                    {
                        path: 'users',
                        lazy: async () => ({
                            Component: (await import('./pages/users')).default,
                        }),
                    },
                    {
                        path: 'users/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/users/components/user-detail')).default,
                        }),
                    },
                    {
                        path: 'sender-id',
                        lazy: async () => ({
                            Component: (await import('./pages/sender-id')).default,
                        }),
                    },
                    {
                        path: 'sender-id/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/sender-id/components/sender-id-detail')).default,
                        }),
                    },
                    {
                        path: 'sms-templates',
                        lazy: async () => ({
                            Component: (await import('./pages/sms-templates')).default,
                        }),
                    },
                    {
                        path: 'sms-templates/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/sms-templates/components/template-detail')).default,
                        }),
                    },
                    {
                        path: 'whatsapp-templates',
                        lazy: async () => ({
                            Component: (await import('./pages/WhatsappTemplateManagement')).default,
                        }),
                    },
                    {
                        path: 'email-templates',
                        lazy: async () => ({
                            Component: (await import('./pages/EmailTemplateManagement')).default,
                        }),
                    },
                    {
                        path: 'send-sms',
                        lazy: async () => ({
                            Component: (await import('./pages/SendSms')).default,
                        }),
                    },
                    {
                        path: 'scheduled',
                        lazy: async () => ({
                            Component: (await import('./pages/ScheduledMessages')).default,
                        }),
                    },
                    {
                        path: 'purchase',
                        lazy: async () => ({
                            Component: (await import('./pages/PurchaseBundle')).default,
                        }),
                    },
                    {
                        path: 'contacts',
                        lazy: async () => ({
                            Component: (await import('./pages/ContactListManagement')).default,
                        }),
                    },
                    {
                        path: 'outbox',
                        lazy: async () => ({
                            Component: (await import('./pages/Outbox')).default,
                        }),
                    },
                    {
                        path: 'outbox/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/OutboxDetails')).default,
                        }),
                    },
                    {
                        path: 'api-integration',
                        lazy: async () => ({
                            Component: (await import('./pages/ApiIntegration')).default,
                        }),
                    },
                    {
                        path: 'reports',
                        lazy: async () => ({
                            Component: (await import('./pages/Reports')).default,
                        }),
                    },
                    {
                        path: 'transactions',
                        lazy: async () => ({
                            Component: (await import('./pages/transactions')).default,
                        }),
                    },
                    {
                        path: 'transactions/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/transactions/components/transaction-detail')).default,
                        }),
                    },
                    {
                        path: 'tariffs',
                        lazy: async () => ({
                            Component: (await import('./pages/tariffs')).default,
                        }),
                    },
                    {
                        path: 'tariffs/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/tariffs/components/tariff-detail')).default,
                        }),
                    },
                    {
                        path: 'accounts',
                        lazy: async () => ({
                            Component: (await import('./pages/accounts')).default,
                        }),
                    },
                    {
                        path: 'accounts/:id',
                        lazy: async () => ({
                            Component: (await import('./pages/accounts/components/account-detail')).default,
                        }),
                    },
                ],
            },
        ],
    },

    // 404 route
    {
        path: '*',
        lazy: async () => ({
            Component: (await import('./pages/NotFound')).default,
        }),
    },
]);

export default router;
