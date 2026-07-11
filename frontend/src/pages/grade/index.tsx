/**
 * ©AngelaMos | 2026
 * index.tsx
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './grade.module.scss'

type Verdict = 'POSTER' | 'NEWSPAPER' | 'SLOP'
type Severity = 'CRITICAL' | 'MODERATE' | 'MINOR'
type AxisKey = 'FOCAL' | 'HIERARCHY' | 'SPACE' | 'RESTRAINT' | 'COLOR' | 'TYPE'

interface AxisScore {
  key: AxisKey
  label: string
  score: number
  note: string
}

interface Tell {
  name: string
  severity: Severity
  evidence: string
}

interface GradeResult {
  verdict: Verdict
  overall_score: number
  headline_read: string
  axes: AxisScore[]
  tells: Tell[]
  fixes: string[]
  one_thing: string
}

type Phase = 'idle' | 'working' | 'done' | 'error'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api'
const ACCEPT = 'image/png,image/jpeg,image/webp'
const MAX_BYTES = 10 * 1024 * 1024

const LOG_LINES = [
  'INIT ANALYZER ... OK',
  'DECODE SPECIMEN ... OK',
  'READ FOCAL DISCIPLINE ...',
  'MEASURE TYPE HIERARCHY ...',
  'SAMPLE NEGATIVE SPACE ...',
  'COUNT READING ZONES ...',
  'SCAN COLOR PALETTE ...',
  'MATCH MECHANICAL TELLS ...',
  'SCORE AGAINST 2026 META ...',
  'COMPILE SPECIFIC DIFF ...',
]

function band(score: number): 'pass' | 'mid' | 'fail' {
  if (score >= 70) return 'pass'
  if (score >= 45) return 'mid'
  return 'fail'
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function Component(): React.ReactElement {
  const [phase, setPhase] = useState<Phase>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const [dims, setDims] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const [result, setResult] = useState<GradeResult | null>(null)
  const [error, setError] = useState<string>('')
  const [logCount, setLogCount] = useState(0)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (phase !== 'working') return
    setLogCount(1)
    const id = setInterval(() => {
      setLogCount((c) => (c < LOG_LINES.length ? c + 1 : c))
    }, 480)
    return () => clearInterval(id)
  }, [phase])

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const submit = useCallback(async (file: File) => {
    if (!ACCEPT.split(',').includes(file.type)) {
      setError('That file is not a PNG, JPG, or WEBP.')
      setPhase('error')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('Slide is over 10MB. Export it smaller and try again.')
      setPhase('error')
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)
    setFileName(file.name)
    setResult(null)
    setError('')

    const img = new Image()
    img.onload = () => setDims(`${img.naturalWidth}x${img.naturalHeight}`)
    img.src = url

    setPhase('working')

    try {
      const body = new FormData()
      body.append('slide', file)
      const res = await fetch(`${API_BASE}/v1/grade`, { method: 'POST', body })

      if (!res.ok) {
        let detail = 'The grader could not read that slide. Try another.'
        if (res.status === 420 || res.status === 429) {
          detail = 'Easy. You are grading too fast. Wait a minute and try again.'
        } else {
          try {
            const data = (await res.json()) as { detail?: string }
            if (data.detail) detail = data.detail
          } catch {
            /* keep default */
          }
        }
        setError(detail)
        setPhase('error')
        return
      }

      const data = (await res.json()) as GradeResult
      setResult(data)
      setPhase('done')
    } catch {
      setError('Network dropped mid-grade. Check your connection and retry.')
      setPhase('error')
    }
  }, [])

  const onPick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) void submit(file)
    },
    [submit]
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) void submit(file)
    },
    [submit]
  )

  const reset = useCallback(() => {
    setPhase('idle')
    setResult(null)
    setError('')
    setPreview(null)
    setDims('')
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }, [])

  return (
    <div className={styles.page}>
      <span className={`${styles.tick} ${styles.tl}`} aria-hidden />
      <span className={`${styles.tick} ${styles.tr}`} aria-hidden />
      <span className={`${styles.tick} ${styles.bl}`} aria-hidden />
      <span className={`${styles.tick} ${styles.br}`} aria-hidden />

      <header className={styles.chrome}>
        <div className={styles.chromeLeft}>
          <span className={styles.wordmark}>DECKCHECK</span>
          <span className={styles.chromeSub}>CAROUSEL SPECIMEN ANALYSIS</span>
        </div>
        <span className={styles.chromeMid}>V1.0</span>
        <div className={styles.chromeRight}>
          <span>2026 FEED META</span>
          <span className={styles.chromeStatus}>ONLINE</span>
        </div>
      </header>

      {(phase === 'idle' || phase === 'error') && (
        <section className={styles.intro}>
          <div className={styles.introHead}>
            <h1 className={styles.title}>
              IS YOUR
              <br />
              SLIDE A
              <br />
              <span className={styles.titleHot}>POSTER?</span>
            </h1>
            <p className={styles.lede}>
              Drop one carousel slide. It gets graded against the 2026 feed meta:
              one focal point, two type sizes, near-zero body copy, and the
              mechanical tells that read as slop to the ranker and to everyone
              scrolling past.
            </p>
          </div>

          <label
            className={`${styles.dropzone} ${dragging ? styles.dropzoneOver : ''}`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              onChange={onPick}
              className={styles.fileInput}
            />
            <span className={styles.dropBig}>DROP SPECIMEN</span>
            <span className={styles.dropSmall}>
              PNG / JPG / WEBP — up to 10MB — one slide — or click to browse
            </span>
          </label>

          {phase === 'error' && <p className={styles.errorLine}>{error}</p>}

          <div className={styles.legend}>
            <span>GRADED ON</span>
            <span className={styles.legendAxes}>
              FOCAL / HIERARCHY / SPACE / RESTRAINT / COLOR / TYPE
            </span>
          </div>
        </section>
      )}

      {phase === 'working' && (
        <section className={styles.working}>
          {preview && (
            <figure className={styles.workingThumb}>
              <img src={preview} alt="specimen under analysis" />
            </figure>
          )}
          <div className={styles.log}>
            {LOG_LINES.slice(0, logCount).map((line, i) => (
              <div key={line} className={styles.logLine}>
                <span className={styles.logMark}>&gt;</span> {line}
                {i === logCount - 1 && <span className={styles.caret} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {phase === 'done' && result && preview && (
        <section className={styles.report}>
          <div className={styles.reportGrid}>
            <figure className={styles.specimen}>
              <img src={preview} alt="graded specimen" />
              <figcaption className={styles.specimenCap}>
                SPECIMEN / {fileName || 'slide'} {dims && `/ ${dims}`}
              </figcaption>
            </figure>

            <div className={styles.verdict}>
              <div className={styles.scoreRow}>
                <span className={styles.score}>{result.overall_score}</span>
                <span className={styles.scoreOut}>/100</span>
              </div>
              <div className={styles.verdictWord} data-verdict={result.verdict}>
                {result.verdict}
              </div>
              <p className={styles.headlineRead}>
                <span className={styles.readLabel}>THE READ</span>
                {result.headline_read}
              </p>
            </div>
          </div>

          <div className={styles.axes}>
            {result.axes.map((axis) => (
              <div key={axis.key} className={styles.axisRow}>
                <div className={styles.axisTop}>
                  <span className={styles.axisLabel}>{axis.key}</span>
                  <div className={styles.axisTrack}>
                    <span
                      className={styles.axisFill}
                      data-band={band(axis.score)}
                      style={{ width: `${axis.score}%` }}
                    />
                  </div>
                  <span className={styles.axisScore}>{pad(axis.score)}</span>
                </div>
                <p className={styles.axisNote}>{axis.note}</p>
              </div>
            ))}
          </div>

          {result.tells.length > 0 && (
            <div className={styles.tells}>
              <h3 className={styles.blockHead}>
                MECHANICAL TELLS DETECTED — {pad(result.tells.length)}
              </h3>
              {result.tells.map((tell) => (
                <div
                  key={tell.name}
                  className={styles.tellRow}
                  data-sev={tell.severity}
                >
                  <span className={styles.tellDot} />
                  <div className={styles.tellBody}>
                    <div className={styles.tellHead}>
                      <span className={styles.tellName}>{tell.name}</span>
                      <span className={styles.tellSev}>{tell.severity}</span>
                    </div>
                    <p className={styles.tellEvidence}>{tell.evidence}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.fixes}>
            <h3 className={styles.blockHead}>THE SPECIFIC DIFF</h3>
            <div className={styles.oneThing}>
              <span className={styles.oneLabel}>FIRST MOVE</span>
              <p>{result.one_thing}</p>
            </div>
            <ol className={styles.fixList}>
              {result.fixes.map((fix, i) => (
                <li key={fix} className={styles.fixItem}>
                  <span className={styles.fixNum}>{pad(i + 1)}</span>
                  <span>{fix}</span>
                </li>
              ))}
            </ol>
          </div>

          <footer className={styles.reportFoot}>
            <span>PROPERTY OF DECKCHECK</span>
            <span className={styles.barcode} aria-hidden />
            <span>GRADED · GEMINI 2.5 FLASH</span>
          </footer>

          <button type="button" className={styles.again} onClick={reset}>
            GRADE ANOTHER SLIDE
          </button>
        </section>
      )}
    </div>
  )
}

Component.displayName = 'Grade'
