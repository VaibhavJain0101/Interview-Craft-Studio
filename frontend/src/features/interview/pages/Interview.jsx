import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useInterview } from '../hooks/useInterview.js'

const NAV_ITEMS = [
    {
        id: 'technical',
        label: 'Technical Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        id: 'behavioral',
        label: 'Behavioral Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        id: 'roadmap',
        label: 'Road Map',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
        ),
    },
]

const RESUME_ICON = (
    <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
    </svg>
)

const panelShell = 'rounded-[24px] border border-white/10 bg-[rgba(8,16,31,0.82)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-[18px]'

const scoreRingTone = (score) => {
    if (score >= 80) return 'border-[#34d399]'
    if (score >= 60) return 'border-[#fbbf24]'
    return 'border-[#f87171]'
}

const skillTone = (severity) => {
    if (severity === 'high') return 'border-[rgba(184,72,63,0.15)] bg-[rgba(184,72,63,0.1)] text-[#f87171]'
    if (severity === 'medium') return 'border-[rgba(160,107,38,0.16)] bg-[rgba(160,107,38,0.12)] text-[#fbbf24]'
    return 'border-[rgba(31,107,83,0.15)] bg-[rgba(31,107,83,0.1)] text-[#34d399]'
}

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(index === 0)

    return (
        <div className="w-full overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(10,18,34,0.86)]">
            <button className="flex w-full cursor-pointer items-start gap-3 bg-transparent px-4 py-4 text-left" onClick={() => setOpen((value) => !value)} type="button">
                <span className="shrink-0 rounded-full bg-[rgba(59,130,246,0.14)] px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.08em] text-[#dbeafe]">Q{index + 1}</span>
                <p className="min-w-0 flex-1 break-words text-base leading-[1.6] font-bold">{item.question}</p>
                <span className={`shrink-0 text-[#8ea3bb] transition ${open ? 'rotate-180 text-[#22d3ee]' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>

            {open && (
                <div className="flex flex-col gap-3 px-4 pb-4">
                    <div className="flex flex-col gap-2 rounded-[20px] border border-white/10 bg-[rgba(15,23,42,0.94)] px-4 py-4">
                        <span className="inline-flex w-fit rounded-full bg-[rgba(139,92,246,0.14)] px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.08em] uppercase text-[#c4b5fd]">Intention</span>
                        <p className="leading-[1.75] text-[#8ea3bb]">{item.intention}</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-[20px] border border-white/10 bg-[rgba(15,23,42,0.94)] px-4 py-4">
                        <span className="inline-flex w-fit rounded-full bg-[rgba(52,211,153,0.12)] px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.08em] uppercase text-[#34d399]">Model Answer</span>
                        <p className="leading-[1.75] text-[#8ea3bb]">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="relative ml-7 rounded-[24px] border border-white/10 bg-[rgba(10,18,34,0.86)] px-4 py-4 before:absolute before:top-[1.2rem] before:left-[-1.42rem] before:h-[14px] before:w-[14px] before:rounded-full before:border-[3px] before:border-[#60a5fa] before:content-['']">
        <div className="mb-3 flex items-center gap-3">
            <span className="inline-flex rounded-full bg-[rgba(59,130,246,0.14)] px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.08em] uppercase text-[#dbeafe]">Day {day.day}</span>
            <h3 className="font-['Fraunces',Georgia,serif] text-[1.2rem] tracking-[-0.02em]">{day.focus}</h3>
        </div>
        <ul className="flex list-none flex-col gap-2">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3 leading-[1.7] text-[#8ea3bb]">
                    <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#22d3ee]" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    const activeSectionMeta = useMemo(() => {
        if (!report) {
            return { title: '', count: '', description: '' }
        }

        if (activeNav === 'technical') {
            return {
                title: 'Technical Questions',
                count: `${report.technicalQuestions.length} questions`,
                description: 'Use these to rehearse systems, tools, tradeoffs, and implementation depth that map directly to the role.',
            }
        }

        if (activeNav === 'behavioral') {
            return {
                title: 'Behavioral Questions',
                count: `${report.behavioralQuestions.length} questions`,
                description: 'Practice concise stories that connect your experience to ownership, collaboration, and decision-making.',
            }
        }

        return {
            title: 'Preparation Road Map',
            count: `${report.preparationPlan.length}-day plan`,
            description: 'Follow a focused prep sequence so your strongest examples and weak spots get attention before interview day.',
        }
    }, [ activeNav, report ])

    if (loading || !report) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#07111f] px-6 text-center text-[#edf4ff]">
                <h1 className="font-['Fraunces',Georgia,serif] text-4xl">Loading your interview plan...</h1>
            </main>
        )
    }

    const highPriorityGaps = report.skillGaps.filter((gap) => gap.severity === 'high')

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.12),transparent_24%),linear-gradient(180deg,#07111f_0%,#0d1728_45%,#111f34_100%)] px-4 py-8 text-[#edf4ff] sm:px-5 sm:py-10">
            <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6">
                <header className="grid gap-5 rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(11,22,41,0.94),rgba(9,18,34,0.84))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-[18px] lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] sm:p-8">
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#dbeafe]">Interview Craft Studio</p>
                        <h1 className="max-w-[12ch] font-['Fraunces',Georgia,serif] text-[clamp(2.2rem,4vw,4rem)] leading-[0.98] tracking-[-0.04em]">{report.title || 'Your interview strategy deck'}</h1>
                        <p className="max-w-[54ch] text-base leading-[1.8] text-[#8ea3bb]">
                            Review your role-fit signals, rehearse sharper answers, and move through the prep plan with a calmer, clearer story.
                        </p>
                        <div className="mt-1 flex flex-wrap gap-3 max-[680px]:flex-col">
                            <button
                                onClick={() => { getResumePdf(interviewId) }}
                                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-br from-[#2563eb] to-[#22d3ee] px-5 py-4 text-[0.92rem] font-extrabold text-[#eff8ff] shadow-[0_20px_34px_rgba(37,99,235,0.24)] transition hover:-translate-y-px max-[680px]:w-full"
                                type="button"
                            >
                                {RESUME_ICON}
                                Download resume draft
                            </button>
                            <Link to="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(96,165,250,0.16)] bg-[rgba(96,165,250,0.08)] px-5 py-4 text-[0.92rem] font-extrabold text-[#dbeafe] transition hover:-translate-y-px max-[680px]:w-full">Back to homepage</Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center gap-3 rounded-[24px] bg-[rgba(5,12,24,0.94)] px-5 py-5 text-[#eef6ff]">
                            <p className="self-start text-[0.76rem] font-extrabold tracking-[0.14em] uppercase text-[rgba(238,246,255,0.72)]">Match score</p>
                            <div className={`relative flex h-[108px] w-[108px] items-center justify-center rounded-full border-4 ${scoreRingTone(report.matchScore)}`}>
                                <span className="font-['Fraunces',Georgia,serif] text-[2.1rem] leading-none">{report.matchScore}</span>
                                <span className="absolute right-6 bottom-7 text-[0.78rem] text-[rgba(238,246,255,0.72)]">%</span>
                            </div>
                            <p className="text-center text-[0.92rem] leading-[1.6] text-[rgba(238,246,255,0.8)]">Strong positioning potential for this role</p>
                        </div>

                        <div className="rounded-[24px] border-l-[3px] border-l-[#60a5fa] bg-[rgba(96,165,250,0.1)] px-5 py-5">
                            <p className="mb-2 text-[0.76rem] font-extrabold tracking-[0.12em] uppercase text-[#dbeafe]">Main gap to close</p>
                            <p className="leading-[1.7] text-[#8ea3bb]">{highPriorityGaps[ 0 ]?.skill || 'Refine your strongest examples and clarify your impact story.'}</p>
                        </div>
                    </div>
                </header>

                <div className="grid items-start gap-4 xl:grid-cols-[260px_minmax(0,1fr)_260px]">
                    <nav className="flex flex-col gap-4">
                        <div className={panelShell}>
                            <p className="mb-3 text-[0.74rem] font-extrabold tracking-[0.14em] uppercase text-[#dbeafe]">Sections</p>
                            <div className="flex flex-col gap-2">
                                {NAV_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        className={`flex w-full cursor-pointer items-center gap-3 rounded-[18px] border px-4 py-3 text-left font-bold transition ${activeNav === item.id ? 'border-[rgba(96,165,250,0.16)] bg-[rgba(96,165,250,0.12)] text-[#dbeafe]' : 'border-transparent bg-transparent text-[#8ea3bb] hover:-translate-y-px hover:bg-[rgba(15,23,42,0.76)] hover:text-[#edf4ff]'}`}
                                        onClick={() => setActiveNav(item.id)}
                                        type="button"
                                    >
                                        <span className="inline-flex shrink-0">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`${panelShell} bg-[rgba(96,165,250,0.08)]`}>
                            <p className="mb-3 text-[0.74rem] font-extrabold tracking-[0.14em] uppercase text-[#dbeafe]">Focus cue</p>
                            <p className="text-[0.92rem] leading-[1.75] text-[#8ea3bb]">{activeSectionMeta.description}</p>
                        </div>
                    </nav>

                    <main className="min-h-0 rounded-[30px] border border-white/10 bg-[rgba(8,16,31,0.82)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-[18px] sm:p-6">
                        <div className="mb-2 flex items-end justify-between gap-4 max-[680px]:flex-col max-[680px]:items-stretch">
                            <div>
                                <p className="mb-3 text-xs font-extrabold tracking-[0.18em] uppercase text-[#dbeafe]">Prep section</p>
                                <h2 className="font-['Fraunces',Georgia,serif] text-[clamp(1.7rem,2.5vw,2.4rem)] tracking-[-0.03em]">{activeSectionMeta.title}</h2>
                            </div>
                            <span className="inline-flex w-fit items-center justify-center rounded-full bg-[rgba(96,165,250,0.12)] px-4 py-2 text-[0.78rem] font-extrabold tracking-[0.08em] uppercase whitespace-nowrap text-[#dbeafe]">{activeSectionMeta.count}</span>
                        </div>

                        <p className="mb-5 max-w-[60ch] leading-[1.8] text-[#8ea3bb]">{activeSectionMeta.description}</p>

                        {activeNav === 'technical' && (
                            <section>
                                <div className="flex flex-col gap-4">
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section>
                                <div className="flex flex-col gap-4">
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section>
                                <div className="relative flex flex-col gap-4 pl-1 before:absolute before:top-[0.4rem] before:bottom-[0.4rem] before:left-4 before:w-[2px] before:rounded-full before:bg-[linear-gradient(to_bottom,#60a5fa,rgba(96,165,250,0.15))] before:content-['']">
                                    {report.preparationPlan.map((day) => (
                                        <RoadMapDay key={day.day} day={day} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    <aside className="flex flex-col gap-4">
                        <div className={panelShell}>
                            <p className="mb-3 text-[0.74rem] font-extrabold tracking-[0.14em] uppercase text-[#dbeafe]">Skill gaps</p>
                            <div className="flex flex-wrap gap-2">
                                {report.skillGaps.map((gap, i) => (
                                    <span key={i} className={`inline-flex items-center justify-center rounded-full border px-3 py-2 text-[0.76rem] font-extrabold tracking-[0.04em] ${skillTone(gap.severity)}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={`${panelShell} bg-[rgba(5,12,24,0.94)] text-[#eef6ff]`}>
                            <p className="mb-3 text-[0.74rem] font-extrabold tracking-[0.14em] uppercase text-[rgba(238,246,255,0.74)]">How to use this page</p>
                            <ul className="flex list-none flex-col gap-3">
                                <li className="relative pl-4 leading-[1.7] text-[rgba(238,246,255,0.82)] before:absolute before:top-[0.7rem] before:left-0 before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#22d3ee] before:content-['']">Start with the section where your confidence is lowest.</li>
                                <li className="relative pl-4 leading-[1.7] text-[rgba(238,246,255,0.82)] before:absolute before:top-[0.7rem] before:left-0 before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#22d3ee] before:content-['']">Open each card and rehearse the answer in your own voice.</li>
                                <li className="relative pl-4 leading-[1.7] text-[rgba(238,246,255,0.82)] before:absolute before:top-[0.7rem] before:left-0 before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#22d3ee] before:content-['']">Use the roadmap to sequence your prep over the next few days.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Interview
