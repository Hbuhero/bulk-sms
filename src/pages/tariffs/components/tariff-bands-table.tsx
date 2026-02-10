import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { TariffBand } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { StatusBadge } from '@/components/custom/status-badge';
import { Badge } from '@/components/ui/badge';

interface TariffBandsTableProps {
    bands: TariffBand[];
}

export function TariffBandsTable({ bands }: TariffBandsTableProps) {
    const columns: ColumnDef<TariffBand>[] = [
        {
            accessorKey: 'fromAmount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="From Quantity" />
            ),
            cell: ({ row }) => {
                const amount = row.getValue('fromAmount') as number;
                return <div className="font-medium">{amount.toLocaleString()}</div>;
            },
        },
        {
            accessorKey: 'toAmount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="To Quantity" />
            ),
            cell: ({ row }) => {
                const amount = row.getValue('toAmount') as number;
                return <div className="font-medium">{amount.toLocaleString()}</div>;
            },
        },
        {
            accessorKey: 'pricePerSms',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Price per SMS" />
            ),
            cell: ({ row }) => {
                const price = row.getValue('pricePerSms') as number;
                return (
                    <div className="text-sm font-semibold text-primary">
                        TZS {price.toLocaleString()}
                    </div>
                );
            },
        },
        {
            accessorKey: 'expirationDays',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Expiry Period" />
            ),
            cell: ({ row }) => {
                const days = row.getValue('expirationDays') as number;
                return (
                    <Badge variant="secondary" className="text-xs">
                        {days} {days === 1 ? 'day' : 'days'}
                    </Badge>
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
    ];

    if (bands.length === 0) {
        return (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
                <p>No pricing bands configured for this tariff</p>
            </div>
        );
    }

    return (
        <DataTable
            columns={columns}
            data={bands}
            searchKey="fromAmount"
            searchPlaceholder="Search bands..."
        />
    );
}
