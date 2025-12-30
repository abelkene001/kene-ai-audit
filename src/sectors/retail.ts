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
        - Payment Method: '${intel.paymentMethod}'
        - Inventory Method: '${intel.inventoryMethod}'
        - Sales Channel: '${intel.salesChannel}'
        - Competitor Monitoring: '${intel.competitorMonitoring}'
        - General Intel: ${JSON.stringify(intel)}

        Return valid JSON only.

        Your response must include:
        1. A business health score (0–100)
        2. Clear problems explained with real-life examples (wins and setbacks)
        3. Simple steps to improve the business (roadmap)
        4. Visual-style metrics (time saved, money protected, errors reduced)
        5. A short friendly summary
        6. A warm closing message offering help (pitch)

        JSON Structure:
        {
          "score": 38,

          "wins": [
            "Customers already buy from you regularly",
            "Your products clearly have demand",
            "People trust your brand enough to pay"
          ],

          "setbacks": [
            "Too much time is spent confirming payments instead of serving customers",
            "Orders sometimes fail because items sell out without warning",
            "Messages pile up in WhatsApp and Instagram, causing slow replies",
            "Prices are set by feeling, not by awareness"
          ],

          "roadmap": [
            {
              "title": "One Clear Order Page",
              "desc": "Customers place orders and pay in one place without sending screenshots or messages.",
              "icon": "Website"
            },
            {
              "title": "Instant Payment Confirmation",
              "desc": "Payments confirm themselves so no one waits or argues about transfers.",
              "icon": "Automation"
            },
            {
              "title": "Live Stock Awareness",
              "desc": "Sold-out items automatically stop selling, preventing refunds and embarrassment.",
              "icon": "Dashboard"
            },
            {
              "title": "Smart Price Awareness",
              "desc": "You always know if your price is too high, too low, or just right.",
              "icon": "Scraper"
            }
          ],

          "impact": {
            "time_saved": "40+ hours every month",
            "money_protected": "₦300k–₦600k in prevented losses",
            "sales_growth": "Up to 2× more completed orders",
            "refund_drop": "15% fewer refunds",
            "stress_level": "Much lower"
          },

          "summary": "Your business is working, but it is working too hard. Small manual tasks are stealing time and money quietly. Once these are handled automatically, growth becomes calmer and easier.",

          "pitch": "You don’t need more effort. You need a setup that works while you sleep. I help build simple business systems that remove stress and protect your income."
        }
    `
};
