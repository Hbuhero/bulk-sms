import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/helper/data-api';
import { UserDataTable } from './components/user-data-table';

export default function UsersPage() {
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">
                    Manage system users and their permissions
                </p>
            </div>

            <div className="animate-slide-in-bottom">
                <UserDataTable
                    data={users || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
