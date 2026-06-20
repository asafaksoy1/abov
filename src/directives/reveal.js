// v-reveal: adds .reveal then .is-visible when the element scrolls into view.
// Honours prefers-reduced-motion by revealing immediately.
const reduce =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default {
  mounted(el, binding) {
    el.classList.add('reveal')
    // optional stagger: v-reveal="2" -> 2 * 90ms delay
    const step = Number(binding.value) || 0
    if (step) el.style.transitionDelay = `${step * 90}ms`

    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    el._revealObs = io
  },
  unmounted(el) {
    if (el._revealObs) el._revealObs.disconnect()
  },
}
