import React, { useRef, useState } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const panelClasses = 'rounded-[24px] border border-white/10 bg-[rgba(10,18,34,0.82)] p-[1.1rem] shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-[18px]'
const textareaClasses = 'w-full rounded-[20px] border border-white/10 bg-[rgba(15,23,42,0.94)] px-4 py-4 text-[#edf4ff] outline-none transition placeholder:text-[rgba(142,163,187,0.78)] focus:border-[rgba(96,165,250,0.55)] focus:shadow-[0_0_0_4px_rgba(96,165,250,0.14)]'
const badgeClasses = 'inline-flex w-fit items-center justify-center rounded-full border border-[rgba(96,165,250,0.2)] bg-[rgba(59,130,246,0.14)] px-3 py-1 text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#dbeafe]'

const scoreTone = (score) => {
    if (score >= 80) return 'text-[#34d399]'
    if (score >= 60) return 'text-[#fbbf24]'
    return 'text-[#f87171]'
}

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState('')
    const [ selfDescription, setSelfDescription ] = useState('')
    const [ selectedFileName, setSelectedFileName ] = useState('')
    const resumeInputRef = useRef()

    const navigate = useNavigate()
    const jobDescriptionCount = jobDescription.length
    const selfDescriptionCount = selfDescription.length
    const canGenerate = jobDescription.trim() && (selectedFileName || selfDescription.trim())

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const handleResumeChange = (event) => {
        const file = event.target.files?.[ 0 ]
        setSelectedFileName(file ? file.name : '')
    }

    if (loading) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#07111f] px-6 text-center text-[#edf4ff]">
                <h1 className="font-['Fraunces',Georgia,serif] text-4xl">Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.2),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,#07111f_0%,#0d1728_45%,#111f34_100%)] px-4 py-8 text-[#edf4ff] sm:px-5 sm:py-10">
            <div className="pointer-events-none fixed top-[8%] right-[-5rem] h-64 w-64 rounded-full bg-[rgba(96,165,250,0.18)] opacity-75 blur-[10px]" />
            <div className="pointer-events-none fixed bottom-[14%] left-[-4rem] h-56 w-56 rounded-full bg-[rgba(34,211,238,0.12)] opacity-75 blur-[10px]" />

            <section className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col gap-8">
                <header className="flex items-start justify-between gap-4 py-2 max-[980px]:flex-col max-[980px]:items-stretch">
                    <div className="flex items-start gap-4">
             
                        <div>
          <p className="mb-3 text-5xl font-extrabold  text-slate-200 border-b-4 border-orange-400 inline-block pb-2">
  Interview Craft Studio
</p>
                        </div>
                    </div>
                </header>

                <section className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-[rgba(8,16,31,0.82)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-[18px] sm:p-8">
                    <div className="flex items-center justify-between gap-4 max-[980px]:flex-col max-[980px]:items-stretch">
                        <div>
                            <p className="mb-3 text-xs font-extrabold tracking-[0.18em] uppercase text-[#dbeafe]">Build your brief</p>
                            <h3 className="font-['Fraunces',Georgia,serif] text-[clamp(1.65rem,2.4vw,2.2rem)] tracking-[-0.03em]">Generate a custom interview strategy</h3>
                        </div>
                        <span className="inline-flex w-fit items-center justify-center rounded-full border border-[rgba(96,165,250,0.18)] bg-[rgba(96,165,250,0.1)] px-4 py-2 text-[0.74rem] font-bold tracking-[0.08em] uppercase text-[#dbeafe]">Approx. 30 seconds</span>
                    </div>

                    <div className={panelClasses}>
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-2">
                                <span className="inline-flex text-[#dbeafe]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2 className="flex-1 text-base font-bold">Target job description</h2>
                            </div>
                            <span className={badgeClasses}>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            value={jobDescription}
                            className={`${textareaClasses} min-h-[260px] resize-none leading-7`}
                            placeholder={`Paste the role description here.\nInclude responsibilities, expectations, and the skills the company keeps repeating.`}
                            maxLength={5000}
                        />
                        <div className="mt-3 flex items-center justify-between gap-4 text-sm leading-[1.4] text-[#8ea3bb]">
                            <span>Use the full listing for the strongest results.</span>
                            <span>{jobDescriptionCount} / 5000</span>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className={`${panelClasses} h-full`}>
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-2">
                                    <span className="inline-flex text-[#dbeafe]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </span>
                                    <h2 className="flex-1 text-base font-bold">Resume upload</h2>
                                </div>
                                <span className={badgeClasses}>Best results</span>
                            </div>
                            <label className="flex min-h-[170px] cursor-pointer flex-col items-start justify-center gap-2 rounded-[20px] border border-dashed border-[rgba(96,165,250,0.28)] bg-linear-to-b from-[rgba(15,23,42,0.94)] to-[rgba(10,18,34,0.9)] p-5 transition hover:-translate-y-px hover:border-[rgba(34,211,238,0.5)] hover:shadow-[0_16px_32px_rgba(34,211,238,0.1)]" htmlFor="resume">
                                <span className="text-[#dbeafe]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className="text-[0.98rem] font-bold">{selectedFileName || 'Choose a PDF or DOCX file'}</p>
                                <p className="text-sm leading-6 text-[#8ea3bb]">{selectedFileName ? 'Resume attached and ready for analysis' : 'Upload your latest version, up to 5MB'}</p>
                                <input ref={resumeInputRef} hidden type="file" id="resume" name="resume" accept=".pdf,.docx" onChange={handleResumeChange} />
                            </label>
                        </div>

                        <div className={`${panelClasses} h-full`}>
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <div className="flex min-w-0 items-center gap-2">
                                    <span className="inline-flex text-[#dbeafe]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                    </span>
                                    <h2 className="flex-1 text-base font-bold">Quick self-summary</h2>
                                </div>
                            </div>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                value={selfDescription}
                                id="selfDescription"
                                name="selfDescription"
                                className={`${textareaClasses} min-h-[170px] resize-none leading-7`}
                                placeholder="Summarize your years of experience, strongest tools, industry background, and the kind of outcomes you usually deliver."
                                maxLength={1200}
                            />
                            <div className="mt-3 flex items-center justify-between gap-4 text-sm leading-[1.4] text-[#8ea3bb]">
                                <span>Use this if you do not have a resume handy.</span>
                                <span>{selfDescriptionCount} / 1200</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-[22px] border border-[rgba(45,212,191,0.16)] bg-[rgba(20,184,166,0.14)] px-4 py-4">
                        <span className="mt-0.5 shrink-0 text-[#5eead4]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#10261f" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#10261f" strokeWidth="2" /></svg>
                        </span>
                        <p className="leading-[1.65] text-[#c2f5ee]">Include either a <strong>resume</strong> or a <strong>self-summary</strong> alongside the job description to generate a personalized plan.</p>
                    </div>

                    <div className="flex items-end justify-between gap-4 pt-1 max-[980px]:flex-col max-[980px]:items-stretch">
                        <p className="max-w-[30rem] text-[0.92rem] leading-[1.7] text-[#8ea3bb]">AI-guided role analysis, positioning cues, and talking points tailored to this application.</p>
                        <button
                            onClick={handleGenerateReport}
                            className="inline-flex min-w-[240px] items-center justify-center gap-2 rounded-full bg-linear-to-br from-[#2563eb] to-[#22d3ee] px-5 py-4 text-[0.92rem] font-extrabold tracking-[0.02em] text-[#eff8ff] shadow-[0_20px_34px_rgba(37,99,235,0.24)] transition hover:-translate-y-px hover:shadow-[0_24px_40px_rgba(37,99,235,0.32)] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none max-[980px]:w-full max-[980px]:min-w-0"
                            disabled={!canGenerate}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate interview strategy
                        </button>
                    </div>
                </section>
            </section>

            {reports.length > 0 && (
                <section className="relative z-10 mx-auto mt-8 w-full max-w-[1180px] rounded-[30px] border border-white/10 bg-[rgba(8,16,31,0.82)] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-[18px] sm:p-8">
                    <div className="mb-5 flex items-end justify-between gap-4 max-[980px]:flex-col max-[980px]:items-stretch">
                        <div>
                            <p className="mb-3 text-xs font-extrabold tracking-[0.18em] uppercase text-[#dbeafe]">Recent work</p>
                            <h2 className="font-['Fraunces',Georgia,serif] text-[clamp(1.65rem,2.4vw,2.2rem)] tracking-[-0.03em]">Your latest interview plans</h2>
                        </div>
                        <p className="max-w-[26rem] leading-[1.7] text-[#8ea3bb]">Pick up where you left off and revisit the strongest role matches.</p>
                    </div>
                    <ul className="grid list-none gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                        {reports.map(report => (
                            <li key={report._id} className="flex cursor-pointer flex-col gap-3 rounded-[24px] border border-white/10 bg-[rgba(10,18,34,0.86)] p-[1.15rem] shadow-[0_12px_24px_rgba(2,6,23,0.18)] backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:border-[rgba(96,165,250,0.22)] hover:shadow-[0_18px_36px_rgba(2,6,23,0.28)]" onClick={() => navigate(`/interview/${report._id}`)}>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="inline-flex w-fit items-center justify-center rounded-full bg-[rgba(96,165,250,0.1)] px-3 py-1 text-[0.74rem] font-bold tracking-[0.08em] uppercase text-[#dbeafe]">Interview plan</span>
                                    <p className={`text-[0.86rem] font-extrabold ${scoreTone(report.matchScore)}`}>{report.matchScore}% match</p>
                                </div>
                                <h3 className="font-['Fraunces',Georgia,serif] text-[1.3rem] leading-[1.15] tracking-[-0.02em]">{report.title || 'Untitled position'}</h3>
                                <p className="text-[0.88rem] text-[#8ea3bb]">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className="mt-auto font-bold text-[#22d3ee]">Open strategy</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <footer className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6 text-center">
                <a className="text-[0.84rem] text-[#8ea3bb] transition hover:text-[#edf4ff]" href="#">Privacy Policy</a>
                <a className="text-[0.84rem] text-[#8ea3bb] transition hover:text-[#edf4ff]" href="#">Terms of Service</a>
                <a className="text-[0.84rem] text-[#8ea3bb] transition hover:text-[#edf4ff]" href="#">Help Center</a>
            </footer>
        </div>
    )
}

export default Home
