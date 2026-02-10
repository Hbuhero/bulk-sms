import { useQuery } from '@tanstack/react-query';
import { getAccounts } from '@/helper/data-api';
import { AccountDataTable } from './components/account-data-table';

export default function AccountsPage() {
    const { data: accounts, isLoading } = useQuery({
        queryKey: ['accounts'],
        queryFn: getAccounts,
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
                <p className="text-muted-foreground">
                    Manage system administrator and manager accounts
                </p>
            </div>

            <div className="animate-slide-in-bottom">
                <AccountDataTable
                    data={accounts || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
