import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { DataTableRowActions } from '@/components/custom/data-table-row-actions';
import { StatusBadge } from '@/components/custom/status-badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface TransactionDataTableProps {
    data: Transaction[];
    isLoading?: boolean;
}

export function TransactionDataTable({ data, isLoading }: TransactionDataTableProps) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: 'invoiceNumber',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Invoice No." />
            ),
            cell: ({ row }) => {
                return <div className="font-mono font-medium text-sm">{row.getValue('invoiceNumber')}</div>;
            },
        },
        {
            accessorKey: 'customerName',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Customer" />
            ),
            cell: ({ row }) => {
                return <div className="text-sm">{row.getValue('customerName')}</div>;
            },
        },
        {
            accessorKey: 'method',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Payment Method" />
            ),
            cell: ({ row }) => {
                const method = row.getValue('method') as string;
                const methodLabels: Record<string, string> = {
                    'M-PESA': 'M-PESA',
                    'BANK_TRANSFER': 'Bank Transfer',
                    'CREDIT_CARD': 'Credit Card',
                    'AIRTEL_MONEY': 'Airtel Money',
                    'TIGO_PESA': 'Tigo Pesa',
                };
                return <div className="text-sm">{methodLabels[method] || method}</div>;
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'msisdn',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="MSISDN" />
            ),
            cell: ({ row }) => {
                return <div className="text-sm">{row.getValue('msisdn')}</div>;
            },
        },
        {
            accessorKey: 'smsQuantity',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="SMS Qty" />
            ),
            cell: ({ row }) => {
                const quantity = row.getValue('smsQuantity') as number;
                return <div className="text-sm font-medium">{quantity.toLocaleString()}</div>;
            },
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Amount" />
            ),
            cell: ({ row }) => {
                const amount = row.getValue('amount') as number;
                return (
                    <div className="text-sm font-semibold">
                        TZS {amount.toLocaleString()}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                return <StatusBadge status={status} />;
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'paymentDate',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Payment Date" />
            ),
            cell: ({ row }) => {
                const date = row.getValue('paymentDate') as string;
                return (
                    <div className="text-sm text-muted-foreground">
                        {format(new Date(date), 'MMM dd, yyyy')}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                return (
                    <DataTableRowActions
                        row={row}
                        onView={(transaction) => {
                            navigate(`/dashboard/transactions/${transaction.id}`);
                        }}
                    />
                );
            },
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            searchKey="invoiceNumber"
            searchPlaceholder="Search by invoice number..."
        />
    );
}
