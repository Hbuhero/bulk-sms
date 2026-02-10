import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTransactionById } from '@/helper/data-api';
import { DetailViewLayout, DetailSection, DetailField } from '@/components/custom/detail-view-layout';
import { StatusBadge } from '@/components/custom/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function TransactionDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: transaction, isLoading } = useQuery({
        queryKey: ['transaction', id],
        queryFn: () => getTransactionById(id!),
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

    if (!transaction) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Transaction not found</p>
            </div>
        );
    }

    const methodLabels: Record<string, string> = {
        'M-PESA': 'M-PESA',
        'BANK_TRANSFER': 'Bank Transfer',
        'CREDIT_CARD': 'Credit Card',
        'AIRTEL_MONEY': 'Airtel Money',
        'TIGO_PESA': 'Tigo Pesa',
    };

    return (
        <DetailViewLayout
            title={`Invoice ${transaction.invoiceNumber}`}
            description={`Transaction ID: ${transaction.id}`}
            backUrl="/dashboard/transactions"
        >
            <div className="space-y-8">
                {/* Invoice-style card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Invoice Number</p>
                                <p className="text-lg font-mono font-semibold">{transaction.invoiceNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Bill Number</p>
                                <p className="text-lg font-mono font-semibold">{transaction.billNumber}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Customer</p>
                                <p className="text-base font-medium">{transaction.customerName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                                <p className="text-base font-medium">{methodLabels[transaction.method] || transaction.method}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">SMS Quantity</p>
                                <p className="text-2xl font-bold">{transaction.smsQuantity.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                                <p className="text-2xl font-bold text-primary">TZS {transaction.amount.toLocaleString()}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Payment Date</p>
                                <p className="text-base">{format(new Date(transaction.paymentDate), 'MMMM dd, yyyy')}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <div className="mt-1">
                                    <StatusBadge status={transaction.status} />
                                </div>
                            </div>
                        </div>

                        {transaction.description && (
                            <>
                                <Separator />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                                    <p className="text-sm">{transaction.description}</p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DetailViewLayout>
    );
}
