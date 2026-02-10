import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { SenderId } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { DataTableRowActions } from '@/components/custom/data-table-row-actions';
import { StatusBadge } from '@/components/custom/status-badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface SenderIdDataTableProps {
    data: SenderId[];
    isLoading?: boolean;
    activeTab: string;
}

export function SenderIdDataTable({ data, isLoading, activeTab }: SenderIdDataTableProps) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const columns: ColumnDef<SenderId>[] = [
        {
            accessorKey: 'senderId',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Sender ID" />
            ),
            cell: ({ row }) => {
                return <div className="font-medium font-mono">{row.getValue('senderId')}</div>;
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
            accessorKey: 'rejectionReason',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Rejection Reason" />
            ),
            cell: ({ row }) => {
                const reason = row.getValue('rejectionReason') as string | undefined;
                return (
                    <div className="text-sm text-muted-foreground max-w-xs truncate">
                        {reason || '—'}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const senderId = row.original;

                return (
                    <DataTableRowActions
                        row={row}
                        onView={() => {
                            navigate(`/dashboard/sender-id/${senderId.id}`);
                        }}
                        // Only allow delete for approved sender IDs
                        {...(activeTab === 'approved' && {
                            onDelete: () => {
                                // TODO: Open delete confirmation
                                console.log('Delete sender ID:', senderId);
                            },
                        })}
                    />
                );
            },
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            searchKey="senderId"
            searchPlaceholder="Search sender IDs..."
        />
    );
}
