import React from 'react';

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

    // Retail & E-commerce Fields
    paymentMethod?: string;
    inventoryMethod?: string;
    salesChannel?: string;
    competitorMonitoring?: string;

    // Real Estate & Development Fields
    leadResponseTime?: string;
    transparencyMethod?: string;
    inventoryGovernance?: string;
    marketAwareness?: string;

    // Dynamic fields for other sectors
    [key: string]: string | number | undefined;
}

export interface AuditResult {
    score: number; // 0-100 Business Health Score
    wins: string[];
    setbacks: string[];
    roadmap: { title: string; desc: string; icon: string }[];
    impact: {
        time_saved: string;
        money_protected: string;
        sales_growth: string;
        refund_drop: string;
        stress_level: string;
    };
    scaling_potential: string[]; // New field for "what happens when you hit 100"
    summary: string;
    pitch: string;
}

export interface Field {
    key: string;
    label: string;
    type: 'text' | 'select' | 'textarea';
    placeholder?: string;
    options?: string[];
    condition?: (intel: Intel) => boolean;
    optional?: boolean; // Default is false (required)
}

export interface DiscoveryStep {
    title: string;
    description?: string; // Helper text for the phase
    fields: Field[];
}

export interface SectorConfig {
    id: string;
    name: string;
    discoverySteps: DiscoveryStep[];
    generateSystemPrompt: (intel: Intel) => string;
}
