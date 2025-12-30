import React, { useState, useMemo } from 'react';
import {
    BrainCircuit, ChevronRight, ChevronLeft, Zap, Globe, Cpu, Database, LayoutDashboard,
    TrendingUp, Clock, AlertCircle, CheckCircle2, ShieldX, BarChart3, Component,
    ArrowRight, Lock, FileText, Check
} from 'lucide-react';
import { getSectorConfig } from './sectors';
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [intel, setIntel] = useState<Intel>({
        businessName: '',
        industry: 'Retail & E-commerce',
        webStatus: '',
        automationLevel: '',
        dataMethod: '',
        orderWorkflow: '',
        scrapingUse: '',
        primaryPain: '',
        paymentMethod: '',
        inventoryMethod: '',
        salesChannel: '',
        competitorMonitoring: '',
        // Real Estate fields will be undefined initially, handled by || ''
    });

    const sectorConfig = useMemo(() => getSectorConfig(intel.industry), [intel.industry]);
    const activeSteps = sectorConfig.discoverySteps;

    const validateStep = () => {
        const currentFields = activeSteps[step].fields;
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        currentFields.forEach(field => {
            if (!field.optional && !intel[field.key]) {
                newErrors[field.key] = "Please complete this field to continue.";
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (!validateStep()) return;

        if (step < activeSteps.length - 1) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
        else generateAudit();
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const generateAudit = async () => {
        setView('analyzing');
        setLoading(true);

        const systemPrompt = sectorConfig.generateSystemPrompt(intel);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
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
            console.error(err);
            setView('discovery');
            alert("Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const currentStep = activeSteps[step];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#e2b619] selection:text-black">

            {/* Landing & Discovery Views (Unchanged) */}
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
                    <p className="text-neutral-500 text-sm mb-10">{currentStep.description || "Detailed intel collection for high-accuracy modeling."}</p>

                    <div className="space-y-8">
                        {currentStep.fields.map((f) => (
                            <div key={f.key} className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-[#e2b619] tracking-widest">{f.label}</label>
                                {f.type === 'text' && (
                                    <input
                                        className={`w-full bg-neutral-900 border rounded-2xl p-5 outline-none transition-all text-lg font-medium ${errors[f.key] ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#e2b619]'}`}
                                        placeholder={f.placeholder}
                                        value={(intel[f.key] as string) || ''}
                                        onChange={e => {
                                            setIntel({ ...intel, [f.key]: e.target.value });
                                            if (errors[f.key]) setErrors({ ...errors, [f.key]: '' });
                                        }}
                                    />
                                )}
                                {f.type === 'select' && f.options && (
                                    <div className="grid grid-cols-1 gap-3">
                                        {f.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    setIntel({ ...intel, [f.key]: opt });
                                                    if (errors[f.key]) setErrors({ ...errors, [f.key]: '' });
                                                }}
                                                className={`p-5 rounded-2xl border-2 text-left text-sm font-bold transition-all ${intel[f.key] === opt
                                                        ? 'bg-[#e2b619] border-[#e2b619] text-black shadow-lg shadow-[#e2b619]/10'
                                                        : errors[f.key]
                                                            ? 'bg-neutral-900 border-red-500/50 text-neutral-400 hover:border-red-500'
                                                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {f.type === 'textarea' && (
                                    <textarea
                                        className={`w-full bg-neutral-900 border rounded-2xl p-5 outline-none min-h-[120px] text-lg font-medium ${errors[f.key] ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#e2b619]'}`}
                                        placeholder={f.placeholder}
                                        value={(intel[f.key] as string) || ''}
                                        onChange={e => {
                                            setIntel({ ...intel, [f.key]: e.target.value });
                                            if (errors[f.key]) setErrors({ ...errors, [f.key]: '' });
                                        }}
                                    />
                                )}
                                {errors[f.key] && (
                                    <div className="flex items-center gap-2 text-red-500 text-xs font-bold animate-pulse pl-2">
                                        <AlertCircle size={12} /> {errors[f.key]}
                                    </div>
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

            {/* NEW AUDIT REPORT UI */}
            {view === 'report' && auditResult && (
                <div className="max-w-4xl mx-auto p-6 pt-12 pb-32 animate-in fade-in zoom-in-95 duration-700">
                    
                    {/* Header */}
                    <header className="flex justify-between items-end mb-16 border-b border-neutral-800 pb-8">
                        <div>
                            <div className="text-[#e2b619] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Confidential Audit Report</div>
                            <h1 className="text-5xl font-black italic tracking-tighter">{intel.businessName.toUpperCase()}</h1>
                        </div>
                        <div className="text-right">
                            <div className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Generated By</div>
                            <div className="text-white font-black text-xl">Kène Engine v4.0</div>
                        </div>
                    </header>

                    {/* SECTION 1: THE DIAGNOSIS (Current State) */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-500"><AlertCircle size={16} /></div>
                            <h2 className="text-2xl font-black uppercase tracking-wide">01. Current Operational State</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Efficiency Score Gauge */}
                            <div className="bg-neutral-900/50 rounded-3xl p-8 border border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent"></div>
                                <div className="relative z-10 text-center">
                                    <div className="text-6xl font-black text-white mb-2">{auditResult.score}/100</div>
                                    <div className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">Efficiency Score</div>
                                </div>
                                {/* Simple Gauge Visual */}
                                <div className="w-full h-2 bg-neutral-800 rounded-full mt-6 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-red-500 to-[#e2b619]" style={{ width: `${auditResult.score}%` }}></div>
                                </div>
                            </div>

                            {/* Friction Points List */}
                            <div className="md:col-span-2 space-y-4">
                                {auditResult.setbacks.map((setback, i) => (
                                    <div key={i} className="bg-neutral-900/30 p-6 rounded-2xl border-l-4 border-red-500 flex items-start gap-4">
                                        <div className="mt-1 text-red-500"><ShieldX size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-sm text-red-200 uppercase tracking-wider mb-1">Critical Friction Point</h4>
                                            <p className="text-neutral-400 text-sm font-medium leading-relaxed">{setback}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: THE BLUEPRINT (Solution) */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-8 h-8 bg-[#e2b619]/20 rounded-full flex items-center justify-center text-[#e2b619]"><Zap size={16} /></div>
                            <h2 className="text-2xl font-black uppercase tracking-wide">02. The Infrastructure Solution</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {auditResult.roadmap.map((item, i) => {
                                const Icon = roadmapIcons[item.icon] || roadmapIcons['Default'];
                                return (
                                    <div key={i} className="group relative bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-[#e2b619] transition-all duration-300">
                                        <div className="absolute top-8 right-8 text-neutral-800 font-black text-6xl opacity-20 group-hover:text-[#e2b619] group-hover:opacity-10 transition-all">0{i+1}</div>
                                        <div className="flex items-start gap-6 relative z-10">
                                            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-[#e2b619] border border-neutral-800 group-hover:scale-110 transition-transform shadow-2xl">
                                                <Icon size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-[#e2b619] transition-colors">{item.title}</h3>
                                                <p className="text-neutral-400 leading-relaxed max-w-xl">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Projected Impact Metrics */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="bg-[#e2b619] text-black p-6 rounded-2xl text-center">
                                <div className="text-3xl font-black">{auditResult.impact.hours}hr+</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest opacity-70">Time Reclaimed</div>
                            </div>
                            <div className="bg-neutral-800 p-6 rounded-2xl text-center border border-neutral-700">
                                <div className="text-3xl font-black text-[#e2b619]">{auditResult.impact.rev}%</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Revenue Lift</div>
                            </div>
                            <div className="bg-neutral-800 p-6 rounded-2xl text-center border border-neutral-700">
                                <div className="text-3xl font-black text-white">-{auditResult.impact.churn}%</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Churn Reduction</div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: THE OFFER (Pitch) */}
                    <section className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#e2b619] to-[#b89414] transform -skew-y-2 rounded-[3rem] opacity-10"></div>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <BrainCircuit size={200} />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 bg-[#e2b619]/10 text-[#e2b619] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                    <Lock size={12} /> Priority Access Offer
                                </div>
                                
                                <h2 className="text-3xl font-black italic tracking-tighter mb-6">"Let's Build This Engine."</h2>
                                <p className="text-lg text-neutral-300 leading-relaxed mb-10 max-w-2xl border-l-4 border-[#e2b619] pl-6">
                                    {auditResult.pitch}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={() => window.open(`https://wa.me/2348061952248?text=I've reviewed the audit for ${intel.businessName}. I'm ready to deploy the ${auditResult.impact.hours}hr recovery roadmap.`)}
                                        className="flex-1 bg-[#e2b619] text-black font-black py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all hover:scale-[1.02] shadow-lg shadow-[#e2b619]/20"
                                    >
                                        DEPLOY INFRASTRUCTURE <ArrowRight size={20} />
                                    </button>
                                    <button 
                                        onClick={() => window.print()}
                                        className="px-8 py-5 bg-neutral-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-700 transition-all"
                                    >
                                        <FileText size={20} /> SAVE REPORT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer className="text-center mt-20 opacity-30">
                        <div className="flex justify-center gap-4 mb-4">
                            <Globe size={16} /> <Cpu size={16} /> <Database size={16} />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em]">Kène Intelligence Systems // 2025</p>
                    </footer>

                </div>
            )}
        </div>
    );
};

export default App;