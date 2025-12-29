export interface Intel {
    businessName: string;
    industry: string;
    // Core Questions
    webStatus: string;
    automationLevel: string;
    dataMethod: string;
    orderWorkflow: string;
    scrapingUse: string;
    primaryPain: string;

    // Conditional Retail & E-commerce Questions
    paymentMethod?: 'Manual Bank Transfer Verification' | 'Automated Gateway (Paystack, etc)' | 'Pay On Delivery';
    inventoryMethod?: 'No Sync (Inventory Ghosting)' | 'Periodic Manual Sync' | 'Real-time Automated Sync';
    salesChannel?: 'Instagram/WhatsApp DMs' | 'Basic E-commerce Site' | 'Physical Store Only';
    competitorMonitoring?: 'No Tracking (Price Blindness)' | 'Manual Spot-Checks' | 'Automated Price Scrapers';

    [key: string]: string | number | undefined;
}

export interface AuditResult {
    wins: string[];
    setbacks: string[];
    roadmap: { title: string; desc: string; icon: string }[];
    impact: {
        hours: number;
        rev: number;
        churn: number; // New metric from research
    };
    summary: string;
    pitch: string;
}

export interface Field {
    key: keyof Intel;
    label: string;
    type: 'text' | 'select' | 'textarea';
    placeholder?: string;
    options?: string[];
    condition?: (intel: Intel) => boolean;
}

export interface DiscoveryStep {
    title: string;
    fields: Field[];
}