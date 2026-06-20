<script setup>
import { RouterLink } from 'vue-router'
import { whatsappLink } from '../lib/supabase'

const services = [
  { name: 'Home & office repairs', desc: 'The odd jobs and fixes that pile up — doors, handles, leaks, holes and worn fittings put right.' },
  { name: 'Full renovation', desc: 'Whole rooms or properties stripped back and rebuilt, managed end to end so you deal with one team.' },
  { name: 'Flooring', desc: 'Laminate, engineered wood, vinyl and tiling, laid level with neat edges and proper finishing.' },
  { name: 'Panelling', desc: 'Wall panelling and feature walls — measured, mitred and painted for a clean, built-in look.' },
  { name: 'Painting', desc: 'Walls, ceilings and woodwork properly prepped, filled and finished. Sharp lines, even coats.' },
  { name: 'Furniture assembly', desc: 'Flat-pack and bespoke units assembled, levelled and fixed safely to the wall where needed.' },
  { name: 'Joinery', desc: 'Bespoke fitted woodwork — shelving, cupboards, alcoves and trims made to measure on site.' },
  { name: 'Electrical', desc: 'Sockets, switches, lighting and fault-finding carried out safely to current standards.' },
  { name: 'Plumbing', desc: 'Repairs, replacements and bathroom or kitchen fit-outs, from a dripping tap to a full install.' },
  { name: 'General mounting', desc: 'TVs, shelves, mirrors and fixtures mounted securely and straight, on any wall type.' },
]
</script>

<template>
  <section class="section--green head">
    <div class="container">
      <span class="eyebrow">Our services</span>
      <h1>Everything your space needs,<br />from one team.</h1>
      <p class="lead">Ten trades under one roof means no juggling contractors and no gaps between jobs. Here's what we handle.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid">
        <article v-for="(s, i) in services" :key="s.name" class="card svc">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ s.name }}</h3>
          <p>{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--cream2">
    <div class="container cta-inner">
      <div>
        <span class="eyebrow">Not sure who you need?</span>
        <h2>Describe the job and we'll tell you.</h2>
      </div>
      <div class="btn-row">
        <RouterLink to="/contact" class="btn btn-primary">Contact Us</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="btn btn-outline">WhatsApp Us</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head { padding: clamp(140px, 17vw, 220px) 0 clamp(50px, 7vw, 90px); }
.head h1 { margin: 0.4rem 0 1.2rem; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.svc { position: relative; padding-top: 2.4rem; }
.num {
  position: absolute; top: 1.2rem; right: 1.4rem;
  font-family: var(--display); font-weight: 700; font-size: 0.85rem;
  color: var(--green); opacity: 0.45; letter-spacing: 0.05em;
}
.svc h3 { color: var(--green); margin-bottom: 0.5rem; }
.svc p { color: var(--muted); margin: 0; }

.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }

@media (max-width: 860px) { .grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
</style>
