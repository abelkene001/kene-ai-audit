import { SectorConfig, DiscoveryStep } from '../types';
import { defaultSector } from './default';

// Clone default steps to avoid mutation issues, then inject retail specific step
const retailDiscoverySteps: DiscoveryStep[] = [
    ...defaultSector.discoverySteps.slice(0, 1), // Keep Market Identity
    {
        title: "Retail Diagnostics",
        fields: [
            {
                key: 'paymentMethod',
                label: 'Payment Reconciliation Process',
                type: 'select',
                options: ['Manual Bank Transfer Verification', 'Automated Gateway (Paystack, etc)', 'Pay On Delivery']
            },
            {
                key: 'inventoryMethod',
                label: 'Inventory Synchronization',
                type: 'select',
                options: ['No Sync (Inventory Ghosting)', 'Periodic Manual Sync', 'Real-time Automated Sync']
            },
            {
                key: 'salesChannel',
                label: 'Primary Sales Channel',
                type: 'select',
                options: ['Instagram/WhatsApp DMs', 'Basic E-commerce Site', 'Physical Store Only']
            },
            {
                key: 'competitorMonitoring',
                label: 'Competitor Price Intelligence',
                type: 'select',
                options: ['No Tracking (Price Blindness)', 'Manual Spot-Checks', 'Automated Price Scrapers']
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
        - Payment Method: '${intel.paymentMethod}' (Risk: Transfer Verification Leak)
        - Inventory Method: '${intel.inventoryMethod}' (Risk: Inventory Ghosting)
        - Sales Channel: '${intel.salesChannel}' (Risk: DM-to-Order Friction)
        - Competitor Monitoring: '${intel.competitorMonitoring}' (Risk: Price Blindness)
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
