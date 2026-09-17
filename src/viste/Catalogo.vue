<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ALGORITMI, CATEGORIE } from '../data/algoritmi'
import { useLingua } from '../composables/useLingua'

const { t, traduciCategoria } = useLingua()

const ricerca = ref('')
const categoriaSelezionata = ref('Tutti')

const categorie = CATEGORIE

const algoritmiFiltrati = computed(() => {
  return ALGORITMI.filter(a => {
    const corrispondeCategoria = categoriaSelezionata.value === 'Tutti' || a.categoria === categoriaSelezionata.value
    const testoRicerca = ricerca.value.trim().toLowerCase()
    const corrispondeRicerca = !testoRicerca ||
      a.nome.toLowerCase().includes(testoRicerca) ||
      a.descrizioneBreve.toLowerCase().includes(testoRicerca) ||
      a.categoria.toLowerCase().includes(testoRicerca)

    return corrispondeCategoria && corrispondeRicerca
  })
})
</script>

<template>
  <div class="pagina-catalogo">
    <div class="testata-catalogo">
      <h1>{{ t('catalogo.titolo') }}</h1>
      <p>{{ t('catalogo.descrizione') }}</p>
    </div>

    <!-- Barra di ricerca e filtri per categoria -->
    <div class="barra-filtri">
      <div class="campo-ricerca">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icona-cerca">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="ricerca"
          type="text"
          :placeholder="t('catalogo.placeholderCerca')"
          class="input-ricerca"
        />
      </div>

      <div class="pills-categorie">
        <button
          v-for="cat in categorie"
          :key="cat"
          type="button"
          class="pill-btn"
          :class="{ attivo: categoriaSelezionata === cat }"
          @click="categoriaSelezionata = cat"
        >
          {{ traduciCategoria(cat) }}
        </button>
      </div>
    </div>

    <!-- Contatore risultati -->
    <div class="info-risultati">
      {{ t('catalogo.trovati') }} <strong>{{ algoritmiFiltrati.length }}</strong> {{ t('catalogo.algoritmi') }}
    </div>

    <!-- Griglia Schede Algoritmi -->
    <div v-if="algoritmiFiltrati.length > 0" class="griglia-algoritmi">
      <RouterLink
        v-for="algo in algoritmiFiltrati"
        :key="algo.id"
        :to="`/algoritmo/${algo.id}`"
        class="scheda-algo"
      >
        <div class="scheda-corpo">
          <div class="scheda-top">
            <span class="badge-cat">{{ traduciCategoria(algo.categoria) }}</span>
            <span class="badge-paradigma">{{ algo.caratteristiche.paradigma }}</span>
          </div>

          <h2 class="scheda-titolo">{{ algo.nome }}</h2>
          <p class="scheda-desc">{{ algo.descrizioneBreve }}</p>

          <div class="scheda-complessita">
            <div class="chip-complessita">
              <span class="label-chip">{{ t('catalogo.medio') }}:</span>
              <span class="valore-chip">{{ algo.complessita.tempoMedio }}</span>
            </div>
            <div class="chip-complessita">
              <span class="label-chip">{{ t('catalogo.spazio') }}:</span>
              <span class="valore-chip">{{ algo.complessita.spazio }}</span>
            </div>
          </div>
        </div>

        <div class="scheda-footer">
          <span class="link-dettagli">{{ t('catalogo.demoCodice') }} &rarr;</span>
          <span class="badge-inplace">{{ algo.caratteristiche.inPlace ? t('catalogo.inplaceBadge') : t('catalogo.ausiliarioBadge') }}</span>
        </div>
      </RouterLink>
    </div>

    <!-- Nessun risultato -->
    <div v-else class="nessun-risultato">
      <p>{{ t('catalogo.nessunRisultato') }}</p>
      <button type="button" class="btn-reset" @click="ricerca = ''; categoriaSelezionata = 'Tutti'">
        {{ t('catalogo.reimposta') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagina-catalogo {
  padding: 2.5rem 0 4rem;
}

.testata-catalogo {
  max-width: 720px;
  margin-bottom: 2.25rem;
}

.testata-catalogo h1 {
  font-size: 2.3rem;
  font-weight: 800;
  color: var(--testo-primario);
  letter-spacing: -0.02em;
  margin-bottom: 0.65rem;
}

.testata-catalogo p {
  color: var(--testo-secondario);
  font-size: 1.05rem;
  line-height: 1.6;
}

/* Filtri & Ricerca */
.barra-filtri {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  margin-bottom: 1.5rem;
}

.campo-ricerca {
  position: relative;
  max-width: 540px;
}

.icona-cerca {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--testo-terziario);
  pointer-events: none;
}

.input-ricerca {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-medio);
  border-radius: 8px;
  color: var(--testo-primario);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.18s ease;
}

.input-ricerca:focus {
  outline: none;
  border-color: var(--accento);
  box-shadow: 0 0 0 2px var(--accento-sfondo);
}

.pills-categorie {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.pill-btn {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-medio);
  color: var(--testo-secondario);
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 550;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pill-btn:hover {
  border-color: var(--accento-bordo);
  color: var(--testo-primario);
}

.pill-btn.attivo {
  background: var(--accento);
  border-color: var(--accento);
  color: var(--accento-contrasto);
}

.info-risultati {
  font-size: 0.88rem;
  color: var(--testo-terziario);
  margin-bottom: 1.5rem;
}

.info-risultati strong {
  color: var(--testo-primario);
}

/* Griglia */
.griglia-algoritmi {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.scheda-algo {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--ombra-scheda);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.scheda-algo:hover {
  transform: translateY(-2px);
  border-color: var(--accento-bordo);
  box-shadow: var(--ombra-scheda-hover);
}

.scheda-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.badge-cat {
  font-size: 0.75rem;
  font-weight: 650;
  color: var(--accento);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge-paradigma {
  font-size: 0.72rem;
  color: var(--testo-terziario);
  background: var(--bg-superficie-elevata);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  white-space: nowrap;
}

.scheda-titolo {
  font-size: 1.25rem;
  font-weight: 750;
  color: var(--testo-primario);
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.scheda-desc {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--testo-secondario);
  margin-bottom: 1.25rem;
}

.scheda-complessita {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.chip-complessita {
  background: var(--bg-superficie-elevata);
  border: 1px solid var(--bordo-sottile);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  display: flex;
  gap: 0.35rem;
  font-size: 0.78rem;
}

.label-chip {
  color: var(--testo-terziario);
}

.valore-chip {
  color: var(--testo-primario);
  font-weight: 700;
  font-family: ui-monospace, monospace;
}

.scheda-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--bordo-sottile);
  padding-top: 1rem;
}

.link-dettagli {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accento);
}

.badge-inplace {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--testo-terziario);
}

.nessun-risultato {
  text-align: center;
  padding: 4rem 1rem;
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  color: var(--testo-secondario);
}

.btn-reset {
  margin-top: 1rem;
  background: var(--accento);
  color: var(--accento-contrasto);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
</style>
