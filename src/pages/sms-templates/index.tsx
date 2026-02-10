import { useQuery } from '@tanstack/react-query';
import { getSmsTemplates } from '@/helper/data-api';
import { SmsTemplateDataTable } from './components/sms-template-data-table';

export default function SmsTemplatesPage() {
    const { data: templates, isLoading } = useQuery({
        queryKey: ['smsTemplates'],
        queryFn: getSmsTemplates,
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">SMS Templates</h1>
                <p className="text-muted-foreground">
                    Create and manage SMS message templates for quick sending
                </p>
            </div>

            <div className="animate-slide-in-bottom">
                <SmsTemplateDataTable
                    data={templates || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
