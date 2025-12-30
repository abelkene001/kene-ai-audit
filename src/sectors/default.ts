import { SectorConfig, DiscoveryStep } from '../types';

const defaultDiscoverySteps: DiscoveryStep[] = [
    {
        title: "Identity",
        description: "Let's start with the basics. Who are we analyzing today?",
        fields: [
            { 
                key: 'businessName', 
                label: "What is your business name?", 
                type: 'text', 
                placeholder: 'e.g. Nexus Logistics Ltd' 
            },
            { 
                key: 'industry', 
                label: "What sector do you operate in?", 
                type: 'select', 
                options: [
                    "Retail & E-commerce",
                    "Logistics & Supply Chain",
                    "Real Estate & Development",
                    "B2B Professional Services",
                    "Manufacturing & Production",
                    "Hospitality"
                ]
            }
        ]
    },
    {
        title: "Infrastructure",
        description: "Understanding your digital foundation helps us identify growth gaps.",
        fields: [
            { 
                key: 'webStatus', 
                label: "What's your current online space?", 
                type: 'select', 
                options: [
                    'I don’t have a website yet (Social Media only)', 
                    'I have a basic informational website', 
                    'I have an older e-commerce site', 
                    'I have a modern, high-performance web app'
                ] 
            },
            { 
                key: 'dataMethod', 
                label: "How do you keep track of your business data?", 
                type: 'select', 
                options: [
                    'Paper records / Notebooks', 
                    'Excel / Google Sheets', 
                    'Scattered WhatsApp notes', 
                    'A Unified Real-time Dashboard'
                ] 
            }
        ]
    },
    {
        title: "Operations",
        description: "Let's look at how you handle your day-to-day workflow.",
        fields: [
            { 
                key: 'orderWorkflow', 
                label: "How do your customers usually find and buy from you?", 
                type: 'select', 
                options: [
                    'They DM me on WhatsApp/Instagram', 
                    'They buy directly through my website', 
                    'I send them manual invoices', 
                    'A mix of everything'
                ] 
            },
            { 
                key: 'automationLevel', 
                label: "How much of your work is automated?", 
                type: 'select', 
                options: [
                    'I do everything manually', 
                    'I use some tools like Zapier', 
                    'My business runs on autopilot'
                ] 
            }
        ]
    },
    {
        title: "Intelligence",
        description: "Finally, let's see how you stay ahead of the market.",
        fields: [
            { 
                key: 'scrapingUse', 
                label: "How do you track market prices?", 
                type: 'select', 
                options: [
                    'I guess based on experience', 
                    'I manually check competitors', 
                    'I use automated tools to track prices'
                ] 
            },
            { 
                key: 'primaryPain', 
                label: "What is the one manual task you hate doing the most?", 
                type: 'textarea', 
                placeholder: 'e.g. "Copying orders from WhatsApp to Excel every night..."',
                optional: true
            }
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
