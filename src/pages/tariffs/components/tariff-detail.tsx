import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTariffById, getTariffBandsByTariffId } from '@/helper/data-api';
import { DetailViewLayout, DetailSection, DetailField } from '@/components/custom/detail-view-layout';
import { StatusBadge } from '@/components/custom/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TariffBandsTable } from './tariff-bands-table';

export default function TariffDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: tariff, isLoading: tariffLoading } = useQuery({
        queryKey: ['tariff', id],
        queryFn: () => getTariffById(id!),
        enabled: !!id,
    });

    const { data: tariffBands, isLoading: bandsLoading } = useQuery({
        queryKey: ['tariffBands', id],
        queryFn: () => getTariffBandsByTariffId(id!),
        enabled: !!id,
    });

    if (tariffLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (!tariff) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Tariff not found</p>
            </div>
        );
    }

    return (
        <DetailViewLayout
            title={tariff.name}
            description={tariff.description || `Tariff ID: ${tariff.id}`}
            backUrl="/dashboard/tariffs"
        >
            <div className="space-y-8">
                <DetailSection title="Tariff Information" columns={2}>
                    <DetailField label="Tariff Name" value={tariff.name} />
                    <DetailField
                        label="Status"
                        value={<StatusBadge status={tariff.status} />}
                    />
                    <DetailField
                        label="Created Date"
                        value={format(new Date(tariff.dateCreated), 'MMMM dd, yyyy')}
                    />
                    {tariff.description && (
                        <DetailField label="Description" value={tariff.description} />
                    )}
                </DetailSection>

                {/* Tariff Bands Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing Bands</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            View pricing tiers based on SMS quantity
                        </p>
                    </CardHeader>
                    <CardContent>
                        {bandsLoading ? (
                            <div className="flex items-center justify-center h-32">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <TariffBandsTable bands={tariffBands || []} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DetailViewLayout>
    );
}
