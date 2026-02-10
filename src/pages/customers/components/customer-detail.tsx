import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCustomerById } from '@/helper/data-api';
import { DetailViewLayout, DetailSection, DetailField } from '@/components/custom/detail-view-layout';
import { StatusBadge } from '@/components/custom/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function CustomerDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: customer, isLoading } = useQuery({
        queryKey: ['customer', id],
        queryFn: () => getCustomerById(id!),
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

    if (!customer) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Customer not found</p>
            </div>
        );
    }

    return (
        <DetailViewLayout
            title={customer.name}
            description={`Customer ID: ${customer.id}`}
            backUrl="/dashboard/customers"
        >
            <div className="space-y-8">
                <DetailSection title="Basic Information" columns={2}>
                    <DetailField label="Customer Name" value={customer.name} />
                    <DetailField label="Email" value={customer.email} />
                    <DetailField label="Phone" value={customer.phone} />
                    <DetailField
                        label="Account Type"
                        value={customer.type === 'PRE_PAID' ? 'Pre-Paid' : 'Post-Paid'}
                    />
                    <DetailField
                        label="Registration Date"
                        value={format(new Date(customer.dateRegistered), 'MMMM dd, yyyy')}
                    />
                    <DetailField
                        label="Status"
                        value={<StatusBadge status={customer.status} />}
                    />
                </DetailSection>

                <DetailSection title="Payment Information" columns={2}>
                    <DetailField
                        label="Payment Status"
                        value={<StatusBadge status={customer.paymentStatus} />}
                    />
                    {customer.balance !== undefined && (
                        <DetailField
                            label="Current Balance"
                            value={`TZS ${customer.balance.toLocaleString()}`}
                        />
                    )}
                    {customer.creditLimit !== undefined && (
                        <DetailField
                            label="Credit Limit"
                            value={`TZS ${customer.creditLimit.toLocaleString()}`}
                        />
                    )}
                </DetailSection>
            </div>
        </DetailViewLayout>
    );
}
