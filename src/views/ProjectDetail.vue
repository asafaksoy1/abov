<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { supabase, whatsappLink } from '../lib/supabase'

const route = useRoute()
const router = useRouter()
const project = ref(null)
const loading = ref(true)
const activeImg = ref(0)

onMounted(async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error || !data) { router.replace('/projects'); return }
  project.value = data
  loading.value = false
})

function onImgError(e) { e.target.closest('.gallery-thumb')?.classList.add('is-missing') }
</script>

<template>
  <div v-if="loading" class="detail-loading">
    <span class="kicker">Loading…</span>
  </div>

  <template v-else-if="project">
    <!-- HERO IMAGE -->
    <section class="detail-hero">
      <div class="hero-img-wrap">
        <img
          v-if="project.image_urls && project.image_urls[activeImg]"
          :src="project.image_urls[activeImg]"
          :alt="project.title"
          class="hero-img"
        />
        <div v-else class="hero-img-placeholder"></div>
      </div>
      <div class="hero-overlay">
        <div class="container hero-meta">
          <span v-if="project.category" class="kicker kicker--brass">{{ project.category }}</span>
          <h1 class="hero-title">{{ project.title }}</h1>
          <span v-if="project.project_date" class="hero-date">
            {{ new Date(project.project_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) }}
          </span>
        </div>
      </div>
    </section>

    <!-- THUMBNAILS (if multiple images) -->
    <div v-if="project.image_urls && project.image_urls.length > 1" class="thumbs-bar">
      <div class="container thumbs-inner">
        <button
          v-for="(url, i) in project.image_urls"
          :key="i"
          class="gallery-thumb"
          :class="{ active: activeImg === i }"
          @click="activeImg = i"
        >
          <img :src="url" :alt="`${project.title} — photo ${i + 1}`" loading="lazy" @error="onImgError" />
        </button>
      </div>
    </div>

    <!-- DETAIL BODY -->
    <section class="section detail-body">
      <div class="container detail-grid">

        <!-- Description -->
        <div class="detail-main">
          <span class="kicker">About this project</span>
          <p v-if="project.description" class="detail-desc">{{ project.description }}</p>
          <p v-else class="detail-desc muted">More details coming soon.</p>

          <!-- Full gallery grid -->
          <div v-if="project.image_urls && project.image_urls.length > 1" class="full-gallery">
            <figure
              v-for="(url, i) in project.image_urls"
              :key="i"
              class="gallery-fig"
              :class="{ 'gallery-fig--wide': i === 0 }"
            >
              <img :src="url" :alt="`${project.title} — photo ${i + 1}`" loading="lazy" @error="onImgError" />
            </figure>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="detail-aside">
          <div class="aside-card">
            <span class="kicker kicker--brass">Project details</span>
            <dl class="detail-list">
              <div v-if="project.category">
                <dt>Type</dt>
                <dd>{{ project.category }}</dd>
              </div>
              <div v-if="project.project_date">
                <dt>Completed</dt>
                <dd>{{ new Date(project.project_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) }}</dd>
              </div>
            </dl>

            <div class="aside-cta">
              <p>Interested in a similar project?</p>
              <a
                :href="whatsappLink(`Hi ABOV, I'd love to discuss a project similar to ${project.title}.`)"
                target="_blank" rel="noopener"
                class="btn btn-fill aside-wa"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.039zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Enquire on WhatsApp
              </a>
              <RouterLink to="/contact" class="btn-secondary-link">Or send a message →</RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- BACK -->
    <div class="section back-bar">
      <div class="container">
        <RouterLink to="/projects" class="back-link">← Back to all projects</RouterLink>
      </div>
    </div>
  </template>
</template>

<style scoped>
em { font-style: italic; color: var(--brass, #b08d57); }

.detail-loading { min-height: 60svh; display: grid; place-items: center; color: var(--muted, #5c665f); }

/* Hero */
.detail-hero { position: relative; height: 70svh; min-height: 420px; overflow: hidden; background: var(--green-deep, #013a30); }
.hero-img-wrap { position: absolute; inset: 0; }
.hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hero-img-placeholder { width: 100%; height: 100%; background: var(--green, #014d40); }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(0deg, rgba(1,42,34,0.82) 0%, rgba(1,42,34,0.2) 60%, transparent 100%);
  display: flex; align-items: flex-end;
}
.hero-meta { padding-bottom: clamp(2rem, 5vw, 4rem); }
.hero-title { font-family: var(--display, 'Cormorant Garamond', serif); font-weight: 500; font-size: clamp(2.2rem, 6vw, 4.8rem); color: #fff; margin: 0.4rem 0 0.6rem; line-height: 1.05; }
.hero-date { font-family: var(--mono, monospace); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,239,230,0.7); }

/* Thumbs */
.thumbs-bar { background: var(--green-deep, #013a30); padding: 1rem 0; }
.thumbs-inner { display: flex; gap: 0.6rem; overflow-x: auto; scrollbar-width: none; }
.thumbs-inner::-webkit-scrollbar { display: none; }
.gallery-thumb { width: 80px; height: 60px; flex-shrink: 0; border: 2px solid transparent; border-radius: 3px; overflow: hidden; cursor: pointer; background: rgba(245,239,230,0.1); transition: border-color .2s ease; padding: 0; }
.gallery-thumb.active { border-color: var(--brass, #b08d57); }
.gallery-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gallery-thumb.is-missing { display: none; }

/* Body */
.detail-grid { display: grid; grid-template-columns: 1fr 0.7fr; gap: clamp(3rem, 6vw, 6rem); align-items: start; }
.detail-main .kicker { margin-bottom: 1rem; }
.detail-desc { font-size: clamp(1rem, 1.5vw, 1.15rem); line-height: 1.75; color: var(--ink, #16221e); margin: 0; white-space: pre-line; }
.detail-desc.muted { color: var(--muted, #5c665f); }

/* Full gallery grid */
.full-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 3rem; }
.gallery-fig { margin: 0; border-radius: 4px; overflow: hidden; aspect-ratio: 4/3; background: var(--cream-2, #ede5d8); }
.gallery-fig img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gallery-fig--wide { grid-column: 1 / -1; aspect-ratio: 16/8; }

/* Aside */
.aside-card { background: var(--cream-2, #ede5d8); border-radius: 5px; padding: clamp(1.5rem, 3vw, 2.2rem); position: sticky; top: 100px; }
.detail-list { margin: 1.2rem 0 0; padding: 0; display: grid; gap: 1rem; }
.detail-list div { display: grid; gap: 0.2rem; }
.detail-list dt { font-family: var(--mono, monospace); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted, #5c665f); }
.detail-list dd { margin: 0; font-weight: 500; color: var(--green, #014d40); }
.aside-cta { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--line, rgba(1,58,48,0.14)); }
.aside-cta p { font-size: 0.9rem; color: var(--muted, #5c665f); margin: 0 0 1rem; }
.aside-wa { width: 100%; justify-content: center; gap: 0.6rem; }
.btn-secondary-link { display: block; text-align: center; margin-top: 0.8rem; font-size: 0.85rem; color: var(--green, #014d40); text-decoration: none; font-weight: 500; }
.btn-secondary-link:hover { text-decoration: underline; }

/* Back */
.back-bar { padding-block: 1.5rem; border-top: 1px solid var(--line, rgba(1,58,48,0.14)); }
.back-link { font-family: var(--mono, monospace); font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green, #014d40); text-decoration: none; }
.back-link:hover { color: var(--brass, #b08d57); }

@media (max-width: 760px) {
  .detail-hero { height: 55svh; }
  .detail-grid { grid-template-columns: 1fr; }
  .aside-card { position: static; }
  .full-gallery { grid-template-columns: 1fr; }
  .gallery-fig--wide { aspect-ratio: 4/3; }
}
</style>
