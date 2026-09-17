<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLingua } from '../composables/useLingua'

const { t, isItalian } = useLingua()

const props = defineProps({
  algoritmoId: {
    type: String,
    required: true
  }
})

// Stato di riproduzione
const inEsecuzione = ref(false)
const velocitaMs = ref(600)
const indicePasso = ref(0)
const passi = ref([])
const messaggioStato = ref('Pronto. Premi Avvia per iniziare la simulazione o Passo per avanzare manualmente.')

let timerEsecuzione = null

// Dati reattivi per i diversi tipi di visualizzazione
// 1. Array
const arrayDati = ref([])
const indiciEvidenziati = ref([])
const indicePivot = ref(-1)
const indiciOrdinati = ref([])
const valoreTarget = ref(null)

// 2. Grafi
const nodiGrafo = ref([
  { id: 0, x: 50, y: 75, label: 'A (Start)' },
  { id: 1, x: 170, y: 35, label: 'B' },
  { id: 2, x: 170, y: 125, label: 'C' },
  { id: 3, x: 290, y: 35, label: 'D' },
  { id: 4, x: 290, y: 125, label: 'E' },
  { id: 5, x: 410, y: 75, label: 'F (Target)' }
])

const archiGrafo = ref([
  { da: 0, a: 1, peso: 4 },
  { da: 0, a: 2, peso: 2 },
  { da: 1, a: 2, peso: 1 },
  { da: 1, a: 3, peso: 5 },
  { da: 2, a: 4, peso: 8 },
  { da: 2, a: 3, peso: 10 },
  { da: 3, a: 5, peso: 6 },
  { da: 4, a: 5, peso: 3 }
])

const statoNodi = ref({})
const archiAttivi = ref([])

// 3. Crittografia / Hashing
const statoCrypto = ref({
  fase: '',
  formula: '',
  registri: {},
  matriceState: [],
  messaggio: ''
})

// 4. Compressione
const statoCompressione = ref({
  stringaOriginale: '',
  simboli: [],
  alberoCodici: [],
  dizionario: [],
  outputToken: []
})

// 5. Machine Learning
const statoML = ref({
  tipo: '',
  punti: [],
  centroidi: [],
  puntoQuery: null,
  viciniK: [],
  raggioCerchio: 0,
  curvaPerdita: [],
  puntoCorrente: null,
  gradienteVal: 0
})

// Tipologia di visualizzatore
const tipoVisualizzatore = computed(() => {
  const id = props.algoritmoId
  if (['quick-sort', 'merge-sort', 'heap-sort', 'insertion-sort', 'bubble-sort', 'binary-search', 'linear-search', 'interpolation-search'].includes(id)) {
    return 'array'
  }
  if (['bfs', 'dfs', 'dijkstra', 'a-star', 'bellman-ford', 'kruskal', 'prim'].includes(id)) {
    return 'grafo'
  }
  if (['rsa', 'aes', 'sha-256', 'diffie-hellman'].includes(id)) {
    return 'crypto'
  }
  if (['huffman', 'lzw'].includes(id)) {
    return 'compressione'
  }
  if (['gradient-descent', 'k-means', 'knn'].includes(id)) {
    return 'ml'
  }
  return 'array'
})

// Inizializzazione e Generazione Nuovi Dati
function generaNuoviDati() {
  ferma()
  indicePasso.value = 0
  indiciEvidenziati.value = []
  indicePivot.value = -1
  indiciOrdinati.value = []
  archiAttivi.value = []
  valoreTarget.value = null

  const id = props.algoritmoId

  if (['quick-sort', 'merge-sort', 'heap-sort', 'insertion-sort', 'bubble-sort'].includes(id)) {
    // Array disordinato casuale
    arrayDati.value = Array.from({ length: 8 }, () => Math.floor(Math.random() * 75) + 15)
  } else if (id === 'binary-search') {
    arrayDati.value = [14, 22, 35, 48, 59, 67, 78, 86, 95]
    valoreTarget.value = 67
  } else if (id === 'linear-search') {
    arrayDati.value = [34, 12, 89, 45, 67, 23, 78, 56]
    valoreTarget.value = 67
  } else if (id === 'interpolation-search') {
    arrayDati.value = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    valoreTarget.value = 70
  } else if (['bfs', 'dfs', 'dijkstra', 'a-star', 'bellman-ford', 'kruskal', 'prim'].includes(id)) {
    statoNodi.value = {
      0: { stato: 'start', dist: 0, heur: 11 },
      1: { stato: 'non_visitato', dist: '∞', heur: 7 },
      2: { stato: 'non_visitato', dist: '∞', heur: 8 },
      3: { stato: 'non_visitato', dist: '∞', heur: 5 },
      4: { stato: 'non_visitato', dist: '∞', heur: 3 },
      5: { stato: 'non_visitato', dist: '∞', heur: 0 }
    }
  }

  costruisciPassiSimulazione()
  applicaPasso(0)
}

function costruisciPassiSimulazione() {
  passi.value = []
  const id = props.algoritmoId

  switch (id) {
    case 'quick-sort': costruisciPassiQuickSort(); break
    case 'merge-sort': costruisciPassiMergeSort(); break
    case 'heap-sort': costruisciPassiHeapSort(); break
    case 'insertion-sort': costruisciPassiInsertionSort(); break
    case 'bubble-sort': costruisciPassiBubbleSort(); break
    case 'binary-search': costruisciPassiBinarySearch(); break
    case 'linear-search': costruisciPassiLinearSearch(); break
    case 'interpolation-search': costruisciPassiInterpolationSearch(); break
    case 'bfs': costruisciPassiBFS(); break
    case 'dfs': costruisciPassiDFS(); break
    case 'dijkstra': costruisciPassiDijkstra(); break
    case 'a-star': costruisciPassiAStar(); break
    case 'bellman-ford': costruisciPassiBellmanFord(); break
    case 'kruskal': costruisciPassiKruskal(); break
    case 'prim': costruisciPassiPrim(); break
    case 'rsa': costruisciPassiRSA(); break
    case 'aes': costruisciPassiAES(); break
    case 'sha-256': costruisciPassiSHA256(); break
    case 'diffie-hellman': costruisciPassiDiffieHellman(); break
    case 'huffman': costruisciPassiHuffman(); break
    case 'lzw': costruisciPassiLZW(); break
    case 'gradient-descent': costruisciPassiGradientDescent(); break
    case 'k-means': costruisciPassiKMeans(); break
    case 'knn': costruisciPassiKNN(); break
    default: costruisciPassiQuickSort(); break
  }
}

// -------------------------------------------------------------
// 1. SIMULATORI ORDINAMENTO
// -------------------------------------------------------------
function costruisciPassiQuickSort() {
  const arr = [...arrayDati.value]
  const passiGen = []

  passiGen.push({
    arr: [...arr],
    highlight: [],
    pivot: -1,
    ordinati: [],
    msg: 'Stato iniziale dell\'array da partizionare.'
  })

  function qs(l, r) {
    if (l >= r) {
      if (l === r) {
        passiGen.push({
          arr: [...arr],
          highlight: [],
          pivot: -1,
          ordinati: [l],
          msg: `Elemento a indice ${l} (${arr[l]}) collocato nella sua posizione finale.`
        })
      }
      return
    }

    const pivotVal = arr[r]
    let i = l - 1

    passiGen.push({
      arr: [...arr],
      highlight: [],
      pivot: r,
      ordinati: [],
      msg: `Seleziono il pivot: ${pivotVal} all'indice ${r}. Partiziono l'intervallo [${l}..${r}].`
    })

    for (let j = l; j < r; j++) {
      passiGen.push({
        arr: [...arr],
        highlight: [j, r],
        pivot: r,
        ordinati: [],
        msg: `Confronto ${arr[j]} con il pivot ${pivotVal}...`
      })

      if (arr[j] <= pivotVal) {
        i++
        if (i !== j) {
          const temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
          passiGen.push({
            arr: [...arr],
            highlight: [i, j],
            pivot: r,
            ordinati: [],
            msg: `${arr[i]} ≤ ${pivotVal}: scambio ${arr[j]} con ${arr[i]}.`
          })
        }
      }
    }

    const temp = arr[i + 1]
    arr[i + 1] = arr[r]
    arr[r] = temp
    const pi = i + 1

    passiGen.push({
      arr: [...arr],
      highlight: [pi],
      pivot: pi,
      ordinati: [pi],
      msg: `Pivot ${arr[pi]} posizionato stabilmente all'indice corretto ${pi}.`
    })

    qs(l, pi - 1)
    qs(pi + 1, r)
  }

  qs(0, arr.length - 1)

  passiGen.push({
    arr: [...arr],
    highlight: [],
    pivot: -1,
    ordinati: Array.from({ length: arr.length }, (_, idx) => idx),
    msg: 'Quicksort completato con successo in O(n log n) medio!'
  })

  passi.value = passiGen
}

function costruisciPassiMergeSort() {
  const arr = [...arrayDati.value]
  const passiGen = []

  passiGen.push({
    arr: [...arr],
    highlight: [],
    ordinati: [],
    msg: 'Stato iniziale. Merge Sort divide ricorsivamente a metà e fonde i sotto-array ordinati.'
  })

  function ms(l, r) {
    if (l >= r) return
    const m = Math.floor((l + r) / 2)

    passiGen.push({
      arr: [...arr],
      highlight: [l, r],
      ordinati: [],
      msg: `Divido in sotto-problemi: [${l}..${m}] e [${m + 1}..${r}].`
    })

    ms(l, m)
    ms(m + 1, r)

    const left = arr.slice(l, m + 1)
    const right = arr.slice(m + 1, r + 1)
    let i = 0, j = 0, k = l

    while (i < left.length && j < right.length) {
      passiGen.push({
        arr: [...arr],
        highlight: [k],
        ordinati: [],
        msg: `Fondo: confronto ${left[i]} con ${right[j]} -> inserisco il minore in posizione ${k}.`
      })
      if (left[i] <= right[j]) {
        arr[k++] = left[i++]
      } else {
        arr[k++] = right[j++]
      }
    }
    while (i < left.length) arr[k++] = left[i++]
    while (j < right.length) arr[k++] = right[j++]

    passiGen.push({
      arr: [...arr],
      highlight: Array.from({ length: r - l + 1 }, (_, x) => l + x),
      ordinati: r - l + 1 === arr.length ? Array.from({ length: arr.length }, (_, x) => x) : [],
      msg: `Sotto-array [${l}..${r}] fuso in ordine: [${arr.slice(l, r + 1).join(', ')}].`
    })
  }

  ms(0, arr.length - 1)
  passi.value = passiGen
}

function costruisciPassiHeapSort() {
  const arr = [...arrayDati.value]
  const passiGen = []
  const n = arr.length

  passiGen.push({
    arr: [...arr],
    highlight: [],
    ordinati: [],
    msg: 'Fase 1: Costruzione del Max-Heap. Ogni nodo genitore deve essere ≥ dei propri figli.'
  })

  function heapify(dim, i) {
    let largest = i
    const l = 2 * i + 1
    const r = 2 * i + 2

    if (l < dim && arr[l] > arr[largest]) largest = l
    if (r < dim && arr[r] > arr[largest]) largest = r

    if (largest !== i) {
      const swap = arr[i]
      arr[i] = arr[largest]
      arr[largest] = swap

      passiGen.push({
        arr: [...arr],
        highlight: [i, largest],
        ordinati: [],
        msg: `Sift-down: scambio genitore ${swap} con il figlio maggiore ${arr[i]}.`
      })

      heapify(dim, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  passiGen.push({
    arr: [...arr],
    highlight: [0],
    ordinati: [],
    msg: `Max-Heap costruito! La radice (${arr[0]}) è l'elemento massimo assoluto.`
  })

  const ordinatiArr = []
  for (let i = n - 1; i > 0; i--) {
    const temp = arr[0]
    arr[0] = arr[i]
    arr[i] = temp
    ordinatiArr.unshift(i)

    passiGen.push({
      arr: [...arr],
      highlight: [0, i],
      ordinati: [...ordinatiArr],
      msg: `Estraggo il massimo ${temp}: lo sposto in fondo all'indice ${i} e ripristino l'heap.`
    })

    heapify(i, 0)
  }

  ordinatiArr.unshift(0)
  passiGen.push({
    arr: [...arr],
    highlight: [],
    ordinati: [...ordinatiArr],
    msg: 'Heapsort completato! Complessità O(n log n) garantita nel caso peggiore con O(1) memoria ausiliaria.'
  })

  passi.value = passiGen
}

function costruisciPassiInsertionSort() {
  const arr = [...arrayDati.value]
  const passiGen = []

  passiGen.push({
    arr: [...arr],
    highlight: [0],
    ordinati: [0],
    msg: 'L\'elemento iniziale all\'indice 0 è considerato banalmente già ordinato.'
  })

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1

    passiGen.push({
      arr: [...arr],
      highlight: [i],
      pivot: i,
      ordinati: Array.from({ length: i }, (_, k) => k),
      msg: `Considero l'elemento chiave ${key} all'indice ${i}. Cerco il suo punto di inserimento a sinistra.`
    })

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      passiGen.push({
        arr: [...arr],
        highlight: [j, j + 1],
        pivot: j + 1,
        ordinati: [],
        msg: `${arr[j]} > ${key}: traslo l'elemento verso destra.`
      })
      j--
    }
    arr[j + 1] = key

    passiGen.push({
      arr: [...arr],
      highlight: [j + 1],
      ordinati: Array.from({ length: i + 1 }, (_, k) => k),
      msg: `Chiave ${key} inserita nella corretta posizione ordinata [${j + 1}].`
    })
  }

  passiGen.push({
    arr: [...arr],
    highlight: [],
    pivot: -1,
    ordinati: Array.from({ length: arr.length }, (_, k) => k),
    msg: 'Insertion Sort completato! Prestazioni eccezionali su dataset piccoli o quasi ordinati.'
  })

  passi.value = passiGen
}

function costruisciPassiBubbleSort() {
  const arr = [...arrayDati.value]
  const passiGen = []
  const n = arr.length

  passiGen.push({
    arr: [...arr],
    highlight: [],
    ordinati: [],
    msg: 'Inizio Bubble Sort: scorro l\'array confrontando e scambiando elementi adiacenti.'
  })

  const ordinatiArr = []
  for (let i = 0; i < n - 1; i++) {
    let scambiato = false
    for (let j = 0; j < n - i - 1; j++) {
      passiGen.push({
        arr: [...arr],
        highlight: [j, j + 1],
        ordinati: [...ordinatiArr],
        msg: `Confronto coppie adiacenti: ${arr[j]} con ${arr[j + 1]}.`
      })

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        scambiato = true

        passiGen.push({
          arr: [...arr],
          highlight: [j, j + 1],
          ordinati: [...ordinatiArr],
          msg: `${temp} > ${arr[j]}: eseguo lo scambio per far "salire" il valore maggiore.`
        })
      }
    }
    ordinatiArr.unshift(n - 1 - i)
    if (!scambiato) break
  }

  passiGen.push({
    arr: [...arr],
    highlight: [],
    ordinati: Array.from({ length: n }, (_, k) => k),
    msg: 'Bubble Sort terminato! Tutti gli elementi sono in ordine crescente.'
  })

  passi.value = passiGen
}

// -------------------------------------------------------------
// 2. SIMULATORI RICERCA
// -------------------------------------------------------------
function costruisciPassiBinarySearch() {
  const arr = [...arrayDati.value]
  const target = valoreTarget.value || 67
  const passiGen = []

  let low = 0
  let high = arr.length - 1
  let trovato = false

  passiGen.push({
    arr: [...arr],
    highlight: [low, high],
    mid: -1,
    msg: `Target da trovare: ${target}. Intervallo iniziale di ricerca: [${low}..${high}].`
  })

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    passiGen.push({
      arr: [...arr],
      highlight: [low, high],
      mid: mid,
      msg: `Calcolo indice centrale mid = ${mid} (valore: ${arr[mid]}).`
    })

    if (arr[mid] === target) {
      passiGen.push({
        arr: [...arr],
        highlight: [mid],
        mid: mid,
        ordinati: [mid],
        msg: `Elemento trovato! arr[${mid}] == ${target} in complessità logaritmica O(log n).`
      })
      trovato = true
      break
    } else if (arr[mid] < target) {
      passiGen.push({
        arr: [...arr],
        highlight: [low, high],
        mid: mid,
        msg: `${arr[mid]} < ${target}: scarto la metà sinistra. Nuovo limite inferiore low = ${mid + 1}.`
      })
      low = mid + 1
    } else {
      passiGen.push({
        arr: [...arr],
        highlight: [low, high],
        mid: mid,
        msg: `${arr[mid]} > ${target}: scarto la metà destra. Nuovo limite superiore high = ${mid - 1}.`
      })
      high = mid - 1
    }
  }

  if (!trovato) {
    passiGen.push({
      arr: [...arr],
      highlight: [],
      mid: -1,
      msg: `Elemento ${target} non presente nell'array.`
    })
  }

  passi.value = passiGen
}

function costruisciPassiLinearSearch() {
  const arr = [...arrayDati.value]
  const target = valoreTarget.value || 67
  const passiGen = []

  passiGen.push({
    arr: [...arr],
    highlight: [],
    msg: `Ricerca Lineare: cerco ${target} scansionando sequenzialmente ogni posizione dall'inizio.`
  })

  let trovato = false
  for (let i = 0; i < arr.length; i++) {
    passiGen.push({
      arr: [...arr],
      highlight: [i],
      msg: `Ispeziono indice [${i}]: valore = ${arr[i]}. Confronto con il target ${target}...`
    })

    if (arr[i] === target) {
      passiGen.push({
        arr: [...arr],
        highlight: [i],
        ordinati: [i],
        msg: `Elemento trovato all'indice [${i}]! Nessun ordinamento preliminare richiesto.`
      })
      trovato = true
      break
    }
  }

  if (!trovato) {
    passiGen.push({
      arr: [...arr],
      highlight: [],
      msg: `Valore ${target} non trovato dopo aver scansionato l'intero array.`
    })
  }

  passi.value = passiGen
}

function costruisciPassiInterpolationSearch() {
  const arr = [...arrayDati.value]
  const target = valoreTarget.value || 70
  const passiGen = []

  let low = 0
  let high = arr.length - 1

  passiGen.push({
    arr: [...arr],
    highlight: [low, high],
    msg: `Interpolation Search su dati uniformi. Formula stima: pos = low + [(target-arr[low])/(arr[high]-arr[low])] * (high-low).`
  })

  let trovato = false
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      if (arr[low] === target) trovato = true
      break
    }

    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]))

    passiGen.push({
      arr: [...arr],
      highlight: [low, high],
      mid: pos,
      msg: `Stima calcolata: indice pos = ${pos} (valore ${arr[pos]}). Salto direttamente all'indice stimato!`
    })

    if (arr[pos] === target) {
      passiGen.push({
        arr: [...arr],
        highlight: [pos],
        ordinati: [pos],
        mid: pos,
        msg: `Match esatto trovato all'indice [${pos}] in un solo passaggio! O(log log n) su distribuzioni uniformi.`
      })
      trovato = true
      break
    } else if (arr[pos] < target) {
      low = pos + 1
    } else {
      high = pos - 1
    }
  }

  if (!trovato) {
    passiGen.push({
      arr: [...arr],
      highlight: [],
      msg: `Elemento ${target} non presente.`
    })
  }

  passi.value = passiGen
}

// -------------------------------------------------------------
// 3. SIMULATORI GRAFI & ALBERI
// -------------------------------------------------------------
function costruisciPassiBFS() {
  passi.value = [
    {
      stati: { 0: 'visiting', 1: 'non_visitato', 2: 'non_visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [],
      msg: 'BFS (Breadth-First Search): Inizializzo coda FIFO = [A]. Livello 0.'
    },
    {
      stati: { 0: 'visitato', 1: 'visiting', 2: 'visiting', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [{ da: 0, a: 1 }, { da: 0, a: 2 }],
      msg: 'Esploro i vicini a livello 1 (distanza 1): B e C vengono inseriti in coda FIFO.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'visiting', 4: 'visiting', 5: 'non_visitato' },
      archi: [{ da: 0, a: 1 }, { da: 0, a: 2 }, { da: 1, a: 3 }, { da: 2, a: 4 }],
      msg: 'Estraggo B e C: aggiungo i rispettivi vicini non visitati D e E a livello 2.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'visitato', 4: 'visitato', 5: 'target' },
      archi: [{ da: 0, a: 1 }, { da: 0, a: 2 }, { da: 1, a: 3 }, { da: 3, a: 5 }],
      msg: 'Raggiunto il nodo Target F! Cammino minimo a livelli trovato: A -> B -> D -> F.'
    }
  ]
}

function costruisciPassiDFS() {
  passi.value = [
    {
      stati: { 0: 'visiting', 1: 'non_visitato', 2: 'non_visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [],
      msg: 'DFS (Depth-First Search): inizio dal nodo A. Inserisco A nello stack di ricorsione.'
    },
    {
      stati: { 0: 'visitato', 1: 'visiting', 2: 'non_visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [{ da: 0, a: 1 }],
      msg: 'Avanzo in profondità sul primo ramo disponibile: visito B.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'non_visitato', 3: 'visiting', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [{ da: 0, a: 1 }, { da: 1, a: 3 }],
      msg: 'Proseguo ancora più in profondità: da B visito D.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'non_visitato', 3: 'visitato', 4: 'non_visitato', 5: 'target' },
      archi: [{ da: 0, a: 1 }, { da: 1, a: 3 }, { da: 3, a: 5 }],
      msg: 'Raggiungo la destinazione F in profondità senza esplorare rami laterali!'
    }
  ]
}

function costruisciPassiDijkstra() {
  passi.value = [
    {
      stati: { 0: 'visiting', 1: 'non_visitato', 2: 'non_visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      dist: { 0: 0, 1: '∞', 2: '∞', 3: '∞', 4: '∞', 5: '∞' },
      archi: [],
      msg: 'Partenza da A con distanza 0. Tutti gli altri nodi hanno distanza infinita.'
    },
    {
      stati: { 0: 'visitato', 1: 'tentativo', 2: 'tentativo', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      dist: { 0: 0, 1: 4, 2: 2, 3: '∞', 4: '∞', 5: '∞' },
      archi: [{ da: 0, a: 2 }, { da: 0, a: 1 }],
      msg: 'Rilasso gli archi da A: aggiorno dist(B)=4 e dist(C)=2.'
    },
    {
      stati: { 0: 'visitato', 1: 'tentativo', 2: 'visiting', 3: 'tentativo', 4: 'tentativo', 5: 'non_visitato' },
      dist: { 0: 0, 1: 3, 2: 2, 3: 12, 4: 10, 5: '∞' },
      archi: [{ da: 0, a: 2 }, { da: 2, a: 1 }],
      msg: 'Estraggo C (distanza minima = 2). Rilasso B: 2+1=3 (migliore di 4!), E (2+8=10), D (2+10=12).'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'tentativo', 4: 'tentativo', 5: 'non_visitato' },
      dist: { 0: 0, 1: 3, 2: 2, 3: 8, 4: 10, 5: '∞' },
      archi: [{ da: 0, a: 2 }, { da: 2, a: 1 }, { da: 1, a: 3 }],
      msg: 'Estraggo B (distanza 3). Rilasso D: 3+5=8 (migliore di 12!).'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'visitato', 4: 'visiting', 5: 'target' },
      dist: { 0: 0, 1: 3, 2: 2, 3: 8, 4: 10, 5: 13 },
      archi: [{ da: 0, a: 2 }, { da: 2, a: 4 }, { da: 4, a: 5 }],
      msg: 'Estraggo E (distanza 10). Rilasso Target F: 10+3=13 (superiore a 8+6=14). Cammino ottimo: A->C->E->F (costo 13)!'
    }
  ]
}

function costruisciPassiAStar() {
  passi.value = [
    {
      stati: { 0: 'visiting', 1: 'non_visitato', 2: 'non_visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      dist: { 0: 'f=11', 1: 'f=?', 2: 'f=?', 3: 'f=?', 4: 'f=?', 5: 'f=0' },
      archi: [],
      msg: 'A*: calcola f(n) = g(n) + h(n). Inizializzo A: g=0, euristica h=11 -> f(A)=11.'
    },
    {
      stati: { 0: 'visitato', 1: 'tentativo', 2: 'visiting', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      dist: { 0: 'f=11', 1: 'f=11', 2: 'f=10', 3: 'f=?', 4: 'f=?', 5: 'f=0' },
      archi: [{ da: 0, a: 2 }],
      msg: 'Valuto i vicini: B ha f=4+7=11, C ha f=2+8=10. Scelgo C perché ha la stima f minima (10).'
    },
    {
      stati: { 0: 'visitato', 1: 'visiting', 2: 'visitato', 3: 'tentativo', 4: 'tentativo', 5: 'non_visitato' },
      dist: { 0: 'f=11', 1: 'f=10', 2: 'f=10', 3: 'f=13', 4: 'f=13', 5: 'f=0' },
      archi: [{ da: 0, a: 2 }, { da: 2, a: 1 }],
      msg: 'Da C rilasso B: f(B) = (2+1)+7 = 10. B viene estratto dalla coda prioritaria.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'tentativo', 4: 'visitato', 5: 'target' },
      dist: { 0: 'f=11', 1: 'f=10', 2: 'f=10', 3: 'f=14', 4: 'f=13', 5: 'f=13' },
      archi: [{ da: 0, a: 2 }, { da: 2, a: 4 }, { da: 4, a: 5 }],
      msg: 'Raggiunto F tramite E: f(F) = 13 + 0 = 13. A* garantisce l\'ottimalità esplorando meno nodi di Dijkstra!'
    }
  ]
}

function costruisciPassiBellmanFord() {
  passi.value = [
    {
      stati: { 0: 'visiting', 1: 'non_visitato', 2: 'non_visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      dist: { 0: 0, 1: '∞', 2: '∞', 3: '∞', 4: '∞', 5: '∞' },
      archi: [],
      msg: 'Bellman-Ford: permette pesi negativi. Esegue |V|-1 = 5 iterazioni di rilassamento su tutti gli archi.'
    },
    {
      stati: { 0: 'visitato', 1: 'tentativo', 2: 'tentativo', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      dist: { 0: 0, 1: 4, 2: 2, 3: '∞', 4: '∞', 5: '∞' },
      archi: [{ da: 0, a: 1 }, { da: 0, a: 2 }],
      msg: 'Iterazione 1: rilasso tutti gli archi. Trovate distanze dirette da A (B=4, C=2).'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'tentativo', 4: 'tentativo', 5: 'non_visitato' },
      dist: { 0: 0, 1: 3, 2: 2, 3: 8, 4: 10, 5: '∞' },
      archi: [{ da: 0, a: 2 }, { da: 2, a: 1 }, { da: 1, a: 3 }, { da: 2, a: 4 }],
      msg: 'Iterazione 2: propagazione delle distanze. B si riduce a 3 (via C), D=8, E=10.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'visitato', 4: 'visitato', 5: 'target' },
      dist: { 0: 0, 1: 3, 2: 2, 3: 8, 4: 10, 5: 13 },
      archi: [{ da: 0, a: 2 }, { da: 2, a: 4 }, { da: 4, a: 5 }],
      msg: 'Iterazione 3 e controllo cicli: distanze stabilizzate! Nessun ciclo negativo rilevato. Distanza minima finale: 13.'
    }
  ]
}

function costruisciPassiKruskal() {
  passi.value = [
    {
      stati: { 0: 'start', 1: 'start', 2: 'start', 3: 'start', 4: 'start', 5: 'start' },
      archi: [],
      msg: 'Kruskal (MST): ordino tutti gli archi per peso crescente. Inizializzo 6 componenti disgiunte (Union-Find).'
    },
    {
      stati: { 0: 'start', 1: 'visitato', 2: 'visitato', 3: 'start', 4: 'start', 5: 'start' },
      archi: [{ da: 1, a: 2 }],
      msg: 'Arco 1: (B, C) peso 1. Collega due insiemi separati -> Aggiunto all\'albero ricoprente minimo!'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'start', 4: 'start', 5: 'start' },
      archi: [{ da: 1, a: 2 }, { da: 0, a: 2 }],
      msg: 'Arco 2: (A, C) peso 2. Collega A alla componente {B, C} -> Aggiunto all\'MST.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'start', 4: 'visitato', 5: 'visitato' },
      archi: [{ da: 1, a: 2 }, { da: 0, a: 2 }, { da: 4, a: 5 }],
      msg: 'Arco 3: (E, F) peso 3 -> Aggiunto. Arco (A, B) peso 4 genera ciclo! -> Scartato da Union-Find.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'visitato', 4: 'visitato', 5: 'visitato' },
      archi: [{ da: 1, a: 2 }, { da: 0, a: 2 }, { da: 4, a: 5 }, { da: 1, a: 3 }, { da: 3, a: 5 }],
      msg: 'Aggiunti (B, D) peso 5 e (D, F) peso 6. Tutti i 6 nodi sono connessi con 5 archi! Costo totale minimo = 17.'
    }
  ]
}

function costruisciPassiPrim() {
  passi.value = [
    {
      stati: { 0: 'visitato', 1: 'non_visitato', 2: 'non_visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [],
      msg: 'Prim (MST): inizio dall\'albero contenente il solo nodo A. Valuto tutti gli archi uscenti verso l\'esterno.'
    },
    {
      stati: { 0: 'visitato', 1: 'non_visitato', 2: 'visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [{ da: 0, a: 2 }],
      msg: 'Archi uscenti da {A}: (A, B)=4, (A, C)=2. Scelgo greedy il minimo (A, C) con peso 2.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'non_visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [{ da: 0, a: 2 }, { da: 1, a: 2 }],
      msg: 'Archi uscenti da {A, C}: l\'arco minimo è (C, B) con peso 1. Includo B nell\'albero.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'visitato', 4: 'non_visitato', 5: 'non_visitato' },
      archi: [{ da: 0, a: 2 }, { da: 1, a: 2 }, { da: 1, a: 3 }],
      msg: 'Archi uscenti da {A, B, C}: l\'arco minimo è (B, D) con peso 5. Includo D nell\'albero.'
    },
    {
      stati: { 0: 'visitato', 1: 'visitato', 2: 'visitato', 3: 'visitato', 4: 'visitato', 5: 'visitato' },
      archi: [{ da: 0, a: 2 }, { da: 1, a: 2 }, { da: 1, a: 3 }, { da: 3, a: 5 }, { da: 4, a: 5 }],
      msg: 'Includo F tramite (D, F)=6 e infine E tramite (F, E)=3. Albero ricoprente minimo completo con costo 17!'
    }
  ]
}

// -------------------------------------------------------------
// 4. SIMULATORI CRITTOGRAFIA & HASHING
// -------------------------------------------------------------
function costruisciPassiRSA() {
  passi.value = [
    {
      crypto: {
        fase: '1. Generazione Chiavi (Primi p e q)',
        formula: 'n = p × q | φ(n) = (p - 1)(q - 1)',
        registri: { p: 61, q: 53, n: '3233', 'φ(n)': '3120' },
        messaggio: 'Seleziono due numeri primi segreti p=61 e q=53. Calcolo il modulo n = 3233 e la funzione totiente di Eulero φ(n) = 3120.'
      },
      msg: 'Fase 1: Definizione parametri e calcolo modulo pubblico RSA.'
    },
    {
      crypto: {
        fase: '2. Esponente Pubblico & Privato',
        formula: 'd ≡ e⁻¹ (mod φ(n)) con e = 17',
        registri: { 'Chiave Pubblica (e, n)': '(17, 3233)', 'Chiave Privata (d, n)': '(2753, 3233)' },
        messaggio: 'Scelgo e = 17 coprimo con 3120. Con l\'algoritmo esteso di Euclide calcolo l\'inverso moltiplicativo d = 2753.'
      },
      msg: 'Fase 2: Generazione della coppia di chiavi asimmetriche.'
    },
    {
      crypto: {
        fase: '3. Cifratura Asimmetrica',
        formula: 'C = Mᵉ mod n = 65¹⁷ mod 3233 = 2790',
        registri: { Messaggio: 'M = 65 ("A")', Ciphertext: 'C = 2790' },
        messaggio: 'Il mittente applica la chiave pubblica: eleva a potenza modulo n. Il dato cifrato C=2790 può viaggiare su canale pubblico.'
      },
      msg: 'Fase 3: Cifratura completata con successo.'
    },
    {
      crypto: {
        fase: '4. Decifratura con Chiave Privata',
        formula: 'M = Cᵈ mod n = 2790²⁷⁵³ mod 3233 = 65',
        registri: { 'Dato Ricevuto': '2790', 'Messaggio Decifrato': '65 ("A")' },
        messaggio: 'Solo il destinatario con la chiave privata d=2753 può invertire la potenza modulo n. Messaggio originale integro recuperato!'
      },
      msg: 'Fase 4: Decifratura riuscita. Riservatezza matematica garantita.'
    }
  ]
}

function costruisciPassiAES() {
  passi.value = [
    {
      crypto: {
        fase: '1. Blocco 128-bit & Inizializzazione State',
        formula: 'State ← Plaintext ⊕ RoundKey₀ (AddRoundKey)',
        matriceState: [
          ['32', '88', '31', 'e0'],
          ['43', '5a', '31', '37'],
          ['f6', '30', '98', '07'],
          ['a8', '8d', 'a2', '34']
        ],
        messaggio: 'Il blocco di 16 byte (128 bit) viene disposto in una matrice di stato 4×4 ed eseguita la prima somma binaria XOR con la chiave.'
      },
      msg: 'AES: matrice di stato 4×4 pronta per i round di trasformazione.'
    },
    {
      crypto: {
        fase: '2. SubBytes (Sostituzione non lineare)',
        formula: 'S(x) tramite S-Box di Rijndael in GF(2⁸)',
        matriceState: [
          ['23', 'c4', 'c7', 'e1'],
          ['1a', 'be', 'c7', '9a'],
          ['42', '04', '46', 'c5'],
          ['c2', '5d', '3a', '18']
        ],
        messaggio: 'Ogni byte viene sostituito con un byte corrispondente nella S-Box per garantire la proprietà di confusione crittografica.'
      },
      msg: 'SubBytes: byte trasformati non linearmente.'
    },
    {
      crypto: {
        fase: '3. ShiftRows (Traslazione ciclica)',
        formula: 'Riga i slitta a sinistra di i posizioni (i=0..3)',
        matriceState: [
          ['23', 'c4', 'c7', 'e1'],
          ['be', 'c7', '9a', '1a'],
          ['46', 'c5', '42', '04'],
          ['18', 'c2', '5d', '3a']
        ],
        messaggio: 'La riga 0 non slitta, la riga 1 slitta di 1 byte, la riga 2 di 2 byte, la riga 3 di 3 byte. Questo diffonde i byte tra colonne.'
      },
      msg: 'ShiftRows: permutazione ciclica delle righe.'
    },
    {
      crypto: {
        fase: '4. MixColumns & AddRoundKey',
        formula: 'Moltiplicazione polinomiale + XOR RoundKey',
        matriceState: [
          ['7a', '89', '2b', '3d'],
          ['4d', '61', '9f', 'c2'],
          ['12', '7e', '45', 'bb'],
          ['90', '34', 'fa', '08']
        ],
        messaggio: 'Ogni colonna viene moltiplicata per una matrice fissa e sommata con la chiave del round. Eseguito per 10 round fino al ciphertext finale.'
      },
      msg: 'MixColumns & AddRoundKey completati.'
    }
  ]
}

function costruisciPassiSHA256() {
  passi.value = [
    {
      crypto: {
        fase: '1. Padding & Espansione Messaggio',
        formula: 'Msg || 1 || 0...0 || Lunghezza (64-bit) = 512 bit',
        registri: { 'Blocco': '512 bit', 'Schedule W': '64 parole da 32 bit' },
        messaggio: 'Il messaggio in ingresso viene completato con bit 1, zeri e lunghezza a 64-bit per raggiungere un blocco multiplo di 512 bit.'
      },
      msg: 'SHA-256: preparazione blocco dati e schedule W.'
    },
    {
      crypto: {
        fase: '2. Inizializzazione 8 Registri (A - H)',
        formula: 'Valori iniziali derivati da radici di numeri primi',
        registri: { A: '6a09e667', B: 'bb67ae85', C: '3c6ef372', D: 'a54ff53a', E: '510e527f', F: '9b05688c', G: '1f83d9ab', H: '5be0cd19' },
        messaggio: 'Gli 8 registri di stato contengono le costanti iniziali standard.'
      },
      msg: 'Registri di stato caricati.'
    },
    {
      crypto: {
        fase: '3. Round di Compressione (64 iterazioni)',
        formula: 'T₁ = H + Σ₁(E) + Ch(E,F,G) + Kₜ + Wₜ | T₂ = Σ₀(A) + Maj(A,B,C)',
        registri: { 'T1': 'e4b29c11', 'T2': 'a0914c82', 'A_new': '8544e893', 'E_new': '36bfe190' },
        messaggio: 'Ogni round mescola i registri tramite funzioni bitwise non invertibili: Ch (Choose), Maj (Majority) e rotazioni Σ.'
      },
      msg: 'Compressione bitwise in corso.'
    },
    {
      crypto: {
        fase: '4. Digest Finale a 256 Bit (Hash Esadecimale)',
        formula: 'H₀..H₇ concatenati in stringa hex di 64 caratteri',
        registri: { 'Digest SHA-256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
        messaggio: 'Impronta digitale a senso unico prodotta! Effetto valanga: anche cambiare 1 solo bit dell\'input modifica oltre il 50% dell\'hash.'
      },
      msg: 'Hash SHA-256 calcolato con successo.'
    }
  ]
}

function costruisciPassiDiffieHellman() {
  passi.value = [
    {
      crypto: {
        fase: '1. Parametri Pubblici Condivisi',
        formula: 'Numero primo p = 23, Generatore base g = 5',
        registri: { Primo_p: 23, Generatore_g: 5 },
        messaggio: 'Alice e Bob concordano in chiaro due numeri pubblici: un numero primo p=23 e una base g=5.'
      },
      msg: 'Diffie-Hellman: pubblicazione parametri p e g.'
    },
    {
      crypto: {
        fase: '2. Generazione Segreti Privati & Chiavi Pubbliche',
        formula: 'A = gᵃ mod p | B = gᵇ mod p',
        registri: { 'Alice privato a': 6, 'Alice pubblico A': 8, 'Bob privato b': 15, 'Bob pubblico B': 19 },
        messaggio: 'Alice sceglie a=6 segreto -> A = 5⁶ mod 23 = 8. Bob sceglie b=15 segreto -> B = 5¹⁵ mod 23 = 19.'
      },
      msg: 'Calcolo delle rispettive chiavi pubbliche.'
    },
    {
      crypto: {
        fase: '3. Scambio su Canale Inviolabile',
        formula: 'Alice invia A=8 a Bob; Bob invia B=19 ad Alice',
        registri: { 'Intercettatore Eve vede': 'p=23, g=5, A=8, B=19' },
        messaggio: 'Le chiavi pubbliche si incrociano sulla rete. Risolvere il logaritmo discreto per trovare a o b è computazionalmente intrattabile.'
      },
      msg: 'Scambio pubblico avvenuto.'
    },
    {
      crypto: {
        fase: '4. Calcolo del Segreto Condiviso Simmetrico',
        formula: 'Alice: s = Bᵃ mod p = 19⁶ mod 23 = 2 | Bob: s = Aᵇ mod p = 8¹⁵ mod 23 = 2',
        registri: { 'Chiave Segreta Condivisa (s)': '2' },
        messaggio: 'Entrambi arrivano allo stesso valore s = 2! Ora possono usare s per cifrare le comunicazioni con AES simmetrico.'
      },
      msg: 'Chiave simmetrica negoziata con successo.'
    }
  ]
}

// -------------------------------------------------------------
// 5. SIMULATORI COMPRESSIONE DATI
// -------------------------------------------------------------
function costruisciPassiHuffman() {
  passi.value = [
    {
      compressione: {
        stringaOriginale: 'ABRACADABRA',
        simboli: [
          { char: 'A', freq: 5 },
          { char: 'B', freq: 2 },
          { char: 'R', freq: 2 },
          { char: 'C', freq: 1 },
          { char: 'D', freq: 1 }
        ],
        alberoCodici: [],
        dizionario: []
      },
      msg: 'Huffman: calcolo le frequenze dei caratteri nel testo "ABRACADABRA" (11 caratteri = 88 bit in ASCII standard).'
    },
    {
      compressione: {
        stringaOriginale: 'ABRACADABRA',
        simboli: [
          { char: 'A', freq: 5 },
          { char: 'B', freq: 2 },
          { char: 'R', freq: 2 },
          { char: 'CD', freq: 2 }
        ],
        alberoCodici: [{ nodo: 'C+D', freqTot: 2 }],
        dizionario: []
      },
      msg: 'Fondo i due nodi con frequenza minore: C (1) + D (1) -> nodo CD (peso 2).'
    },
    {
      compressione: {
        stringaOriginale: 'ABRACADABRA',
        simboli: [
          { char: 'A', freq: 5 },
          { char: 'BR', freq: 4 },
          { char: 'CD', freq: 2 }
        ],
        alberoCodici: [{ nodo: 'B+R', freqTot: 4 }],
        dizionario: []
      },
      msg: 'Fondo B (2) + R (2) -> nodo BR (peso 4).'
    },
    {
      compressione: {
        stringaOriginale: 'ABRACADABRA',
        simboli: [
          { char: 'A', freq: 5 },
          { char: 'CDBR', freq: 6 }
        ],
        alberoCodici: [{ nodo: 'Radice', freqTot: 11 }],
        dizionario: [
          { char: 'A', bits: '0', len: 1 },
          { char: 'B', bits: '110', len: 3 },
          { char: 'R', bits: '111', len: 3 },
          { char: 'C', bits: '100', len: 3 },
          { char: 'D', bits: '101', len: 3 }
        ]
      },
      msg: 'Albero binario completato! Simbolo frequente "A" codificato in 1 bit ("0"). Dimensione finale compressa: 23 bit (-73.8%)!'
    }
  ]
}

function costruisciPassiLZW() {
  passi.value = [
    {
      compressione: {
        stringaOriginale: 'TOBEORNOTTOBE',
        dizionario: [
          { code: 1, string: 'B' },
          { code: 2, string: 'E' },
          { code: 3, string: 'N' },
          { code: 4, string: 'O' },
          { code: 5, string: 'R' },
          { code: 6, string: 'T' }
        ],
        outputToken: []
      },
      msg: 'LZW: inizializzo il dizionario con l\'alfabeto di base dei singoli caratteri.'
    },
    {
      compressione: {
        stringaOriginale: 'TOBEORNOTTOBE',
        dizionario: [
          { code: 1, string: 'B' },
          { code: 2, string: 'E' },
          { code: 3, string: 'N' },
          { code: 4, string: 'O' },
          { code: 5, string: 'R' },
          { code: 6, string: 'T' },
          { code: 7, string: 'TO' }
        ],
        outputToken: [6]
      },
      msg: 'Leggo "T", prossimo "O". "TO" non è nel dizionario -> Emetto token 6 ("T") e aggiungo #7="TO".'
    },
    {
      compressione: {
        stringaOriginale: 'TOBEORNOTTOBE',
        dizionario: [
          { code: 1, string: 'B' },
          { code: 2, string: 'E' },
          { code: 3, string: 'N' },
          { code: 4, string: 'O' },
          { code: 5, string: 'R' },
          { code: 6, string: 'T' },
          { code: 7, string: 'TO' },
          { code: 8, string: 'OB' },
          { code: 9, string: 'BE' }
        ],
        outputToken: [6, 4, 1]
      },
      msg: 'Avanzo: emetto token 4 ("O"), 1 ("B"). Il dizionario cresce dinamicamente ad ogni nuovo prefisso incontrato.'
    },
    {
      compressione: {
        stringaOriginale: 'TOBEORNOTTOBE',
        dizionario: [
          { code: 7, string: 'TO' },
          { code: 8, string: 'OB' },
          { code: 9, string: 'BE' },
          { code: 10, string: 'EO' },
          { code: 11, string: 'OR' },
          { code: 12, string: 'RN' },
          { code: 13, string: 'NO' },
          { code: 14, string: 'OT' },
          { code: 15, string: 'TT' },
          { code: 16, string: 'TOB' }
        ],
        outputToken: [6, 4, 1, 2, 4, 5, 3, 4, 6, 7, 2]
      },
      msg: 'Incontra di nuovo "TO": emette direttamente il token singolo 7! Compressione one-pass senza trasmissione di tabelle.'
    }
  ]
}

// -------------------------------------------------------------
// 6. SIMULATORI MACHINE LEARNING & OTTIMIZZAZIONE
// -------------------------------------------------------------
function costruisciPassiGradientDescent() {
  passi.value = [
    {
      ml: {
        tipo: 'gradient-descent',
        theta: 3.8,
        cost: 14.44,
        grad: 7.6,
        passo: 0,
        tangente: { slope: 7.6, intercept: -14.44 }
      },
      msg: 'Gradient Descent: minimizzo J(θ) = θ² con learning rate α = 0.4. Punto iniziale θ = 3.8, Costo = 14.44.'
    },
    {
      ml: {
        tipo: 'gradient-descent',
        theta: 0.76,
        cost: 0.58,
        grad: 1.52,
        passo: 1,
        tangente: { slope: 1.52, intercept: -0.58 }
      },
      msg: 'Iterazione 1: Calcolo gradiente dJ/dθ = 2θ = 7.6. Aggiorno: θ := θ - α(7.6) = 0.76. Il costo crolla a 0.58!'
    },
    {
      ml: {
        tipo: 'gradient-descent',
        theta: 0.15,
        cost: 0.02,
        grad: 0.3,
        passo: 2,
        tangente: { slope: 0.3, intercept: -0.02 }
      },
      msg: 'Iterazione 2: Gradiente = 1.52. Aggiorno θ := 0.76 - 0.4(1.52) = 0.15. Costo = 0.02.'
    },
    {
      ml: {
        tipo: 'gradient-descent',
        theta: 0.03,
        cost: 0.001,
        grad: 0.06,
        passo: 3,
        tangente: { slope: 0.06, intercept: 0 }
      },
      msg: 'Iterazione 3: Convergenza raggiunta! Gradiente ≈ 0, parametri ottimali θ ≈ 0.00 trovati al minimo globale.'
    }
  ]
}

function costruisciPassiKMeans() {
  const punti = [
    { id: 1, x: 70, y: 50, cluster: 0 },
    { id: 2, x: 90, y: 70, cluster: 0 },
    { id: 3, x: 60, y: 90, cluster: 0 },
    { id: 4, x: 110, y: 60, cluster: 0 },
    { id: 5, x: 80, y: 110, cluster: 0 },
    { id: 6, x: 320, y: 120, cluster: 1 },
    { id: 7, x: 350, y: 140, cluster: 1 },
    { id: 8, x: 310, y: 160, cluster: 1 },
    { id: 9, x: 370, y: 110, cluster: 1 },
    { id: 10, x: 340, y: 170, cluster: 1 }
  ]

  passi.value = [
    {
      ml: {
        tipo: 'k-means',
        punti: punti.map(p => ({ ...p, cluster: -1 })),
        centroidi: [
          { id: 0, x: 140, y: 50, colore: 'var(--accento)' },
          { id: 1, x: 260, y: 150, colore: '#06b6d4' }
        ]
      },
      msg: 'K-Means (K=2): Posiziono inizialmente 2 centroidi casuali nello spazio bidimensionale.'
    },
    {
      ml: {
        tipo: 'k-means',
        punti: punti.map(p => ({ ...p })),
        centroidi: [
          { id: 0, x: 140, y: 50, colore: 'var(--accento)' },
          { id: 1, x: 260, y: 150, colore: '#06b6d4' }
        ]
      },
      msg: 'Fase di Assegnazione: ogni punto viene associato al centroide euclideo più vicino.'
    },
    {
      ml: {
        tipo: 'k-means',
        punti: punti.map(p => ({ ...p })),
        centroidi: [
          { id: 0, x: 82, y: 76, colore: 'var(--accento)' },
          { id: 1, x: 338, y: 140, colore: '#06b6d4' }
        ]
      },
      msg: 'Fase di Aggiornamento: ricalcolo la posizione dei centroidi come media delle coordinate dei punti appartenenti al cluster.'
    },
    {
      ml: {
        tipo: 'k-means',
        punti: punti.map(p => ({ ...p })),
        centroidi: [
          { id: 0, x: 82, y: 76, colore: 'var(--accento)' },
          { id: 1, x: 338, y: 140, colore: '#06b6d4' }
        ]
      },
      msg: 'Convergenza! I centroidi non si spostano più. Segmentazione ottimale dei due cluster completata.'
    }
  ]
}

function costruisciPassiKNN() {
  const puntiTraining = [
    { id: 1, x: 100, y: 70, classe: 'A' },
    { id: 2, x: 140, y: 90, classe: 'A' },
    { id: 3, x: 160, y: 60, classe: 'A' },
    { id: 4, x: 120, y: 120, classe: 'A' },
    { id: 5, x: 310, y: 110, classe: 'B' },
    { id: 6, x: 290, y: 150, classe: 'B' },
    { id: 7, x: 240, y: 100, classe: 'A' },
    { id: 8, x: 330, y: 80, classe: 'B' }
  ]

  passi.value = [
    {
      ml: {
        tipo: 'knn',
        punti: puntiTraining,
        puntoQuery: { x: 190, y: 95 },
        viciniK: [],
        raggioCerchio: 0,
        predizione: ''
      },
      msg: 'K-Nearest Neighbors (KNN con K=3): compare un nuovo campione sconosciuto X (arancione) da classificare.'
    },
    {
      ml: {
        tipo: 'knn',
        punti: puntiTraining,
        puntoQuery: { x: 190, y: 95 },
        viciniK: [3, 2, 7],
        raggioCerchio: 58,
        predizione: ''
      },
      msg: 'Calcolo le distanze euclidee da X a tutti i punti di training e individuo i K=3 vicini più prossimi.'
    },
    {
      ml: {
        tipo: 'knn',
        punti: puntiTraining,
        puntoQuery: { x: 190, y: 95 },
        viciniK: [3, 2, 7],
        raggioCerchio: 58,
        predizione: 'Classe A'
      },
      msg: 'Votazione a maggioranza: 3 su 3 vicini appartengono alla Classe A -> Il punto X viene classificato come Classe A!'
    }
  ]
}

// -------------------------------------------------------------
// APPLICAZIONE PASSO & GESTIONE TIMING
// -------------------------------------------------------------
function applicaPasso(idx) {
  if (!passi.value || passi.value.length === 0) return
  const p = passi.value[idx]
  if (!p) return

  messaggioStato.value = p.msg

  // 1. Array
  if (p.arr) arrayDati.value = [...p.arr]
  if (p.highlight) indiciEvidenziati.value = [...p.highlight]
  if (p.pivot !== undefined) indicePivot.value = p.pivot
  if (p.ordinati) indiciOrdinati.value = [...p.ordinati]
  if (p.mid !== undefined) indicePivot.value = p.mid

  // 2. Grafi
  if (p.stati) {
    Object.keys(p.stati).forEach(id => {
      statoNodi.value[id] = {
        stato: p.stati[id],
        dist: p.dist ? p.dist[id] : ''
      }
    })
  }
  if (p.archi) {
    archiAttivi.value = [...p.archi]
  }

  // 3. Crypto
  if (p.crypto) {
    statoCrypto.value = { ...p.crypto }
  }

  // 4. Compressione
  if (p.compressione) {
    statoCompressione.value = { ...p.compressione }
  }

  // 5. ML
  if (p.ml) {
    statoML.value = { ...p.ml }
  }
}

function isArcoAttivo(da, a) {
  return archiAttivi.value.some(
    edge => (edge.da === da && edge.a === a) || (edge.da === a && edge.a === da)
  )
}

function avvia() {
  if (inEsecuzione.value) return
  inEsecuzione.value = true

  timerEsecuzione = setInterval(() => {
    if (indicePasso.value < passi.value.length - 1) {
      indicePasso.value++
      applicaPasso(indicePasso.value)
    } else {
      ferma()
    }
  }, velocitaMs.value)
}

function ferma() {
  inEsecuzione.value = false
  if (timerEsecuzione) {
    clearInterval(timerEsecuzione)
    timerEsecuzione = null
  }
}

function passoSuccessivo() {
  ferma()
  if (indicePasso.value < passi.value.length - 1) {
    indicePasso.value++
    applicaPasso(indicePasso.value)
  }
}

function passoPrecedente() {
  ferma()
  if (indicePasso.value > 0) {
    indicePasso.value--
    applicaPasso(indicePasso.value)
  }
}

function resetta() {
  ferma()
  indicePasso.value = 0
  applicaPasso(0)
}

watch(() => props.algoritmoId, () => {
  generaNuoviDati()
})

onMounted(() => {
  generaNuoviDati()
})

onUnmounted(() => {
  ferma()
})
</script>

<template>
  <div class="visualizzatore-box">
    <!-- Barra Controlli Interattivi -->
    <div class="pannello-controlli">
      <div class="gruppo-pulsanti">
        <button
          v-if="!inEsecuzione"
          type="button"
          class="btn-controllo btn-play"
          :title="isItalian ? 'Avvia simulazione' : 'Start simulation'"
          @click="avvia"
        >
          ▶ {{ t('vis.avvia') }}
        </button>
        <button
          v-else
          type="button"
          class="btn-controllo btn-pause"
          :title="isItalian ? 'Pausa' : 'Pause'"
          @click="ferma"
        >
          ⏸ {{ t('vis.pausa') }}
        </button>

        <button
          type="button"
          class="btn-controllo"
          :disabled="indicePasso <= 0"
          :title="t('vis.passoPrec')"
          @click="passoPrecedente"
        >
          ⏮
        </button>

        <button
          type="button"
          class="btn-controllo"
          :disabled="indicePasso >= passi.length - 1"
          :title="t('vis.passoSucc')"
          @click="passoSuccessivo"
        >
          ⏭
        </button>

        <button
          type="button"
          class="btn-controllo"
          :title="isItalian ? 'Ricomincia dall\'inizio' : 'Reset to beginning'"
          @click="resetta"
        >
          ↺ {{ t('vis.reset') }}
        </button>

        <button
          type="button"
          class="btn-controllo btn-nuovo"
          :title="isItalian ? 'Genera nuovi dati per la simulazione' : 'Generate new simulation data'"
          @click="generaNuoviDati"
        >
          🎲 {{ t('vis.nuoviDati') }}
        </button>
      </div>

      <div class="controlli-velocita">
        <span class="label-velocita">{{ t('vis.velocita') }}</span>
        <input
          v-model.number="velocitaMs"
          type="range"
          min="200"
          max="1500"
          step="50"
          class="slider-velocita"
          title="Regola velocità simulazione"
        />
        <span class="valore-passo">{{ indicePasso + 1 }}/{{ passi.length }}</span>
      </div>
    </div>

    <!-- Area Grafica Adattiva per Tipologia -->
    <div class="area-grafica">
      <!-- 1. Array & Sorting / Searching -->
      <div v-if="tipoVisualizzatore === 'array'" class="grafico-barre">
        <div
          v-for="(val, i) in arrayDati"
          :key="i"
          class="barra-colonna"
        >
          <div
            class="barra-rettangolo"
            :class="{
              'evidenziata': indiciEvidenziati.includes(i),
              'pivot': indicePivot === i,
              'ordinata': indiciOrdinati.includes(i)
            }"
            :style="{ height: `${Math.max(val * 2.2, 28)}px` }"
          >
            <span class="valore-barra">{{ val }}</span>
          </div>
          <span class="indice-barra">[{{ i }}]</span>
        </div>
      </div>

      <!-- 2. Grafi & Reti SVG -->
      <div v-else-if="tipoVisualizzatore === 'grafo'" class="grafico-rete">
        <svg viewBox="0 0 460 170" class="svg-grafo">
          <!-- Archi -->
          <g v-for="(arco, index) in archiGrafo" :key="index">
            <line
              :x1="nodiGrafo[arco.da].x"
              :y1="nodiGrafo[arco.da].y"
              :x2="nodiGrafo[arco.a].x"
              :y2="nodiGrafo[arco.a].y"
              class="linea-arco"
              :class="{ 'arco-attivo': isArcoAttivo(arco.da, arco.a) }"
            />
            <text
              :x="(nodiGrafo[arco.da].x + nodiGrafo[arco.a].x) / 2"
              :y="(nodiGrafo[arco.da].y + nodiGrafo[arco.a].y) / 2 - 6"
              class="testo-peso"
            >
              {{ arco.peso }}
            </text>
          </g>

          <!-- Nodi -->
          <g v-for="nodo in nodiGrafo" :key="nodo.id">
            <circle
              :cx="nodo.x"
              :cy="nodo.y"
              r="18"
              class="nodo-cerchio"
              :class="statoNodi[nodo.id]?.stato"
            />
            <text :x="nodo.x" :y="nodo.y + 4" class="nodo-testo">
              {{ nodo.label.charAt(0) }}
            </text>
            <text :x="nodo.x" :y="nodo.y + 32" class="nodo-distanza">
              {{ statoNodi[nodo.id]?.dist !== undefined ? `${statoNodi[nodo.id]?.dist}` : '' }}
            </text>
          </g>
        </svg>
      </div>

      <!-- 3. Crittografia & Hashing Pipeline -->
      <div v-else-if="tipoVisualizzatore === 'crypto'" class="grafico-crypto">
        <div class="crypto-header-box">
          <span class="crypto-titolo-fase">{{ statoCrypto.fase }}</span>
          <code v-if="statoCrypto.formula" class="crypto-formula">{{ statoCrypto.formula }}</code>
        </div>

        <!-- Matrice di Stato AES 4x4 se presente -->
        <div v-if="statoCrypto.matriceState && statoCrypto.matriceState.length > 0" class="aes-matrice-box">
          <span class="aes-matrice-titolo">Matrice di Stato AES 4×4 (Byte Hex)</span>
          <div class="aes-grid">
            <div
              v-for="(riga, r) in statoCrypto.matriceState"
              :key="r"
              class="aes-riga"
            >
              <span v-for="(byteVal, c) in riga" :key="c" class="aes-cella">
                {{ byteVal }}
              </span>
            </div>
          </div>
        </div>

        <!-- Registri / Valori Matematici -->
        <div v-else-if="statoCrypto.registri && Object.keys(statoCrypto.registri).length > 0" class="crypto-registri-grid">
          <div
            v-for="(val, key) in statoCrypto.registri"
            :key="key"
            class="scheda-registro"
          >
            <span class="chiave-reg">{{ key }}</span>
            <span class="valore-reg">{{ val }}</span>
          </div>
        </div>
      </div>

      <!-- 4. Compressione Dati -->
      <div v-else-if="tipoVisualizzatore === 'compressione'" class="grafico-compressione">
        <div class="compressione-stream">
          <span class="label-stream">Testo di input:</span>
          <span class="valore-stream">{{ statoCompressione.stringaOriginale }}</span>
        </div>

        <!-- Tabella Frequenze / Simboli Huffman -->
        <div v-if="statoCompressione.simboli && statoCompressione.simboli.length > 0" class="comp-tabelle">
          <div class="comp-colonna">
            <span class="comp-colonna-titolo">Frequenze Min-Heap</span>
            <div class="lista-badge-comp">
              <div v-for="(s, idx) in statoCompressione.simboli" :key="idx" class="badge-simbolo">
                <span class="simbolo-char">'{{ s.char }}'</span>
                <span class="simbolo-freq">{{ s.freq }}</span>
              </div>
            </div>
          </div>

          <div v-if="statoCompressione.dizionario && statoCompressione.dizionario.length > 0" class="comp-colonna">
            <span class="comp-colonna-titolo">Codici Prefissi Generati</span>
            <div class="lista-badge-comp">
              <div v-for="(d, idx) in statoCompressione.dizionario" :key="idx" class="badge-codice">
                <span class="simbolo-char">'{{ d.char }}'</span>
                <span class="simbolo-bit">&rarr; {{ d.bits }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Output Token LZW -->
        <div v-if="statoCompressione.outputToken && statoCompressione.outputToken.length > 0" class="lzw-output-box">
          <span class="label-stream">Flusso Token Compressi (LZW):</span>
          <div class="tokens-flusso">
            <span v-for="(tk, i) in statoCompressione.outputToken" :key="i" class="token-chip">#{{ tk }}</span>
          </div>
        </div>
      </div>

      <!-- 5. Machine Learning & Ottimizzazione -->
      <div v-else-if="tipoVisualizzatore === 'ml'" class="grafico-ml">
        <!-- Parabola Gradient Descent -->
        <div v-if="statoML.tipo === 'gradient-descent'" class="ml-parabola-wrap">
          <svg viewBox="-4.5 -1 9 18" class="svg-parabola">
            <!-- Asse X e Y -->
            <line x1="-4" y1="0" x2="4" y2="0" stroke="var(--bordo-medio)" stroke-width="0.1" />
            <line x1="0" y1="0" x2="0" y2="16" stroke="var(--bordo-medio)" stroke-width="0.1" />

            <!-- Curva J(θ) = θ² -->
            <path
              d="M -4 16 Q 0 -2 4 16"
              fill="none"
              stroke="var(--accento)"
              stroke-width="0.25"
            />

            <!-- Punto corrente -->
            <circle
              v-if="statoML.theta !== undefined"
              :cx="statoML.theta"
              :cy="statoML.cost"
              r="0.3"
              fill="#10b981"
            />
          </svg>
          <div class="ml-stats">
            <span><strong>θ attuale:</strong> {{ statoML.theta }}</span>
            <span><strong>Costo J(θ):</strong> {{ statoML.cost }}</span>
            <span><strong>Gradiente:</strong> {{ statoML.grad }}</span>
          </div>
        </div>

        <!-- Scatter 2D per K-Means e KNN -->
        <div v-else class="ml-scatter-wrap">
          <svg viewBox="0 0 420 200" class="svg-scatter">
            <!-- Cerchio Raggio KNN -->
            <circle
              v-if="statoML.puntoQuery && statoML.raggioCerchio > 0"
              :cx="statoML.puntoQuery.x"
              :cy="statoML.puntoQuery.y"
              :r="statoML.raggioCerchio"
              fill="rgba(249, 115, 22, 0.08)"
              stroke="var(--accento)"
              stroke-dasharray="4 3"
              stroke-width="1.5"
            />

            <!-- Punti Training / Dataset -->
            <g v-for="p in statoML.punti" :key="p.id">
              <circle
                :cx="p.x"
                :cy="p.y"
                r="7"
                class="scatter-dot"
                :class="{
                  'cluster-0': p.cluster === 0 || p.classe === 'A',
                  'cluster-1': p.cluster === 1 || p.classe === 'B',
                  'vicino-attivo': statoML.viciniK?.includes(p.id)
                }"
              />
            </g>

            <!-- Centroidi K-Means -->
            <g v-for="c in statoML.centroidi" :key="c.id">
              <rect
                :x="c.x - 7"
                :y="c.y - 7"
                width="14"
                height="14"
                class="centroide-cross"
                :fill="c.colore"
              />
            </g>

            <!-- Query Point per KNN -->
            <g v-if="statoML.puntoQuery">
              <circle
                :cx="statoML.puntoQuery.x"
                :cy="statoML.puntoQuery.y"
                r="9"
                fill="var(--accento)"
                stroke="#ffffff"
                stroke-width="2"
              />
              <text
                :x="statoML.puntoQuery.x"
                :y="statoML.puntoQuery.y + 4"
                text-anchor="middle"
                fill="#ffffff"
                font-size="10"
                font-weight="bold"
              >
                X
              </text>
            </g>
          </svg>
          <div v-if="statoML.predizione" class="knn-predizione-box">
            Predizione KNN: <strong>{{ statoML.predizione }}</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticker Informativo del Passo -->
    <div class="pannello-spiegazione">
      <span class="icona-spiegazione">💡</span>
      <p class="testo-spiegazione">{{ messaggioStato }}</p>
    </div>
  </div>
</template>

<style scoped>
.visualizzatore-box {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--ombra-scheda);
}

.pannello-controlli {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: var(--bg-superficie-elevata);
  border-bottom: 1px solid var(--bordo-sottile);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.gruppo-pulsanti {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.btn-controllo {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-medio);
  color: var(--testo-primario);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.btn-controllo:hover:not(:disabled) {
  border-color: var(--accento-bordo);
  color: var(--accento);
}

.btn-controllo:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-play {
  background: var(--accento);
  color: var(--accento-contrasto);
  border-color: transparent;
}

.btn-play:hover {
  background: var(--accento-hover);
  color: var(--accento-contrasto);
}

.btn-pause {
  background: #eab308;
  color: #111;
  border-color: transparent;
}

.controlli-velocita {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.label-velocita {
  font-size: 0.8rem;
  color: var(--testo-secondario);
}

.slider-velocita {
  width: 90px;
  accent-color: var(--accento);
  cursor: pointer;
}

.valore-passo {
  font-size: 0.8rem;
  font-weight: 650;
  color: var(--accento);
}

/* Area Grafica */
.area-grafica {
  padding: 2.25rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 270px;
  background: var(--bg-primario);
}

/* 1. Barre (Sorting/Searching) */
.grafico-barre {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.85rem;
  width: 100%;
  max-width: 650px;
  height: 220px;
}

.barra-colonna {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.barra-rettangolo {
  width: 100%;
  background: var(--bg-superficie-elevata);
  border: 1px solid var(--bordo-medio);
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 0.35rem;
  transition: height 0.25s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.valore-barra {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--testo-primario);
}

.indice-barra {
  margin-top: 0.4rem;
  font-size: 0.72rem;
  color: var(--testo-terziario);
  font-family: ui-monospace, monospace;
}

.barra-rettangolo.evidenziata {
  background: var(--accento);
  border-color: var(--accento-hover);
}

.barra-rettangolo.evidenziata .valore-barra {
  color: var(--accento-contrasto);
}

.barra-rettangolo.pivot {
  background: #f59e0b;
  border-color: #d97706;
}

.barra-rettangolo.pivot .valore-barra {
  color: #111;
}

.barra-rettangolo.ordinata {
  background: #10b981;
  border-color: #059669;
}

.barra-rettangolo.ordinata .valore-barra {
  color: #fff;
}

/* 2. Grafi SVG */
.grafico-rete {
  width: 100%;
  max-width: 500px;
}

.svg-grafo {
  width: 100%;
  height: auto;
}

.linea-arco {
  stroke: var(--bordo-medio);
  stroke-width: 2;
  transition: stroke 0.25s ease, stroke-width 0.25s ease;
}

.linea-arco.arco-attivo {
  stroke: var(--accento);
  stroke-width: 3.5;
}

.testo-peso {
  fill: var(--testo-terziario);
  font-size: 11px;
  font-weight: 600;
  text-anchor: middle;
}

.nodo-cerchio {
  fill: var(--bg-superficie);
  stroke: var(--bordo-medio);
  stroke-width: 2.5;
  transition: all 0.25s ease;
}

.nodo-cerchio.visiting {
  fill: var(--accento);
  stroke: var(--accento-hover);
}

.nodo-cerchio.visitato {
  fill: #10b981;
  stroke: #059669;
}

.nodo-cerchio.tentativo {
  fill: #f59e0b;
  stroke: #d97706;
}

.nodo-cerchio.target {
  fill: #8b5cf6;
  stroke: #7c3aed;
}

.nodo-cerchio.start {
  fill: var(--accento);
  stroke: var(--accento-bordo);
}

.nodo-testo {
  fill: var(--testo-primario);
  font-size: 13px;
  font-weight: 800;
  text-anchor: middle;
}

.nodo-distanza {
  fill: var(--accento);
  font-size: 11px;
  font-weight: 700;
  text-anchor: middle;
}

/* 3. Crittografia */
.grafico-crypto {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.crypto-header-box {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: var(--bg-superficie);
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--bordo-medio);
}

.crypto-titolo-fase {
  font-weight: 750;
  font-size: 0.95rem;
  color: var(--accento);
}

.crypto-formula {
  font-size: 0.82rem;
  font-family: ui-monospace, monospace;
  color: var(--testo-secondario);
  word-break: break-all;
}

.aes-matrice-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.aes-matrice-titolo {
  font-size: 0.8rem;
  color: var(--testo-terziario);
  font-weight: 600;
}

.aes-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--bg-superficie-elevata);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--bordo-medio);
}

.aes-riga {
  display: flex;
  gap: 4px;
}

.aes-cella {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  border-radius: 4px;
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--testo-primario);
}

.crypto-registri-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.65rem;
}

.scheda-registro {
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-sottile);
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.chiave-reg {
  font-size: 0.72rem;
  font-weight: 650;
  color: var(--testo-terziario);
}

.valore-reg {
  font-family: ui-monospace, monospace;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--testo-primario);
  word-break: break-all;
}

/* 4. Compressione */
.grafico-compressione {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.compressione-stream {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: var(--bg-superficie);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--bordo-medio);
}

.label-stream {
  font-size: 0.82rem;
  font-weight: 650;
  color: var(--testo-secondario);
}

.valore-stream {
  font-family: ui-monospace, monospace;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--accento);
}

.comp-tabelle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.comp-colonna {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.comp-colonna-titolo {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--testo-terziario);
  text-transform: uppercase;
}

.lista-badge-comp {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.badge-simbolo, .badge-codice {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.6rem;
  background: var(--bg-superficie);
  border: 1px solid var(--bordo-medio);
  border-radius: 6px;
  font-size: 0.8rem;
}

.simbolo-char {
  font-weight: 700;
  color: var(--testo-primario);
}

.simbolo-freq, .simbolo-bit {
  font-weight: 750;
  color: var(--accento);
  font-family: ui-monospace, monospace;
}

.lzw-output-box {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.tokens-flusso {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.token-chip {
  padding: 0.25rem 0.5rem;
  background: var(--accento-sfondo);
  border: 1px solid var(--accento-bordo);
  border-radius: 4px;
  color: var(--accento);
  font-size: 0.82rem;
  font-weight: 700;
  font-family: ui-monospace, monospace;
}

/* 5. Machine Learning */
.grafico-ml {
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.ml-parabola-wrap, .ml-scatter-wrap {
  width: 100%;
}

.svg-parabola, .svg-scatter {
  width: 100%;
  max-height: 200px;
}

.ml-stats {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: var(--testo-secondario);
}

.scatter-dot {
  fill: var(--testo-terziario);
  transition: all 0.2s ease;
}

.scatter-dot.cluster-0 {
  fill: var(--accento);
}

.scatter-dot.cluster-1 {
  fill: #06b6d4;
}

.scatter-dot.vicino-attivo {
  stroke: #ffffff;
  stroke-width: 2.5;
}

.centroide-cross {
  stroke: #ffffff;
  stroke-width: 1.5;
}

.knn-predizione-box {
  text-align: center;
  padding: 0.45rem 1rem;
  background: var(--accento-sfondo);
  border: 1px solid var(--accento-bordo);
  border-radius: 6px;
  color: var(--accento);
  font-size: 0.85rem;
  font-weight: 600;
}

/* Ticker spiegazione */
.pannello-spiegazione {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.95rem 1.25rem;
  background: var(--bg-superficie);
  border-top: 1px solid var(--bordo-sottile);
}

.icona-spiegazione {
  font-size: 1.1rem;
}

.testo-spiegazione {
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--testo-primario);
  font-weight: 500;
}

@media (max-width: 600px) {
  .comp-tabelle {
    grid-template-columns: 1fr;
  }
}
</style>
