import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Customer } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { DataTableRowActions } from '@/components/custom/data-table-row-actions';
import { StatusBadge } from '@/components/custom/status-badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface CustomerDataTableProps {
    data: Customer[];
    isLoading?: boolean;
}

export function CustomerDataTable({ data, isLoading }: CustomerDataTableProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const columns: ColumnDef<Customer>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Customer Name" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="font-medium">{row.getValue('name')}</div>
                );
            },
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
                return <div className="text-sm text-muted-foreground">{row.getValue('email')}</div>;
            },
        },
        {
            accessorKey: 'phone',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Phone" />
            ),
            cell: ({ row }) => {
                return <div className="text-sm">{row.getValue('phone')}</div>;
            },
        },
        {
            accessorKey: 'type',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Type" />
            ),
            cell: ({ row }) => {
                const type = row.getValue('type') as string;
                return (
                    <div className="text-sm">
                        {type === 'PRE_PAID' ? 'Pre-Paid' : 'Post-Paid'}
                    </div>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'paymentStatus',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Payment" />
            ),
            cell: ({ row }) => {
                const status = row.getValue('paymentStatus') as string;
                return <StatusBadge status={status} />;
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
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
            accessorKey: 'dateRegistered',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Registration Date" />
            ),
            cell: ({ row }) => {
                const date = row.getValue('dateRegistered') as string;
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
                const navigate = useNavigate();

                return (
                    <DataTableRowActions
                        row={row}
                        onView={(customer) => {
                            navigate(`/dashboard/customers/${customer.id}`);
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
            searchKey="name"
            searchPlaceholder="Search customers..."
        />
    );
}
