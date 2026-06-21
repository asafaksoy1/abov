<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase, whatsappLink } from '../lib/supabase'

const projects = ref([])
const loading = ref(true)
const selected = ref(null)

onMounted(async () => {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  projects.value = data ?? []
  loading.value = false
})

function openProject(p) {
  selected.value = p
  document.body.style.overflow = 'hidden'
}
function closeProject() {
  selected.value = null
  document.body.style.overflow = ''
}

function onImgError(e) { e.target.classList.add('is-missing') }
</script>

<template>
  <!-- HERO -->
  <section class="proj-hero">
    <div class="container">
      <span class="kicker" v-reveal>Our Work</span>
      <h1 v-reveal="1">Recent <em>projects.</em></h1>
      <p class="lead" v-reveal="2">A selection of renovations, installations and finishing work across homes and offices in the UK.</p>
    </div>
  </section>

  <!-- GRID -->
  <section class="section">
    <div class="container">
      <div v-if="loading" class="proj-loading"><span class="kicker">Loading projects…</span></div>

      <div v-else-if="projects.length === 0" class="proj-empty">
        <p>Projects will appear here once added from the admin panel.</p>
        <RouterLink to="/contact" class="btn btn-fill" style="margin-top:1.5rem">Get in touch instead</RouterLink>
      </div>

      <div v-else class="proj-grid">
        <article
          class="proj-card"
          v-for="(p, i) in projects"
          :key="p.id"
          v-reveal="i % 3"
          @click="openProject(p)"
          role="button"
          tabindex="0"
          @keydown.enter="openProject(p)"
        >
          <figure class="proj-img">
            <img
              v-if="p.image_urls && p.image_urls[0]"
              :src="p.image_urls[0]"
              :alt="p.title"
              loading="lazy"
              @error="onImgError"
            />
            <div class="proj-hover-label">View project →</div>
          </figure>
          <div class="proj-info">
            <span class="proj-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ p.title }}</h3>
              <span v-if="p.category" class="proj-tag">{{ p.category }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- MODAL -->
  <Teleport to="body">
    <div v-if="selected" class="modal-overlay" @click.self="closeProject">
      <div class="modal">
        <button class="modal-close" @click="closeProject" aria-label="Close">✕</button>

        <!-- Image gallery -->
        <div class="modal-gallery" v-if="selected.image_urls && selected.image_urls.length">
          <img
            v-for="(url, i) in selected.image_urls"
            :key="i"
            :src="url"
            :alt="selected.title"
            loading="lazy"
            class="gallery-img"
            @error="onImgError"
          />
        </div>

        <div class="modal-body">
          <div class="modal-meta">
            <span v-if="selected.category" class="proj-tag">{{ selected.category }}</span>
            <span v-if="selected.project_date" class="proj-date">{{ new Date(selected.project_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) }}</span>
          </div>
          <h2 class="modal-title">{{ selected.title }}</h2>
          <p v-if="selected.description" class="modal-desc">{{ selected.description }}</p>
          <a :href="whatsappLink(`Hi ABOV, I'd like to discuss a similar project to ${selected.title}.`)" target="_blank" rel="noopener" class="btn btn-fill" style="margin-top:1.5rem">Enquire about this →</a>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- CTA -->
  <section class="section proj-cta">
    <div class="container cta-inner">
      <div v-reveal>
        <span class="kicker kicker--brass">Start a project</span>
        <h2>Like what you see?<br /><em>Let's talk.</em></h2>
      </div>
      <div class="cta-btns" v-reveal="1">
        <RouterLink to="/contact" class="btn btn-fill">Get a quote</RouterLink>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="link-underline">WhatsApp us →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
em { font-style: italic; color: var(--brass, #b08d57); }

.proj-hero { background: var(--green, #014d40); padding: clamp(9rem, 16vw, 14rem) 0 clamp(4rem, 7vw, 7rem); }
.proj-hero h1 { color: var(--cream, #f5efe6); }
.proj-hero .lead { color: rgba(245,239,230,0.74); margin-top: 1.2rem; max-width: 50ch; }

.proj-loading, .proj-empty { padding: 4rem 0; text-align: center; color: var(--muted, #5c665f); }

.proj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(1.5rem, 3vw, 2.5rem); }

.proj-card { cursor: pointer; display: flex; flex-direction: column; gap: 1.1rem; }
.proj-card:focus-visible { outline: 2px solid var(--green, #014d40); outline-offset: 4px; border-radius: 5px; }

.proj-img {
  margin: 0; border-radius: 5px; overflow: hidden; aspect-ratio: 4/3;
  background: var(--cream-2, #ede5d8); position: relative;
}
.proj-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.proj-img img.is-missing { display: none; }
.proj-card:hover .proj-img img { transform: scale(1.03); }
.proj-hover-label {
  position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-start;
  padding: 1.2rem; background: linear-gradient(0deg, rgba(1,42,34,0.65) 0%, transparent 60%);
  color: var(--cream, #f5efe6); font-size: 0.9rem; font-weight: 500; letter-spacing: 0.02em;
  opacity: 0; transition: opacity 0.25s ease;
}
.proj-card:hover .proj-hover-label { opacity: 1; }

.proj-info { display: flex; gap: 1rem; align-items: start; }
.proj-num { font-family: var(--mono, monospace); font-size: 0.75rem; color: var(--brass, #b08d57); padding-top: 0.35rem; flex-shrink: 0; }
.proj-info h3 { font-family: var(--display, 'Cormorant Garamond', serif); font-size: clamp(1.3rem, 2.2vw, 1.8rem); margin: 0 0 0.35rem; color: var(--green, #014d40); line-height: 1.1; }
.proj-tag { font-family: var(--mono, monospace); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brass, #b08d57); }
.proj-date { font-family: var(--mono, monospace); font-size: 0.68rem; letter-spacing: 0.08em; color: var(--muted, #5c665f); margin-left: 0.8rem; }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(1,42,34,0.55); z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem; backdrop-filter: blur(4px);
}
.modal {
  background: var(--cream, #f5efe6); border-radius: 8px; width: 100%; max-width: 760px;
  max-height: 90svh; overflow-y: auto; position: relative;
  box-shadow: 0 24px 64px rgba(1,42,34,0.3);
}
.modal-close {
  position: sticky; top: 1rem; float: right; margin: 1rem 1rem 0 0;
  background: rgba(1,42,34,0.1); border: none; border-radius: 50%;
  width: 2.2rem; height: 2.2rem; font-size: 0.9rem; cursor: pointer;
  color: var(--green, #014d40); transition: background 0.18s ease; z-index: 1;
}
.modal-close:hover { background: rgba(1,42,34,0.18); }
.modal-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 3px; }
.modal-gallery:has(.gallery-img:only-child) { grid-template-columns: 1fr; }
.gallery-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
.gallery-img.is-missing { display: none; }
.modal-body { padding: clamp(1.5rem, 4vw, 2.5rem); }
.modal-meta { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.8rem; flex-wrap: wrap; }
.modal-title { font-family: var(--display, 'Cormorant Garamond', serif); font-size: clamp(1.8rem, 4vw, 2.8rem); margin: 0 0 1rem; color: var(--green, #014d40); line-height: 1.08; }
.modal-desc { color: var(--muted, #5c665f); line-height: 1.7; margin: 0; white-space: pre-line; }

/* CTA */
.proj-cta { background: var(--cream-2, #ede5d8); }
.cta-inner { display: flex; justify-content: space-between; align-items: center; gap: 2.5rem; flex-wrap: wrap; }
.cta-btns { display: flex; gap: 1.4rem; align-items: center; flex-wrap: wrap; }
.link-underline { font-family: var(--ui, 'Inter', sans-serif); color: var(--green, #014d40); font-weight: 500; font-size: 0.95rem; text-decoration: none; border-bottom: 1px solid rgba(1,77,64,0.4); padding-bottom: 2px; transition: border-color 0.2s; }
.link-underline:hover { border-color: var(--green, #014d40); }

@media (max-width: 680px) {
  .proj-grid { grid-template-columns: 1fr; }
  .cta-inner { flex-direction: column; align-items: flex-start; }
  .modal-gallery { grid-template-columns: 1fr; }
}
</style>
