<script setup>
import { RouterLink } from 'vue-router'
import { whatsappLink } from '../lib/supabase'

const featured = [
  { name: 'Full renovation', note: 'Whole rooms taken back and rebuilt' },
  { name: 'Joinery', note: 'Bespoke fitted woodwork, made to measure' },
  { name: 'Flooring', note: 'Laminate, engineered wood and tiling' },
  { name: 'Painting', note: 'Clean lines, properly prepped walls' },
  { name: 'Electrical', note: 'Sockets, lighting and safe wiring' },
  { name: 'Plumbing', note: 'Repairs, replacements and fit-outs' },
]
</script>

<template>
  <!-- HERO with background video -->
  <section class="hero on-dark">
    <video class="hero-video" autoplay muted loop playsinline preload="auto" poster="/hero-poster.jpg">
      <source src="/hero.mp4" type="video/mp4" />
    </video>
    <div class="hero-tint"></div>

    <div class="container hero-content">
      <span class="eyebrow h-anim d1">Renovation &amp; Interiors · UK</span>
      <h1 class="h-anim d2">The work that turns<br />a house into a home.</h1>
      <p class="lead h-anim d3">Renovation, repairs and finishing for homes and offices — joinery, flooring, painting, electrical and plumbing, delivered by one tidy team you can trust in your space.</p>
      <div class="btn-row h-anim d4">
        <RouterLink to="/contact" class="btn btn-light">Contact Us</RouterLink>
        <RouterLink to="/projects" class="btn btn-outline">View Projects</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-outline">WhatsApp Us</a>
      </div>
    </div>

    <div class="hero-scroll h-anim d4"><span>Scroll</span></div>
  </section>

  <!-- SERVICES preview -->
  <section class="section">
    <div class="container">
      <span class="eyebrow" v-reveal>01 / What we do</span>
      <div class="head-row">
        <h2 v-reveal>One team for the whole job.</h2>
        <RouterLink to="/services" class="btn btn-outline" v-reveal>See all services</RouterLink>
      </div>
      <div class="grid">
        <article v-for="(s, i) in featured" :key="s.name" class="card svc" v-reveal="i % 3">
          <h3>{{ s.name }}</h3>
          <p>{{ s.note }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- WHY US -->
  <section class="section section--cream2">
    <div class="container why-grid">
      <div v-reveal>
        <span class="eyebrow">02 / Why ABOV</span>
        <h2>No surprises, no mess, no chasing.</h2>
      </div>
      <div class="why-points">
        <div v-reveal="0"><h3>Quoted up front</h3><p>You get a clear price before any work starts, so there are no awkward conversations at the end.</p></div>
        <div v-reveal="1"><h3>One point of contact</h3><p>From first message to final clean-up you deal with us directly — message on WhatsApp and get a real reply.</p></div>
        <div v-reveal="2"><h3>Finished properly</h3><p>Edges, corners and clean-up matter. We treat your home the way we'd treat our own.</p></div>
      </div>
    </div>
  </section>

  <!-- CTA band -->
  <section class="section section--green">
    <div class="container cta-inner">
      <div v-reveal>
        <span class="eyebrow">03 / Get started</span>
        <h2>Tell us what needs doing.</h2>
        <p class="lead">Send a few photos and we'll come back with honest advice and a price.</p>
      </div>
      <div class="btn-row" v-reveal="1">
        <RouterLink to="/contact" class="btn btn-light">Contact Us</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-outline">WhatsApp Us</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* HERO */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-block: 120px 90px;
}
.hero-video {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; z-index: 0;
}
.hero-tint {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(180deg, rgba(1,42,34,0.55) 0%, rgba(1,42,34,0.45) 40%, rgba(1,42,34,0.82) 100%),
    linear-gradient(90deg, rgba(1,42,34,0.6) 0%, rgba(1,42,34,0.2) 60%);
}
.hero-content { position: relative; z-index: 2; max-width: 860px; }
.hero .eyebrow { color: var(--cream); }
.hero h1 { color: var(--white); margin: 0.6rem 0 1.6rem; }
.hero .lead { color: #e7ded2; max-width: 60ch; }
.hero .btn-row { margin-top: 2rem; }

.hero-scroll {
  position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 2;
  font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
  color: rgba(245,239,230,0.7);
}
.hero-scroll span { position: relative; }
.hero-scroll span::after { content: ''; display: block; width: 1px; height: 32px; background: rgba(245,239,230,0.4); margin: 0.6rem auto 0; }

/* SERVICES preview */
.head-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; margin-bottom: 2.4rem; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.3rem; }
.svc h3 { color: var(--green); margin-bottom: 0.5rem; }
.svc p { color: var(--muted); margin: 0; }

/* WHY US */
.why-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 3rem; align-items: start; }
.why-grid h2 { margin-top: 0.4rem; }
.why-points { display: grid; gap: 1.8rem; }
.why-points h3 { margin-bottom: 0.3rem; }
.why-points p { color: var(--muted); margin: 0; }

/* CTA */
.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 2.5rem; flex-wrap: wrap; }
.cta-inner .lead { margin-top: 0.8rem; }

@media (max-width: 880px) {
  .why-grid { grid-template-columns: 1fr; gap: 1.8rem; }
  .grid { grid-template-columns: 1fr 1fr; }
  .head-row { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 540px) { .grid { grid-template-columns: 1fr; } }
</style>
