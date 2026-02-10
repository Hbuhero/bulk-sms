import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TabNavigation, Tab } from '@/components/custom/tab-navigation';
import { Users, CreditCard } from 'lucide-react';
import { getCustomers } from '@/helper/data-api';
import { Customer } from './data/schema';
import { CustomerDataTable } from './components/customer-data-table';

const tabs: Tab[] = [
    {
        id: 'prepaid',
        label: 'Pre-Paid',
        icon: Users,
        description: 'Pre-paid customers',
    },
    {
        id: 'postpaid',
        label: 'Post-Paid',
        icon: CreditCard,
        description: 'Post-paid customers',
    },
];

export default function CustomersPage() {
    const [activeTab, setActiveTab] = useState('prepaid');

    const { data: customers, isLoading } = useQuery({
        queryKey: ['customers'],
        queryFn: getCustomers,
    });

    // Filter customers based on active tab
    const filteredCustomers = customers?.filter((customer: Customer) => {
        if (activeTab === 'prepaid') {
            return customer.type === 'PRE_PAID';
        } else {
            return customer.type === 'POST_PAID';
        }
    }) || [];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                <p className="text-muted-foreground">
                    Manage your customer accounts and view their details
                </p>
            </div>

            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="animate-slide-in-bottom">
                <CustomerDataTable
                    data={filteredCustomers}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
