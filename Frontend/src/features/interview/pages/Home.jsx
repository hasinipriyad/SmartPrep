import { ThemeToggle } from '../../shared/components/ThemeToggle.jsx'
import { FiFileText, FiUploadCloud, FiUser, FiArrowRight, FiCheckCircle, FiClock, FiTarget, FiBriefcase, FiLogOut } from 'react-icons/fi'
import { useInterview } from '../hook/useInterview.js'
import { useAuth } from '../../auth/hook/useAuth.js'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'

const MAX_RESUME_BYTES = 2 * 1024 * 1024 // 2MB

const Home = () => {

  const { generateReport, reports, loading } = useInterview();
  const { handleLogout } = useAuth();

  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [resumeName, setResumeName] = useState('');
  const resumeInputRef = useRef(null);

  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeName('');
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      alert('Resume must be 2MB or smaller.');
      e.target.value = '';
      setResumeName('');
      return;
    }
    setResumeName(file.name);
  };

  const handleGenerateReport = async () => {
    if (!jobDescription || !selfDescription || !resumeInputRef.current.files[0]) {
      alert('Please fill in all fields and upload your resume.');
      return;
    }

    const resumeFile = resumeInputRef.current.files[0];

    const data = await generateReport({ jobDescription, selfDescription, resumeFile });
    if (!data) {
      alert('Failed to generate report. Please try again.');
      return;
    }
    navigate(`/interview/${data._id}`);
  };

  const scoreToneFor = (score) =>
    score >= 75 ? 'text-emerald-500' :
    score >= 50 ? 'text-amber-500' : 'text-red-500';

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

      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <span className="text-3xl font-bold tracking-tight text-accent">SmartPrep</span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Walk into your next interview ready.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-light dark:text-muted-dark">
            Drop in the job description and your resume, and SmartPrep builds a
            tailored prep report — likely questions, your strengths, and the gaps
            worth closing before the call.
          </p>
        </header>

        <div className="rounded-2xl bg-panel-light p-8 shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15 sm:p-10">
          <div className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="jobDescription" className="flex items-center gap-2 text-sm font-medium">
                <FiFileText className="text-accent" size={16} />
                Job Description
              </label>
              <textarea
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the job description here..."
                className="min-h-56 resize-none rounded-xl bg-surface-light p-4 text-sm outline-none ring-1 ring-muted-light/20 transition-shadow placeholder:text-muted-light/60 focus:ring-2 focus:ring-accent dark:bg-surface-dark dark:ring-muted-dark/20 dark:placeholder:text-muted-dark/50"
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="resume" className="flex items-center gap-2 text-sm font-medium">
                  <FiUploadCloud className="text-accent" size={16} />
                  Resume
                </label>
                <label
                  htmlFor="resume"
                  className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
                    resumeName
                      ? 'border-accent/50 bg-accent/5'
                      : 'border-muted-light/30 bg-surface-light hover:border-accent/50 dark:border-muted-dark/30 dark:bg-surface-dark'
                  }`}
                >
                  {resumeName ? (
                    <FiCheckCircle className="text-accent" size={24} />
                  ) : (
                    <FiUploadCloud className="text-muted-light dark:text-muted-dark" size={24} />
                  )}
                  <span className="text-sm font-medium break-all">
                    {resumeName || 'Upload your resume'}
                  </span>
                  <span className="text-xs text-muted-light dark:text-muted-dark">
                    {resumeName ? 'Click to replace' : 'PDF only (Max: 2MB)'}
                  </span>
                </label>
                <input
                  hidden
                  type="file"
                  name="resume"
                  id="resume"
                  accept=".pdf"
                  ref={resumeInputRef}
                  onChange={handleResumeChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="selfDescription" className="flex items-center gap-2 text-sm font-medium">
                  <FiUser className="text-accent" size={16} />
                  Self Description
                </label>
                <textarea
                  name="selfDescription"
                  id="selfDescription"
                  placeholder="A few sentences about yourself and your goals..."
                  className="min-h-32 flex-1 resize-none rounded-xl bg-surface-light p-4 text-sm outline-none ring-1 ring-muted-light/20 transition-shadow placeholder:text-muted-light/60 focus:ring-2 focus:ring-accent dark:bg-surface-dark dark:ring-muted-dark/20 dark:placeholder:text-muted-dark/50"
                  onChange={(e) => setSelfDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60 dark:text-surface-dark"
              onClick={handleGenerateReport}
              disabled={loading}
            >
              {loading ? 'Generating…' : 'Generate Interview Report'}
              {!loading && <FiArrowRight size={16} />}
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-light dark:text-muted-dark">
          Your resume is used only to generate your report.
        </p>

        {/* Recent reports */}
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <FiClock size={16} className="text-accent" />
            Recent Reports
          </h2>

          {reports && reports.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((r) => (
                <button
                  key={r._id}
                  onClick={() => navigate(`/interview/${r._id}`)}
                  className="group flex h-full flex-col justify-between gap-4 rounded-2xl bg-panel-light p-5 text-left shadow-sm ring-1 ring-muted-light/15 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-accent/50 dark:bg-panel-dark dark:ring-muted-dark/15"
                >
                  <div className="flex items-start gap-2">
                    <FiBriefcase size={16} className="mt-0.5 shrink-0 text-accent" />
                    <p className="line-clamp-2 text-sm font-medium leading-snug">
                      {r.title || 'Untitled role'}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-light dark:text-muted-dark">
                      <FiTarget size={12} className="text-accent" />
                      Match score
                    </span>
                    <span className={`text-2xl font-bold leading-none ${scoreToneFor(r.matchScore)}`}>
                      {r.matchScore}
                      <span className="text-xs font-medium text-muted-light dark:text-muted-dark">/100</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-muted-light/30 bg-surface-light p-6 text-center text-sm text-muted-light dark:border-muted-dark/30 dark:bg-surface-dark dark:text-muted-dark">
              No reports yet. Generate your first one above.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Home