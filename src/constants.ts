import { DiscoveryStep } from './types';

export const industries = [
    "Retail & E-commerce",
    "Logistics & Supply Chain",
    "Real Estate & Development",
    "B2B Professional Services",
    "Manufacturing & Production"
];

export const discoverySteps: DiscoveryStep[] = [
    {
        title: "Market Identity",
        fields: [
            { key: 'businessName', label: 'Registered Entity Name', type: 'text', placeholder: 'e.g. Nexus Logistics Ltd' },
            { key: 'industry', label: 'Primary Business Vertical', type: 'select', options: industries }
        ]
    },
    {
        title: "Digital Infrastructure",
        fields: [
            { key: 'webStatus', label: 'Current Web Presence', type: 'select', options: ['None (Social Only)', 'Standard Website (Static)', 'Legacy E-commerce', 'High-Conversion Engine'] },
            { key: 'dataMethod', label: 'Data Governance Method', type: 'select', options: ['Paper/Physical', 'Google Sheets/Excel', 'Fragmented SaaS Tools', 'Unified Real-time Dashboard'] }
        ]
    },
    {
        title: "Operations & Flow",
        fields: [
            { key: 'orderWorkflow', label: 'Order/Lead Acquisition Channel', type: 'select', options: ['WhatsApp/DM Manual', 'Website Checkout (Automated)', 'Manual Invoicing', 'Hybrid Mix'] },
            { key: 'automationLevel', label: 'Internal Workflow Automation', type: 'select', options: ['100% Manual Admin', 'Partially Automated (Zapier/ETC)', 'Fully Automated Ecosystem'] }
        ]
    },
    {
        title: "Intelligence & Growth",
        fields: [
            { key: 'scrapingUse', label: 'Market Intelligence / Price Scraping', type: 'select', options: ['None (Guesswork)', 'Manual Competitor Checking', 'Automated Web Scrapers'] },
            { key: 'primaryPain', label: 'The Core Bottleneck', type: 'textarea', placeholder: 'What specific manual task is killing your growth right now?' }
        ]
    }
];
