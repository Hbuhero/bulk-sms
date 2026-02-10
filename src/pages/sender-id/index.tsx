import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TabNavigation, Tab } from '@/components/custom/tab-navigation';
import { CheckCircle, Clock } from 'lucide-react';
import { getSenderIds } from '@/helper/data-api';
import { SenderId } from './data/schema';
import { SenderIdDataTable } from './components/sender-id-data-table';

const tabs: Tab[] = [
    {
        id: 'approved',
        label: 'Approved',
        icon: CheckCircle,
        description: 'Approved sender IDs',
    },
    {
        id: 'requested',
        label: 'Requested',
        icon: Clock,
        description: 'Pending approval',
    },
];

export default function SenderIdPage() {
    const [activeTab, setActiveTab] = useState('approved');

    const { data: senderIds, isLoading } = useQuery({
        queryKey: ['senderIds'],
        queryFn: getSenderIds,
    });

    // Filter sender IDs based on active tab
    const filteredSenderIds = senderIds?.filter((senderId: SenderId) => {
        if (activeTab === 'approved') {
            return senderId.status === 'APPROVED';
        } else {
            return senderId.status === 'REQUESTED';
        }
    }) || [];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Sender ID Management</h1>
                <p className="text-muted-foreground">
                    View and manage customer sender IDs and approval requests
                </p>
            </div>

            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="animate-slide-in-bottom">
                <SenderIdDataTable
                    data={filteredSenderIds}
                    isLoading={isLoading}
                    activeTab={activeTab}
                />
            </div>
        </div>
    );
}
