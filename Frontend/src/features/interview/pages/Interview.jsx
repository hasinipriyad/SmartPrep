import { ThemeToggle } from '../../shared/components/ThemeToggle.jsx'
import {
  FiTarget, FiAlertTriangle, FiCode, FiUsers, FiCalendar,
  FiHelpCircle, FiCheckCircle, FiChevronRight, FiBriefcase, FiLoader, FiLogOut
} from 'react-icons/fi'
import { useInterview } from '../hook/useInterview.js'
import { useAuth } from '../../auth/hook/useAuth.js'
import { useState } from 'react'
import { useNavigate } from 'react-router'


const severityRank = { high: 3, medium: 2, low: 1 }

const severityStyles = {
  high: 'bg-red-500/10 text-red-600 ring-red-500/20 dark:text-red-400',
  medium: 'bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400',
  low: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400',
}

const TABS = [
  { id: 'technical', label: 'Technical', icon: FiCode },
  { id: 'behavioral', label: 'Behavioral', icon: FiUsers },
  { id: 'schedule', label: 'Prep Schedule', icon: FiCalendar },
]

const Interview = () => {

  const { report, loading } = useInterview();
  const { handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState('technical');

  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  if (!report) {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-light ring-1 ring-muted-light/20 transition-colors hover:text-accent hover:ring-accent/40 dark:text-muted-dark dark:ring-muted-dark/20"
          >
            <FiLogOut size={16} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <FiLoader size={32} className="animate-spin text-accent" />
          <div>
            <p className="text-lg font-semibold">Building your report</p>
            <p className="mt-1 text-sm text-muted-light dark:text-muted-dark">
              Analyzing your resume against the role — this takes a moment.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const scoreTone =
    report.matchScore >= 75 ? 'text-emerald-500' :
    report.matchScore >= 50 ? 'text-amber-500' : 'text-red-500'

  return (
    <main className="relative min-h-screen px-4 py-10">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-light ring-1 ring-muted-light/20 transition-colors hover:text-accent hover:ring-accent/40 dark:text-muted-dark dark:ring-muted-dark/20"
        >
          <FiLogOut size={16} />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>

      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-3xl font-bold tracking-tight text-accent transition-opacity hover:opacity-80"
          >
            SmartPrep
          </button>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Your interview report
          </h1>
          {report.title && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              <FiBriefcase size={14} />
              {report.title}
            </div>
          )}
          <p className="mt-3 text-sm text-muted-light dark:text-muted-dark">
            Everything here is tailored to your resume and the role — switch between tabs to work through each part.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-10 lg:self-start">
            {/* Match score */}
            <div className="rounded-2xl bg-panel-light p-6 text-center shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-light dark:text-muted-dark">
                <FiTarget size={16} className="text-accent" />
                Match Score
              </div>
              <div className={`mt-2 text-5xl font-bold tracking-tight ${scoreTone}`}>
                {report.matchScore}
                <span className="text-2xl text-muted-light dark:text-muted-dark">/100</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-surface-light dark:bg-surface-dark">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${report.matchScore}%` }}
                />
              </div>
            </div>

            {/* Skill gaps */}
            <div className="rounded-2xl bg-panel-light p-6 shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <FiAlertTriangle size={16} className="text-accent" />
                Skill Gaps
              </h2>
              <p className="mt-1 text-xs text-muted-light dark:text-muted-dark">
                Ranked by how much they could hurt you.
              </p>
              <div className="mt-4 space-y-2">
                {[...report.skillGaps]
                  .sort((a, b) => severityRank[b.severity] - severityRank[a.severity])
                  .map((gap, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg bg-surface-light px-3 py-2 dark:bg-surface-dark"
                    >
                      <span className="text-sm font-medium">{gap.skill}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${severityStyles[gap.severity]}`}>
                        {gap.severity}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </aside>

          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Tab bar */}
            <div className="flex gap-1 rounded-xl bg-panel-light p-1 shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent text-white dark:text-surface-dark'
                        : 'text-muted-light hover:bg-surface-light dark:text-muted-dark dark:hover:bg-surface-dark'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab content */}
            <div className="mt-6">
              {activeTab === 'technical' && (
                <section className="rounded-2xl bg-panel-light p-6 shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15 sm:p-8">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <FiCode size={18} className="text-accent" />
                    Technical Questions
                  </h2>
                  <div className="mt-5 space-y-5">
                    {report.technicalQuestions.map((q, i) => (
                      <QuestionCard key={i} item={q} index={i + 1} />
                    ))}
                  </div>
                </section>
              )}

              {activeTab === 'behavioral' && (
                <section className="rounded-2xl bg-panel-light p-6 shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15 sm:p-8">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <FiUsers size={18} className="text-accent" />
                    Behavioral Questions
                  </h2>
                  <div className="mt-5 space-y-5">
                    {report.behavioralQuestions.map((q, i) => (
                      <QuestionCard key={i} item={q} index={i + 1} />
                    ))}
                  </div>
                </section>
              )}

              {activeTab === 'schedule' && (
                <section className="rounded-2xl bg-panel-light p-6 shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15 sm:p-8">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <FiCalendar size={18} className="text-accent" />
                    Preparation Schedule
                  </h2>
                  <div className="mt-5 space-y-4">
                    {report.preparationSchedule.map((day, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white dark:text-surface-dark">
                            {day.day}
                          </div>
                          {i < report.preparationSchedule.length - 1 && (
                            <div className="mt-1 w-px flex-1 bg-muted-light/20 dark:bg-muted-dark/20" />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <h3 className="font-medium">{day.focus}</h3>
                          <ul className="mt-2 space-y-1.5">
                            {day.tasks.map((task, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-muted-light dark:text-muted-dark">
                                <FiCheckCircle size={15} className="mt-0.5 shrink-0 text-accent" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Small subcomponent for a question/intention/answer block
const QuestionCard = ({ item, index }) => (
  <div className="rounded-xl bg-surface-light p-5 ring-1 ring-muted-light/15 dark:bg-surface-dark dark:ring-muted-dark/15">
    <div className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
        {index}
      </span>
      <p className="font-medium leading-snug">{item.question}</p>
    </div>

    <div className="mt-4 space-y-3 pl-9">
      <div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-light dark:text-muted-dark">
          <FiHelpCircle size={13} />
          Why they ask
        </span>
        <p className="mt-1 text-sm text-muted-light dark:text-muted-dark">{item.intention}</p>
      </div>
      <div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
          <FiChevronRight size={13} />
          How to answer
        </span>
        <p className="mt-1 text-sm leading-relaxed">{item.answer}</p>
      </div>
    </div>
  </div>
)

export default Interview