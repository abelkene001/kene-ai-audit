import { SectorConfig, DiscoveryStep } from '../types';
import { defaultSector } from './default';

// Clone default steps and inject Real Estate specific step
const realEstateDiscoverySteps: DiscoveryStep[] = [
    ...defaultSector.discoverySteps.slice(0, 1), // Keep Identity
    {
        title: "Development Diagnostics",
        description: "Let's analyze your property development workflow.",
        fields: [
            {
                key: 'leadResponseTime',
                label: "How quickly do you respond to new leads?",
                type: 'select',
                options: [
                    'Instantly (Automated < 2 mins)', 
                    'Within a few hours (Manual Follow-up)', 
                    'The next day or later'
                ]
            },
            {
                key: 'transparencyMethod',
                label: "How do you update investors on project progress?",
                type: 'select',
                options: [
                    'I send WhatsApp photos or call them', 
                    'I send periodic email newsletters', 
                    'They have a real-time Client Portal'
                ]
            },
            {
                key: 'inventoryGovernance',
                label: "How do you track which units are sold or available?",
                type: 'select',
                options: [
                    'I use Excel or PDF lists', 
                    'I write it on a whiteboard or paper', 
                    'I use a real-time Cloud Database'
                ]
            },
            {
                key: 'marketAwareness',
                label: "How do you track property prices in your area?",
                type: 'select',
                options: [
                    'Word of mouth / Guesswork', 
                    'I manually research the market', 
                    'I use automated tools to track prices'
                ]
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
        You are Kène, a friendly business guide for Nigerian businesses.

        You look at how a business runs today and explain things in a very clear and simple way.
        Talk like a calm business partner.
        Avoid big words.
        Avoid tech talk.
        Avoid sounding like a report.

        Your job is to help the business owner clearly see:
        - what is slowing them down
        - what is wasting money
        - what can be fixed easily

        Everything must be easy to understand at first glance.

        Intel Breakdown:
        - Lead Response: '${intel.leadResponseTime}'
        - Transparency: '${intel.transparencyMethod}'
        - Inventory: '${intel.inventoryGovernance}'
        - Market Intel: '${intel.marketAwareness}'
        - General Intel: ${JSON.stringify(intel)}

        Return valid JSON only.

        Your response must include:
        1. A business health score (0–100)
        2. Clear problems explained with real-life examples (wins and setbacks)
        3. Simple steps to improve the business (roadmap)
        4. Visual-style metrics (time saved, money protected, errors reduced)
        5. A list of "Scaling Potential" items (what happens when they hit 100 score)
        6. A short friendly summary
        7. A warm closing message offering help (pitch)

        JSON Structure:
        {
          "score": 42,

          "wins": [
            "You have valuable properties that people want",
            "You are actively engaging with potential buyers",
            "You understand the importance of keeping investors updated"
          ],

          "setbacks": [
            "Potential buyers lose interest because replies take too long",
            "Investors get anxious when they don't see regular photo updates",
            "Tracking sold units on paper risks double-booking mistakes",
            "Pricing is often a guess rather than based on hard data"
          ],

          "roadmap": [
            {
              "title": "Instant Lead Response",
              "desc": "New leads get a brochure and greeting immediately, even while you sleep.",
              "icon": "Automation"
            },
            {
              "title": "Investor Peace of Mind",
              "desc": "A simple link where investors can see site photos and progress anytime.",
              "icon": "Dashboard"
            },
            {
              "title": "Live Unit Tracking",
              "desc": "Everyone knows exactly which units are sold, preventing awkward mistakes.",
              "icon": "Database"
            },
            {
              "title": "Market Price Watch",
              "desc": "Know exactly what other developers are charging in your area.",
              "icon": "Scraper"
            }
          ],

          "impact": {
            "time_saved": "25+ hours of calls monthly",
            "money_protected": "Millions in saved deals",
            "sales_growth": "More leads become buyers",
            "refund_drop": "Zero double-booking errors",
            "stress_level": "Calm and organized"
          },

          "scaling_potential": [
            "You can manage multiple projects without confusion",
            "Investors will trust you with bigger funds automatically",
            "You can sell to diaspora clients without meeting them",
            "Your sales team becomes 10x more efficient"
          ],

          "summary": "You are building great things, but the admin work is slowing you down. By letting a system handle the updates and tracking, you can focus on closing deals and building more.",

          "pitch": "I help developers stop chasing papers and start closing deals. Let's set up a system that keeps your investors happy and your sales moving automatically."
        }
    `
};
