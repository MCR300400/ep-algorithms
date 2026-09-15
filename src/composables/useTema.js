import { ref } from 'vue'

const TEMA_KEY = 'ep_tema'

function ottieniTemaIniziale() {
  if (typeof window === 'undefined') return 'dark'
  try {
    const salvato = localStorage.getItem(TEMA_KEY)
    if (salvato === 'light' || salvato === 'dark') {
      return salvato
    }
  } catch (e) {
    console.debug('Impossibile accedere a localStorage:', e)
  }
  return 'dark'
}

const tema = ref(ottieniTemaIniziale())

export function useTema() {
  function applicaTema(nuovoTema) {
    tema.value = nuovoTema
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nuovoTema)
      try {
        localStorage.setItem(TEMA_KEY, nuovoTema)
      } catch (e) {
        console.warn('Impossibile salvare il tema in localStorage:', e)
      }
    }
  }

  function toggleTema() {
    applicaTema(tema.value === 'dark' ? 'light' : 'dark')
  }

  return {
    tema,
    toggleTema,
    applicaTema
  }
}
