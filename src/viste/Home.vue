<script setup>
import { RouterLink } from 'vue-router'
import { ALGORITMI } from '../data/algoritmi'

const algoritmiInEvidenza = ALGORITMI.slice(0, 4)
</script>

<template>
  <div class="pagina-home">
    <section class="sezione-hero">
      <div class="badge-tag">
        <span class="dot"></span>
        Guida & Decision Engine Algoritmico
      </div>
      <h1 class="titolo-hero">
        Scegli l'algoritmo ideale per il tuo problema computazionale.
      </h1>
      <p class="sottotitolo-hero">
        Un sistema intelligente per orientarsi tra complessità asintotica, vincoli di memoria e stabilità.
        Rispondi a poche domande mirate nel <strong>Selettore Guidato</strong> oppure esplora la <strong>Raccolta Completa</strong> con visualizzatore interattivo e codice sorgente in 6 linguaggi di programmazione.
      </p>

      <div class="azioni-hero">
        <RouterLink to="/selettore" class="pulsante-hero primario">
          Avvia il Selettore Guidato
        </RouterLink>
        <RouterLink to="/algoritmi" class="pulsante-hero secondario">
          Esplora la Raccolta Completa
        </RouterLink>
      </div>
    </section>

    <!-- Pilastri della piattaforma -->
    <section class="sezione-pilastri">
      <div class="griglia-pilastri">
        <div class="scheda-pilastro">
          <h3>Questionario Guidato</h3>
          <p>Seleziona i tuoi vincoli di tempo, memoria e struttura dati per ottenere il miglior algoritmo consigliato.</p>
        </div>
        <div class="scheda-pilastro">
          <h3>Dimostrazioni Grafiche Live</h3>
          <p>Simulazioni dinamiche passo-passo con generazione casuale dei dati e controlli Play, Pausa e Step.</p>
        </div>
        <div class="scheda-pilastro">
          <h3>Codice in 6 Linguaggi</h3>
          <p>Implementazioni pronte all'uso e verificate in Python, Java, TypeScript, JavaScript, C e C#.</p>
        </div>
      </div>
    </section>

    <!-- Algoritmi principali in evidenza -->
    <section class="sezione-in-evidenza">
      <div class="sezione-testata">
        <div>
          <h2>Algoritmi in evidenza</h2>
          <span class="sottotitolo-sezione">Esplora i capisaldi dell'informatica</span>
        </div>
        <RouterLink to="/algoritmi" class="link-tutti">Vedi tutti ({{ ALGORITMI.length }}) &rarr;</RouterLink>
      </div>

      <div class="griglia-anteprime">
        <RouterLink
          v-for="algo in algoritmiInEvidenza"
          :key="algo.id"
          :to="`/algoritmo/${algo.id}`"
          class="scheda-anteprima"
        >
          <div class="anteprima-top">
            <span class="badge-cat">{{ algo.categoria }}</span>
            <span class="badge-tempo">{{ algo.complessita.tempoMedio }}</span>
          </div>
          <h3 class="anteprima-titolo">{{ algo.nome }}</h3>
          <p class="anteprima-desc">{{ algo.descrizioneBreve }}</p>
          <span class="anteprima-link">Esplora e visualizza &rarr;</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pagina-home {
  padding-bottom: 3rem;
}

.sezione-hero {
  padding: 4.5rem 0 3rem;
  max-width: 820px;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.8rem;
  background: var(--accento-sfondo);
  color: var(--accento);
  border: 1px solid var(--accento-bordo);
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 0.01em;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: var(--accento);
  border-radius: 50%;
}

.titolo-hero {
  font-size: 2.85rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
  margin-bottom: 1.25rem;
  color: var(--testo-primario);
}

.sottotitolo-hero {
  font-size: 1.12rem;
  line-height: 1.68;
  color: var(--testo-secondario);
  margin-bottom: 2.25rem;
}

.sottotitolo-hero strong {
  color: var(--testo-primario);
  font-weight: 650;
}

.azioni-hero {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.pulsante-hero {
  padding: 0.75rem 1.45rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.pulsante-hero.primario {
  background: var(--accento);
  color: var(--accento-contrasto);
  border: 1px solid transparent;
}

.pulsante-hero.primario:hover {
  background: var(--accento-hover);
}

.pulsante-hero.secondario {
  background: var(--bg-superficie);
  color: var(--testo-primario);
  border: 1px solid var(--bordo-medio);
}

.pulsante-hero.secondario:hover {
  background: var(--bg-superficie-elevata);
  border-color: var(--bordo-forte);
}

/* Pilastri */
.sezione-pilastri {
  margin-top: 3.5rem;
}

.griglia-pilastri {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.scheda-pilastro {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--ombra-scheda);
}

.icona-pilastro {
  font-size: 1.75rem;
  margin-bottom: 0.8rem;
}

.scheda-pilastro h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--testo-primario);
  margin-bottom: 0.5rem;
}

.scheda-pilastro p {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--testo-secondario);
}

/* In Evidenza */
.sezione-in-evidenza {
  margin-top: 4.5rem;
}

.sezione-testata {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.sezione-testata h2 {
  font-size: 1.6rem;
  font-weight: 750;
  color: var(--testo-primario);
  letter-spacing: -0.015em;
}

.sottotitolo-sezione {
  font-size: 0.88rem;
  color: var(--testo-terziario);
  display: block;
  margin-top: 0.2rem;
}

.link-tutti {
  color: var(--accento);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.link-tutti:hover {
  text-decoration: underline;
}

.griglia-anteprime {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.scheda-anteprima {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  padding: 1.4rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--ombra-scheda);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.scheda-anteprima:hover {
  transform: translateY(-2px);
  border-color: var(--accento-bordo);
  box-shadow: var(--ombra-scheda-hover);
}

.anteprima-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.badge-cat {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  background: var(--bg-superficie-elevata);
  color: var(--testo-secondario);
  border-radius: 6px;
  border: 1px solid var(--bordo-sottile);
}

.badge-tempo {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accento);
  font-family: ui-monospace, monospace;
}

.anteprima-titolo {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--testo-primario);
  margin-bottom: 0.45rem;
}

.anteprima-desc {
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--testo-secondario);
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.anteprima-link {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--accento);
}

@media (max-width: 640px) {
  .titolo-hero {
    font-size: 2.1rem;
  }
  .azioni-hero {
    flex-direction: column;
  }
}
</style>
