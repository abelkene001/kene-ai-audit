import { SectorConfig, DiscoveryStep } from '../types';

const defaultDiscoverySteps: DiscoveryStep[] = [
    {
        title: "Market Identity",
        fields: [
            { key: 'businessName', label: 'Registered Entity Name', type: 'text', placeholder: 'e.g. Nexus Logistics Ltd' },
            { key: 'industry', label: 'Primary Business Vertical', type: 'select', options: [
                "Retail & E-commerce",
                "Logistics & Supply Chain",
                "Real Estate & Development",
                "B2B Professional Services",
                "Manufacturing & Production",
                "Hospitality"
            ]}
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

export const defaultSector: SectorConfig = {
    id: 'default',
    name: 'General Business',
    discoverySteps: defaultDiscoverySteps,
    generateSystemPrompt: (intel) => `
        You are Kène, a world-class Business Efficiency Architect. 
        Analyze this deep business intel and return a JSON object. 
        The tone must be professional, authoritative, and consultative.
        
        Intel: ${JSON.stringify(intel)}

        Task:
        1. Calculate an "Efficiency Score" (0-100).
        2. Identify 3 "Operational Setbacks" (Current State).
        3. Propose 3 "Infrastructure Upgrades" (The Solution).
        4. Calculate Impact: Hours Saved, Revenue Lift %, Churn Reduction %.
        5. Write a "Pitch": A direct offer to build this specific stack.

        Response MUST be valid JSON: { "score": 45, "wins": [], "setbacks": [], "roadmap": [{ "title": "", "desc": "", "icon": "Default" }], "impact": { "hours": 0, "rev": 0, "churn": 0 }, "summary": "", "pitch": "" }
    `
};
