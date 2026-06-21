<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// If already signed in, skip straight to the dashboard.
onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) router.replace({ name: 'admin-dashboard' })
})

async function signIn() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Enter your email and password.'
    return
  }
  loading.value = true
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email.value.trim(),
    password: password.value,
  })
  loading.value = false

  if (signInError) {
    error.value = signInError.message === 'Invalid login credentials'
      ? 'Email or password is incorrect.'
      : signInError.message
    return
  }
  router.replace({ name: 'admin-dashboard' })
}
</script>

<template>
  <section class="login-wrap">
    <div class="login-card">
      <span class="eyebrow">ABOV · Admin</span>
      <h1 class="login-title">Sign in</h1>
      <p class="login-sub">Manage projects and site content.</p>

      <form class="login-form" @submit.prevent="signIn">
        <label class="field">
          <span>Email</span>
          <input
            v-model="email"
            type="email"
            autocomplete="username"
            placeholder="you@abov.co.uk"
            :disabled="loading"
          />
        </label>

        <label class="field">
          <span>Password</span>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
            :disabled="loading"
          />
        </label>

        <p v-if="error" class="login-error" role="alert">{{ error }}</p>

        <button class="btn btn-fill login-btn" type="submit" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login-wrap {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 2rem 1.25rem;
  background: var(--bone, #f3ece1);
}
.login-card {
  width: 100%;
  max-width: 26rem;
  background: var(--white, #fff);
  border: 1px solid var(--line, rgba(42, 32, 24, 0.14));
  border-radius: 6px;
  padding: clamp(1.8rem, 5vw, 2.8rem);
}
.login-title {
  font-family: var(--display, 'Fraunces', Georgia, serif);
  font-weight: 500;
  font-size: clamp(1.9rem, 6vw, 2.4rem);
  margin: 0.4rem 0 0.3rem;
  color: var(--ink, #2e2823);
}
.login-sub {
  color: var(--muted, #6e6358);
  margin: 0 0 1.8rem;
  font-size: 0.95rem;
}
.login-form { display: grid; gap: 1.1rem; }
.field { display: grid; gap: 0.4rem; }
.field span {
  font-family: var(--ui, 'Inter', sans-serif);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ink, #2e2823);
}
.field input {
  font-family: var(--ui, 'Inter', sans-serif);
  font-size: 1rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--line, rgba(42, 32, 24, 0.2));
  border-radius: 3px;
  background: var(--bone, #f3ece1);
  color: var(--ink, #2e2823);
  transition: border-color 0.18s ease, background 0.18s ease;
}
.field input:focus {
  outline: none;
  border-color: var(--clay, #b07a4f);
  background: #fff;
}
.field input:disabled { opacity: 0.6; }
.login-btn { width: 100%; margin-top: 0.4rem; padding-block: 0.95rem; }
.login-btn:disabled { opacity: 0.6; cursor: default; }
.login-error {
  margin: 0;
  font-size: 0.88rem;
  color: #a23b2d;
  background: rgba(162, 59, 45, 0.08);
  border: 1px solid rgba(162, 59, 45, 0.2);
  padding: 0.6rem 0.8rem;
  border-radius: 3px;
}
</style>
