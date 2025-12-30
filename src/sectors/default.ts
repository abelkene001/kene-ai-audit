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
                    'I don’t track my data at all',
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
                key: 'paymentCollection',
                label: "How do you typically collect payments?",
                type: 'select',
                options: [
                    'Manual bank transfers',
                    'Point of Sale (POS)',
                    'Online payment gateways (Paystack, etc.)',
                    'Cash payments'
                ]
            },
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

        Intel: ${JSON.stringify(intel)}

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
          "score": 45,

          "wins": [
            "You have a running business with real customers",
            "You are aware that things could be better",
            "You are ready to take the next step"
          ],

          "setbacks": [
            "Manual tasks are eating up your valuable time",
            "Data is scattered, making it hard to see the full picture",
            "Opportunities are missed because you can't be everywhere at once",
            "Growth feels harder than it should be"
          ],

          "roadmap": [
            {
              "title": "Central Command",
              "desc": "Bring all your data into one simple place so you can see everything clearly.",
              "icon": "Dashboard"
            },
            {
              "title": "Auto-Pilot Tasks",
              "desc": "Let the system handle the boring repetitive work while you focus on strategy.",
              "icon": "Automation"
            },
            {
              "title": "Digital Storefront",
              "desc": "A professional online presence that works for you 24/7.",
              "icon": "Website"
            },
            {
              "title": "Market Radar",
              "desc": "Keep an eye on the market automatically so you never miss a beat.",
              "icon": "Scraper"
            }
          ],

          "impact": {
            "time_saved": "30+ hours monthly",
            "money_protected": "Significant cost reduction",
            "sales_growth": "Steady and calm growth",
            "refund_drop": "Fewer errors",
            "stress_level": "Drastically reduced"
          },

          "scaling_potential": [
            "You can expand to new cities without chaos",
            "You don't need to hire expensive agencies",
            "Your business runs smoothly even when you are on holiday",
            "You can attract bigger partners and investors"
          ],

          "summary": "Your business has good bones, but it needs a better nervous system. By connecting the dots and automating the basics, you can stop fighting fires and start building the future.",

          "pitch": "I help businesses like yours upgrade from manual hard work to smart automated systems. Let's build a foundation that supports your growth."
        }
    `
};
