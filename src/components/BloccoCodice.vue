<script setup>
import { ref } from 'vue'

const props = defineProps({
  codice: {
    type: Object,
    required: true
  }
})

const linguaggi = [
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'c', label: 'C' },
  { id: 'csharp', label: 'C#' }
]

const linguaggioAttivo = ref('python')
const copiato = ref(false)

async function copiaCodice() {
  const testo = props.codice[linguaggioAttivo.value] || ''
  try {
    await navigator.clipboard.writeText(testo)
    copiato.value = true
    setTimeout(() => {
      copiato.value = false
    }, 2000)
  } catch (err) {
    console.error('Errore durante la copia:', err)
  }
}
</script>

<template>
  <div class="blocco-codice">
    <div class="testata-codice">
      <div class="linguaggi-tabs">
        <button
          v-for="l in linguaggi"
          :key="l.id"
          type="button"
          class="tab-btn"
          :class="{ attivo: linguaggioAttivo === l.id }"
          @click="linguaggioAttivo = l.id"
        >
          {{ l.label }}
        </button>
      </div>

      <button type="button" class="copia-btn" @click="copiaCodice">
        <span v-if="copiato" class="testo-copiato">Copiato! ✓</span>
        <span v-else class="testo-copia">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copia
        </span>
      </button>
    </div>

    <div class="contenitore-codice">
      <pre><code>{{ codice[linguaggioAttivo] }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.blocco-codice {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--ombra-scheda);
}

.testata-codice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--bg-superficie-elevata);
  border-bottom: 1px solid var(--bordo-sottile);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.linguaggi-tabs {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  padding-bottom: 0.1rem;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--testo-secondario);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--testo-primario);
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.attivo {
  color: var(--accento);
  background: var(--accento-sfondo);
  border: 1px solid var(--accento-bordo);
}

.copia-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-medio);
  color: var(--testo-secondario);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.copia-btn:hover {
  color: var(--accento);
  border-color: var(--accento-bordo);
}

.testo-copiato {
  color: #10b981;
}

.testo-copia {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.contenitore-codice {
  padding: 1.25rem;
  overflow-x: auto;
  max-height: 480px;
}

pre {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--testo-primario);
}
</style>
