export interface Intel {
    businessName: string;
    industry: string;
    webStatus: string;
    automationLevel: string;
    dataMethod: string;
    orderWorkflow: string;
    scrapingUse: string;
    employeeCount: string;
    avgMonthlyVolume: string;
    primaryPain: string;
    [key: string]: string;
}

export interface AuditResult {
    wins: string[];
    setbacks: string[];
    roadmap: { title: string; desc: string }[];
    impact: { hours: number; rev: number };
    summary: string;
    pitch: string;
}

export interface Field {
    key: string;
    label: string;
    type: 'text' | 'select' | 'textarea';
    placeholder?: string;
    options?: string[];
}

export interface DiscoveryStep {
    title: string;
    fields: Field[];
}
