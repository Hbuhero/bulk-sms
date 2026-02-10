import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { DataTableRowActions } from '@/components/custom/data-table-row-actions';
import { StatusBadge } from '@/components/custom/status-badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface UserDataTableProps {
    data: User[];
    isLoading?: boolean;
}

export function UserDataTable({ data, isLoading }: UserDataTableProps) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const columns: ColumnDef<User>[] = [
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
                return <div className="text-sm">{row.getValue('username')}</div>;
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
            accessorKey: 'role',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Role" />
            ),
            cell: ({ row }) => {
                const role = row.getValue('role') as string;
                return (
                    <div className="text-sm font-medium">
                        {role}
                    </div>
                );
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
            accessorKey: 'registrationDate',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Registration Date" />
            ),
            cell: ({ row }) => {
                const date = row.getValue('registrationDate') as string;
                return (
                    <div className="text-sm text-muted-foreground">
                        {format(new Date(date), 'MMM dd, yyyy')}
                    </div>
                );
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
                return (
                    <DataTableRowActions
                        row={row}
                        onView={(user) => {
                            navigate(`/dashboard/users/${user.id}`);
                        }}
                        onEdit={(user) => {
                            // TODO: Open edit dialog
                            console.log('Edit user:', user);
                        }}
                        onDelete={(user) => {
                            // TODO: Open delete confirmation
                            console.log('Delete user:', user);
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
            searchKey="fullName"
            searchPlaceholder="Search users..."
        />
    );
}
