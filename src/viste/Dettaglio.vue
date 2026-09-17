<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { ALGORITMI } from '../data/algoritmi'
import VisualizzatoreAlgoritmo from '../components/VisualizzatoreAlgoritmo.vue'
import BloccoCodice from '../components/BloccoCodice.vue'
import { useLingua } from '../composables/useLingua'

const { t, traduciCategoria } = useLingua()
const route = useRoute()

const algoritmo = computed(() => {
  return ALGORITMI.find(a => a.id === route.params.id) || ALGORITMI[0]
})
</script>

<template>
  <div v-if="algoritmo" class="pagina-dettaglio">
    <!-- Link Indietro & Categoria -->
    <div class="nav-superiore">
      <RouterLink to="/algoritmi" class="link-ritorno">
        &larr; {{ t('dettaglio.torna') }}
      </RouterLink>
      <span class="badge-cat">{{ traduciCategoria(algoritmo.categoria) }}</span>
    </div>

    <!-- Testata Algoritmo -->
    <header class="testata-dettaglio">
      <h1 class="titolo-dettaglio">{{ algoritmo.nome }}</h1>
      <p class="descrizione-principale">{{ algoritmo.descrizioneDettagliata }}</p>
    </header>

    <!-- Tabella Complessità & Caratteristiche -->
    <section class="scheda-proprieta">
      <div class="proprieta-item">
        <span class="prop-label">{{ t('dettaglio.tempoMigliore') }}</span>
        <span class="prop-valore">{{ algoritmo.complessita.tempoMigliore }}</span>
      </div>
      <div class="proprieta-item">
        <span class="prop-label">{{ t('dettaglio.tempoMedio') }}</span>
        <span class="prop-valore valore-accento">{{ algoritmo.complessita.tempoMedio }}</span>
      </div>
      <div class="proprieta-item">
        <span class="prop-label">{{ t('dettaglio.tempoPeggiore') }}</span>
        <span class="prop-valore">{{ algoritmo.complessita.tempoPeggiore }}</span>
      </div>
      <div class="proprieta-item">
        <span class="prop-label">{{ t('dettaglio.spazioAusiliario') }}</span>
        <span class="prop-valore">{{ algoritmo.complessita.spazio }}</span>
      </div>
      <div class="proprieta-item">
        <span class="prop-label">{{ t('dettaglio.stabilita') }}</span>
        <span class="prop-valore">{{ algoritmo.caratteristiche.stabile ? t('dettaglio.stabile') : t('dettaglio.nonStabile') }}</span>
      </div>
      <div class="proprieta-item">
        <span class="prop-label">{{ t('dettaglio.memoriaInPlace') }}</span>
        <span class="prop-valore">{{ algoritmo.caratteristiche.inPlace ? t('selettore.si') : t('selettore.no') }}</span>
      </div>
    </section>

    <!-- Sezione 1: Dimostrazione Grafica Live -->
    <section class="sezione-blocco">
      <div class="blocco-header">
        <h2>{{ t('dettaglio.demoTitolo') }}</h2>
        <p>{{ t('dettaglio.demoSottotitolo') }}</p>
      </div>

      <VisualizzatoreAlgoritmo :algoritmo-id="algoritmo.id" />
    </section>

    <!-- Sezione 2: Quando usarlo e Quando evitarlo -->
    <section class="sezione-blocco">
      <div class="griglia-casi-uso">
        <div class="riquadro-uso uso-consigliato">
          <div class="titolo-uso">
            <span class="icona-segno">✓</span>
            <h3>{{ t('dettaglio.quandoUsarlo') }}</h3>
          </div>
          <ul>
            <li v-for="(punto, idx) in algoritmo.quandoUsarlo" :key="idx">{{ punto }}</li>
          </ul>
        </div>

        <div class="riquadro-uso uso-sconsigliato">
          <div class="titolo-uso">
            <span class="icona-segno">✕</span>
            <h3>{{ t('dettaglio.quandoEvitarlo') }}</h3>
          </div>
          <ul>
            <li v-for="(punto, idx) in algoritmo.quandoEvitarlo" :key="idx">{{ punto }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Sezione 3: Implementazione in 6 Linguaggi -->
    <section class="sezione-blocco">
      <div class="blocco-header">
        <h2>{{ t('dettaglio.codiceTitolo') }}</h2>
        <p>{{ t('dettaglio.codiceSottotitolo') }}</p>
      </div>

      <BloccoCodice :codice="algoritmo.codice" />
    </section>
  </div>
</template>

<style scoped>
.pagina-dettaglio {
  padding: 2.5rem 0 5rem;
  max-width: 920px;
  margin: 0 auto;
}

.nav-superiore {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.link-ritorno {
  color: var(--accento);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.15s ease;
}

.link-ritorno:hover {
  text-decoration: underline;
}

.badge-cat {
  font-size: 0.78rem;
  font-weight: 650;
  color: var(--accento);
  background: var(--accento-sfondo);
  border: 1px solid var(--accento-bordo);
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.testata-dettaglio {
  margin-bottom: 2rem;
}

.titolo-dettaglio {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--testo-primario);
  letter-spacing: -0.02em;
  margin-bottom: 0.85rem;
}

.descrizione-principale {
  font-size: 1.1rem;
  line-height: 1.68;
  color: var(--testo-secondario);
}

/* Proprietà asintotiche */
.scheda-proprieta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  gap: 0.85rem;
  margin-bottom: 3.5rem;
}

.proprieta-item {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 9px;
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: var(--ombra-scheda);
}

.prop-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--testo-terziario);
}

.prop-valore {
  font-size: 1rem;
  font-weight: 750;
  color: var(--testo-primario);
  font-family: ui-monospace, monospace;
}

.valore-accento {
  color: var(--accento);
}

/* Blocchi */
.sezione-blocco {
  margin-top: 3.5rem;
}

.blocco-header {
  margin-bottom: 1.25rem;
}

.blocco-header h2 {
  font-size: 1.5rem;
  font-weight: 750;
  color: var(--testo-primario);
  letter-spacing: -0.015em;
  margin-bottom: 0.35rem;
}

.blocco-header p {
  font-size: 0.95rem;
  color: var(--testo-secondario);
}

/* Casi d'uso */
.griglia-casi-uso {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.riquadro-uso {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--ombra-scheda);
}

.titolo-uso {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.titolo-uso h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--testo-primario);
}

.icona-segno {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 800;
}

.uso-consigliato {
  border-left: 4px solid #10b981;
}

.uso-consigliato .icona-segno {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.uso-sconsigliato {
  border-left: 4px solid #ef4444;
}

.uso-sconsigliato .icona-segno {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.riquadro-uso ul {
  padding-left: 1.25rem;
  color: var(--testo-secondario);
  font-size: 0.92rem;
  line-height: 1.6;
}

.riquadro-uso li {
  margin-bottom: 0.5rem;
}

@media (max-width: 640px) {
  .titolo-dettaglio {
    font-size: 2rem;
  }
}
</style>
