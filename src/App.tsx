import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type FormEvent } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { FiArrowDownRight, FiArrowUpRight, FiAward, FiCheck, FiMail, FiMenu, FiPlay, FiSun, FiX } from 'react-icons/fi'
import { FaAws, FaFacebookF, FaFigma, FaGithub, FaInstagram, FaLinkedinIn, FaLinux, FaPinterestP, FaRedditAlien } from 'react-icons/fa6'
import { SiArduino, SiC, SiCplusplus, SiCss, SiDocker, SiExpress, SiFlutter, SiFramer, SiGit, SiHtml5, SiJavascript, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiOpenjdk, SiPostgresql, SiPostman, SiPython, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'
import GithubActivity from './components/GithubActivity'
import { achievements, journeyEntries, newsArticle, newsletters, profiles, projects, skillGroups, socials } from './data/portfolio'

const Shuffle = lazy(() => import('./components/Shuffle'))

function SkillsMarquee() {
  const skills = skillGroups.flatMap((group) => group.items)
  return <section className="skills-marquee" aria-label="Skills and technologies">
    <div className="skills-marquee-viewport" aria-hidden="true"><div className="skills-marquee-track">{[0, 1].map((copy) => <div className="skills-marquee-set" key={copy}>{skills.map((skill) => <span className="skills-marquee-item" key={`${copy}-${skill}`}>{skill}</span>)}</div>)}</div></div>
    <span className="skills-marquee-sr-only">Skills and technologies: {skills.join(', ')}</span>
  </section>
}

const iconBySkill: Record<string, ComponentType<{ className?: string }>> = {
  C: SiC, 'C++': SiCplusplus, Java: SiOpenjdk, JavaScript: SiJavascript, TypeScript: SiTypescript, Python: SiPython, HTML5: SiHtml5, CSS3: SiCss, React: SiReact, 'Next.js': SiNextdotjs, 'Node.js': SiNodedotjs, Express: SiExpress, Flutter: SiFlutter, 'Tailwind CSS': SiTailwindcss, 'Framer Motion': SiFramer, MongoDB: SiMongodb, MySQL: SiMysql, PostgreSQL: SiPostgresql, Git: SiGit, GitHub: FaGithub, Docker: SiDocker, Linux: FaLinux, Arduino: SiArduino, Postman: SiPostman, Figma: FaFigma, AWS: FaAws,
}
const skillIconColors: Record<string, string> = {
  C: '#A8B9CC', 'C++': '#00599C', Java: '#ED8B00', JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB', HTML5: '#E34F26', CSS3: '#1572B6', React: '#61DAFB', 'Next.js': 'var(--ink)', 'Node.js': '#5FA04E', Express: 'var(--ink)', Flutter: '#02569B', 'Tailwind CSS': '#06B6D4', 'Framer Motion': '#0055FF', MongoDB: '#47A248', MySQL: '#4479A1', PostgreSQL: '#4169E1', Git: '#F05032', GitHub: 'var(--ink)', Docker: '#2496ED', Linux: '#FCC624', Arduino: '#00979D', Postman: '#FF6C37', Figma: '#F24E1E', AWS: '#FF9900',
}
const socialIcons: Record<string, ComponentType> = { Facebook: FaFacebookF, LinkedIn: FaLinkedinIn, Instagram: FaInstagram, Pinterest: FaPinterestP, GitHub: FaGithub, Reddit: FaRedditAlien }
const navLinks = [{ label: 'About', id: 'about-profile' }, { label: 'Skills', id: 'skills' }, { label: 'Experience', id: 'experience' }, { label: 'Work', id: 'work' }, { label: 'GitHub', id: 'github-activity' }, { label: 'Achievements', id: 'achievements' }, { label: 'News Articles', id: 'articles' }, { label: 'Newsletter', id: 'newsletter' }, { label: 'Contact', id: 'contact' }]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'blue' | 'red'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const reduceMotion = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ['start 72%', 'end 58%'] })
  const timelineLineProgress = useSpring(timelineProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme')
    const initial = saved === 'light' || saved === 'blue' || saved === 'red' || saved === 'dark' ? saved : 'dark'
    setTheme(initial)
    document.documentElement.dataset.theme = initial === 'light' ? 'light' : 'dark'
    document.documentElement.dataset.accent = initial === 'blue' || initial === 'red' ? initial : 'orange'
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) }), { rootMargin: '-30% 0px -60% 0px' })
    navLinks.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [])

  function changeTheme(next: 'light' | 'dark' | 'blue' | 'red') {
    setTheme(next)
    document.documentElement.dataset.theme = next === 'light' ? 'light' : 'dark'
    document.documentElement.dataset.accent = next === 'blue' || next === 'red' ? next : 'orange'
    localStorage.setItem('portfolio-theme', next)
  }

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setFormState('loading')
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
    if (!endpoint) {
      await new Promise((resolve) => setTimeout(resolve, 450))
      setFormState('error')
      return
    }
    try {
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      setFormState(response.ok ? 'success' : 'error')
      if (response.ok) form.reset()
    } catch {
      setFormState('error')
    }
  }

  const reveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: reduceMotion ? 0 : 0.55 } }
  const headlineReveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.45 }, transition: { duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] as const } }

  return <><div className="site-shell">
    <header className="topbar">
      <a className="wordmark" href="#home" aria-label="Shahriar Chowdhury home">SC<span>.</span></a>
      <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navLinks.map((link) => <a key={link.id} className={active === link.id ? 'active' : ''} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
      </nav>
      <div className="nav-actions">
        <label className="theme-picker-label" aria-label="Choose website color theme"><FiSun /><select className="theme-picker" value={theme} onChange={(event) => changeTheme(event.target.value as 'light' | 'dark' | 'blue' | 'red')} aria-label="Website color theme"><option value="light">White</option><option value="dark">Black</option><option value="blue">Blue</option><option value="red">Red</option></select></label>
        <a className="resume-link" href="/resume.pdf" download>Résumé PDF <FiArrowDownRight /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <FiX /> : <FiMenu />}</button>
      </div>
    </header>

    <SkillsMarquee />

    <main>
      <section id="home" className="hero section-anchor">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-system-label"><i/> PERSONAL PORTFOLIO · 2026</span>
            <Suspense fallback={<h1 className="hero-shuffle-title">Hi, I’m&nbsp;Shahriar</h1>}>
              <Shuffle text="Hi, I’m Shahriar" className="hero-shuffle-title" tag="h1" textAlign="left" effect="slide" shuffleDirection="right" duration={0.35} animationMode="evenodd" shuffleTimes={1} ease="power3.out" stagger={0.03} threshold={0.1} triggerOnce triggerOnHover respectReducedMotion color="var(--orange)" accentColor="#ffd0ad" style={{ whiteSpace: 'normal', textAlign: 'left' }} />
            </Suspense>
            <div className="hero-role"><span>&lt; CSE Student /&gt;</span> Aspiring Full-Stack Developer</div>
            <motion.div className="hero-bottom" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              <p>A Computer Science and Engineering student passionate about building modern, responsive, and user-friendly applications.</p>
            </motion.div>
            <div className="hero-actions"><a href="#about-profile" className="hero-action-primary"><FiPlay/> Explore About</a><a href="#work" className="hero-action-secondary"><FiArrowUpRight/> View Projects</a></div>
            <div className="loaded-modules"><span>LOADED_MODULES:</span>{['REACT','NEXT.JS','NODE.JS','TYPESCRIPT','PYTHON'].map((module)=><b key={module}>{module}</b>)}</div>
          </div>
          <motion.div className="profile-editor" {...reveal}>
            <div className="profile-titlebar"><div className="window-lights" aria-hidden="true"><i/><i/><i/></div><div><span className="profile-tab-dot"/> portfolio.tsx</div></div>
            <div className="profile-code" aria-label="Portfolio profile code">
              <div className="code-line"><span>1</span><code className="code-comment">// Welcome to my workspace</code></div>
              <div className="code-line"><span>2</span><code><b>import</b> {'{'} <strong>Developer</strong> {'}'} <b>from</b> <i>'./portfolio'</i>;</code></div>
              <div className="code-line blank"><span>3</span><code>&nbsp;</code></div>
              <div className="code-line"><span>4</span><code><b>const</b> <em>Portfolio</em> = () =&gt; {'{'}</code></div>
              <div className="code-line"><span>5</span><code>&nbsp;&nbsp;<b>return</b> (</code></div>
              <div className="code-line"><span>6</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<strong>Developer</strong></code></div>
              <div className="code-line"><span>7</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>name</em>=<i>"Md. Shahriar Chowdhury"</i></code></div>
              <div className="code-line"><span>8</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>role</em>=<i>"CSE Student &amp; Aspiring Full-Stack Developer"</i></code></div>
              <div className="code-line"><span>9</span><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>focus</em>=<i>"Modern, responsive applications"</i></code></div>
              <div className="code-line"><span>10</span><code>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</code></div>
              <div className="code-line"><span>11</span><code>&nbsp;&nbsp;);</code></div>
              <div className="code-line"><span>12</span><code>{'}'};</code></div>
            </div>
            <div className="profile-actions"><a href="#about-profile" className="run-profile"><FiPlay /> Run Profile</a><a href="#work" className="view-projects"><FiArrowUpRight /> View Projects</a></div>
          </motion.div>
        </div>
      </section>

      <section id="about-profile" className="about-system section-anchor">
        <motion.h2 className="about-system-title" {...headlineReveal}><span>›</span> # About.system</motion.h2>
        <div className="about-system-grid">
          <motion.article className="about-profile-card" {...reveal}>
            <div className="about-avatar"><img src="/Images/Shahriar-image/shahriar-portrait.jpeg" alt="Portrait of Md. Shahriar Chowdhury" loading="lazy"/><i title="Profile image"/></div>
            <dl><div><dt>OPERATOR</dt><dd>MD. SHAHRIAR CHOWDHURY</dd></div><div><dt>ROLE</dt><dd>CSE STUDENT</dd></div><div><dt>FOCUS</dt><dd>ASPIRING FULL-STACK DEVELOPER</dd></div><div><dt>LOCATION</dt><dd>YOUR CITY, COUNTRY</dd></div></dl>
          </motion.article>
          <div className="about-system-right">
            <motion.article className="about-terminal" {...reveal}>
              <div className="terminal-bar"><span>›_</span> user_profile.log</div>
              <div className="terminal-body"><motion.h3 {...headlineReveal}>➜ whoami</motion.h3><p>Computer Science and Engineering student and aspiring Full-Stack Developer passionate about building modern, responsive, and user-friendly applications.</p><motion.h3 {...headlineReveal}>➜ cat focus.txt</motion.h3><p>Exploring languages, frameworks, databases, and tools to create useful web applications with thoughtful, user-friendly experiences.</p></div>
            </motion.article>
            <div className="about-stats"><motion.div {...reveal}><span>⌘ &nbsp;EDUCATION</span><b>CSE</b><small>STUDENT</small></motion.div><motion.div {...reveal}><span>&lt;/&gt; &nbsp;SKILLS</span><b>26</b><small>TECHNOLOGIES</small></motion.div><motion.div {...reveal}><span>✦ &nbsp;RECOGNITION</span><b>02</b><small>AWARDS</small></motion.div></div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section section-anchor">
        <motion.div className="section-heading light-heading" {...reveal}><span className="section-kicker">WHAT I WORK WITH</span><motion.h2 {...headlineReveal}>Skills &amp; Expertise<span className="pink-dot">.</span></motion.h2><p>A collection of technologies I’m proficient with, from languages to frameworks and tools.</p></motion.div>
        <div className="skill-groups">{skillGroups.map((group, groupIndex) => <motion.div key={group.name} className="skill-group" {...reveal} transition={{ ...reveal.transition, delay: groupIndex * 0.06 }}><motion.h3 {...headlineReveal}>{group.name}<span>{String(group.items.length).padStart(2, '0')}</span></motion.h3><div className="skill-chips">{group.items.map((skill, index) => { const Icon = iconBySkill[skill]; return <motion.div key={skill} className="skill-chip" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : index * 0.035 }}><span className="skill-icon" style={{ color: skillIconColors[skill] }}><Icon /></span><span>{skill}</span></motion.div> })}</div></motion.div>)}</div>
        <motion.div className="skill-group coding-profiles" {...reveal}>
          <motion.h3 {...headlineReveal}>Coding Profiles</motion.h3>
          <div className="skill-chips">{profiles.map((profile, index) => { const Icon = profile.icon; return <motion.a key={profile.name} className="skill-chip coding-profile-chip" href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} profile for ${profile.username}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : index * 0.045 }}><span className="skill-icon"><Icon /></span><span className="coding-profile-text">{profile.name}<span className="profile-username"> · {profile.username}</span></span><FiArrowUpRight className="profile-external-icon" aria-hidden="true" /></motion.a> })}</div>
        </motion.div>
        <div className="section-foot dark-foot"><span>01 — CAPABILITIES</span><span>ALWAYS LEARNING <i /></span></div>
      </section>

      <section id="experience" className="journey-section section-anchor">
        <motion.div className="section-heading journey-heading" {...reveal}><span className="section-kicker">THE PATH SO FAR</span><motion.h2 {...headlineReveal}>My Journey<span>.</span></motion.h2><p>A few milestones along the way. More chapters to come.</p></motion.div>
        <div className="timeline" ref={timelineRef}><div className="timeline-track"/><motion.div className="timeline-progress" style={{ scaleY: reduceMotion ? 1 : timelineLineProgress }} />{journeyEntries.map((entry, index) => <motion.article key={`${entry.title}-${index}`} className={`timeline-entry ${index % 2 ? 'right' : 'left'}`} {...reveal} transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.06 }}><motion.div className="timeline-dot" initial={{ scale: 0.6, opacity: 0.5 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reduceMotion ? 0 : 0.35 }} /><div className="timeline-card"><span className="timeline-date">{entry.date}</span><motion.h3 {...headlineReveal}>{entry.title}</motion.h3><p className="timeline-org">{entry.organization}</p><p>{entry.description}</p><span className="placeholder-badge">PLACEHOLDER</span></div></motion.article>)}</div>
        <div className="section-foot dark-foot"><span>02 — EXPERIENCE</span><span>YOUR STORY, IN PROGRESS <i /></span></div>
      </section>

      <section id="work" className="work-section section-anchor">
        <motion.div className="work-topline" {...reveal}><span className="section-kicker">SELECTED OUTPUT · 03</span><span>2024 — 2026</span></motion.div>
        <motion.div className="work-title" {...reveal}><motion.h2 {...headlineReveal}>Work<span>.</span></motion.h2><span className="work-arrow"><FiArrowDownRight /></span></motion.div>
        {projects.length ? <div className="project-grid">{projects.map((project) => <a className="project-card" key={project.title} href={project.href}><span>PROJECT / 0{projects.indexOf(project) + 1}</span><motion.h3 {...headlineReveal}>{project.title}</motion.h3><p>{project.description}</p><FiArrowUpRight /></a>)}</div> : <motion.div className="empty-work" {...reveal}><span className="empty-orbit"><i /><i /><i /></span><div><span className="section-kicker">GOOD THINGS TAKE SHAPE</span><motion.h3 {...headlineReveal}>Projects coming soon<span>.</span></motion.h3><p>This space is ready for the things I build next.</p></div><span className="empty-index">NO. 001<br />IN PROGRESS</span></motion.div>}
        <div className="section-foot"><span>03 — SELECTED WORK</span><span>MORE SOON <i /></span></div>
      </section>

      <GithubActivity />

      <section id="achievements" className="achievements-section section-anchor">
        <motion.div className="section-heading" {...reveal}><span className="section-kicker">MILESTONES &amp; RECOGNITION</span><motion.h2 {...headlineReveal}>Achievements<span>.</span></motion.h2><p>Recognition from robotics competitions and project showcases.</p></motion.div>
        <div className="achievement-list">{achievements.map((achievement, index) => <motion.article className="achievement-card" key={achievement.title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}><div className="achievement-visuals">{achievement.images.map((img) => <div className="achievement-image" key={img.src}><img src={img.src} alt={img.alt} loading="lazy" /></div>)}<span className="achievement-number">#{String(index + 1).padStart(2, '0')}</span></div><div className="achievement-copy"><span className="achievement-kicker">RECOGNITION · {achievement.year}</span><motion.h3 {...headlineReveal}>{achievement.title}</motion.h3><div className="achievement-description"><FiAward /><p>{achievement.description}</p></div><div className="achievement-meta"><div><span>STATUS</span><strong>{achievement.status}</strong></div><div><span>CATEGORY</span><strong>{achievement.category}</strong></div></div><div className="achievement-year"><i /> EVENT YEAR <b>{achievement.year}</b></div></div></motion.article>)}</div>
        <div className="section-foot"><span>05 — ACHIEVEMENTS</span><span>COMPETITION HIGHLIGHTS <i /></span></div>
      </section>

      <section id="articles" className="articles-section section-anchor">
        <motion.div className="section-heading" {...reveal}><span className="section-kicker">PRESS &amp; COVERAGE</span><motion.h2 {...headlineReveal}>Media<span>.</span></motion.h2></motion.div>
        <motion.article className="news-feature" {...reveal}>
          <div className="news-story"><motion.h3 lang="bn" {...headlineReveal}>{newsArticle.title}</motion.h3><div className="news-body">{newsArticle.paragraphs.map((paragraph) => <p key={paragraph} lang="bn">{paragraph}</p>)}</div><div className="news-buttons">{newsArticle.publications.map((publication) => <a key={publication.name} href={publication.href} target="_blank" rel="noreferrer">{publication.name}<FiArrowUpRight /></a>)}</div></div>
          <div className="news-clippings"><div className="news-clipping-grid">{newsArticle.publications.map((publication, index) => <a key={publication.name} className="news-clipping" href={publication.href} target="_blank" rel="noreferrer" aria-label={`Read coverage from ${publication.name}`}><span className="clipping-index">#{String(index + 1).padStart(2, '0')}</span><img src={publication.image} alt={publication.alt} loading="lazy" /></a>)}</div><span className="news-date">▦ &nbsp;{newsArticle.date}</span></div>
        </motion.article>
        <div className="section-foot"><span>06 — PRESS &amp; WRITING</span><span>2 PUBLICATIONS <i /></span></div>
      </section>

      <section id="newsletter" className="newsletter-section section-anchor">
        <motion.div className="section-heading" {...reveal}><span className="section-kicker">IN THE PRESS · NEWSLETTER FEATURES</span><motion.h2 {...headlineReveal}>Newsletter<span>.</span></motion.h2><p>Newsletter coverage and features.</p></motion.div>
        <div className="newsletter-grid">{newsletters.map((item, index) => <motion.a className="newsletter-card" key={item.src} href={item.src} target="_blank" rel="noreferrer" aria-label={`Open newsletter feature ${index + 1}`} {...reveal} transition={{ ...reveal.transition, delay: index * 0.04 }}><span>#{String(index + 1).padStart(2, '0')}</span><img src={item.src} alt={item.alt} loading="lazy" onError={(event) => event.currentTarget.parentElement?.classList.add('image-unavailable')} /></motion.a>)}</div>
        <div className="section-foot"><span>07 — NEWSLETTER</span><span>{String(newsletters.length).padStart(2, '0')} FEATURES <i /></span></div>
      </section>

      <section id="contact" className="contact-section section-anchor">
        <motion.div className="contact-intro" {...reveal}><span className="section-kicker">HAVE SOMETHING IN MIND?</span><motion.h2 {...headlineReveal}>Let’s make<br /><em>it happen.</em></motion.h2><p>Have a project, an idea, or just want to say hello? My inbox is open.</p><div className="contact-coordinates"><span>BASED IN</span><b>YOUR CITY, COUNTRY</b><span>AVAILABLE FOR</span><b>COLLABORATIONS &amp; IDEAS</b></div></motion.div>
        <motion.div className="contact-form-wrap" {...reveal}>
          <div className="editor-window"><div className="editor-tab"><span className="editor-dot"/><span>TS</span><span>sendMessage.ts</span><span className="editor-tab-end">×</span></div><div className="mail-bar"><div><FiMail /><span>mail.compose</span></div><span>● SECURE CHANNEL</span></div>
          <div className="mail-meta"><div><span>to:</span><b>you@example.com</b></div><span>response: within 24h</span></div>
          <form onSubmit={submitMessage} onChange={() => formState !== 'idle' && setFormState('idle')}>
            <div className="form-row"><label><span>NAME <i>01</i></span><input name="name" placeholder="Your name" required autoComplete="name" /></label><label><span>EMAIL <i>02</i></span><input name="email" type="email" placeholder="you@email.com" required autoComplete="email" /></label></div>
            <label><span>SUBJECT <i>03</i></span><input name="subject" placeholder="Project inquiry / Collaboration" required /></label>
            <label><span>MESSAGE <i>04</i></span><textarea name="message" rows={4} placeholder="Tell me about your project, timeline, and goals..." required /></label>
            <div className="form-footer"><span>// Protected by spam filters and rate limits</span><button className="send-button" disabled={formState === 'loading'}>{formState === 'loading' ? 'SENDING…' : formState === 'success' ? 'MESSAGE SENT' : 'SEND MESSAGE'} {formState === 'success' ? <FiCheck /> : <FiPlay />}</button></div>
            {formState === 'success' && <p className="form-feedback success" role="status">Thanks for reaching out. Your message has been sent.</p>}
            {formState === 'error' && <p className="form-feedback" role="status">{import.meta.env.VITE_CONTACT_ENDPOINT ? 'Message delivery failed. Please try again.' : 'Demo mode: add VITE_CONTACT_ENDPOINT in .env.local to enable message delivery.'}</p>}
          </form></div>
          <div className="social-area"><span className="section-kicker">FIND ME AROUND THE WEB</span><div className="social-grid">{socials.map((social) => { const Icon = socialIcons[social.label]; return <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer" title={social.label}><Icon /></a> })}</div></div>
        </motion.div>
        <div className="contact-footer"><a href="#home" className="wordmark">SC<span>.</span></a><span>MADE WITH INTENTION · 2026</span><a href="#home">BACK TO TOP ↑</a></div>
      </section>
    </main>
  </div><a className="signature-mark" href="#home" aria-label="Shahriar signature — back to top">Shahriar</a></>
}

export default App
