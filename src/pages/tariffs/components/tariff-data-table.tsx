import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Tariff } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { DataTableRowActions } from '@/components/custom/data-table-row-actions';
import { StatusBadge } from '@/components/custom/status-badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface TariffDataTableProps {
    data: Tariff[];
    isLoading?: boolean;
}

export function TariffDataTable({ data, isLoading }: TariffDataTableProps) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const columns: ColumnDef<Tariff>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tariff Name" />
            ),
            cell: ({ row }) => {
                return <div className="font-medium">{row.getValue('name')}</div>;
            },
        },
        {
            accessorKey: 'description',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
            cell: ({ row }) => {
                const description = row.getValue('description') as string | undefined;
                return (
                    <div className="text-sm text-muted-foreground max-w-md truncate">
                        {description || '—'}
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
            accessorKey: 'dateCreated',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created Date" />
            ),
            cell: ({ row }) => {
                const date = row.getValue('dateCreated') as string;
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
                        onView={(tariff) => {
                            navigate(`/dashboard/tariffs/${tariff.id}`);
                        }}
                        onEdit={(tariff) => {
                            // TODO: Open edit dialog
                            console.log('Edit tariff:', tariff);
                        }}
                        onDelete={(tariff) => {
                            // TODO: Open delete confirmation
                            console.log('Delete tariff:', tariff);
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
            searchPlaceholder="Search tariffs..."
        />
    );
}
