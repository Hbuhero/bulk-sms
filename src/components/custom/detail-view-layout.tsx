import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DetailViewLayoutProps {
    title: string;
    description?: string;
    backUrl?: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}

export function DetailViewLayout({
    title,
    description,
    backUrl,
    actions,
    children,
    className,
}: DetailViewLayoutProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (backUrl) {
            navigate(backUrl);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={cn('space-y-6 animate-fade-in', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="h-8 w-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                </div>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>

            {/* Content */}
            <Card>
                <CardContent className="p-6">{children}</CardContent>
            </Card>
        </div>
    );
}

interface DetailFieldProps {
    label: string;
    value: ReactNode;
    className?: string;
}

export function DetailField({ label, value, className }: DetailFieldProps) {
    return (
        <div className={cn('space-y-1', className)}>
            <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
            <dd className="text-sm text-foreground">{value || '—'}</dd>
        </div>
    );
}

interface DetailSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
    columns?: 1 | 2 | 3;
    className?: string;
}

export function DetailSection({
    title,
    description,
    children,
    columns = 2,
    className,
}: DetailSectionProps) {
    return (
        <div className={cn('space-y-4', className)}>
            {(title || description) && (
                <div>
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
            )}
            <dl
                className={cn(
                    'grid gap-4',
                    columns === 1 && 'grid-cols-1',
                    columns === 2 && 'grid-cols-1 sm:grid-cols-2',
                    columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                )}
            >
                {children}
            </dl>
        </div>
    );
}
