import { SectorConfig, DiscoveryStep } from '../types';
import { defaultSector } from './default';

// Clone default steps to avoid mutation issues, then inject retail specific step
const retailDiscoverySteps: DiscoveryStep[] = [
    ...defaultSector.discoverySteps.slice(0, 1), // Keep Identity
    {
        title: "Retail Diagnostics",
        description: "Specific questions to understand your retail operations.",
        fields: [
            {
                key: 'paymentMethod',
                label: "How do you collect and verify payments?",
                type: 'select',
                options: [
                    'I manually check bank alerts', 
                    'I use an automated gateway (Paystack/Flutterwave)', 
                    'I mostly do Pay On Delivery'
                ]
            },
            {
                key: 'inventoryMethod',
                label: "How do you keep track of your product stock?",
                type: 'select',
                options: [
                    'I don’t really track it (I just check shelves)', 
                    'I update a book or Excel sheet sometimes', 
                    'It updates automatically when I sell'
                ]
            },
            {
                key: 'salesChannel',
                label: "Where do most of your sales happen?",
                type: 'select',
                options: [
                    'Mostly Instagram/WhatsApp DMs', 
                    'On my website', 
                    'In my physical store'
                ]
            },
            {
                key: 'competitorMonitoring',
                label: "How do you decide what price to sell at?",
                type: 'select',
                options: [
                    'I just pick a price that feels right', 
                    'I check what others are selling for manually', 
                    'I use software to track market prices'
                ]
            }
        ]
    },
    ...defaultSector.discoverySteps.slice(1) // Keep the rest of the standard questions
];

export const retailSector: SectorConfig = {
    id: 'retail',
    name: 'Retail & E-commerce',
    discoverySteps: retailDiscoverySteps,
    generateSystemPrompt: (intel) => `
        You are Kène, a world-class Business Efficiency Architect specializing in the Nigerian Retail & E-commerce sector.
        Analyze this deep business intel based on my market research. Your response MUST be valid JSON.

        Intel Breakdown:
        - Payment Method: '${intel.paymentMethod}' (Note: If "I manually check bank alerts", treat as "Manual Bank Transfer Verification". If "I use an automated gateway", treat as "Automated Gateway". If "Pay On Delivery", treat as "Pay On Delivery")
        - Inventory Method: '${intel.inventoryMethod}' (Note: If "I don’t really track it", treat as "No Sync". If "I update a book", treat as "Periodic Manual Sync". If "It updates automatically", treat as "Real-time Automated Sync")
        - Sales Channel: '${intel.salesChannel}'
        - Competitor Monitoring: '${intel.competitorMonitoring}' (Note: If "I just pick a price", treat as "No Tracking". If "I check what others are selling", treat as "Manual Spot-Checks". If "I use software", treat as "Automated Price Scrapers")
        - General Intel: ${JSON.stringify(intel)}

        Task:
        1.  **Efficiency Score**: Calculate 0-100. If they use manual payments/inventory, score MUST be LOW (30-50).
        2.  **Operational Setbacks**: List 3-4 specific, painful consequences of their current setup. Use the research terms (e.g., "Transfer Verification Leak").
        3.  **The Winning Infrastructure (Roadmap)**: Propose a 3-4 step high-ticket infrastructure solution. Each step must have a 'title', a 'desc', and an 'icon' ('Website', 'Automation', 'Scraper', 'Dashboard').
        4.  **Economic Impact**:
            - "hours": Calculate labor recovery. Automating payments saves 20-30 hours/mo.
            - "rev": Calculate revenue lift. Real-time responses give a 2.5x conversion boost.
            - "churn": Calculate churn reduction. Inventory sync reduces refunds by 15%.
        5.  **The Kène Summary**: A 3-sentence high-level strategic overview.
        6.  **The Pitch**: A personalized closing positioning me as the only one who can build this "Dynamic Dashboard" or "Automated Reconciliation Engine".

        JSON Structure: { "score": 0, "wins": [], "setbacks": [], "roadmap": [{ "title": "", "desc": "", "icon": "" }], "impact": { "hours": 0, "rev": 0, "churn": 0 }, "summary": "", "pitch": "" }
    `
};
