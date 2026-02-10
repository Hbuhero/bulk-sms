import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSmsTemplateById } from '@/helper/data-api';
import { DetailViewLayout, DetailSection, DetailField } from '@/components/custom/detail-view-layout';
import { StatusBadge } from '@/components/custom/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SmsTemplateDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: template, isLoading } = useQuery({
        queryKey: ['smsTemplate', id],
        queryFn: () => getSmsTemplateById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (!template) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Template not found</p>
            </div>
        );
    }

    return (
        <DetailViewLayout
            title={template.name}
            description={`Template ID: ${template.id}`}
            backUrl="/dashboard/sms-templates"
        >
            <div className="space-y-8">
                <DetailSection title="Template Information" columns={2}>
                    <DetailField label="Template Name" value={template.name} />
                    <DetailField label="Customer" value={template.customerName} />
                    <DetailField
                        label="Status"
                        value={<StatusBadge status={template.status} />}
                    />
                    <DetailField
                        label="Created Date"
                        value={format(new Date(template.dateCreated), 'MMMM dd, yyyy')}
                    />
                </DetailSection>

                <DetailSection title="Message Content" columns={1}>
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
                                        {template.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {template.message.length} / 160 characters
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {template.variables && template.variables.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Variables Used</h4>
                                <div className="flex flex-wrap gap-2">
                                    {template.variables.map((variable) => (
                                        <Badge key={variable} variant="secondary" className="text-sm">
                                            {`{${variable}}`}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    These variables will be replaced with actual values when sending messages
                                </p>
                            </div>
                        )}
                    </div>
                </DetailSection>
            </div>
        </DetailViewLayout>
    );
}
