import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/helper/data-api';
import { DetailViewLayout, DetailSection, DetailField } from '@/components/custom/detail-view-layout';
import { StatusBadge } from '@/components/custom/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: user, isLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id!),
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

    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">User not found</p>
            </div>
        );
    }

    return (
        <DetailViewLayout
            title={user.fullName}
            description={`Username: ${user.username}`}
            backUrl="/dashboard/users"
        >
            <div className="space-y-8">
                <DetailSection title="User Information" columns={2}>
                    <DetailField label="Full Name" value={user.fullName} />
                    <DetailField label="Username" value={user.username} />
                    <DetailField label="Email" value={user.email} />
                    <DetailField label="Role" value={user.role} />
                    <DetailField
                        label="Status"
                        value={<StatusBadge status={user.status} />}
                    />
                    <DetailField
                        label="Registration Date"
                        value={format(new Date(user.registrationDate), 'MMMM dd, yyyy')}
                    />
                </DetailSection>

                <DetailSection title="Activity Information" columns={2}>
                    <DetailField
                        label="Last Login"
                        value={user.lastLogin ? format(new Date(user.lastLogin), 'MMMM dd, yyyy HH:mm') : 'Never logged in'}
                    />
                </DetailSection>
            </div>
        </DetailViewLayout>
    );
}
