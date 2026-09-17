import { ref, computed } from 'vue'

const LINGUA_KEY = 'ep_lingua'

function ottieniLinguaIniziale() {
  if (typeof window === 'undefined') return 'it'
  try {
    const salvata = localStorage.getItem(LINGUA_KEY)
    if (salvata === 'it' || salvata === 'en') return salvata
    const browserLang = navigator.language || navigator.userLanguage || ''
    if (browserLang.startsWith('it')) return 'it'
    return 'it'
  } catch (e) {
    console.debug('Impossibile accedere a localStorage per la lingua:', e)
    return 'it'
  }
}

const lingua = ref(ottieniLinguaIniziale())

export function useLingua() {
  const isItalian = computed(() => lingua.value === 'it')
  const isEnglish = computed(() => lingua.value === 'en')

  function applicaLingua(nuovaLingua) {
    lingua.value = nuovaLingua
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', nuovaLingua)
      try {
        localStorage.setItem(LINGUA_KEY, nuovaLingua)
      } catch (e) {
        console.warn('Impossibile salvare la lingua in localStorage:', e)
      }
    }
  }

  function toggleLingua() {
    applicaLingua(lingua.value === 'it' ? 'en' : 'it')
  }

  function t(valore) {
    if (!valore) return ''
    if (typeof valore === 'object') {
      return valore[lingua.value] || valore.it || ''
    }
    return dizionario[valore]?.[lingua.value] || valore
  }

  function traduciCategoria(cat) {
    const mappa = {
      'Tutti': { it: 'Tutti', en: 'All' },
      'Ordinamento': { it: 'Ordinamento', en: 'Sorting' },
      'Ricerca': { it: 'Ricerca', en: 'Searching' },
      'Grafi & Alberi': { it: 'Grafi & Alberi', en: 'Graphs & Trees' },
      'Crittografia & Hashing': { it: 'Crittografia & Hashing', en: 'Cryptography & Hashing' },
      'Compressione Dati': { it: 'Compressione Dati', en: 'Data Compression' },
      'Machine Learning & Ottimizzazione': { it: 'Machine Learning & Ottimizzazione', en: 'Machine Learning & Optimization' }
    }
    return mappa[cat]?.[lingua.value] || cat
  }

  return {
    lingua,
    isItalian,
    isEnglish,
    setLingua: applicaLingua,
    toggleLingua,
    t,
    traduciCategoria
  }
}

export const dizionario = {
  // Navigazione
  'nav.home': { it: 'Home', en: 'Home' },
  'nav.selettore': { it: 'Selettore Guidato', en: 'Guided Selector' },
  'nav.algoritmi': { it: 'Raccolta Algoritmi', en: 'Algorithm Catalog' },
  'nav.esplora': { it: 'Esplora Algoritmi', en: 'Explore Algorithms' },
  'nav.temaChiaro': { it: 'Chiaro', en: 'Light' },
  'nav.temaScuro': { it: 'Scuro', en: 'Dark' },
  'nav.menu': { it: 'Menu', en: 'Menu' },
  'nav.chiudi': { it: 'Chiudi', en: 'Close' },

  // Contatore
  'contatore.tooltip': {
    it: 'Visitatori unici totali tracciati nel rispetto della privacy',
    en: 'Total unique visitors tracked with privacy-first analytics'
  },
  'contatore.singolare': { it: 'visitatore unico', en: 'unique visitor' },
  'contatore.plurale': { it: 'visitatori unici', en: 'unique visitors' },

  // Footer
  'footer.crediti': {
    it: 'Progettato & sviluppato da Edoardo Pippi.',
    en: 'Designed & built by Edoardo Pippi.'
  },

  // Home
  'home.badge': {
    it: 'Algoritmi & Complessità Computazionale',
    en: 'Algorithms & Computational Complexity'
  },
  'home.titolo': {
    it: 'Scegli l\'algoritmo ideale per il tuo problema computazionale.',
    en: 'Select the optimal algorithm for your computational problem.'
  },
  'home.sottotitolo': {
    it: 'Guida pratica per orientarsi tra complessità asintotica, vincoli di memoria e stabilità. Rispondi alle domande nel Selettore Guidato oppure consulta la Raccolta Completa con simulatore passo-passo e codice sorgente in 6 linguaggi di programmazione.',
    en: 'A practical reference for asymptotic complexity, memory constraints, and stability. Use the Guided Selector to match constraints or browse the complete catalog with step-by-step simulations and source code in 6 programming languages.'
  },
  'home.avviaSelettore': {
    it: 'Avvia il Selettore Guidato',
    en: 'Launch Guided Selector'
  },
  'home.esploraRaccolta': {
    it: 'Esplora la Raccolta Completa',
    en: 'Explore Algorithm Catalog'
  },
  'home.p1Titolo': { it: 'Questionario Guidato', en: 'Guided Questionnaire' },
  'home.p1Desc': {
    it: 'Seleziona i tuoi vincoli di tempo, memoria e struttura dati per ottenere il miglior algoritmo consigliato.',
    en: 'Input your time, memory, and data structure constraints to discover the recommended algorithm.'
  },
  'home.p2Titolo': { it: 'Dimostrazioni Grafiche Live', en: 'Live Graphical Simulations' },
  'home.p2Desc': {
    it: 'Simulazioni dinamiche passo-passo con generazione casuale dei dati e controlli Play, Pausa e Step.',
    en: 'Step-by-step dynamic simulations with real-time random dataset generation and Play, Pause, Step controls.'
  },
  'home.p3Titolo': { it: 'Codice in 6 Linguaggi', en: 'Code in 6 Languages' },
  'home.p3Desc': {
    it: 'Implementazioni pronte all\'uso e verificate in Python, Java, TypeScript, JavaScript, C e C#.',
    en: 'Battle-tested, ready-to-use implementations in Python, Java, TypeScript, JavaScript, C, and C#.'
  },
  'home.inEvidenza': { it: 'Algoritmi in evidenza', en: 'Featured Algorithms' },
  'home.sottotitoloEvidenza': {
    it: 'Esplora i capisaldi dell\'informatica',
    en: 'Explore the cornerstones of computer science'
  },
  'home.vediTutti': { it: 'Vedi tutti', en: 'View all' },
  'home.esploraVisualizza': { it: 'Esplora e visualizza', en: 'Explore & visualize' },

  // Selettore
  'selettore.titolo': {
    it: 'Selettore Intelligente di Algoritmi',
    en: 'Intelligent Algorithm Selector'
  },
  'selettore.descrizione': {
    it: 'Rispondi alle domande per individuare l\'algoritmo più efficiente e adatto ai tuoi requisiti specifici.',
    en: 'Answer a few key questions to determine the most efficient algorithm tailored to your specific requirements.'
  },
  'selettore.completato': { it: 'Completato!', en: 'Completed!' },
  'selettore.domandaDi': { it: 'Domanda', en: 'Question' },
  'selettore.di': { it: 'di', en: 'of' },
  'selettore.precedente': { it: 'Domanda Precedente', en: 'Previous Question' },
  'selettore.raccomandato': {
    it: 'Algoritmo Raccomandato per il tuo caso',
    en: 'Recommended Algorithm for Your Case'
  },
  'selettore.tempoMedio': { it: 'Tempo Medio', en: 'Average Time' },
  'selettore.tempoPeggiore': { it: 'Tempo Peggiore', en: 'Worst Time' },
  'selettore.spazio': { it: 'Spazio Ausiliario', en: 'Auxiliary Space' },
  'selettore.inPlace': { it: 'In-Place', en: 'In-Place' },
  'selettore.si': { it: 'Sì', en: 'Yes' },
  'selettore.no': { it: 'No', en: 'No' },
  'selettore.percheScelta': {
    it: 'Perché è la scelta ideale:',
    en: 'Why this is the optimal choice:'
  },
  'selettore.guardaDemo': {
    it: 'Guarda Dimostrazione Grafica & Codice',
    en: 'View Interactive Demo & Code'
  },
  'selettore.ripeti': {
    it: 'Ripeti il Questionario',
    en: 'Restart Questionnaire'
  },
  'selettore.alternative': {
    it: 'Alternative e opzioni secondarie',
    en: 'Alternatives & Secondary Options'
  },
  'selettore.dettagli': {
    it: 'Visualizza dettagli',
    en: 'View details'
  },

  // Catalogo
  'catalogo.titolo': {
    it: 'Raccolta Completa degli Algoritmi',
    en: 'Complete Algorithm Catalog'
  },
  'catalogo.descrizione': {
    it: 'Esplora il catalogo degli algoritmi fondamentali con documentazione, dimostrazioni visive e sorgenti in 6 linguaggi.',
    en: 'Explore fundamental algorithms with detailed documentation, visual simulations, and sources in 6 languages.'
  },
  'catalogo.placeholderCerca': {
    it: 'Cerca per nome, categoria o concetto...',
    en: 'Search by name, category, or concept...'
  },
  'catalogo.trovati': { it: 'Trovati', en: 'Found' },
  'catalogo.algoritmi': { it: 'algoritmi', en: 'algorithms' },
  'catalogo.medio': { it: 'Medio', en: 'Avg' },
  'catalogo.spazio': { it: 'Spazio', en: 'Space' },
  'catalogo.demoCodice': { it: 'Dimostrazione & Codice', en: 'Demo & Code' },
  'catalogo.inplaceBadge': { it: 'In-place', en: 'In-place' },
  'catalogo.ausiliarioBadge': { it: 'Ausiliario', en: 'Auxiliary' },
  'catalogo.nessunRisultato': {
    it: 'Nessun algoritmo corrisponde ai criteri di ricerca selezionati.',
    en: 'No algorithms match the selected search criteria.'
  },
  'catalogo.reimposta': { it: 'Reimposta filtri', en: 'Reset filters' },

  // Dettaglio
  'dettaglio.torna': {
    it: 'Torna alla Raccolta Algoritmi',
    en: 'Back to Algorithm Catalog'
  },
  'dettaglio.tempoMigliore': { it: 'Tempo Migliore', en: 'Best Time' },
  'dettaglio.tempoMedio': { it: 'Tempo Medio', en: 'Average Time' },
  'dettaglio.tempoPeggiore': { it: 'Tempo Peggiore', en: 'Worst Time' },
  'dettaglio.spazioAusiliario': { it: 'Spazio Ausiliario', en: 'Auxiliary Space' },
  'dettaglio.stabilita': { it: 'Stabilità', en: 'Stability' },
  'dettaglio.stabile': { it: 'Stabile', en: 'Stable' },
  'dettaglio.nonStabile': { it: 'Non stabile', en: 'Not stable' },
  'dettaglio.memoriaInPlace': { it: 'Memoria In-Place', en: 'In-Place Memory' },
  'dettaglio.demoTitolo': {
    it: 'Dimostrazione Grafica Interattiva',
    en: 'Interactive Graphical Simulation'
  },
  'dettaglio.demoSottotitolo': {
    it: 'Osserva il funzionamento dell\'algoritmo passo dopo passo su dati generati in tempo reale.',
    en: 'Observe algorithm execution step-by-step with real-time dynamic datasets.'
  },
  'dettaglio.quandoUsarlo': { it: 'Quando Usarlo', en: 'When to Use' },
  'dettaglio.quandoEvitarlo': { it: 'Quando Evitarlo', en: 'When to Avoid' },
  'dettaglio.codiceTitolo': {
    it: 'Codice Sorgente per l\'Implementazione',
    en: 'Implementation Source Code'
  },
  'dettaglio.codiceSottotitolo': {
    it: 'Implementazioni testate e pronte per la produzione in Python, Java, TypeScript, JavaScript, C e C#.',
    en: 'Tested, production-grade implementations in Python, Java, TypeScript, JavaScript, C, and C#.'
  },

  // Visualizzatore
  'vis.avvia': { it: 'Avvia', en: 'Start' },
  'vis.pausa': { it: 'Pausa', en: 'Pause' },
  'vis.reset': { it: 'Reset', en: 'Reset' },
  'vis.nuoviDati': { it: 'Nuovi Dati', en: 'New Data' },
  'vis.velocita': { it: 'Velocità', en: 'Speed' },
  'vis.passoPrec': { it: 'Passo precedente', en: 'Previous step' },
  'vis.passoSucc': { it: 'Passo successivo', en: 'Next step' },
  'vis.pronto': {
    it: 'Pronto. Premi Avvia per iniziare la simulazione o Passo per avanzare manualmente.',
    en: 'Ready. Press Start to run simulation or Step to advance manually.'
  }
}
