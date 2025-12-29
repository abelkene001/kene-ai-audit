import { SectorConfig, DiscoveryStep } from '../types';
import { defaultSector } from './default';

// Clone default steps and inject Real Estate specific step
const realEstateDiscoverySteps: DiscoveryStep[] = [
    ...defaultSector.discoverySteps.slice(0, 1), // Keep Market Identity
    {
        title: "Development Diagnostics",
        fields: [
            {
                key: 'leadResponseTime',
                label: 'Lead Response Latency',
                type: 'select',
                options: ['Instant (Automated < 2 mins)', 'Manual Follow-up (1-4 Hours)', 'Next Day / Irregular']
            },
            {
                key: 'transparencyMethod',
                label: 'Investor Progress Reporting',
                type: 'select',
                options: ['WhatsApp Photos / Manual Updates', 'Periodic Email Newsletters', 'Real-time Client Portal / Dashboard']
            },
            {
                key: 'inventoryGovernance',
                label: 'Unit Availability Tracking',
                type: 'select',
                options: ['Excel / PDF Lists (Shared Manually)', 'Physical Whiteboard / Paper', 'Real-time Cloud Database (Single Source)']
            },
            {
                key: 'marketAwareness',
                label: 'Competitor Price Intelligence',
                type: 'select',
                options: ['Word of Mouth / Guesswork', 'Manual Market Research', 'Automated Area Price Feeds']
            }
        ]
    },
    ...defaultSector.discoverySteps.slice(1) // Keep the rest of the standard questions
];

export const realEstateSector: SectorConfig = {
    id: 'real-estate',
    name: 'Real Estate & Development',
    discoverySteps: realEstateDiscoverySteps,
    generateSystemPrompt: (intel) => `
        You are Kène, a specialized Real Estate Infrastructure Architect.
        Analyze this deep intel for a Nigerian Property Developer or Agency.
        
        Intel Breakdown:
        - Lead Response: '${intel.leadResponseTime}' (Risk: The "Lead-to-Lapse" Gap. HNIs cool off after 4 hours.)
        - Transparency: '${intel.transparencyMethod}' (Risk: The "Investor Anxiety" Loop. Lack of visual trust.)
        - Inventory: '${intel.inventoryGovernance}' (Risk: The "Ghost Unit" Risk. Double-booking units.)
        - Market Intel: '${intel.marketAwareness}' (Risk: Pricing Blindness in areas like Ikate/Guzape.)
        - General Intel: ${JSON.stringify(intel)}

        Task:
        1.  **Efficiency Score**: Calculate 0-100. Manual lists/WhatsApp updates = LOW SCORE (30-50).
        2.  **Operational Setbacks**: Identify 3 specific leakages (e.g., "Losing HNIs to faster responders", "Investor trust erosion due to manual updates").
        3.  **The Winning Infrastructure (Roadmap)**:
            - If Lead Response is slow -> Propose "HNI Lead Accelerator" (Instant WhatsApp Brochures).
            - If Transparency is manual -> Propose "Investor Progress Dashboard" (Site-to-Cloud Sync).
            - If Inventory is manual -> Propose "Real-time Inventory Scraper/Sync".
            - If Quoting is slow -> Propose "Automated Milestone Billing".
        4.  **Economic Impact**:
            - "hours": Labor saved on manual updates/calls.
            - "rev": Revenue lift from higher conversion (Instant response = +2.5x).
            - "churn": Reduction in "Refund Requests" or "Deal Fall-throughs" due to double-booking.
        5.  **The Pitch**: "I build Real-Estate Sales Infrastructure that reduces lead-drop-off by 80% and automates investor reporting. We shift you from manual site visits to an automated closing engine."

        JSON Structure: { "score": 0, "wins": [], "setbacks": [], "roadmap": [{ "title": "", "desc": "", "icon": "" }], "impact": { "hours": 0, "rev": 0, "churn": 0 }, "summary": "", "pitch": "" }
    `
};
