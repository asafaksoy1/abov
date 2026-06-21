<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { whatsappLink } from '../lib/supabase'

const services = [
  { name: 'Full renovation', note: 'Whole rooms taken back to brick and rebuilt — design, structure and finish, handled end to end.' },
  { name: 'Bespoke joinery', note: 'Fitted woodwork made to measure: alcoves, wardrobes, shelving and cabinetry.' },
  { name: 'Flooring', note: 'Laminate, engineered wood and tiling, laid level and finished clean.' },
  { name: 'Painting & finishing', note: 'Properly prepped walls, crisp lines and a finish that lasts.' },
  { name: 'Electrical', note: 'Sockets, lighting and safe, certified wiring.' },
  { name: 'Plumbing', note: 'Repairs, replacements and full bathroom and kitchen fit-outs.' },
]

// NOTE: placeholder figures — replace with your real numbers before launch.
const stats = [
  { value: '12', suffix: '+', label: 'Years on the tools' },
  { value: '240', suffix: '+', label: 'Projects completed' },
  { value: '100', suffix: '%', label: 'Quoted up front' },
  { value: '4.9', suffix: '★', label: 'Average rating' },
]

// Public-folder assets, bound with :src so Vite won't resolve them at build.
const img = {
  heroVideo: '/hero.mp4',
  heroPoster: '/hero-poster.jpg',
  about1: '/about-1.jpg',
  about2: '/about-2.jpg',
  serviceFeature: '/service-feature.jpg',
}

// If an image is missing (404), hide it so the figure's placeholder tone shows
// instead of a broken-image icon. Real images display normally once added.
function onImgError(e) { e.target.classList.add('is-missing') }

// Magnetic primary button — subtle pull toward the cursor.
const magnet = ref(null)
onMounted(() => {
  const el = magnet.value?.$el ?? magnet.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (window.matchMedia('(hover: none)').matches) return
  const s = 0.28
  const move = (e) => {
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * s}px, ${(e.clientY - (r.top + r.height / 2)) * s}px)`
  }
  el.addEventListener('mousemove', move)
  el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)' })
})
</script>

<template>
  <!-- ============ HERO ============ -->
  <section class="hero">
    <video class="hero-video" autoplay muted loop playsinline preload="auto" :poster="img.heroPoster">
      <source :src="img.heroVideo" type="video/mp4" />
    </video>
    <div class="hero-tint"></div>

    <div class="container hero-inner">
      <span class="kicker kicker--light h-anim d1">Renovation &amp; Interiors — UK</span>
      <h1 class="hero-title h-anim d2">Spaces restored,<br />and <em>made to last.</em></h1>
      <p class="hero-lead h-anim d3">
        One tidy team for the whole job — joinery, flooring, painting, electrical and plumbing —
        delivered with one clear price and a finish you'd be proud to live with.
      </p>
      <div class="hero-cta h-anim d4">
        <RouterLink ref="magnet" to="/contact" class="btn btn-light btn-magnet">Get a quote</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline">Message us on WhatsApp →</a>
      </div>
    </div>

    <div class="hero-scroll h-anim d4"><span>Scroll</span></div>
  </section>

  <!-- ============ STATEMENT ============ -->
  <section class="section statement">
    <div class="container">
      <span class="kicker" v-reveal>Who we are</span>
      <p class="statement-lead" v-reveal="1">
        ABOV is a single team for the <em>whole</em> job — design, build and finish — so your home
        is handled from first message to final clean-up, with <em>no surprises</em> and no chasing.
      </p>
      <div class="statement-points">
        <div v-reveal="0"><h3>Quoted up front</h3><p>A clear price before any work starts. No awkward conversations at the end.</p></div>
        <div v-reveal="1"><h3>One point of contact</h3><p>Message us directly and get a real reply — start to finish.</p></div>
        <div v-reveal="2"><h3>Finished properly</h3><p>Edges, corners and clean-up matter. We treat your home like our own.</p></div>
      </div>
    </div>
  </section>

  <!-- ============ ABOUT / WORK ============ -->
  <section class="section section--cream2 about">
    <div class="container about-grid">
      <figure class="about-img about-img--tall" v-reveal>
        <img :src="img.about1" alt="A finished ABOV interior" loading="lazy" @error="onImgError" />
      </figure>
      <div class="about-body" v-reveal="1">
        <span class="kicker">The work</span>
        <h2>Considered interiors,<br /><em>finished properly.</em></h2>
        <p class="lead">
          We take on the parts most people would rather not coordinate — the trades, the timing, the
          mess — and bring them under one roof so the result feels calm, deliberate and complete.
        </p>
        <RouterLink to="/projects" class="btn btn-fill with-arrow">View projects <span class="chip">→</span></RouterLink>
      </div>
      <figure class="about-img about-img--wide" v-reveal="2">
        <img :src="img.about2" alt="Detail of a renovated kitchen" loading="lazy" @error="onImgError" />
      </figure>
    </div>
  </section>

  <!-- ============ SERVICES ============ -->
  <section class="section services">
    <div class="services-watermark" aria-hidden="true"></div>
    <div class="container services-grid">
      <div class="services-intro">
        <span class="kicker kicker--brass" v-reveal>What we do</span>
        <h2 v-reveal="1">Plan, build &amp;<br /><em>finish.</em></h2>
        <p class="lead lead--light" v-reveal="2">One team from first message to final clean-up.</p>
        <RouterLink to="/services" class="btn btn-light with-arrow" v-reveal="3">All services <span class="chip">→</span></RouterLink>
      </div>

      <ol class="services-list">
        <li class="svc-item svc-item--lead" v-reveal>
          <div class="svc-head"><span class="svc-num">01</span><h3>{{ services[0].name }}</h3></div>
          <figure class="svc-figure"><img :src="img.serviceFeature" :alt="services[0].name" loading="lazy" @error="onImgError" /></figure>
          <p class="svc-note">{{ services[0].note }}</p>
        </li>
        <li class="svc-item" v-for="(s, i) in services.slice(1)" :key="s.name" v-reveal="i % 3">
          <div class="svc-head"><span class="svc-num">{{ String(i + 2).padStart(2, '0') }}</span><h3>{{ s.name }}</h3></div>
          <p class="svc-note">{{ s.note }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- ============ STATS ============ -->
  <section class="section stats-section">
    <div class="container">
      <div class="stats">
        <div class="stat" v-for="(s, i) in stats" :key="s.label" v-reveal="i">
          <p class="stat-value">{{ s.value }}<span class="stat-suffix">{{ s.suffix }}</span></p>
          <p class="stat-label">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ CTA ============ -->
  <section class="section cta">
    <div class="container cta-inner">
      <div v-reveal>
        <span class="kicker kicker--brass">Get started</span>
        <h2 class="cta-title">Tell us what<br /><em>needs doing.</em></h2>
        <p class="lead lead--light">Send a few photos and we'll come back with honest advice and a price.</p>
      </div>
      <div class="cta-actions" v-reveal="1">
        <RouterLink to="/contact" class="btn btn-light">Contact us</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline">WhatsApp us →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tokens have fallbacks so this looks right even before the main.css patch. */
em { font-style: italic; color: var(--brass, #b08d57); }

/* ---------- HERO ---------- */
.hero { position: relative; min-height: 96svh; display: flex; align-items: flex-end; overflow: hidden; padding-block: 140px 7vh; }
.hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
.hero-tint {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(180deg, rgba(1,42,34,0.34) 0%, rgba(1,42,34,0.42) 45%, rgba(1,42,34,0.9) 100%),
    linear-gradient(90deg, rgba(1,42,34,0.55) 0%, rgba(1,42,34,0.08) 62%);
}
.hero-inner { position: relative; z-index: 2; max-width: 64rem; }
.hero-title {
  font-family: var(--display, 'Cormorant Garamond', Georgia, serif);
  color: var(--cream, #f5efe6); font-weight: 500; line-height: 1.0;
  letter-spacing: -0.005em; font-size: clamp(3rem, 9vw, 6.6rem); margin: 0.7rem 0 1.5rem;
}
.hero-title em { color: var(--brass, #d9b87e); }
.hero-lead { color: rgba(245,239,230,0.86); max-width: 50ch; font-size: clamp(1.02rem,1.4vw,1.2rem); line-height: 1.65; }
.hero-cta { margin-top: 2.3rem; display: flex; align-items: center; gap: 1.6rem; flex-wrap: wrap; }
.btn-magnet { will-change: transform; transition: transform 0.25s ease-out, background 0.2s ease; }
.hero-scroll {
  position: absolute; bottom: 1.6rem; left: 50%; transform: translateX(-50%); z-index: 2;
  font-family: var(--mono, monospace); font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(245,239,230,0.7);
}
.hero-scroll span::after { content: ''; display: block; width: 1px; height: 30px; background: rgba(245,239,230,0.4); margin: 0.6rem auto 0; }

/* ---------- STATEMENT ---------- */
.statement-lead {
  font-family: var(--display, 'Cormorant Garamond', serif); font-weight: 500;
  font-size: clamp(1.6rem, 3.6vw, 2.9rem); line-height: 1.28; letter-spacing: -0.005em;
  color: var(--green, #014d40); max-width: 24ch; margin: 0.6rem 0 0; max-inline-size: 22ch; max-width: 960px;
}
.statement-points { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.4rem; margin-top: clamp(2.5rem, 6vw, 4.5rem); }
.statement-points h3 { margin: 0 0 0.4rem; }
.statement-points p { color: var(--muted, #5c665f); margin: 0; }

/* ---------- ABOUT ---------- */
.about-grid { display: grid; grid-template-columns: 1fr 1.15fr; grid-template-rows: auto auto; gap: clamp(1.5rem, 4vw, 3rem); align-items: center; }
.about-img { margin: 0; border-radius: 5px; overflow: hidden; background: linear-gradient(135deg, var(--cream-2, #ede5d8) 0%, #e3d8c5 100%); }
.about-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-img img.is-missing { display: none; }
.about-img--tall { grid-row: 1 / 3; aspect-ratio: 3 / 4.2; }
.about-img--wide { aspect-ratio: 16 / 10; }
.about-body { grid-column: 2; }
.about-body .lead { margin: 1.1rem 0 2rem; max-width: 44ch; }

/* ---------- SERVICES (green) ---------- */
.services { position: relative; background: var(--green, #014d40); overflow: hidden; }
.services-watermark { position: absolute; right: -5%; bottom: -12%; width: 62%; max-width: 760px; aspect-ratio: 700/410; background: url('/abov-logo-white.png') no-repeat center / contain; opacity: 0.06; pointer-events: none; }
.services-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 0.9fr 1.3fr; gap: clamp(2rem, 6vw, 5rem); align-items: start; }
.services-intro { position: sticky; top: 110px; }
.services-intro h2 { color: var(--cream, #f5efe6); }
.services-intro .lead { margin: 1rem 0 2rem; }
.lead--light { color: rgba(245,239,230,0.74); }
.services-list { list-style: none; margin: 0; padding: 0; }
.svc-item { padding: 1.7rem 0; border-top: 1px solid rgba(245,239,230,0.18); }
.svc-item:last-child { border-bottom: 1px solid rgba(245,239,230,0.18); }
.svc-head { display: flex; align-items: baseline; gap: 1.1rem; }
.svc-num { font-family: var(--mono, monospace); font-size: 0.78rem; color: var(--brass, #d9b87e); letter-spacing: 0.04em; padding-top: 0.45rem; }
.svc-item h3 { font-family: var(--display, 'Cormorant Garamond', serif); font-weight: 600; font-size: clamp(1.4rem, 2.8vw, 2.1rem); margin: 0; color: var(--cream, #f5efe6); line-height: 1.1; }
.svc-note { color: rgba(245,239,230,0.66); margin: 0.7rem 0 0 1.9rem; max-width: 54ch; }
.svc-item--lead .svc-figure { margin: 1.2rem 0 0 1.9rem; border-radius: 5px; overflow: hidden; aspect-ratio: 16/9; background: rgba(245,239,230,0.07); }
.svc-item--lead .svc-figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
.svc-item--lead .svc-figure img.is-missing { display: none; }
.svc-item--lead .svc-note { margin-top: 1rem; }

/* ---------- STATS ---------- */
.stats-section { background: var(--cream-2, #ede5d8); }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line, rgba(1,58,48,0.14)); border-left: 1px solid var(--line, rgba(1,58,48,0.14)); }
.stat { padding: clamp(1.6rem, 4vw, 2.6rem) 1.4rem; border-right: 1px solid var(--line, rgba(1,58,48,0.14)); border-bottom: 1px solid var(--line, rgba(1,58,48,0.14)); }
.stat-value { font-family: var(--display, 'Cormorant Garamond', serif); font-weight: 600; font-size: clamp(2.6rem, 5.5vw, 4.4rem); line-height: 1; margin: 0 0 0.5rem; color: var(--green, #014d40); }
.stat-suffix { color: var(--brass, #b08d57); margin-left: 0.1rem; }
.stat-label { margin: 0; font-family: var(--mono, monospace); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted, #5c665f); }

/* ---------- CTA ---------- */
.cta { background: var(--green-deep, #013a30); }
.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 2.5rem; flex-wrap: wrap; }
.cta-title { color: var(--cream, #f5efe6); margin: 0.6rem 0 1rem; }
.cta .lead { max-width: 44ch; margin: 0; }
.cta-actions { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }

/* ---------- BITS ---------- */
.with-arrow { display: inline-flex; align-items: center; gap: 0.7rem; }
.with-arrow .chip { display: inline-grid; place-items: center; width: 1.7rem; height: 1.7rem; border-radius: 50%; background: rgba(255,255,255,0.18); font-size: 0.85rem; }
.btn-fill .chip { background: rgba(245,239,230,0.22); }
.link-underline { font-family: var(--ui, 'Inter', sans-serif); color: var(--cream, #f5efe6); font-weight: 500; font-size: 0.95rem; text-decoration: none; border-bottom: 1px solid rgba(245,239,230,0.5); padding-bottom: 2px; transition: border-color 0.2s ease; }
.link-underline:hover { border-color: var(--cream, #f5efe6); }
.kicker--brass { color: var(--brass, #d9b87e); }
.kicker--light { color: rgba(245,239,230,0.85); }

/* ---------- RESPONSIVE ---------- */
@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr 1fr; }
  .statement-points { gap: 1.8rem; }
}
@media (max-width: 760px) {
  .hero { min-height: 86svh; padding-block: 120px 6vh; }
  .statement-points { grid-template-columns: 1fr; gap: 1.6rem; }
  .about-grid { grid-template-columns: 1fr; }
  .about-img--tall { grid-row: auto; aspect-ratio: 4/3; }
  .about-body { grid-column: 1; }
  .services-grid { grid-template-columns: 1fr; }
  .services-intro { position: static; }
  .stats { grid-template-columns: 1fr 1fr; }
  .cta-inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 420px) {
  .hero-cta { gap: 1rem; }
  .svc-note, .svc-item--lead .svc-figure { margin-left: 0; }
}

/* ---------- REDUCED MOTION ---------- */
@media (prefers-reduced-motion: reduce) { .h-anim { animation: none !important; opacity: 1 !important; transform: none !important; } }
</style>
