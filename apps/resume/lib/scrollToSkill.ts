export function scrollToSkill(slug: string) {
  window.dispatchEvent(new CustomEvent('expand-skill', { detail: { slug } }))
  setTimeout(() => {
    const target = document.getElementById(slug)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 150)
}
