import { DataTable } from '@/components/custom/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { SmsTemplate } from '../data/schema';
import { DataTableColumnHeader } from '@/components/custom/data-table-column-header';
import { DataTableRowActions } from '@/components/custom/data-table-row-actions';
import { StatusBadge } from '@/components/custom/status-badge';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface SmsTemplateDataTableProps {
    data: SmsTemplate[];
    isLoading?: boolean;
}

export function SmsTemplateDataTable({ data, isLoading }: SmsTemplateDataTableProps) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const columns: ColumnDef<SmsTemplate>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Template Name" />
            ),
            cell: ({ row }) => {
                return <div className="font-medium">{row.getValue('name')}</div>;
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
            accessorKey: 'message',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Message Preview" />
            ),
            cell: ({ row }) => {
                const message = row.getValue('message') as string;
                const preview = message.length > 50 ? `${message.substring(0, 50)}...` : message;
                return (
                    <div className="max-w-md">
                        <p className="text-sm text-muted-foreground truncate">{preview}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {message.length} / 160 characters
                        </p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'variables',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Variables" />
            ),
            cell: ({ row }) => {
                const variables = row.getValue('variables') as string[] | undefined;
                if (!variables || variables.length === 0) {
                    return <span className="text-sm text-muted-foreground">None</span>;
                }
                return (
                    <div className="flex flex-wrap gap-1">
                        {variables.slice(0, 3).map((variable) => (
                            <Badge key={variable} variant="outline" className="text-xs">
                                {`{${variable}}`}
                            </Badge>
                        ))}
                        {variables.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{variables.length - 3}
                            </Badge>
                        )}
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
                        onView={(template) => {
                            navigate(`/dashboard/sms-templates/${template.id}`);
                        }}
                        onEdit={(template) => {
                            // TODO: Open edit dialog
                            console.log('Edit template:', template);
                        }}
                        onDelete={(template) => {
                            // TODO: Open delete confirmation
                            console.log('Delete template:', template);
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
            searchPlaceholder="Search templates..."
        />
    );
}
