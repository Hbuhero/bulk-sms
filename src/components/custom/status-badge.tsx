import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
    // Common statuses
    ACTIVE: { label: 'Active', variant: 'default', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
    INACTIVE: { label: 'Inactive', variant: 'secondary', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100' },
    PENDING: { label: 'Pending', variant: 'outline', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' },

    // Approval statuses
    APPROVED: { label: 'Approved', variant: 'default', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
    REQUESTED: { label: 'Requested', variant: 'outline', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
    REJECTED: { label: 'Rejected', variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },

    // Payment statuses
    PAID: { label: 'Paid', variant: 'default', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' },
    OVERDUE: { label: 'Overdue', variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
    FAILED: { label: 'Failed', variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
    CANCELLED: { label: 'Cancelled', variant: 'secondary', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100' },

    // User statuses
    DISABLED: { label: 'Disabled', variant: 'destructive', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
    SUSPENDED: { label: 'Suspended', variant: 'destructive', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status] || {
        label: status,
        variant: 'outline' as const,
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
    };

    return (
        <Badge
            variant={config.variant}
            className={cn(config.className, 'font-medium', className)}
        >
            {config.label}
        </Badge>
    );
}
