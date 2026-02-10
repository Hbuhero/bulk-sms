import { useQuery } from '@tanstack/react-query';
import { getTariffs } from '@/helper/data-api';
import { TariffDataTable } from './components/tariff-data-table';

export default function TariffsPage() {
    const { data: tariffs, isLoading } = useQuery({
        queryKey: ['tariffs'],
        queryFn: getTariffs,
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tariff Management</h1>
                <p className="text-muted-foreground">
                    Manage pricing tariffs and their associated bands
                </p>
            </div>

            <div className="animate-slide-in-bottom">
                <TariffDataTable
                    data={tariffs || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
