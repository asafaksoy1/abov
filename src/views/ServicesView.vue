<script setup>
import { RouterLink } from 'vue-router'
import { whatsappLink } from '../lib/supabase'

const services = [
  { name: 'Full renovation', desc: 'Whole rooms or properties stripped back and rebuilt, managed end to end so you deal with one team.' },
  { name: 'Bespoke joinery', desc: 'Fitted woodwork — shelving, cupboards, alcoves and trims made to measure on site.' },
  { name: 'Flooring', desc: 'Laminate, engineered wood, vinyl and tiling, laid level with neat edges and proper finishing.' },
  { name: 'Panelling', desc: 'Wall panelling and feature walls — measured, mitred and painted for a clean, built-in look.' },
  { name: 'Painting & finishing', desc: 'Walls, ceilings and woodwork properly prepped, filled and finished. Sharp lines, even coats.' },
  { name: 'Electrical', desc: 'Sockets, switches, lighting and fault-finding carried out safely to current standards.' },
  { name: 'Plumbing', desc: 'Repairs, replacements and bathroom or kitchen fit-outs, from a dripping tap to a full install.' },
  { name: 'Furniture assembly', desc: 'Flat-pack and bespoke units assembled, levelled and fixed safely to the wall where needed.' },
  { name: 'General mounting', desc: 'TVs, shelves, mirrors and fixtures mounted securely and straight, on any wall type.' },
  { name: 'Home & office repairs', desc: 'The odd jobs and fixes that pile up — doors, handles, leaks, holes and worn fittings put right.' },
]
</script>

<template>
  <!-- HERO -->
  <section class="svc-hero">
    <div class="container">
      <span class="kicker" v-reveal>Our Services</span>
      <h1 v-reveal="1">Everything your space<br /><em>needs, from one team.</em></h1>
      <p class="lead" v-reveal="2">Ten trades under one roof means no juggling contractors and no gaps between jobs.</p>
    </div>
  </section>

  <!-- SERVICE LIST (numbered editorial) -->
  <section class="section svc-list-section">
    <div class="container">
      <ol class="svc-list">
        <li class="svc-row" v-for="(s, i) in services" :key="s.name" v-reveal="i % 4">
          <span class="svc-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="svc-body">
            <h2 class="svc-name">{{ s.name }}</h2>
            <p class="svc-desc">{{ s.desc }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- CTA -->
  <section class="section svc-cta">
    <div class="container cta-inner">
      <div v-reveal>
        <span class="kicker kicker--brass">Not sure what you need?</span>
        <h2>Describe the job<br /><em>and we'll tell you.</em></h2>
      </div>
      <div class="cta-btns" v-reveal="1">
        <RouterLink to="/contact" class="btn btn-light">Contact us</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-outline-light">WhatsApp us</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
em { font-style: italic; color: var(--brass, #b08d57); }

.svc-hero {
  background: var(--green, #014d40);
  padding: clamp(9rem, 16vw, 14rem) 0 clamp(4rem, 7vw, 7rem);
}
.svc-hero h1 { color: var(--cream, #f5efe6); }
.svc-hero .lead { color: rgba(245,239,230,0.74); margin-top: 1.2rem; max-width: 50ch; }

.svc-list { list-style: none; margin: 0; padding: 0; }
.svc-row {
  display: grid; grid-template-columns: 4rem 1fr;
  gap: 1.5rem; align-items: start;
  padding: clamp(1.8rem, 3.5vw, 2.6rem) 0;
  border-bottom: 1px solid var(--line, rgba(1,58,48,0.14));
}
.svc-row:first-child { border-top: 1px solid var(--line, rgba(1,58,48,0.14)); }
.svc-num {
  font-family: var(--mono, monospace); font-size: 0.78rem; font-weight: 500;
  color: var(--brass, #b08d57); letter-spacing: 0.06em; padding-top: 0.5rem;
}
.svc-name {
  font-family: var(--display, 'Cormorant Garamond', serif); font-weight: 600;
  font-size: clamp(1.6rem, 3.2vw, 2.6rem); margin: 0 0 0.6rem; color: var(--green, #014d40); line-height: 1.1;
}
.svc-desc { color: var(--muted, #5c665f); margin: 0; max-width: 58ch; }

.svc-cta { background: var(--green-deep, #013a30); }
.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 2.5rem; flex-wrap: wrap; }
.cta-inner h2 { color: var(--cream, #f5efe6); margin-top: 0.5rem; }
.cta-btns { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
.btn-outline-light {
  display: inline-flex; align-items: center; font-family: var(--ui, 'Inter', sans-serif);
  font-weight: 500; font-size: 0.95rem; padding: 0.9rem 1.6rem; border-radius: 2px;
  border: 1px solid rgba(245,239,230,0.4); color: var(--cream, #f5efe6);
  text-decoration: none; transition: border-color 0.2s ease, background 0.2s ease;
}
.btn-outline-light:hover { border-color: rgba(245,239,230,0.9); background: rgba(245,239,230,0.06); }

@media (max-width: 600px) {
  .svc-row { grid-template-columns: 3rem 1fr; gap: 1rem; }
  .cta-inner { flex-direction: column; align-items: flex-start; }
}
</style>
