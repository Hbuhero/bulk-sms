import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Account } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { DataTableRowActions } from '@/components/custom/data-table-row-actions';
import { StatusBadge } from '@/components/custom/status-badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface AccountDataTableProps {
    data: Account[];
    isLoading?: boolean;
}

export function AccountDataTable({ data, isLoading }: AccountDataTableProps) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const columns: ColumnDef<Account>[] = [
        {
            accessorKey: 'fullName',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Full Name" />
            ),
            cell: ({ row }) => {
                return <div className="font-medium">{row.getValue('fullName')}</div>;
            },
        },
        {
            accessorKey: 'username',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Username" />
            ),
            cell: ({ row }) => {
                return <div className="text-sm font-mono">{row.getValue('username')}</div>;
            },
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
                return <div className="text-sm">{row.getValue('email')}</div>;
            },
        },
        {
            accessorKey: 'role',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Role" />
            ),
            cell: ({ row }) => {
                const role = row.getValue('role') as string;
                const roleColors: Record<string, string> = {
                    SUPER_ADMIN: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
                    ADMIN: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                    MANAGER: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                    USER: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                };
                return (
                    <Badge variant="outline" className={`text-xs ${roleColors[role]}`}>
                        {role.replace('_', ' ')}
                    </Badge>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: 'smsMonthlyLimit',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="SMS Limit" />
            ),
            cell: ({ row }) => {
                const limit = row.getValue('smsMonthlyLimit') as number;
                return <div className="text-sm font-medium">{limit.toLocaleString()} / month</div>;
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
            accessorKey: 'lastLogin',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Last Login" />
            ),
            cell: ({ row }) => {
                const lastLogin = row.getValue('lastLogin') as string | undefined;
                return (
                    <div className="text-sm text-muted-foreground">
                        {lastLogin ? format(new Date(lastLogin), 'MMM dd, yyyy') : 'Never'}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const account = row.original;
                const isSuperAdmin = account.role === 'SUPER_ADMIN';

                return (
                    <DataTableRowActions
                        row={row}
                        onView={(account) => {
                            navigate(`/dashboard/accounts/${account.id}`);
                        }}
                        onEdit={(account) => {
                            // TODO: Open edit dialog
                            console.log('Edit account:', account);
                        }}
                        // Don't show delete for super admin accounts
                        {...(!isSuperAdmin && {
                            onDelete: (account) => {
                                // TODO: Open delete confirmation
                                console.log('Delete account:', account);
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
            searchKey="fullName"
            searchPlaceholder="Search accounts..."
        />
    );
}
