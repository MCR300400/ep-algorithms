<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { DOMANDE, calcolaRaccomandazioni } from '../data/questionario'
import { ALGORITMI } from '../data/algoritmi'
import { useLingua } from '../composables/useLingua'

const { t, traduciCategoria } = useLingua()

const indiceDomanda = ref(0)
const risposte = ref({})
const questionarioCompletato = ref(false)

const domandaCorrente = computed(() => DOMANDE[indiceDomanda.value])
const progressoPercentuale = computed(() => {
  return Math.round(((indiceDomanda.value + (questionarioCompletato.value ? 1 : 0)) / DOMANDE.length) * 100)
})

function selezionaOpzione(opzioneId) {
  risposte.value[domandaCorrente.value.id] = opzioneId

  if (indiceDomanda.value < DOMANDE.length - 1) {
    indiceDomanda.value++
  } else {
    questionarioCompletato.value = true
  }
}

function precedente() {
  if (indiceDomanda.value > 0) {
    indiceDomanda.value--
  }
}

function riavvia() {
  indiceDomanda.value = 0
  risposte.value = {}
  questionarioCompletato.value = false
}

const risultati = computed(() => {
  if (!questionarioCompletato.value) return []
  return calcolaRaccomandazioni(risposte.value, ALGORITMI)
})

const migliorAlgoritmo = computed(() => risultati.value[0]?.algoritmo)
const migliorPercentuale = computed(() => risultati.value[0]?.percentuale)
const altriConsigliati = computed(() => risultati.value.slice(1, 4))
</script>

<template>
  <div class="pagina-selettore">
    <div class="testata-selettore">
      <h1>{{ t('selettore.titolo') }}</h1>
      <p>{{ t('selettore.descrizione') }}</p>
    </div>

    <!-- Barra di avanzamento -->
    <div class="barra-progresso-contenitore">
      <div class="barra-info">
        <span class="step-testo">
          {{ questionarioCompletato ? t('selettore.completato') : `${t('selettore.domandaDi')} ${indiceDomanda + 1} ${t('selettore.di')} ${DOMANDE.length}` }}
        </span>
        <span class="progresso-num">{{ progressoPercentuale }}%</span>
      </div>
      <div class="traccia-progresso">
        <div class="avanzamento" :style="{ width: `${progressoPercentuale}%` }"></div>
      </div>
    </div>

    <!-- Fase 1: Domande a Risposta Multipla -->
    <div v-if="!questionarioCompletato" class="riquadro-domanda">
      <div class="domanda-header">
        <h2 class="testo-domanda">{{ domandaCorrente.testo }}</h2>
        <p v-if="domandaCorrente.sottotitolo" class="sub-domanda">{{ domandaCorrente.sottotitolo }}</p>
      </div>

      <div class="opzioni-lista">
        <button
          v-for="opz in domandaCorrente.opzioni"
          :key="opz.id"
          type="button"
          class="scheda-opzione"
          :class="{ selezionata: risposte[domandaCorrente.id] === opz.id }"
          @click="selezionaOpzione(opz.id)"
        >
          <div class="opzione-radio">
            <span class="cerchio-radio"></span>
          </div>
          <div class="opzione-corpo">
            <h3 class="opzione-titolo">{{ opz.titolo }}</h3>
            <p class="opzione-descrizione">{{ opz.descrizione }}</p>
          </div>
        </button>
      </div>

      <div class="azioni-navigazione">
        <button
          v-if="indiceDomanda > 0"
          type="button"
          class="btn-nav"
          @click="precedente"
        >
          &larr; {{ t('selettore.precedente') }}
        </button>
      </div>
    </div>

    <!-- Fase 2: Risultato e Algoritmo Consigliato -->
    <div v-else class="riquadro-risultati">
      <div class="vincitore-badge">
        <span>{{ t('selettore.raccomandato') }}</span>
      </div>

      <div v-if="migliorAlgoritmo" class="scheda-raccomandata">
        <div class="raccomandata-top">
          <div>
            <span class="badge-cat">{{ traduciCategoria(migliorAlgoritmo.categoria) }}</span>
            <h2 class="titolo-migliore">{{ migliorAlgoritmo.nome }}</h2>
          </div>
          <div class="percentuale-match" title="Match">
            {{ migliorPercentuale }}% Match
          </div>
        </div>

        <p class="descrizione-migliore">{{ migliorAlgoritmo.descrizioneDettagliata }}</p>

        <div class="griglia-metriche">
          <div class="metrica-item">
            <span class="metrica-label">{{ t('selettore.tempoMedio') }}</span>
            <span class="metrica-valore">{{ migliorAlgoritmo.complessita.tempoMedio }}</span>
          </div>
          <div class="metrica-item">
            <span class="metrica-label">{{ t('selettore.tempoPeggiore') }}</span>
            <span class="metrica-valore">{{ migliorAlgoritmo.complessita.tempoPeggiore }}</span>
          </div>
          <div class="metrica-item">
            <span class="metrica-label">{{ t('selettore.spazio') }}</span>
            <span class="metrica-valore">{{ migliorAlgoritmo.complessita.spazio }}</span>
          </div>
          <div class="metrica-item">
            <span class="metrica-label">{{ t('selettore.inPlace') }}</span>
            <span class="metrica-valore">{{ migliorAlgoritmo.caratteristiche.inPlace ? t('selettore.si') : t('selettore.no') }}</span>
          </div>
        </div>

        <div class="sezione-perche">
          <h4>{{ t('selettore.percheScelta') }}</h4>
          <ul>
            <li v-for="punto in migliorAlgoritmo.quandoUsarlo" :key="punto">{{ punto }}</li>
          </ul>
        </div>

        <div class="azioni-raccomandata">
          <RouterLink :to="`/algoritmo/${migliorAlgoritmo.id}`" class="btn-dettaglio">
            {{ t('selettore.guardaDemo') }} &rarr;
          </RouterLink>
          <button type="button" class="btn-riavvia" @click="riavvia">
            {{ t('selettore.ripeti') }}
          </button>
        </div>
      </div>

      <!-- Alternative consigliate -->
      <div v-if="altriConsigliati.length > 0" class="sezione-alternative">
        <h3>{{ t('selettore.alternative') }}</h3>
        <div class="griglia-alternative">
          <div
            v-for="alt in altriConsigliati"
            :key="alt.algoritmo.id"
            class="scheda-alternativa"
          >
            <div class="alt-top">
              <span class="alt-nome">{{ alt.algoritmo.nome }}</span>
              <span class="alt-match">{{ alt.percentuale }}% match</span>
            </div>
            <p class="alt-desc">{{ alt.algoritmo.descrizioneBreve }}</p>
            <RouterLink :to="`/algoritmo/${alt.algoritmo.id}`" class="alt-link">
              {{ t('selettore.dettagli') }} &rarr;
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagina-selettore {
  padding: 2.5rem 0 4rem;
  max-width: 760px;
  margin: 0 auto;
}

.testata-selettore {
  margin-bottom: 2rem;
}

.testata-selettore h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--testo-primario);
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;
}

.testata-selettore p {
  color: var(--testo-secondario);
  font-size: 1.05rem;
  line-height: 1.6;
}

/* Barra progresso */
.barra-progresso-contenitore {
  margin-bottom: 2rem;
}

.barra-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--testo-terziario);
  margin-bottom: 0.5rem;
}

.progresso-num {
  color: var(--accento);
}

.traccia-progresso {
  height: 6px;
  background: var(--bg-superficie-elevata);
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid var(--bordo-sottile);
}

.avanzamento {
  height: 100%;
  background: var(--accento);
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* Riquadro domanda */
.riquadro-domanda {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--ombra-scheda);
}

.domanda-header {
  margin-bottom: 1.75rem;
}

.testo-domanda {
  font-size: 1.4rem;
  font-weight: 750;
  color: var(--testo-primario);
  letter-spacing: -0.015em;
  margin-bottom: 0.4rem;
}

.sub-domanda {
  font-size: 0.92rem;
  color: var(--testo-terziario);
}

.opzioni-lista {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.scheda-opzione {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.15rem;
  background: var(--bg-primario);
  border: 1px solid var(--bordo-medio);
  border-radius: 9px;
  cursor: pointer;
  text-align: left;
  transition: all 0.18s ease;
  font-family: inherit;
}

.scheda-opzione:hover {
  border-color: var(--accento-bordo);
  background: var(--bg-superficie-elevata);
}

.scheda-opzione.selezionata {
  border-color: var(--accento);
  background: var(--accento-sfondo);
  box-shadow: 0 0 0 1px var(--accento);
}

.opzione-radio {
  margin-top: 0.15rem;
}

.cerchio-radio {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--bordo-forte);
  transition: all 0.15s ease;
}

.scheda-opzione.selezionata .cerchio-radio {
  border-color: var(--accento);
  background: var(--accento);
  box-shadow: inset 0 0 0 3px var(--bg-superficie);
}

.opzione-titolo {
  font-size: 1rem;
  font-weight: 700;
  color: var(--testo-primario);
  margin-bottom: 0.25rem;
}

.opzione-descrizione {
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--testo-secondario);
}

.azioni-navigazione {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-start;
}

.btn-nav {
  background: transparent;
  border: none;
  color: var(--testo-secondario);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: color 0.15s ease;
}

.btn-nav:hover {
  color: var(--accento);
}

/* Risultati */
.riquadro-risultati {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.vincitore-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  padding: 0.4rem 0.85rem;
  background: var(--accento-sfondo);
  color: var(--accento);
  border: 1px solid var(--accento-bordo);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 650;
}

.scheda-raccomandata {
  background: var(--bg-superficie);
  border: 1px solid var(--accento-bordo);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--ombra-scheda-hover);
}

.raccomandata-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.badge-cat {
  font-size: 0.78rem;
  font-weight: 650;
  color: var(--accento);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.35rem;
}

.titolo-migliore {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--testo-primario);
  letter-spacing: -0.015em;
}

.percentuale-match {
  padding: 0.35rem 0.75rem;
  background: #10b981;
  color: #ffffff;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 750;
}

.descrizione-migliore {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--testo-secondario);
  margin-bottom: 1.5rem;
}

.griglia-metriche {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.85rem;
  margin-bottom: 1.75rem;
}

.metrica-item {
  background: var(--bg-primario);
  border: 1px solid var(--bordo-sottile);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metrica-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--testo-terziario);
}

.metrica-valore {
  font-size: 0.92rem;
  font-weight: 750;
  color: var(--testo-primario);
  font-family: ui-monospace, monospace;
}

.sezione-perche {
  margin-bottom: 2rem;
}

.sezione-perche h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--testo-primario);
  margin-bottom: 0.6rem;
}

.sezione-perche ul {
  padding-left: 1.25rem;
  color: var(--testo-secondario);
  font-size: 0.94rem;
  line-height: 1.6;
}

.azioni-raccomandata {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-dettaglio {
  background: var(--accento);
  color: var(--accento-contrasto);
  padding: 0.75rem 1.4rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 650;
  font-size: 0.95rem;
  transition: all 0.18s ease;
}

.btn-dettaglio:hover {
  background: var(--accento-hover);
}

.btn-riavvia {
  background: var(--bg-superficie-elevata);
  border: 1px solid var(--bordo-medio);
  color: var(--testo-primario);
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.18s ease;
}

.btn-riavvia:hover {
  border-color: var(--bordo-forte);
}

/* Alternative */
.sezione-alternative {
  margin-top: 1rem;
}

.sezione-alternative h3 {
  font-size: 1.2rem;
  font-weight: 750;
  color: var(--testo-primario);
  margin-bottom: 1rem;
}

.griglia-alternative {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.scheda-alternativa {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 10px;
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.alt-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.4rem;
}

.alt-nome {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--testo-primario);
}

.alt-match {
  font-size: 0.78rem;
  font-weight: 650;
  color: var(--accento);
}

.alt-desc {
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--testo-secondario);
  margin-bottom: 1rem;
  flex-grow: 1;
}

.alt-link {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accento);
  text-decoration: none;
}

.alt-link:hover {
  text-decoration: underline;
}
</style>
