<script setup>
import { RouterLink } from 'vue-router'
import { whatsappLink } from '../lib/supabase'

// Services rendered as a numbered editorial list (the order is the "what we do" sequence).
const services = [
  { name: 'Full renovation', note: 'Whole rooms taken back to brick and rebuilt — design, structure and finish handled end to end.' },
  { name: 'Bespoke joinery', note: 'Fitted woodwork made to measure: alcoves, wardrobes, shelving and cabinetry.' },
  { name: 'Flooring', note: 'Laminate, engineered wood and tiling, laid level and finished clean.' },
  { name: 'Painting & finishing', note: 'Properly prepped walls, crisp lines and a finish that lasts.' },
  { name: 'Electrical', note: 'Sockets, lighting and safe, certified wiring.' },
  { name: 'Plumbing', note: 'Repairs, replacements and full bathroom and kitchen fit-outs.' },
]

// NOTE: placeholder figures — swap for your real numbers.
const stats = [
  { value: '12+', unit: 'Years', label: 'On the tools across the UK' },
  { value: '100%', unit: '', label: 'Quoted up front, no surprises' },
  { value: '240+', unit: 'Projects', label: 'Homes and offices completed' },
  { value: '4.9', unit: '★', label: 'Average customer rating' },
]
</script>

<template>
  <!-- ============ HERO ============ -->
  <section class="hero">
    <video class="hero-video" autoplay muted loop playsinline preload="auto" poster="/hero-poster.jpg">
      <source src="/hero.mp4" type="video/mp4" />
    </video>
    <div class="hero-tint"></div>

    <div class="container hero-inner">
      <span class="eyebrow eyebrow--light h-anim d1">Renovation &amp; Interiors · UK</span>
      <h1 class="hero-title h-anim d2">Spaces, restored<br />and made to last.</h1>
      <p class="hero-lead h-anim d3">
        Renovation, repairs and finishing for homes and offices — joinery, flooring,
        painting, electrical and plumbing, delivered by one tidy team you can trust in your space.
      </p>
      <div class="hero-cta h-anim d4">
        <RouterLink to="/contact" class="btn btn-fill">Get a quote</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline">Message us on WhatsApp →</a>
      </div>
    </div>

    <div class="hero-scroll h-anim d4"><span>Scroll</span></div>
  </section>

  <!-- ============ ABOUT + STATS ============ -->
  <section class="section about">
    <div class="container">
      <div class="about-grid">
        <div class="about-label">
          <span class="eyebrow" v-reveal>About ABOV</span>
          <figure class="about-thumb" v-reveal="1">
            <img src="/about-1.jpg" alt="A finished ABOV interior" loading="lazy" />
          </figure>
        </div>

        <div class="about-body">
          <h2 class="display" v-reveal>Considered interiors,<br />finished properly.</h2>
          <p class="lead" v-reveal="1">
            We take on the whole job — design through to the last coat of paint — so you deal
            with one team and one clear price. Every project is planned carefully and left clean,
            the way we'd want our own home treated.
          </p>
          <RouterLink to="/services" class="btn btn-dark with-arrow" v-reveal="2">
            What we do <span class="chip">→</span>
          </RouterLink>
        </div>

        <figure class="about-feature" v-reveal="2">
          <img src="/about-2.jpg" alt="Detail of a renovated kitchen" loading="lazy" />
        </figure>
      </div>

      <!-- Stats -->
      <div class="stats">
        <div class="stat" v-for="(s, i) in stats" :key="s.label" v-reveal="i">
          <p class="stat-value">{{ s.value }}<span class="stat-unit">{{ s.unit }}</span></p>
          <p class="stat-label">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SERVICES (numbered editorial list) ============ -->
  <section class="section section--bone2 services">
    <div class="container services-grid">
      <div class="services-intro">
        <span class="eyebrow" v-reveal>What we do</span>
        <h2 class="display" v-reveal="1">Plan, build &amp;<br />finish, with one team.</h2>
        <p class="lead" v-reveal="2">One point of contact from first message to final clean-up.</p>
        <RouterLink to="/services" class="btn btn-dark with-arrow" v-reveal="3">
          See all services <span class="chip">→</span>
        </RouterLink>
      </div>

      <ol class="services-list">
        <li class="svc-item svc-item--lead" v-reveal>
          <div class="svc-head">
            <span class="svc-num">01</span>
            <h3>{{ services[0].name }}</h3>
          </div>
          <figure class="svc-figure">
            <img src="/service-feature.jpg" :alt="services[0].name" loading="lazy" />
          </figure>
          <p class="svc-note">{{ services[0].note }}</p>
        </li>

        <li class="svc-item" v-for="(s, i) in services.slice(1)" :key="s.name" v-reveal="i % 3">
          <div class="svc-head">
            <span class="svc-num">{{ String(i + 2).padStart(2, '0') }}</span>
            <h3>{{ s.name }}</h3>
          </div>
          <p class="svc-note">{{ s.note }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- ============ CTA BAND ============ -->
  <section class="section cta">
    <div class="container cta-inner">
      <div v-reveal>
        <span class="eyebrow eyebrow--light">Get started</span>
        <h2 class="display cta-title">Tell us what needs doing.</h2>
        <p class="cta-lead">Send a few photos and we'll come back with honest advice and a price.</p>
      </div>
      <div class="cta-actions" v-reveal="1">
        <RouterLink to="/contact" class="btn btn-light">Contact us</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline link-underline--light">WhatsApp us →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tokens fall back to sane values so this view looks right even before the
   main.css patch is applied. Apply the patch to make the whole site match. */

/* ---------- HERO ---------- */
.hero {
  position: relative;
  min-height: 92svh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding-block: 140px 7vh;
}
.hero-video {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; z-index: 0;
}
.hero-tint {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(180deg, rgba(28,20,14,0.15) 0%, rgba(28,20,14,0.30) 55%, rgba(28,20,14,0.74) 100%);
}
.hero-inner { position: relative; z-index: 2; max-width: 60rem; }
.hero-title {
  font-family: var(--display, 'Fraunces', Georgia, serif);
  color: #fff;
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -0.01em;
  font-size: clamp(2.6rem, 7.5vw, 5.4rem);
  margin: 0.7rem 0 1.4rem;
}
.hero-lead {
  color: #efe7da;
  max-width: 52ch;
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  line-height: 1.65;
}
.hero-cta {
  margin-top: 2.2rem;
  display: flex; align-items: center; gap: 1.6rem; flex-wrap: wrap;
}
.hero-scroll {
  position: absolute; bottom: 1.6rem; left: 50%; transform: translateX(-50%); z-index: 2;
  font-family: var(--ui, 'Inter', sans-serif);
  font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase;
  color: rgba(245,239,230,0.75);
}
.hero-scroll span::after {
  content: ''; display: block; width: 1px; height: 30px;
  background: rgba(245,239,230,0.45); margin: 0.6rem auto 0;
}

/* ---------- ABOUT ---------- */
.about-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.4fr 1fr;
  gap: clamp(1.5rem, 4vw, 3.4rem);
  align-items: start;
}
.about-label { display: flex; flex-direction: column; gap: 1.6rem; }
.about-thumb { margin: 0; border-radius: 4px; overflow: hidden; aspect-ratio: 4 / 3; }
.about-feature { margin: 0; border-radius: 4px; overflow: hidden; aspect-ratio: 3 / 4; }
.about-thumb img, .about-feature img,
.svc-figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-body .lead { margin: 1.2rem 0 2rem; max-width: 46ch; }

/* ---------- STATS ---------- */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: clamp(3rem, 7vw, 5.5rem);
  border-top: 1px solid var(--line, rgba(42,32,24,0.14));
  border-left: 1px solid var(--line, rgba(42,32,24,0.14));
}
.stat {
  padding: 1.8rem 1.4rem;
  border-right: 1px solid var(--line, rgba(42,32,24,0.14));
  border-bottom: 1px solid var(--line, rgba(42,32,24,0.14));
}
.stat-value {
  font-family: var(--display, 'Fraunces', Georgia, serif);
  font-weight: 500;
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1; margin: 0 0 0.6rem;
  color: var(--ink, #2e2823);
}
.stat-unit {
  font-size: 0.42em; margin-left: 0.35rem;
  color: var(--clay, #b07a4f); letter-spacing: 0.02em;
}
.stat-label {
  margin: 0; font-size: 0.84rem; line-height: 1.45;
  color: var(--muted, #6e6358);
}

/* ---------- SERVICES ---------- */
.services-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.3fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}
.services-intro { position: sticky; top: 110px; }
.services-intro .lead { margin: 1rem 0 2rem; }
.services-list { list-style: none; margin: 0; padding: 0; }
.svc-item {
  padding: 1.7rem 0;
  border-top: 1px solid var(--line, rgba(42,32,24,0.14));
}
.svc-item:last-child { border-bottom: 1px solid var(--line, rgba(42,32,24,0.14)); }
.svc-head { display: flex; align-items: baseline; gap: 1rem; }
.svc-num {
  font-family: var(--ui, 'Inter', sans-serif);
  font-size: 0.8rem; color: var(--clay, #b07a4f);
  font-feature-settings: 'tnum'; letter-spacing: 0.04em; padding-top: 0.35rem;
}
.svc-item h3 {
  font-family: var(--display, 'Fraunces', Georgia, serif);
  font-weight: 500; font-size: clamp(1.3rem, 2.6vw, 1.85rem);
  margin: 0; color: var(--ink, #2e2823); line-height: 1.15;
}
.svc-note { color: var(--muted, #6e6358); margin: 0.7rem 0 0 2rem; max-width: 54ch; }
.svc-item--lead .svc-figure {
  margin: 1.2rem 0 0 2rem; border-radius: 4px; overflow: hidden; aspect-ratio: 16 / 9;
}
.svc-item--lead .svc-note { margin-top: 1rem; }

/* ---------- CTA ---------- */
.cta { background: var(--espresso, #2a2018); }
.cta-inner {
  display: flex; justify-content: space-between; align-items: center;
  gap: 2.5rem; flex-wrap: wrap;
}
.cta-title { color: #fff; margin: 0.7rem 0 1rem; }
.cta-lead { color: #d8ccbd; max-width: 46ch; margin: 0; }
.cta-actions { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }

/* ---------- BUTTONS / LINKS (scoped overrides for this view) ---------- */
.btn { font-family: var(--ui, 'Inter', sans-serif); }
.with-arrow { display: inline-flex; align-items: center; gap: 0.7rem; }
.with-arrow .chip {
  display: inline-grid; place-items: center; width: 1.7rem; height: 1.7rem;
  border-radius: 50%; background: rgba(255,255,255,0.16); font-size: 0.85rem;
}
.link-underline {
  font-family: var(--ui, 'Inter', sans-serif); color: #fff; font-weight: 500;
  font-size: 0.95rem; text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.5); padding-bottom: 2px;
  transition: border-color 0.2s ease, opacity 0.2s ease;
}
.link-underline:hover { border-color: #fff; }
.eyebrow--light { color: #e9dECF; }

/* ---------- RESPONSIVE ---------- */
@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr 1fr; }
  .about-label { order: 2; flex-direction: row; }
  .about-thumb { flex: 1; aspect-ratio: 4 / 3; }
  .about-body { order: 1; grid-column: 1 / -1; }
  .about-feature { order: 3; aspect-ratio: 4 / 3; }
}
@media (max-width: 760px) {
  .hero { min-height: 88svh; padding-block: 120px 6vh; }
  .services-grid { grid-template-columns: 1fr; }
  .services-intro { position: static; }
  .stats { grid-template-columns: 1fr 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .about-label { flex-direction: column; }
  .cta-inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 420px) {
  .hero-cta { gap: 1rem; }
  .svc-note { margin-left: 0; }
  .svc-item--lead .svc-figure { margin-left: 0; }
}

/* ---------- REDUCED MOTION ---------- */
@media (prefers-reduced-motion: reduce) {
  .h-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
}
</style>
