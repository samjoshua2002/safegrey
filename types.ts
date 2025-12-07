import { LucideIcon } from 'lucide-react';

export interface SecurityService {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    angle?: number;
    x?: number;
    y?: number;
}
