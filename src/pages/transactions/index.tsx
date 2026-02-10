import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TabNavigation, Tab } from '@/components/custom/tab-navigation';
import { CheckCircle, Clock } from 'lucide-react';
import { getTransactions } from '@/helper/data-api';
import { Transaction } from './data/schema';
import { TransactionDataTable } from './components/transaction-data-table';

const tabs: Tab[] = [
    {
        id: 'paid',
        label: 'Paid',
        icon: CheckCircle,
        description: 'Completed transactions',
    },
    {
        id: 'pending',
        label: 'Pending',
        icon: Clock,
        description: 'Awaiting payment',
    },
];

export default function TransactionsPage() {
    const [activeTab, setActiveTab] = useState('paid');

    const { data: transactions, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    });

    // Filter transactions based on active tab
    const filteredTransactions = transactions?.filter((transaction: Transaction) => {
        if (activeTab === 'paid') {
            return transaction.status === 'PAID';
        } else {
            return transaction.status === 'PENDING';
        }
    }) || [];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <p className="text-muted-foreground">
                    View and track payment transactions for SMS bundles
                </p>
            </div>

            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="animate-slide-in-bottom">
                <TransactionDataTable
                    data={filteredTransactions}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
