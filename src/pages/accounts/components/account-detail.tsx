import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAccountById } from '@/helper/data-api';
import { DetailViewLayout, DetailSection, DetailField } from '@/components/custom/detail-view-layout';
import { StatusBadge } from '@/components/custom/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function AccountDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: account, isLoading } = useQuery({
        queryKey: ['account', id],
        queryFn: () => getAccountById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (!account) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Account not found</p>
            </div>
        );
    }

    const roleColors: Record<string, string> = {
        SUPER_ADMIN: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        ADMIN: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        MANAGER: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        USER: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    };

    return (
        <DetailViewLayout
            title={account.fullName}
            description={`@${account.username}`}
            backUrl="/dashboard/accounts"
        >
            <div className="space-y-8">
                <DetailSection title="Account Information" columns={2}>
                    <DetailField label="Full Name" value={account.fullName} />
                    <DetailField label="Username" value={<span className="font-mono">{account.username}</span>} />
                    <DetailField label="Email" value={account.email} />
                    <DetailField
                        label="Role"
                        value={
                            <Badge variant="outline" className={`text-xs ${roleColors[account.role]}`}>
                                {account.role.replace('_', ' ')}
                            </Badge>
                        }
                    />
                    <DetailField
                        label="Status"
                        value={<StatusBadge status={account.status} />}
                    />
                    <DetailField
                        label="SMS Monthly Limit"
                        value={`${account.smsMonthlyLimit.toLocaleString()} messages`}
                    />
                </DetailSection>

                <DetailSection title="Activity Information" columns={2}>
                    <DetailField
                        label="Last Login"
                        value={account.lastLogin ? format(new Date(account.lastLogin), 'MMMM dd, yyyy HH:mm') : 'Never logged in'}
                    />
                    <DetailField
                        label="Account Created"
                        value={format(new Date(account.dateCreated), 'MMMM dd, yyyy')}
                    />
                </DetailSection>
            </div>
        </DetailViewLayout>
    );
}
