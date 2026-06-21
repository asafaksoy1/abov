<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { whatsappLink } from '../lib/supabase'

const services = [
  { name: 'Full renovation', note: 'Whole rooms taken back to brick and rebuilt — design, structure and finish handled end to end.' },
  { name: 'Bespoke joinery', note: 'Fitted woodwork made to measure: alcoves, wardrobes, shelving and cabinetry.' },
  { name: 'Flooring', note: 'Laminate, engineered wood and tiling, laid level and finished clean.' },
  { name: 'Painting & finishing', note: 'Properly prepped walls, crisp lines and a finish that lasts.' },
  { name: 'Electrical', note: 'Sockets, lighting and safe, certified wiring.' },
  { name: 'Plumbing', note: 'Repairs, replacements and full bathroom and kitchen fit-outs.' },
]

// NOTE: placeholder figures — replace with your real numbers.
const stats = [
  { value: '12+', unit: 'Years', label: 'On the tools across the UK' },
  { value: '100%', unit: '', label: 'Quoted up front, no surprises' },
  { value: '240+', unit: 'Projects', label: 'Homes and offices completed' },
  { value: '4.9', unit: '★', label: 'Average customer rating' },
]

const marquee = ['Renovation', 'Joinery', 'Flooring', 'Painting', 'Electrical', 'Plumbing']

// Public-folder images. Bound with :src so Vite doesn't try to resolve them
// at build time — they load from /public at runtime once the files exist.
const img = {
  heroVideo: '/hero.mp4',
  heroPoster: '/hero-poster.jpg',
  about1: '/about-1.jpg',
  about2: '/about-2.jpg',
  serviceFeature: '/service-feature.jpg',
}

// Magnetic primary button — subtle pull toward the cursor.
const magnet = ref(null)
onMounted(() => {
  const el = magnet.value?.$el ?? magnet.value
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (window.matchMedia('(hover: none)').matches) return
  const strength = 0.3
  const move = (e) => {
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px)`
  }
  const reset = () => { el.style.transform = 'translate(0,0)' }
  el.addEventListener('mousemove', move)
  el.addEventListener('mouseleave', reset)
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
      <span class="eyebrow eyebrow--brass h-anim d1">Renovation &amp; Interiors · UK</span>
      <h1 class="hero-title h-anim d2">Spaces, restored<br />and made to last.</h1>
      <p class="hero-lead h-anim d3">
        Renovation, repairs and finishing for homes and offices — joinery, flooring,
        painting, electrical and plumbing, delivered by one tidy team you can trust in your space.
      </p>
      <div class="hero-cta h-anim d4">
        <RouterLink ref="magnet" to="/contact" class="btn btn-light btn-magnet">Get a quote</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline">Message us on WhatsApp →</a>
      </div>
    </div>

    <div class="hero-scroll h-anim d4"><span>Scroll</span></div>
  </section>

  <!-- ============ MARQUEE (signature) ============ -->
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <template v-for="n in 2" :key="n">
        <span v-for="w in marquee" :key="w + n" class="marquee-word">
          {{ w }} <span class="marquee-dot">·</span>
        </span>
      </template>
    </div>
  </div>

  <!-- ============ ABOUT + STATS ============ -->
  <section class="section about">
    <div class="container">
      <div class="about-grid">
        <div class="about-label">
          <span class="eyebrow" v-reveal>About ABOV</span>
          <figure class="about-thumb" v-reveal="1">
            <img :src="img.about1" alt="A finished ABOV interior" loading="lazy" />
          </figure>
        </div>

        <div class="about-body">
          <h2 v-reveal>Considered interiors,<br />finished properly.</h2>
          <p class="lead" v-reveal="1">
            We take on the whole job — design through to the last coat of paint — so you deal
            with one team and one clear price. Every project is planned carefully and left clean,
            the way we'd want our own home treated.
          </p>
          <RouterLink to="/services" class="btn btn-fill with-arrow" v-reveal="2">
            What we do <span class="chip">→</span>
          </RouterLink>
        </div>

        <figure class="about-feature" v-reveal="2">
          <img :src="img.about2" alt="Detail of a renovated kitchen" loading="lazy" />
        </figure>
      </div>

      <div class="stats">
        <div class="stat" v-for="(s, i) in stats" :key="s.label" v-reveal="i">
          <p class="stat-value">{{ s.value }}<span class="stat-unit">{{ s.unit }}</span></p>
          <p class="stat-label">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SERVICES (deep green, logo watermark) ============ -->
  <section class="section services">
    <div class="services-watermark" aria-hidden="true"></div>
    <div class="container services-grid">
      <div class="services-intro">
        <span class="eyebrow eyebrow--brass" v-reveal>What we do</span>
        <h2 v-reveal="1">Plan, build &amp;<br />finish, with one team.</h2>
        <p class="lead lead--light" v-reveal="2">One point of contact from first message to final clean-up.</p>
        <RouterLink to="/services" class="btn btn-light with-arrow" v-reveal="3">
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
            <img :src="img.serviceFeature" :alt="services[0].name" loading="lazy" />
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
        <span class="eyebrow">Get started</span>
        <h2 class="cta-title">Tell us what needs doing.</h2>
        <p class="lead">Send a few photos and we'll come back with honest advice and a price.</p>
      </div>
      <div class="cta-actions" v-reveal="1">
        <RouterLink to="/contact" class="btn btn-fill">Contact us</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline link-underline--dark">WhatsApp us →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Tokens have fallbacks so this looks right even before the main.css patch. */

/* ---------- HERO ---------- */
.hero {
  position: relative; min-height: 94svh;
  display: flex; align-items: flex-end; overflow: hidden;
  padding-block: 140px 7vh;
}
.hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
.hero-tint {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(180deg, rgba(7,36,28,0.45) 0%, rgba(7,36,28,0.45) 45%, rgba(7,36,28,0.88) 100%),
    linear-gradient(90deg, rgba(7,36,28,0.55) 0%, rgba(7,36,28,0.10) 65%);
}
.hero-inner { position: relative; z-index: 2; max-width: 62rem; }
.hero-title {
  font-family: var(--display, 'Cormorant Garamond', Georgia, serif);
  color: var(--bone, #f2ece1); font-weight: 500; line-height: 1.0;
  letter-spacing: -0.005em; font-size: clamp(2.8rem, 8.5vw, 6rem);
  margin: 0.6rem 0 1.4rem;
}
.hero-lead { color: rgba(242,236,225,0.86); max-width: 52ch; font-size: clamp(1rem,1.4vw,1.18rem); line-height: 1.65; }
.hero-cta { margin-top: 2.2rem; display: flex; align-items: center; gap: 1.6rem; flex-wrap: wrap; }
.btn-magnet { will-change: transform; transition: transform 0.25s ease-out, background 0.2s ease; }
.hero-scroll {
  position: absolute; bottom: 1.6rem; left: 50%; transform: translateX(-50%); z-index: 2;
  font-family: var(--ui, 'Inter', sans-serif); font-size: 0.62rem;
  letter-spacing: 0.28em; text-transform: uppercase; color: rgba(242,236,225,0.7);
}
.hero-scroll span::after { content: ''; display: block; width: 1px; height: 30px; background: rgba(242,236,225,0.4); margin: 0.6rem auto 0; }

/* ---------- MARQUEE ---------- */
.marquee { overflow: hidden; background: var(--bone, #f2ece1); border-block: 1px solid var(--line, rgba(17,53,43,0.14)); padding-block: clamp(1rem,2.5vw,1.8rem); }
.marquee-track { display: inline-flex; align-items: center; white-space: nowrap; animation: marquee 28s linear infinite; }
.marquee-word {
  font-family: var(--display, 'Cormorant Garamond', Georgia, serif);
  font-size: clamp(2rem, 5vw, 4rem); font-weight: 600; padding-inline: 0.4em;
  color: transparent; -webkit-text-stroke: 1px var(--ink, #11352b); text-transform: uppercase; letter-spacing: 0.01em;
}
.marquee-dot { color: var(--brass, #b89355); -webkit-text-stroke: 0; }
@keyframes marquee { to { transform: translateX(-50%); } }

/* ---------- ABOUT ---------- */
.about-grid { display: grid; grid-template-columns: 0.85fr 1.4fr 1fr; gap: clamp(1.5rem,4vw,3.4rem); align-items: start; }
.about-label { display: flex; flex-direction: column; gap: 1.6rem; }
.about-thumb { margin: 0; border-radius: 4px; overflow: hidden; aspect-ratio: 4/3; }
.about-feature { margin: 0; border-radius: 4px; overflow: hidden; aspect-ratio: 3/4; }
.about-thumb img, .about-feature img, .svc-figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-body .lead { margin: 1.2rem 0 2rem; max-width: 46ch; }

/* ---------- STATS ---------- */
.stats { display: grid; grid-template-columns: repeat(4,1fr); margin-top: clamp(3rem,7vw,5.5rem); border-top: 1px solid var(--line,rgba(17,53,43,0.14)); border-left: 1px solid var(--line,rgba(17,53,43,0.14)); }
.stat { padding: 1.8rem 1.4rem; border-right: 1px solid var(--line,rgba(17,53,43,0.14)); border-bottom: 1px solid var(--line,rgba(17,53,43,0.14)); }
.stat-value { font-family: var(--display,'Cormorant Garamond',serif); font-weight: 600; font-size: clamp(2.4rem,4.6vw,3.6rem); line-height: 1; margin: 0 0 0.5rem; color: var(--ink,#11352b); }
.stat-unit { font-size: 0.4em; margin-left: 0.35rem; color: var(--brass,#b89355); }
.stat-label { margin: 0; font-size: 0.84rem; line-height: 1.45; color: var(--muted,#5e6b62); }

/* ---------- SERVICES (dark) ---------- */
.services { position: relative; background: var(--green-deep, #0a2a22); overflow: hidden; }
.services-watermark {
  position: absolute; right: -4%; bottom: -10%; width: 60%; max-width: 720px; aspect-ratio: 700/410;
  background: url('/abov-logo-white.png') no-repeat center / contain; opacity: 0.05; pointer-events: none;
}
.services-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 0.9fr 1.3fr; gap: clamp(2rem,6vw,5rem); align-items: start; }
.services-intro { position: sticky; top: 110px; }
.services-intro h2 { color: var(--bone, #f2ece1); }
.services-intro .lead { margin: 1rem 0 2rem; }
.lead--light { color: rgba(242,236,225,0.72); }
.services-list { list-style: none; margin: 0; padding: 0; }
.svc-item { padding: 1.7rem 0; border-top: 1px solid rgba(242,236,225,0.16); }
.svc-item:last-child { border-bottom: 1px solid rgba(242,236,225,0.16); }
.svc-head { display: flex; align-items: baseline; gap: 1rem; }
.svc-num { font-family: var(--ui,'Inter',sans-serif); font-size: 0.8rem; color: var(--brass,#b89355); letter-spacing: 0.04em; padding-top: 0.35rem; }
.svc-item h3 { font-family: var(--display,'Cormorant Garamond',serif); font-weight: 600; font-size: clamp(1.4rem,2.8vw,2rem); margin: 0; color: var(--bone,#f2ece1); line-height: 1.12; }
.svc-note { color: rgba(242,236,225,0.66); margin: 0.7rem 0 0 2rem; max-width: 54ch; }
.svc-item--lead .svc-figure { margin: 1.2rem 0 0 2rem; border-radius: 4px; overflow: hidden; aspect-ratio: 16/9; }
.svc-item--lead .svc-note { margin-top: 1rem; }

/* ---------- CTA ---------- */
.cta { background: var(--bone-2, #eae2d4); }
.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 2.5rem; flex-wrap: wrap; }
.cta-title { margin: 0.6rem 0 1rem; }
.cta .lead { max-width: 46ch; margin: 0; }
.cta-actions { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }

/* ---------- LINKS / BITS ---------- */
.with-arrow { display: inline-flex; align-items: center; gap: 0.7rem; }
.with-arrow .chip { display: inline-grid; place-items: center; width: 1.7rem; height: 1.7rem; border-radius: 50%; background: rgba(255,255,255,0.16); font-size: 0.85rem; }
.btn-fill .chip { background: rgba(242,236,225,0.2); }
.link-underline { font-family: var(--ui,'Inter',sans-serif); color: var(--bone,#f2ece1); font-weight: 500; font-size: 0.95rem; text-decoration: none; border-bottom: 1px solid rgba(242,236,225,0.5); padding-bottom: 2px; transition: border-color 0.2s ease; }
.link-underline:hover { border-color: var(--bone,#f2ece1); }
.link-underline--dark { color: var(--ink,#11352b); border-bottom-color: rgba(17,53,43,0.4); }
.link-underline--dark:hover { border-bottom-color: var(--ink,#11352b); }
.eyebrow--brass { color: var(--brass,#b89355); }

/* ---------- RESPONSIVE ---------- */
@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr 1fr; }
  .about-label { order: 2; flex-direction: row; }
  .about-thumb { flex: 1; aspect-ratio: 4/3; }
  .about-body { order: 1; grid-column: 1/-1; }
  .about-feature { order: 3; aspect-ratio: 4/3; }
}
@media (max-width: 760px) {
  .hero { min-height: 86svh; padding-block: 120px 6vh; }
  .services-grid { grid-template-columns: 1fr; }
  .services-intro { position: static; }
  .stats { grid-template-columns: 1fr 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .about-label { flex-direction: column; }
  .cta-inner { flex-direction: column; align-items: flex-start; }
  .marquee-word { -webkit-text-stroke-width: 0.7px; }
}
@media (max-width: 420px) {
  .hero-cta { gap: 1rem; }
  .svc-note, .svc-item--lead .svc-figure { margin-left: 0; }
}

/* ---------- REDUCED MOTION ---------- */
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .h-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
}
</style>
