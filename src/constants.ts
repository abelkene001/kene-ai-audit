import { DiscoveryStep, Intel } from './types';

export const industries = [
    "Retail & E-commerce",
    "Logistics & Supply Chain",
    "Real Estate & Development",
    "B2B Professional Services",
    "Manufacturing & Production",
    "Hospitality"
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
        title: "Retail Diagnostics",
        fields: [
            {
                key: 'paymentMethod',
                label: 'Payment Reconciliation Process',
                type: 'select',
                options: ['Manual Bank Transfer Verification', 'Automated Gateway (Paystack, etc)', 'Pay On Delivery'],
                condition: (intel: Intel) => intel.industry === 'Retail & E-commerce'
            },
            {
                key: 'inventoryMethod',
                label: 'Inventory Synchronization',
                type: 'select',
                options: ['No Sync (Inventory Ghosting)', 'Periodic Manual Sync', 'Real-time Automated Sync'],
                condition: (intel: Intel) => intel.industry === 'Retail & E-commerce'
            },
            {
                key: 'salesChannel',
                label: 'Primary Sales Channel',
                type: 'select',
                options: ['Instagram/WhatsApp DMs', 'Basic E-commerce Site', 'Physical Store Only'],
                condition: (intel: Intel) => intel.industry === 'Retail & E-commerce'
            },
            {
                key: 'competitorMonitoring',
                label: 'Competitor Price Intelligence',
                type: 'select',
                options: ['No Tracking (Price Blindness)', 'Manual Spot-Checks', 'Automated Price Scrapers'],
                condition: (intel: Intel) => intel.industry === 'Retail & E-commerce'
            }
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
