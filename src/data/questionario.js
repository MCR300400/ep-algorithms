export const DOMANDE = [
  {
    id: 'obiettivo',
    testo: 'Qual è il dominio del problema computazionale che devi risolvere?',
    sottotitolo: 'Identifica la macro-categoria del compito computazionale da svolgere.',
    opzioni: [
      {
        id: 'ordina',
        titolo: 'Ordinamento Dati',
        descrizione: 'Ordinare una sequenza di record, numeri, stringhe o tabelle.',
        pesi: { 'quick-sort': 40, 'merge-sort': 40, 'heap-sort': 35, 'insertion-sort': 30, 'bubble-sort': 20 }
      },
      {
        id: 'cerca',
        titolo: 'Ricerca di un elemento',
        descrizione: 'Individuare la posizione, presenza o indice di una chiave in una collezione.',
        pesi: { 'binary-search': 45, 'interpolation-search': 40, 'linear-search': 30 }
      },
      {
        id: 'grafo',
        titolo: 'Grafi, Reti & Alberi',
        descrizione: 'Calcolare percorsi minimi, esplorare connessioni o trovare alberi di copertura minimi (MST).',
        pesi: { 'dijkstra': 40, 'a-star': 40, 'bfs': 35, 'dfs': 35, 'bellman-ford': 35, 'kruskal': 35, 'prim': 35 }
      },
      {
        id: 'sicurezza',
        titolo: 'Crittografia, Hashing & Sicurezza',
        descrizione: 'Cifrare dati riservati, verificare integrità con digest o stabilire canali sicuri.',
        pesi: { 'aes': 45, 'rsa': 45, 'sha-256': 45, 'diffie-hellman': 45 }
      },
      {
        id: 'compressione',
        titolo: 'Compressione Dati',
        descrizione: 'Ridurre la dimensione di file, flussi di testo o payload senza perdere dati.',
        pesi: { 'huffman': 45, 'lzw': 45 }
      },
      {
        id: 'ml_ottimizzazione',
        titolo: 'Machine Learning & Ottimizzazione',
        descrizione: 'Classificare campioni, raggruppare dati non etichettati o convergere a minimi di costo.',
        pesi: { 'gradient-descent': 45, 'k-means': 45, 'knn': 45 }
      }
    ]
  },
  {
    id: 'dati_stato',
    testo: 'Qual è la natura e la struttura dei tuoi dati di input?',
    sottotitolo: 'La forma e le proprietà iniziali dei dati guidano l\'efficienza asintotica.',
    opzioni: [
      {
        id: 'array_disordinati_grandi',
        titolo: 'Array o collezioni casuali di medie o grandi dimensioni',
        descrizione: 'Dati arbitrari in memoria che necessitano di elaborazione scalabile.',
        pesi: { 'quick-sort': 30, 'merge-sort': 30, 'heap-sort': 25 }
      },
      {
        id: 'array_quasi_ordinati',
        titolo: 'Dataset piccolo o sequenza già quasi ordinata',
        descrizione: 'Pochi elementi (n < 50) o array che riceve nuovi dati poco a poco.',
        pesi: { 'insertion-sort': 35, 'linear-search': 25, 'bubble-sort': 15 }
      },
      {
        id: 'array_ordinati_uniformi',
        titolo: 'Array già ordinato con valori a distribuzione uniforme',
        descrizione: 'Array sorted dove i valori crescono in modo omogeneo (es. rubrica, timestamp).',
        pesi: { 'interpolation-search': 35, 'binary-search': 30 }
      },
      {
        id: 'grafo_pesi_positivi',
        titolo: 'Rete/grafo pesato (costi positivi) o mappa con coordinate spaziali',
        descrizione: 'Nodi connessi con pesi chilometrici, temporali o distanze euclidee.',
        pesi: { 'a-star': 35, 'dijkstra': 30, 'prim': 25, 'kruskal': 25 }
      },
      {
        id: 'grafo_non_pesato_o_albero',
        titolo: 'Grafo non pesato, labirinto o struttura gerarchica',
        descrizione: 'Connessioni binarie (esplorazione a livelli o rami in profondità).',
        pesi: { 'bfs': 35, 'dfs': 35 }
      },
      {
        id: 'grafo_pesi_negativi',
        titolo: 'Grafo con archi a costo negativo o rilevamento cicli negativi',
        descrizione: 'Modelli finanziari con arbitraggio o bilanci di dare/avere.',
        pesi: { 'bellman-ford': 40 }
      },
      {
        id: 'stringhe_e_flussi',
        titolo: 'Testo non strutturato, flusso di byte o messaggi digitali',
        descrizione: 'File binari, documenti testuali o pacchetti di rete.',
        pesi: { 'huffman': 30, 'lzw': 35, 'sha-256': 30, 'aes': 25, 'rsa': 25 }
      },
      {
        id: 'vettori_features',
        titolo: 'Matrice di coordinate / feature numeriche multidimensionali',
        descrizione: 'Campioni con coordinate quantitative per analisi o clustering.',
        pesi: { 'k-means': 35, 'knn': 35, 'gradient-descent': 30 }
      }
    ]
  },
  {
    id: 'vincolo_priorita',
    testo: 'Qual è il vincolo tecnico o la caratteristica prioritaria?',
    sottotitolo: 'Bilancia tempo di calcolo, memoria ausiliaria, stabilità e sicurezza.',
    opzioni: [
      {
        id: 'in_place_bassa_ram',
        titolo: 'Memoria critica: deve operare in-place con O(1) ausiliario',
        descrizione: 'Non è consentito allocare array di copia o strutture ausiliarie pesanti.',
        pesi: { 'heap-sort': 30, 'insertion-sort': 25, 'linear-search': 20, 'gradient-descent': 20 }
      },
      {
        id: 'stabilita_garanzia_tempo',
        titolo: 'Stabilità dell\'ordine e garanzia worst-case O(n log n)',
        descrizione: 'Nessun rallentamento imprevisto O(n²) e conservazione dell\'ordine relativo.',
        pesi: { 'merge-sort': 35, 'binary-search': 20 }
      },
      {
        id: 'euristica_verso_target',
        titolo: 'Ricerca percorso verso una destinazione precisa con euristica',
        descrizione: 'Evitare di esplorare l\'intera mappa concentrandosi verso il bersaglio.',
        pesi: { 'a-star': 40 }
      },
      {
        id: 'albero_copertura_connessione',
        titolo: 'Connettere tutti i nodi al minor costo complessivo (MST)',
        descrizione: 'Stendere fibra ottica, rete stradale o tubature minimizzando il costo totale.',
        pesi: { 'kruskal': 35, 'prim': 35 }
      },
      {
        id: 'crittografia_chiave_pubblica',
        titolo: 'Scambio di segreti su canale non sicuro o cifratura asimmetrica',
        descrizione: 'Due parti non fidate devono comunicare o concordare una chiave senza intermediari.',
        pesi: { 'diffie-hellman': 40, 'rsa': 35 }
      },
      {
        id: 'cifratura_simmetrica_veloce',
        titolo: 'Velocità estrema di cifratura hardware di blocchi di dati',
        descrizione: 'Standard simmetrico universale per file system, database o tunnel TLS.',
        pesi: { 'aes': 40 }
      },
      {
        id: 'integrita_hashing',
        titolo: 'Impronta digitale a senso unico non invertibile né manipolabile',
        descrizione: 'Verificare che un file non sia stato alterato o salvare password cifrate.',
        pesi: { 'sha-256': 40 }
      },
      {
        id: 'adattivo_senza_albero',
        titolo: 'Compressione adattiva a dizionario dinamico senza inviare tabelle',
        descrizione: 'Creare il vocabolario man mano che si scandisce il file (es. GIF, compress).',
        pesi: { 'lzw': 40 }
      },
      {
        id: 'non_supervisionato_clustering',
        titolo: 'Raggruppare dati in K insiemi omogenei senza supervisione',
        descrizione: 'Segmentare utenti o campioni sconosciuti in cluster compatti.',
        pesi: { 'k-means': 40 }
      }
    ]
  },
  {
    id: 'obiettivo_finale',
    testo: 'Quale tipo di risultato finale ti aspetti dall\'algoritmo?',
    sottotitolo: 'Specifica il formato o la garanzia dell\'output desiderato.',
    opzioni: [
      {
        id: 'array_ordinato_veloce',
        titolo: 'Collezione perfettamente ordinata in tempo medio minimo',
        descrizione: 'Ordinamento generale in-memory su architetture moderne con cache locality.',
        pesi: { 'quick-sort': 25, 'merge-sort': 20, 'heap-sort': 20 }
      },
      {
        id: 'indice_elemento_immediato',
        titolo: 'Indice esatto dell\'elemento con il minor numero di confronti',
        descrizione: 'Individuazione in tempo logaritmico O(log n) o sub-logaritmico O(log log n).',
        pesi: { 'binary-search': 25, 'interpolation-search': 25 }
      },
      {
        id: 'cammino_o_esplorazione_grafi',
        titolo: 'Cammino minimo o componenti connesse del grafo',
        descrizione: 'Sequenza di nodi ottimale o ordinamento topologico delle dipendenze.',
        pesi: { 'dijkstra': 25, 'a-star': 25, 'bfs': 20, 'dfs': 20, 'bellman-ford': 20 }
      },
      {
        id: 'sicurezza_dati_chiavi',
        titolo: 'Messaggio cifrato indecifrabile o chiave simmetrica condivisa',
        descrizione: 'Garanzia crittografica contro intercettazioni o contraffazioni.',
        pesi: { 'aes': 25, 'rsa': 25, 'diffie-hellman': 25, 'sha-256': 25 }
      },
      {
        id: 'stream_compresso',
        titolo: 'Flusso di bit compresso compatto e reversibile al 100%',
        descrizione: 'Rappresentazione binaria compatta lossless per ridurre banda e storage.',
        pesi: { 'huffman': 25, 'lzw': 25 }
      },
      {
        id: 'modello_ottimale_o_predizione',
        titolo: 'Convergenza ai parametri ottimali o predizione della classe',
        descrizione: 'Minimizzazione del gradiente o voto a maggioranza dei vicini più prossimi.',
        pesi: { 'gradient-descent': 25, 'k-means': 25, 'knn': 25 }
      }
    ]
  }
];

export function calcolaRaccomandazioni(risposte, algoritmi) {
  // risposte: { [domandaId]: opzioneId }
  const punteggi = {};
  algoritmi.forEach(a => {
    punteggi[a.id] = 0;
  });

  DOMANDE.forEach(domanda => {
    const rispostaId = risposte[domanda.id];
    if (!rispostaId) return;
    const opzione = domanda.opzioni.find(o => o.id === rispostaId);
    if (!opzione || !opzione.pesi) return;

    Object.entries(opzione.pesi).forEach(([algoId, peso]) => {
      if (punteggi[algoId] !== undefined) {
        punteggi[algoId] += peso;
      }
    });
  });

  // Trova il punteggio massimo registrato
  let maxScore = 0;
  Object.values(punteggi).forEach(val => {
    if (val > maxScore) maxScore = val;
  });

  const baseMax = Math.max(maxScore, 100);

  const raccomandati = algoritmi.map(a => {
    const rawScore = punteggi[a.id] || 0;
    const percentuale = Math.min(100, Math.max(12, Math.round((rawScore / baseMax) * 100)));
    return {
      algoritmo: a,
      punteggio: rawScore,
      percentuale
    };
  })
  .sort((a, b) => b.punteggio - a.punteggio);

  return raccomandati;
}
