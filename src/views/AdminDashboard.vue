<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const projects = ref([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const showForm = ref(false)

const blank = () => ({ id: null, title: '', category: '', description: '', image_url: '' })
const form = ref(blank())
const imageFile = ref(null)
const imagePreview = ref('')

onMounted(async () => {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) { router.replace({ name: 'admin-login' }); return }
  await loadProjects()
})

async function loadProjects() {
  loading.value = true
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  projects.value = data ?? []
  loading.value = false
}

function openNew() { form.value = blank(); imageFile.value = null; imagePreview.value = ''; showForm.value = true }
function openEdit(p) { form.value = { ...p }; imagePreview.value = p.image_url || ''; imageFile.value = null; showForm.value = true }
function closeForm() { showForm.value = false; error.value = '' }

function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

async function uploadImage() {
  const file = imageFile.value
  const ext = file.name.split('.').pop()
  const path = `projects/${Date.now()}.${ext}`
  const { error: upErr } = await supabase.storage.from('project-images').upload(path, file, { upsert: true })
  if (upErr) throw new Error(upErr.message)
  const { data } = supabase.storage.from('project-images').getPublicUrl(path)
  return data.publicUrl
}

async function save() {
  error.value = ''
  if (!form.value.title) { error.value = 'Title is required.'; return }
  saving.value = true
  try {
    let imageUrl = form.value.image_url
    if (imageFile.value) imageUrl = await uploadImage()
    const payload = { title: form.value.title, category: form.value.category, description: form.value.description, image_url: imageUrl }
    if (form.value.id) {
      await supabase.from('projects').update(payload).eq('id', form.value.id)
    } else {
      await supabase.from('projects').insert(payload)
    }
    await loadProjects()
    closeForm()
  } catch (e) {
    error.value = e.message
  }
  saving.value = false
}

async function deleteProject(id) {
  if (!confirm('Delete this project?')) return
  await supabase.from('projects').delete().eq('id', id)
  await loadProjects()
}

async function signOut() {
  await supabase.auth.signOut()
  router.replace({ name: 'admin-login' })
}
</script>

<template>
  <section class="dash">
    <div class="container">
      <!-- Header -->
      <div class="dash-head">
        <div>
          <span class="kicker">ABOV · Admin</span>
          <h1 class="dash-title">Projects</h1>
        </div>
        <div class="dash-actions">
          <button class="btn-add" @click="openNew">+ Add project</button>
          <button class="btn-sign-out" @click="signOut">Sign out</button>
        </div>
      </div>

      <!-- Project list -->
      <div v-if="loading" class="dash-empty">Loading…</div>
      <div v-else-if="projects.length === 0" class="dash-empty">No projects yet. Add your first one above.</div>
      <div v-else class="proj-list">
        <div class="proj-row" v-for="p in projects" :key="p.id">
          <figure class="proj-thumb">
            <img v-if="p.image_url" :src="p.image_url" :alt="p.title" />
            <div v-else class="thumb-placeholder"></div>
          </figure>
          <div class="proj-meta">
            <h3>{{ p.title }}</h3>
            <span v-if="p.category" class="proj-cat">{{ p.category }}</span>
            <p v-if="p.description">{{ p.description }}</p>
          </div>
          <div class="proj-btns">
            <button class="btn-edit" @click="openEdit(p)">Edit</button>
            <button class="btn-del" @click="deleteProject(p.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide-in form panel -->
    <div v-if="showForm" class="panel-overlay" @click.self="closeForm">
      <div class="panel">
        <div class="panel-head">
          <h2>{{ form.id ? 'Edit project' : 'New project' }}</h2>
          <button class="panel-close" @click="closeForm">✕</button>
        </div>

        <form class="panel-form" @submit.prevent="save">
          <label class="field">
            <span>Title *</span>
            <input v-model="form.title" type="text" placeholder="Kitchen renovation, East London" :disabled="saving" />
          </label>
          <label class="field">
            <span>Category</span>
            <input v-model="form.category" type="text" placeholder="Full renovation / Flooring / Joinery…" :disabled="saving" />
          </label>
          <label class="field">
            <span>Description</span>
            <textarea v-model="form.description" rows="4" placeholder="Brief description of the project…" :disabled="saving"></textarea>
          </label>

          <div class="field">
            <span>Project image</span>
            <label class="upload-zone">
              <img v-if="imagePreview" :src="imagePreview" class="upload-preview" alt="Preview" />
              <div v-else class="upload-placeholder">Click to choose an image</div>
              <input type="file" accept="image/*" class="upload-input" @change="onFileChange" :disabled="saving" />
            </label>
            <p class="field-hint">Or paste a URL directly:</p>
            <input v-model="form.image_url" type="url" placeholder="https://…" :disabled="saving" class="url-input" />
          </div>

          <p v-if="error" class="form-error" role="alert">{{ error }}</p>

          <div class="panel-foot">
            <button type="button" class="btn-cancel" @click="closeForm">Cancel</button>
            <button type="submit" class="btn-save" :disabled="saving">{{ saving ? 'Saving…' : 'Save project' }}</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dash { min-height: 100svh; background: var(--cream, #f5efe6); padding-block: clamp(4rem, 8vw, 6rem); }
.dash-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
.dash-title { font-family: var(--display, 'Cormorant Garamond', serif); font-size: clamp(2rem, 5vw, 3.2rem); margin: 0.2rem 0 0; color: var(--green, #014d40); }
.dash-actions { display: flex; gap: 0.75rem; align-items: center; }
.btn-add { background: var(--green, #014d40); color: #fff; border: none; border-radius: 2px; padding: 0.8rem 1.4rem; font-family: var(--ui, 'Inter', sans-serif); font-weight: 500; font-size: 0.9rem; cursor: pointer; transition: background 0.2s; }
.btn-add:hover { background: var(--green-deep, #013a30); }
.btn-sign-out { background: transparent; color: var(--muted, #5c665f); border: 1px solid var(--line, rgba(1,58,48,0.2)); border-radius: 2px; padding: 0.8rem 1.2rem; font-family: var(--ui, 'Inter', sans-serif); font-size: 0.88rem; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-sign-out:hover { color: var(--green, #014d40); border-color: var(--green, #014d40); }

.dash-empty { color: var(--muted, #5c665f); padding: 3rem 0; text-align: center; }

.proj-list { display: grid; gap: 1px; background: var(--line, rgba(1,58,48,0.14)); border: 1px solid var(--line, rgba(1,58,48,0.14)); border-radius: 5px; overflow: hidden; }
.proj-row { display: grid; grid-template-columns: 80px 1fr auto; gap: 1.4rem; align-items: center; background: #fff; padding: 1.1rem 1.4rem; }
.proj-thumb { margin: 0; width: 80px; height: 60px; border-radius: 4px; overflow: hidden; flex-shrink: 0; }
.proj-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.thumb-placeholder { width: 100%; height: 100%; background: var(--cream-2, #ede5d8); }
.proj-meta h3 { font-family: var(--display, 'Cormorant Garamond', serif); font-size: 1.25rem; margin: 0 0 0.25rem; color: var(--green, #014d40); }
.proj-cat { font-family: var(--mono, monospace); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brass, #b08d57); }
.proj-meta p { color: var(--muted, #5c665f); font-size: 0.85rem; margin: 0.3rem 0 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 44ch; }
.proj-btns { display: flex; gap: 0.5rem; }
.btn-edit, .btn-del { padding: 0.45rem 0.9rem; border-radius: 2px; font-family: var(--ui, 'Inter', sans-serif); font-size: 0.82rem; cursor: pointer; border: 1px solid; }
.btn-edit { background: transparent; color: var(--green, #014d40); border-color: rgba(1,77,64,0.3); }
.btn-edit:hover { background: rgba(1,77,64,0.06); }
.btn-del { background: transparent; color: #a23b2d; border-color: rgba(162,59,45,0.25); }
.btn-del:hover { background: rgba(162,59,45,0.06); }

/* Panel */
.panel-overlay { position: fixed; inset: 0; background: rgba(1,42,34,0.45); z-index: 100; display: flex; justify-content: flex-end; }
.panel { width: min(480px, 100vw); height: 100svh; background: #fff; overflow-y: auto; display: flex; flex-direction: column; box-shadow: -4px 0 32px rgba(0,0,0,0.12); }
.panel-head { display: flex; justify-content: space-between; align-items: center; padding: 1.6rem 2rem; border-bottom: 1px solid var(--line, rgba(1,58,48,0.14)); position: sticky; top: 0; background: #fff; z-index: 1; }
.panel-head h2 { font-family: var(--display, 'Cormorant Garamond', serif); font-size: 1.5rem; margin: 0; color: var(--green, #014d40); }
.panel-close { background: none; border: none; font-size: 1.1rem; color: var(--muted, #5c665f); cursor: pointer; padding: 0.3rem; }
.panel-form { display: grid; gap: 1.3rem; padding: 2rem; flex: 1; }
.field { display: grid; gap: 0.45rem; }
.field > span { font-family: var(--ui, 'Inter', sans-serif); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink, #16221e); }
.field input, .field textarea, .url-input { font-family: var(--ui, 'Inter', sans-serif); font-size: 0.95rem; padding: 0.75rem 0.9rem; border: 1px solid var(--line, rgba(1,58,48,0.2)); border-radius: 3px; background: var(--cream, #f5efe6); color: var(--ink, #16221e); transition: border-color 0.18s, background 0.18s; resize: vertical; }
.field input:focus, .field textarea:focus, .url-input:focus { outline: none; border-color: var(--green, #014d40); background: #fff; }
.field-hint { font-size: 0.78rem; color: var(--muted, #5c665f); margin: 0.6rem 0 0.3rem; }
.url-input { width: 100%; }
.upload-zone { position: relative; display: block; border: 2px dashed var(--line, rgba(1,58,48,0.2)); border-radius: 4px; overflow: hidden; cursor: pointer; min-height: 130px; }
.upload-zone:hover { border-color: var(--green, #014d40); }
.upload-preview { width: 100%; height: 180px; object-fit: cover; display: block; }
.upload-placeholder { display: grid; place-items: center; min-height: 130px; color: var(--muted, #5c665f); font-size: 0.88rem; }
.upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.form-error { font-size: 0.88rem; color: #a23b2d; background: rgba(162,59,45,0.07); border: 1px solid rgba(162,59,45,0.18); padding: 0.6rem 0.9rem; border-radius: 3px; margin: 0; }
.panel-foot { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.5rem 2rem; border-top: 1px solid var(--line, rgba(1,58,48,0.14)); position: sticky; bottom: 0; background: #fff; }
.btn-cancel { background: transparent; color: var(--muted, #5c665f); border: 1px solid var(--line, rgba(1,58,48,0.2)); border-radius: 2px; padding: 0.75rem 1.3rem; font-family: var(--ui, 'Inter', sans-serif); font-size: 0.9rem; cursor: pointer; }
.btn-save { background: var(--green, #014d40); color: #fff; border: none; border-radius: 2px; padding: 0.75rem 1.6rem; font-family: var(--ui, 'Inter', sans-serif); font-weight: 500; font-size: 0.9rem; cursor: pointer; transition: background 0.2s; }
.btn-save:hover { background: var(--green-deep, #013a30); }
.btn-save:disabled { opacity: 0.6; cursor: default; }

@media (max-width: 600px) {
  .proj-row { grid-template-columns: 60px 1fr; }
  .proj-btns { grid-column: 1 / -1; }
}
</style>
