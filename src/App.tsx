import React, { useState, useMemo } from 'react';
import {
    BrainCircuit, ChevronRight, ChevronLeft, Zap, Globe, Cpu, Database, LayoutDashboard,
    TrendingUp, Clock, AlertCircle, CheckCircle2, ShieldX, BarChart3, Component
} from 'lucide-react';
import { discoverySteps } from './constants';
import { Intel, AuditResult } from './types';

const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

// Icon mapping for the roadmap
const roadmapIcons: { [key: string]: React.ElementType } = {
    "Website": Globe,
    "Automation": Cpu,
    "Scraper": Database,
    "Dashboard": LayoutDashboard,
    "Default": Component
};

const App = () => {
    const [view, setView] = useState('landing');
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

    const [intel, setIntel] = useState<Intel>({
        businessName: '',
        industry: 'Retail & E-commerce',
        webStatus: 'Standard Website (Static)',
        automationLevel: '100% Manual Admin',
        dataMethod: 'Google Sheets/Excel',
        orderWorkflow: 'WhatsApp/DM Manual',
        scrapingUse: 'None (Guesswork)',
        primaryPain: '',
        paymentMethod: 'Manual Bank Transfer Verification',
        inventoryMethod: 'No Sync (Inventory Ghosting)',
        salesChannel: 'Instagram/WhatsApp DMs',
        competitorMonitoring: 'No Tracking (Price Blindness)',
    });

    const activeSteps = useMemo(() => {
        return discoverySteps.map(s => ({
            ...s,
            fields: s.fields.filter(f => !f.condition || f.condition(intel))
        })).filter(s => s.fields.length > 0);
    }, [intel.industry]);

    const handleNext = () => {
        if (step < activeSteps.length - 1) setStep(step + 1);
        else generateAudit();
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const generateAudit = async () => {
        setView('analyzing');
        setLoading(true);

        const retailSystemPrompt = `You are Kène, a world-class Business Efficiency Architect specializing in the Nigerian Retail & E-commerce sector.
        Analyze this deep business intel based on my market research. Your response MUST be valid JSON.

        Intel Breakdown:
        - paymentMethod: '${intel.paymentMethod}' means they suffer from the "Transfer Verification Leak".
        - inventoryMethod: '${intel.inventoryMethod}' points to "Inventory Ghosting".
        - salesChannel: '${intel.salesChannel}' indicates a "DM-to-Order Pipeline Friction".
        - competitorMonitoring: '${intel.competitorMonitoring}' is "Competitor Pricing Blindness".

        Your Task:
        1.  **Operational Setbacks**: List 3-4 specific, painful consequences of their current setup. Use the research terms.
        2.  **The Winning Infrastructure (Roadmap)**: Propose a 3-4 step high-ticket infrastructure solution. Each step must have a 'title', a 'desc', and an 'icon' ('Website', 'Automation', 'Scraper', 'Dashboard').
        3.  **Economic Impact**:
            - "hours": Calculate labor recovery. Automating payments saves 20-30 hours/mo.
            - "rev": Calculate revenue lift. Real-time responses give a 2.5x conversion boost.
            - "churn": Calculate churn reduction. Inventory sync reduces refunds by 15%.
        4.  **The Kène Summary**: A 3-sentence high-level strategic overview.
        5.  **The Pitch**: A personalized closing positioning me as the only one who can build this "Dynamic Dashboard" or "Automated Reconciliation Engine".

        JSON Structure: { "wins": [], "setbacks": [], "roadmap": [{ "title": "", "desc": "", "icon": "" }], "impact": { "hours": 0, "rev": 0, "churn": 0 }, "summary": "", "pitch": "" }`;

        const genericSystemPrompt = `You are Kène, a world-class Business Efficiency Architect. Analyze this deep business intel and return a JSON object. The tone must be professional, authoritative, and consultative. Response MUST be valid JSON: { "wins": [], "setbacks": [], "roadmap": [{ "title": "", "desc": "", "icon": "Default" }], "impact": { "hours": 0, "rev": 0, "churn": 0 }, "summary": "", "pitch": "" }`;

        const systemPrompt = intel.industry === 'Retail & E-commerce' ? retailSystemPrompt : genericSystemPrompt;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: JSON.stringify(intel) }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: { responseMimeType: "application/json" }
                })
            });

            const result = await response.json();
            const data = JSON.parse(result.candidates?.[0]?.content?.parts?.[0]?.text);
            setAuditResult(data);
            setView('report');
        } catch (err) {
            console.error("API Error or JSON parsing failed:", err);
            setView('discovery');
            alert("Intelligence calibration failed. The AI model may have returned an invalid structure. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const currentStep = activeSteps[step];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#e2b619] selection:text-black">

            {view === 'landing' && (
                <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-[#050505]">
                    <div className="w-24 h-24 bg-[#e2b619] rounded-[2.5rem] flex items-center justify-center mb-10 shadow-[0_0_80px_rgba(226,182,25,0.2)] animate-pulse">
                        <BrainCircuit className="text-black w-12 h-12" />
                    </div>
                    <h1 className="text-6xl font-black italic tracking-tighter mb-4">KÈNE <span className="text-[#e2b619]">AUDIT</span></h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-12 max-w-xs leading-loose">
                        Precision Intelligence for Modern Business Infrastructure
                    </p>
                    <button onClick={() => setView('discovery')} className="group px-12 py-5 bg-white text-black font-black rounded-full hover:bg-[#e2b619] transition-all flex items-center gap-4 active:scale-95">
                        INITIATE DEEP DISCOVERY <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}

            {view === 'discovery' && (
                <div className="max-w-xl mx-auto p-6 pt-20 animate-in slide-in-from-bottom-8">
                    <div className="flex justify-between items-center mb-12">
                        <div className="flex gap-2">
                            {activeSteps.map((_, i) => (
                                <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-[#e2b619]' : 'bg-neutral-800'}`} />
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Phase 0{step + 1}</span>
                    </div>

                    <h2 className="text-4xl font-black italic mb-2">{currentStep.title}</h2>
                    <p className="text-neutral-500 text-sm mb-10">Detailed intel collection for high-accuracy modeling.</p>

                    <div className="space-y-8">
                        {currentStep.fields.map((f) => (
                            <div key={f.key} className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-[#e2b619] tracking-widest">{f.label}</label>
                                {f.type === 'text' && (
                                    <input
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 focus:border-[#e2b619] outline-none transition-all text-lg font-medium"
                                        placeholder={f.placeholder}
                                        value={intel[f.key] as string}
                                        onChange={e => setIntel({ ...intel, [f.key]: e.target.value })}
                                    />
                                )}
                                {f.type === 'select' && f.options && (
                                    <div className="grid grid-cols-1 gap-3">
                                        {f.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setIntel({ ...intel, [f.key]: opt })}
                                                className={`p-5 rounded-2xl border-2 text-left text-sm font-bold transition-all ${
                                                    intel[f.key] === opt ? 'bg-[#e2b619] border-[#e2b619] text-black shadow-lg shadow-[#e2b619]/10' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {f.type === 'textarea' && (
                                    <textarea
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 focus:border-[#e2b619] outline-none min-h-[120px] text-lg font-medium"
                                        placeholder={f.placeholder}
                                        value={intel[f.key] as string}
                                        onChange={e => setIntel({ ...intel, [f.key]: e.target.value })}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-12">
                        {step > 0 && (
                            <button onClick={handleBack} className="p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                                <ChevronLeft />
                            </button>
                        )}
                        <button onClick={handleNext} className="flex-1 bg-white text-black font-black py-5 rounded-2xl hover:bg-[#e2b619] transition-all flex items-center justify-center gap-2">
                            {step === activeSteps.length - 1 ? 'GENERATE AUDIT' : 'CONTINUE'} <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {view === 'analyzing' && (
                 <div className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-black">
                    <div className="relative w-32 h-32 mb-10">
                        <div className="absolute inset-0 border-[6px] border-[#e2b619]/10 rounded-full"></div>
                        <div className="absolute inset-0 border-[6px] border-[#e2b619] rounded-full border-t-transparent animate-spin"></div>
                        <Zap className="absolute inset-0 m-auto text-[#e2b619] w-10 h-10 animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tighter mb-4 animate-pulse uppercase">Synthesizing Infrastructure Roadmap</h2>
                    <div className="flex gap-2">
                        {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 bg-[#e2b619] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
                    </div>
                </div>
            )}

            {view === 'report' && auditResult && (
                <div className="max-w-3xl mx-auto p-6 pt-16 pb-32 animate-in fade-in zoom-in-95 duration-500">
                    <header className="mb-12 text-center">
                        <h1 className="text-6xl font-black italic tracking-tighter leading-none">{intel.businessName.toUpperCase()}</h1>
                        <p className="text-neutral-500 font-bold uppercase text-xs mt-2 tracking-widest">{intel.industry}</p>
                    </header>

                    <section className="mb-16">
                        <h3 className="text-xs font-black uppercase text-neutral-500 tracking-[0.3em] mb-6 text-center">
                           Executive Summary
                        </h3>
                        <p className="text-xl font-bold italic text-neutral-200 leading-relaxed text-center max-w-2xl mx-auto">
                            "{auditResult.summary}"
                        </p>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
                        <div className="bg-neutral-900/50 p-8 rounded-[2.5rem] border border-neutral-800">
                            <Clock className="text-[#e2b619] mb-4 w-6 h-6 mx-auto" />
                            <div className="text-5xl font-black tracking-tighter text-white">{auditResult.impact.hours}<span className="text-2xl">hr</span></div>
                            <div className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em] mt-2">Capacity Recovered / Mo</div>
                        </div>
                         <div className="bg-[#e2b619] p-8 rounded-[2.5rem] text-black">
                            <TrendingUp className="text-black mb-4 w-6 h-6 mx-auto" />
                            <div className="text-5xl font-black tracking-tighter">+{auditResult.impact.rev}<span className="text-2xl">%</span></div>
                            <div className="text-[10px] font-black uppercase text-black/60 tracking-[0.2em] mt-2">Revenue Growth</div>
                        </div>
                        <div className="bg-neutral-900/50 p-8 rounded-[2.5rem] border border-neutral-800">
                            <ShieldX className="text-[#e2b619] mb-4 w-6 h-6 mx-auto" />
                            <div className="text-5xl font-black tracking-tighter text-white">-{auditResult.impact.churn}<span className="text-2xl">%</span></div>
                            <div className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em] mt-2">Churn Reduction</div>
                        </div>
                    </div>

                    <section className="space-y-6 mb-16">
                        <h3 className="text-xs font-black uppercase text-neutral-500 tracking-[0.3em] mb-6 text-center">Proposed Infrastructure</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {auditResult.roadmap.map((item, i) => {
                                const Icon = roadmapIcons[item.icon] || roadmapIcons['Default'];
                                return (
                                    <div key={i} className="flex items-center gap-6 p-6 bg-neutral-900/40 border border-neutral-800 rounded-3xl group hover:border-[#e2b619]/50 transition-all">
                                        <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center text-[#e2b619] group-hover:bg-[#e2b619] group-hover:text-black transition-all">
                                            <Icon />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-xs text-neutral-500 mt-1 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-red-500 tracking-widest flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> Operational Setbacks
                            </h4>
                            <ul className="space-y-3">
                                {auditResult.setbacks.map((s, i) => (
                                    <li key={i} className="text-xs text-neutral-400 font-bold border-l-2 border-red-500/30 pl-4">{s}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase text-green-500 tracking-widest flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Scalability Wins
                            </h4>
                            <ul className="space-y-3">
                                {auditResult.wins.map((w, i) => (
                                    <li key={i} className="text-xs text-neutral-400 font-bold border-l-2 border-green-500/30 pl-4">{w}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <section className="bg-white p-10 rounded-[3.5rem] text-black space-y-8 shadow-[0_40px_100px_rgba(226,182,25,0.15)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                            <BrainCircuit className="w-40 h-40" />
                        </div>
                        <h3 className="text-3xl font-black italic tracking-tighter leading-none">Architect's Final Recommendation</h3>
                        <p className="text-lg font-bold leading-relaxed border-l-4 border-[#e2b619] pl-6 italic">
                            "{auditResult.pitch}"
                        </p>
                        <button
                            className="w-full bg-black text-[#e2b619] font-black py-6 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-2xl"
                            onClick={() => window.open(`https://wa.me/2348061952248?text=I've reviewed the Kène Audit for ${intel.businessName}. Let's deploy the ${auditResult.impact.hours}hr recovery roadmap.`)}
                        >
                            DEPLOY INFRASTRUCTURE <Zap className="w-5 h-5 fill-current" />
                        </button>
                    </section>

                    <footer className="text-center py-12 mt-16 space-y-4">
                        <p className="text-[9px] font-black uppercase text-neutral-700 tracking-[0.5em]">Kène Intelligence // Authorized Access Only</p>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default App;