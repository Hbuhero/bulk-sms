import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSenderIdById } from '@/helper/data-api';
import { DetailViewLayout, DetailSection, DetailField } from '@/components/custom/detail-view-layout';
import { StatusBadge } from '@/components/custom/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function SenderIdDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: senderId, isLoading } = useQuery({
        queryKey: ['senderId', id],
        queryFn: () => getSenderIdById(id!),
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

    if (!senderId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Sender ID not found</p>
            </div>
        );
    }

    return (
        <DetailViewLayout
            title={senderId.senderId}
            description={`Sender ID Details`}
            backUrl="/dashboard/sender-id"
        >
            <div className="space-y-8">
                {senderId.status === 'REJECTED' && senderId.rejectionReason && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Rejection Reason:</strong> {senderId.rejectionReason}
                        </AlertDescription>
                    </Alert>
                )}

                <DetailSection title="Sender ID Information" columns={2}>
                    <DetailField label="Sender ID" value={<span className="font-mono font-semibold">{senderId.senderId}</span>} />
                    <DetailField
                        label="Status"
                        value={<StatusBadge status={senderId.status} />}
                    />
                    <DetailField label="Customer" value={senderId.customerName} />
                    <DetailField label="Customer ID" value={senderId.customerId} />
                    <DetailField
                        label="Registration Date"
                        value={format(new Date(senderId.dateRegistered), 'MMMM dd, yyyy')}
                    />
                </DetailSection>
            </div>
        </DetailViewLayout>
    );
}
