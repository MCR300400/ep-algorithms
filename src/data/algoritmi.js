export const CATEGORIE = [
  'Tutti',
  'Ordinamento',
  'Ricerca',
  'Grafi & Alberi',
  'Crittografia & Hashing',
  'Compressione Dati',
  'Machine Learning & Ottimizzazione'
];

export const ALGORITMI = [
  // ==========================================
  // 1. ALGORITMI DI ORDINAMENTO (SORTING)
  // ==========================================
  {
    id: 'quick-sort',
    nome: 'Quicksort',
    categoria: 'Ordinamento',
    descrizioneBreve: 'Divide et impera basato sulla scelta di un elemento perno (pivot).',
    descrizioneDettagliata: 'Seleziona un elemento pivot e riorganizza l\'array in modo che tutti gli elementi minori del pivot si trovino a sinistra e quelli maggiori a destra. Il procedimento viene applicato ricorsivamente sui sotto-array. È in-place e ad alte prestazioni di cache.',
    complessita: { tempoMigliore: 'O(n log n)', tempoMedio: 'O(n log n)', tempoPeggiore: 'O(n²)', spazio: 'O(log n)' },
    caratteristiche: { stabile: false, inPlace: true, paradigma: 'Divide et Impera' },
    quandoUsarlo: ['Ordinamento generale in RAM ad alta velocità', 'Memoria ausiliaria limitata'],
    quandoEvitarlo: ['Se è richiesta la stabilità dell\'ordine relativo', 'Sistemi safety-critical con worst-case garantito'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def quick_sort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      java: `public class QuickSort {
    public static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high], i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }
}`,
      typescript: `export function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      c: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivot = arr[high], i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
            }
        }
        int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
        int pi = i + 1;
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      csharp: `public class QuickSort {
    public static void Sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = Partition(arr, low, high);
            Sort(arr, low, pi - 1);
            Sort(arr, pi + 1, high);
        }
    }
    private static int Partition(int[] arr, int low, int high) {
        int pivot = arr[high], i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                (arr[i], arr[j]) = (arr[j], arr[i]);
            }
        }
        (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
        return i + 1;
    }
}`
    }
  },
  {
    id: 'merge-sort',
    nome: 'Mergesort',
    categoria: 'Ordinamento',
    descrizioneBreve: 'Divide l\'array a metà ricorsivamente e fonde le parti ordinate.',
    descrizioneDettagliata: 'Divide l\'array in due metà uguali, le ordina ricorsivamente e fonde le sequenze ordinate tramite due puntatori. Garantisce stabilità e complessità asintotica O(n log n) in qualsiasi circostanza.',
    complessita: { tempoMigliore: 'O(n log n)', tempoMedio: 'O(n log n)', tempoPeggiore: 'O(n log n)', spazio: 'O(n)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Divide et Impera' },
    quandoUsarlo: ['Ordinamento stabile indispensabile', 'Linked list e strutture dati sequenziali esterne'],
    quandoEvitarlo: ['Memoria RAM severamente limitata'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left, right = merge_sort(arr[:mid]), merge_sort(arr[mid:])
    res, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: res.append(left[i]); i += 1
        else: res.append(right[j]); j += 1
    return res + left[i:] + right[j:]`,
      java: `public class MergeSort {
    public static void sort(int[] a, int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            sort(a, l, m); sort(a, m + 1, r);
            merge(a, l, m, r);
        }
    }
    private static void merge(int[] a, int l, int m, int r) {
        int[] t = new int[r - l + 1];
        int i = l, j = m + 1, k = 0;
        while (i <= m && j <= r) t[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
        while (i <= m) t[k++] = a[i++];
        while (j <= r) t[k++] = a[j++];
        System.arraycopy(t, 0, a, l, t.length);
    }
}`,
      typescript: `export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const m = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, m));
  const right = mergeSort(arr.slice(m));
  const res: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    res.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return res.concat(left.slice(i)).concat(right.slice(j));
}`,
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const m = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, m));
  const right = mergeSort(arr.slice(m));
  const res = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    res.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return res.concat(left.slice(i)).concat(right.slice(j));
}`,
      c: `void mergeSort(int a[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(a, l, m); mergeSort(a, m + 1, r);
        int n1 = m - l + 1, n2 = r - m, L[n1], R[n2];
        for (int i = 0; i < n1; i++) L[i] = a[l + i];
        for (int j = 0; j < n2; j++) R[j] = a[m + 1 + j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) a[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < n1) a[k++] = L[i++];
        while (j < n2) a[k++] = R[j++];
    }
}`,
      csharp: `public class MergeSort {
    public static void Sort(int[] a, int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            Sort(a, l, m); Sort(a, m + 1, r);
            int[] t = new int[r - l + 1];
            int i = l, j = m + 1, k = 0;
            while (i <= m && j <= r) t[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
            while (i <= m) t[k++] = a[i++];
            while (j <= r) t[k++] = a[j++];
            Array.Copy(t, 0, a, l, t.Length);
        }
    }
}`
    }
  },
  {
    id: 'heap-sort',
    nome: 'Heapsort',
    categoria: 'Ordinamento',
    descrizioneBreve: 'Utilizza una struttura dati ad albero (heap binario) per estrarre il massimo/minimo.',
    descrizioneDettagliata: 'Costruisce un max-heap dall\'array di input e scambia ripetutamente la radice (il valore massimo) con l\'ultimo elemento non ordinato, ripristinando la proprietà di heap (sift-down). Combina il tempo O(n log n) di Mergesort con lo spazio in-place O(1) di Quicksort.',
    complessita: { tempoMigliore: 'O(n log n)', tempoMedio: 'O(n log n)', tempoPeggiore: 'O(n log n)', spazio: 'O(1)' },
    caratteristiche: { stabile: false, inPlace: true, paradigma: 'Struttura ad Albero (Heap)' },
    quandoUsarlo: ['Sistemi embedded con vincoli ferrei su memoria e tempo worst-case', 'Kernel e sistemi in tempo reale'],
    quandoEvitarlo: ['Se la stabilità è necessaria o se la cache locality è fondamentale (ha salti di memoria maggiori di Quicksort)'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    l, r = 2 * i + 1, 2 * i + 2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
      java: `public class HeapSort {
    public static void sort(int[] a) {
        int n = a.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);
        for (int i = n - 1; i > 0; i--) {
            int t = a[0]; a[0] = a[i]; a[i] = t;
            heapify(a, i, 0);
        }
    }
    private static void heapify(int[] a, int n, int i) {
        int max = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && a[l] > a[max]) max = l;
        if (r < n && a[r] > a[max]) max = r;
        if (max != i) {
            int t = a[i]; a[i] = a[max]; a[max] = t;
            heapify(a, n, max);
        }
    }
}`,
      typescript: `export function heapSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr: number[], n: number, i: number) {
  let max = i, l = 2 * i + 1, r = 2 * i + 2;
  if (l < n && arr[l] > arr[max]) max = l;
  if (r < n && arr[r] > arr[max]) max = r;
  if (max !== i) {
    [arr[i], arr[max]] = [arr[max], arr[i]];
    heapify(arr, n, max);
  }
}`,
      javascript: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr, n, i) {
  let max = i, l = 2 * i + 1, r = 2 * i + 2;
  if (l < n && arr[l] > arr[max]) max = l;
  if (r < n && arr[r] > arr[max]) max = r;
  if (max !== i) {
    [arr[i], arr[max]] = [arr[max], arr[i]];
    heapify(arr, n, max);
  }
}`,
      c: `void heapify(int a[], int n, int i) {
    int max = i, l = 2*i + 1, r = 2*i + 2;
    if (l < n && a[l] > a[max]) max = l;
    if (r < n && a[r] > a[max]) max = r;
    if (max != i) {
        int t = a[i]; a[i] = a[max]; a[max] = t;
        heapify(a, n, max);
    }
}
void heapSort(int a[], int n) {
    for (int i = n/2 - 1; i >= 0; i--) heapify(a, n, i);
    for (int i = n - 1; i > 0; i--) {
        int t = a[0]; a[0] = a[i]; a[i] = t;
        heapify(a, i, 0);
    }
}`,
      csharp: `public class HeapSort {
    public static void Sort(int[] a) {
        int n = a.Length;
        for (int i = n / 2 - 1; i >= 0; i--) Heapify(a, n, i);
        for (int i = n - 1; i > 0; i--) {
            (a[0], a[i]) = (a[i], a[0]);
            Heapify(a, i, 0);
        }
    }
    private static void Heapify(int[] a, int n, int i) {
        int max = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && a[l] > a[max]) max = l;
        if (r < n && a[r] > a[max]) max = r;
        if (max != i) {
            (a[i], a[max]) = (a[max], a[i]);
            Heapify(a, n, max);
        }
    }
}`
    }
  },
  {
    id: 'insertion-sort',
    nome: 'Insertion Sort',
    categoria: 'Ordinamento',
    descrizioneBreve: 'Inserisce ciascun elemento al suo posto corretto; efficiente su dataset quasi ordinati.',
    descrizioneDettagliata: 'Costruisce l\'array ordinato un elemento alla volta scorrendo e spostando a destra gli elementi maggiori per fare spazio al nuovo inserimento. Presenta overhead computazionale minimo ed è eccellente su dataset quasi ordinati (tempo O(n)) o piccoli (N < 30).',
    complessita: { tempoMigliore: 'O(n)', tempoMedio: 'O(n²)', tempoPeggiore: 'O(n²)', spazio: 'O(1)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Costruzione Incrementale' },
    quandoUsarlo: ['Dataset piccoli o già quasi completamente ordinati', 'Come algoritmo base ricorsivo nei framework ibridi (Timsort)'],
    quandoEvitarlo: ['Dataset medio-grandi casuali o inversamente ordinati'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      java: `public class InsertionSort {
    public static void sort(int[] a) {
        for (int i = 1; i < a.length; i++) {
            int key = a[i], j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
    }
}`,
      typescript: `export function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      c: `void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}`,
      csharp: `public class InsertionSort {
    public static void Sort(int[] a) {
        for (int i = 1; i < a.Length; i++) {
            int key = a[i], j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
    }
}`
    }
  },
  {
    id: 'bubble-sort',
    nome: 'Bubble Sort',
    categoria: 'Ordinamento',
    descrizioneBreve: 'Confronta e scambia elementi adiacenti; utile a scopo didattico.',
    descrizioneDettagliata: 'Effettua ripetute passate attraverso l\'array scambiando coppie adiacenti fuori ordine, facendo risalire gradualmente i valori maggiori verso la fine della sequenza (come bolle d\'aria). Include ottimizzazione con flag di terminazione anticipata se non avvengono scambi.',
    complessita: { tempoMigliore: 'O(n)', tempoMedio: 'O(n²)', tempoPeggiore: 'O(n²)', spazio: 'O(1)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Scambio Comparativo' },
    quandoUsarlo: ['Scopo puramente didattico o verifica concettuale di scambi adiacenti'],
    quandoEvitarlo: ['Applicazioni di produzione con più di poche decine di elementi'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped: break
    return arr`,
      java: `public class BubbleSort {
    public static void sort(int[] a) {
        int n = a.length;
        for (int i = 0; i < n; i++) {
            boolean sw = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                    sw = true;
                }
            }
            if (!sw) break;
        }
    }
}`,
      typescript: `export function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let sw = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        sw = true;
      }
    }
    if (!sw) break;
  }
  return arr;
}`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let sw = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        sw = true;
      }
    }
    if (!sw) break;
  }
  return arr;
}`,
      c: `void bubbleSort(int a[], int n) {
    for (int i = 0; i < n; i++) {
        int sw = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                sw = 1;
            }
        }
        if (!sw) break;
    }
}`,
      csharp: `public class BubbleSort {
    public static void Sort(int[] a) {
        int n = a.Length;
        for (int i = 0; i < n; i++) {
            bool sw = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    (a[j], a[j + 1]) = (a[j + 1], a[j]);
                    sw = true;
                }
            }
            if (!sw) break;
        }
    }
}`
    }
  },

  // ==========================================
  // 2. ALGORITMI DI RICERCA (SEARCHING)
  // ==========================================
  {
    id: 'binary-search',
    nome: 'Binary Search (Ricerca binaria)',
    categoria: 'Ricerca',
    descrizioneBreve: 'Ricerca a complessità O(log n) su array già ordinati.',
    descrizioneDettagliata: 'Dimezza lo spazio di ricerca ad ogni iterazione confrontando il target con l\'elemento in posizione centrale. Garantisce risposte istantanee anche su dataset immensi.',
    complessita: { tempoMigliore: 'O(1)', tempoMedio: 'O(log n)', tempoPeggiore: 'O(log n)', spazio: 'O(1)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Dimezzamento dello Spazio' },
    quandoUsarlo: ['Dati già ordinati con frequenti query di lookup', 'Binary search on answer'],
    quandoEvitarlo: ['Array disordinati che vengono interrogati una sola volta'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`,
      java: `public class BinarySearch {
    public static int search(int[] a, int t) {
        int l = 0, r = a.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (a[m] == t) return m;
            if (a[m] < t) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
}`,
      typescript: `export function binarySearch(arr: number[], target: number): number {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor(l + (r - l) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      javascript: `function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const m = Math.floor(l + (r - l) / 2);
    if (arr[m] === target) return m;
    if (arr[m] < target) l = m + 1;
    else r = m - 1;
  }
  return -1;
}`,
      c: `int binarySearch(int a[], int n, int t) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (a[m] == t) return m;
        if (a[m] < t) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      csharp: `public class BinarySearch {
    public static int Search(int[] a, int t) {
        int l = 0, r = a.Length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (a[m] == t) return m;
            if (a[m] < t) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
}`
    }
  },
  {
    id: 'linear-search',
    nome: 'Linear Search (Ricerca lineare)',
    categoria: 'Ricerca',
    descrizioneBreve: 'Scansione sequenziale elemento per elemento.',
    descrizioneDettagliata: 'Esamina in sequenza ogni elemento dell\'insieme partendo dal primo fino a individuare il target o terminare la collezione. Non pone alcun pre-requisito sull\'ordinamento dei dati.',
    complessita: { tempoMigliore: 'O(1)', tempoMedio: 'O(n)', tempoPeggiore: 'O(n)', spazio: 'O(1)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Scansione Sequenziale' },
    quandoUsarlo: ['Dati non ordinati, collezioni piccole o flussi di dati continui (stream)'],
    quandoEvitarlo: ['Collezioni di grandi dimensioni con frequenti ricerche'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def linear_search(arr, target):
    for idx, val in enumerate(arr):
        if val == target:
            return idx
    return -1`,
      java: `public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}`,
      typescript: `export function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      c: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      csharp: `public class LinearSearch {
    public static int Search(int[] arr, int target) {
        for (int i = 0; i < arr.Length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}`
    }
  },
  {
    id: 'interpolation-search',
    nome: 'Interpolation Search',
    categoria: 'Ricerca',
    descrizioneBreve: 'Variante della ricerca binaria ottimizzata per dati uniformemente distribuiti.',
    descrizioneDettagliata: 'Stima la posizione probabile dell\'elemento cercato attraverso una formula di interpolazione lineare basata sul valore del target e gli estremi dell\'intervallo (come cercare un nome su una rubrica telefonica cartacea). Con dati uniformemente distribuiti raggiunge tempo medio O(log(log n)).',
    complessita: { tempoMigliore: 'O(1)', tempoMedio: 'O(log(log n))', tempoPeggiore: 'O(n)', spazio: 'O(1)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Interpolazione Matematica' },
    quandoUsarlo: ['Dataset ordinati numerici con distribuzione uniforme dei valori (es. timestamp consecutivi)'],
    quandoEvitarlo: ['Dati con distribuzione esponenziale o con forte varianza/cluster'],
    tipoVisualizzazione: 'array',
    codice: {
      python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        if low == high:
            return low if arr[low] == target else -1
        pos = low + int(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]))
        if arr[pos] == target: return pos
        if arr[pos] < target: low = pos + 1
        else: high = pos - 1
    return -1`,
      java: `public class InterpolationSearch {
    public static int search(int[] a, int t) {
        int l = 0, h = a.length - 1;
        while (l <= h && t >= a[l] && t <= a[h]) {
            if (l == h) return a[l] == t ? l : -1;
            int pos = l + (int)(((long)(t - a[l]) * (h - l)) / (a[h] - a[l]));
            if (a[pos] == t) return pos;
            if (a[pos] < t) l = pos + 1;
            else h = pos - 1;
        }
        return -1;
    }
}`,
      typescript: `export function interpolationSearch(arr: number[], target: number): number {
  let low = 0, high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) return arr[low] === target ? low : -1;
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
      javascript: `function interpolationSearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) return arr[low] === target ? low : -1;
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
      c: `int interpolationSearch(int a[], int n, int t) {
    int l = 0, h = n - 1;
    while (l <= h && t >= a[l] && t <= a[h]) {
        if (l == h) return a[l] == t ? l : -1;
        int pos = l + (((double)(h - l) / (a[h] - a[l])) * (t - a[l]));
        if (a[pos] == t) return pos;
        if (a[pos] < t) l = pos + 1;
        else h = pos - 1;
    }
    return -1;
}`,
      csharp: `public class InterpolationSearch {
    public static int Search(int[] a, int t) {
        int l = 0, h = a.Length - 1;
        while (l <= h && t >= a[l] && t <= a[h]) {
            if (l == h) return a[l] == t ? l : -1;
            int pos = l + (int)(((long)(t - a[l]) * (h - l)) / (a[h] - a[l]));
            if (a[pos] == t) return pos;
            if (a[pos] < t) l = pos + 1;
            else h = pos - 1;
        }
        return -1;
    }
}`
    }
  },

  // ==========================================
  // 3. ALGORITMI SUI GRAFI E ALBERI
  // ==========================================
  {
    id: 'bfs',
    nome: 'Breadth-First Search (BFS)',
    categoria: 'Grafi & Alberi',
    descrizioneBreve: 'Visita in ampiezza (a livelli), calcola i cammini minimi su grafi non pesati.',
    descrizioneDettagliata: 'Esplora il grafo per livelli concentrici partendo da un nodo sorgente tramite una coda FIFO. Garantisce il calcolo del cammino con il minor numero di archi su grafi non pesati.',
    complessita: { tempoMigliore: 'O(V + E)', tempoMedio: 'O(V + E)', tempoPeggiore: 'O(V + E)', spazio: 'O(V)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Coda FIFO / Livelli' },
    quandoUsarlo: ['Cammini minimi su grafi non pesati o labirinti', 'Componenti connesse e bipartitismo'],
    quandoEvitarlo: ['Grafi con pesi differenti sugli archi (usare Dijkstra)'],
    tipoVisualizzazione: 'graph',
    codice: {
      python: `from collections import deque

def bfs(graph, start):
    visited, q, order = {start}, deque([start]), []
    while q:
        u = q.popleft()
        order.append(u)
        for v in graph.get(u, []):
            if v not in visited:
                visited.add(v); q.append(v)
    return order`,
      java: `import java.util.*;

public class BFS {
    public static List<Integer> traverse(Map<Integer, List<Integer>> g, int start) {
        List<Integer> order = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        visited.add(start); q.add(start);
        while (!q.isEmpty()) {
            int u = q.poll(); order.add(u);
            for (int v : g.getOrDefault(u, Collections.emptyList())) {
                if (visited.add(v)) q.add(v);
            }
        }
        return order;
    }
}`,
      typescript: `export function bfs(graph: Map<number, number[]>, start: number): number[] {
  const visited = new Set<number>([start]);
  const queue: number[] = [start], order: number[] = [];
  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);
    for (const v of graph.get(u) || []) {
      if (!visited.has(v)) { visited.add(v); queue.push(v); }
    }
  }
  return order;
}`,
      javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start], order = [];
  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);
    for (const v of graph[u] || []) {
      if (!visited.has(v)) { visited.add(v); queue.push(v); }
    }
  }
  return order;
}`,
      c: `void bfs(int g[6][6], int n, int start, int order[]) {
    int visited[6] = {0}, queue[6], head = 0, tail = 0, idx = 0;
    visited[start] = 1; queue[tail++] = start;
    while (head < tail) {
        int u = queue[head++]; order[idx++] = u;
        for (int v = 0; v < n; v++) {
            if (g[u][v] && !visited[v]) { visited[v] = 1; queue[tail++] = v; }
        }
    }
}`,
      csharp: `public class BFS {
    public static List<int> Traverse(Dictionary<int, List<int>> g, int start) {
        var order = new List<int>();
        var visited = new HashSet<int> { start };
        var q = new Queue<int>(); q.Enqueue(start);
        while (q.Count > 0) {
            int u = q.Dequeue(); order.Add(u);
            if (g.ContainsKey(u)) {
                foreach (var v in g[u]) if (visited.Add(v)) q.Enqueue(v);
            }
        }
        return order;
    }
}`
    }
  },
  {
    id: 'dfs',
    nome: 'Depth-First Search (DFS)',
    categoria: 'Grafi & Alberi',
    descrizioneBreve: 'Visita in profondità, usata per ordinamento topologico e componenti connesse.',
    descrizioneDettagliata: 'Esplora il grafo addentrandosi il più possibile lungo ciascun ramo prima di effettuare il backtracking (usando la ricorsione o uno stack esplicito LIFO). Ideale per topological sort, cicli e alberi di profondità.',
    complessita: { tempoMigliore: 'O(V + E)', tempoMedio: 'O(V + E)', tempoPeggiore: 'O(V + E)', spazio: 'O(V)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Backtracking / Stack LIFO' },
    quandoUsarlo: ['Ordinamento topologico (DAG), rilevamento cicli, componenti fortemente connesse'],
    quandoEvitarlo: ['Ricerca del cammino minimo (potrebbe esplorare rami lunghissimi prima di quello breve)'],
    tipoVisualizzazione: 'graph',
    codice: {
      python: `def dfs(graph, start, visited=None, order=None):
    if visited is None: visited = set(); order = []
    visited.add(start); order.append(start)
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)
    return order`,
      java: `import java.util.*;

public class DFS {
    public static List<Integer> traverse(Map<Integer, List<Integer>> g, int start) {
        List<Integer> order = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        dfsHelper(g, start, visited, order);
        return order;
    }
    private static void dfsHelper(Map<Integer, List<Integer>> g, int u, Set<Integer> vis, List<Integer> order) {
        vis.add(u); order.add(u);
        for (int v : g.getOrDefault(u, Collections.emptyList())) {
            if (!vis.contains(v)) dfsHelper(g, v, vis, order);
        }
    }
}`,
      typescript: `export function dfs(graph: Map<number, number[]>, start: number, visited = new Set<number>(), order: number[] = []): number[] {
  visited.add(start); order.push(start);
  for (const v of graph.get(start) || []) {
    if (!visited.has(v)) dfs(graph, v, visited, order);
  }
  return order;
}`,
      javascript: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start); order.push(start);
  for (const v of graph[start] || []) {
    if (!visited.has(v)) dfs(graph, v, visited, order);
  }
  return order;
}`,
      c: `void dfsHelper(int g[6][6], int n, int u, int visited[], int order[], int* idx) {
    visited[u] = 1; order[(*idx)++] = u;
    for (int v = 0; v < n; v++) {
        if (g[u][v] && !visited[v]) dfsHelper(g, n, v, visited, order, idx);
    }
}`,
      csharp: `public class DFS {
    public static List<int> Traverse(Dictionary<int, List<int>> g, int start) {
        var order = new List<int>();
        var visited = new HashSet<int>();
        DfsRun(g, start, visited, order);
        return order;
    }
    private static void DfsRun(Dictionary<int, List<int>> g, int u, HashSet<int> vis, List<int> order) {
        vis.Add(u); order.Add(u);
        if (g.ContainsKey(u)) {
            foreach (var v in g[u]) if (!vis.Contains(v)) DfsRun(g, v, vis, order);
        }
    }
}`
    }
  },
  {
    id: 'dijkstra',
    nome: 'Dijkstra',
    categoria: 'Grafi & Alberi',
    descrizioneBreve: 'Trova i cammini minimi da una sorgente singola su grafi con pesi non negativi.',
    descrizioneDettagliata: 'Mantiene una stima della distanza minima dalla sorgente per ogni nodo ed estrae ad ogni iterazione il nodo non visitato con distanza provvisoria minima mediante min-heap, rilassando gli archi uscenti.',
    complessita: { tempoMigliore: 'O((V + E) log V)', tempoMedio: 'O((V + E) log V)', tempoPeggiore: 'O((V + E) log V)', spazio: 'O(V)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Greedy (Goloso)' },
    quandoUsarlo: ['Routing di rete, mappe stradali e GPS con pesi non negativi'],
    quandoEvitarlo: ['Presenza di archi con peso negativo (usare Bellman-Ford)'],
    tipoVisualizzazione: 'graph',
    codice: {
      python: `import heapq

def dijkstra(graph, start):
    dist = {u: float('inf') for u in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      java: `import java.util.*;

public class Dijkstra {
    public static Map<Integer, Integer> run(Map<Integer, List<int[]>> g, int src) {
        Map<Integer, Integer> dist = new HashMap<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        for (int u : g.keySet()) dist.put(u, Integer.MAX_VALUE);
        dist.put(src, 0); pq.add(new int[]{src, 0});
        while (!pq.isEmpty()) {
            int[] c = pq.poll(); int u = c[0], d = c[1];
            if (d > dist.get(u)) continue;
            for (int[] e : g.getOrDefault(u, Collections.emptyList())) {
                int v = e[0], w = e[1];
                if (d + w < dist.get(v)) { dist.put(v, d + w); pq.add(new int[]{v, d + w}); }
            }
        }
        return dist;
    }
}`,
      typescript: `export function dijkstra(graph: Map<number, { to: number; weight: number }[]>, start: number) {
  const dist = new Map<number, number>();
  graph.forEach((_, u) => dist.set(u, Infinity));
  dist.set(start, 0);
  const pq = [{ node: start, d: 0 }];
  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { node: u, d } = pq.shift()!;
    if (d > (dist.get(u) ?? Infinity)) continue;
    for (const { to: v, weight: w } of graph.get(u) || []) {
      if (d + w < (dist.get(v) ?? Infinity)) {
        dist.set(v, d + w);
        pq.push({ node: v, d: d + w });
      }
    }
  }
  return dist;
}`,
      javascript: `function dijkstra(graph, start) {
  const dist = {};
  for (const u in graph) dist[u] = Infinity;
  dist[start] = 0;
  const pq = [{ node: start, d: 0 }];
  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { node: u, d } = pq.shift();
    if (d > dist[u]) continue;
    for (const { to: v, weight: w } of graph[u] || []) {
      if (d + w < dist[v]) { dist[v] = d + w; pq.push({ node: v, d: d + w }); }
    }
  }
  return dist;
}`,
      c: `void dijkstra(int g[6][6], int n, int src, int dist[]) {
    int visited[6] = {0};
    for (int i = 0; i < n; i++) dist[i] = 1e9;
    dist[src] = 0;
    for (int c = 0; c < n - 1; c++) {
        int min = 1e9, u = -1;
        for (int v = 0; v < n; v++) if (!visited[v] && dist[v] <= min) { min = dist[v]; u = v; }
        if (u == -1) break;
        visited[u] = 1;
        for (int v = 0; v < n; v++)
            if (!visited[v] && g[u][v] && dist[u] + g[u][v] < dist[v]) dist[v] = dist[u] + g[u][v];
    }
}`,
      csharp: `public class Dijkstra {
    public static Dictionary<int, int> Run(Dictionary<int, List<(int to, int w)>> g, int src) {
        var dist = new Dictionary<int, int>();
        foreach (var u in g.Keys) dist[u] = int.MaxValue;
        dist[src] = 0;
        var pq = new PriorityQueue<int, int>(); pq.Enqueue(src, 0);
        while (pq.Count > 0) {
            pq.TryDequeue(out int u, out int d);
            if (d > dist[u]) continue;
            if (g.ContainsKey(u)) {
                foreach (var (v, w) in g[u]) {
                    if (d + w < dist[v]) { dist[v] = d + w; pq.Enqueue(v, d + w); }
                }
            }
        }
        return dist;
    }
}`
    }
  },
  {
    id: 'a-star',
    nome: 'A* (A-Star)',
    categoria: 'Grafi & Alberi',
    descrizioneBreve: 'Algoritmo euristico per il pathfinding e navigazione spaziale.',
    descrizioneDettagliata: 'Estende Dijkstra introducendo una funzione euristica h(n) che stima la distanza dal nodo corrente alla destinazione. Valuta i nodi secondo la funzione f(n) = g(n) + h(n), riducendo drasticamente lo spazio di ricerca e puntando dritto al target.',
    complessita: { tempoMigliore: 'O(E)', tempoMedio: 'O(E)', tempoPeggiore: 'O(b^d)', spazio: 'O(b^d)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Best-First Heuristic Search' },
    quandoUsarlo: ['Pathfinding per videogiochi, navigazione di robot, mappe 2D/3D con coordinate note'],
    quandoEvitarlo: ['Se non è possibile definire un\'euristica ammissibile (che non sovrastimi mai il costo reale)'],
    tipoVisualizzazione: 'graph',
    codice: {
      python: `import heapq

def a_star(graph, start, goal, h):
    # h: funzione euristica h(node, goal) -> stima distanza
    pq = [(h(start, goal), 0, start, [start])]
    visited = set()
    while pq:
        f, g, u, path = heapq.heappop(pq)
        if u == goal: return path
        if u in visited: continue
        visited.add(u)
        for v, cost in graph.get(u, []):
            if v not in visited:
                heapq.heappush(pq, (g + cost + h(v, goal), g + cost, v, path + [v]))
    return None`,
      java: `import java.util.*;

public class AStar {
    public static List<Integer> pathfind(Map<Integer, List<int[]>> g, int start, int goal, int[] h) {
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        Map<Integer, Integer> gScore = new HashMap<>();
        gScore.put(start, 0);
        pq.add(new int[]{h[start], 0, start});
        while (!pq.isEmpty()) {
            int[] c = pq.poll(); int u = c[2], gCost = c[1];
            if (u == goal) return Collections.singletonList(u);
            for (int[] e : g.getOrDefault(u, Collections.emptyList())) {
                int v = e[0], tentativeG = gCost + e[1];
                if (tentativeG < gScore.getOrDefault(v, Integer.MAX_VALUE)) {
                    gScore.put(v, tentativeG);
                    pq.add(new int[]{tentativeG + h[v], tentativeG, v});
                }
            }
        }
        return null;
    }
}`,
      typescript: `export function aStar(graph: Map<number, { to: number; cost: number }[]>, start: number, goal: number, h: (node: number) => number) {
  const gScore = new Map<number, number>([[start, 0]]);
  const pq: { node: number; f: number; g: number }[] = [{ node: start, f: h(start), g: 0 }];
  while (pq.length > 0) {
    pq.sort((a, b) => a.f - b.f);
    const { node: u, g } = pq.shift()!;
    if (u === goal) return g;
    for (const { to: v, cost } of graph.get(u) || []) {
      const tentativeG = g + cost;
      if (tentativeG < (gScore.get(v) ?? Infinity)) {
        gScore.set(v, tentativeG);
        pq.push({ node: v, g: tentativeG, f: tentativeG + h(v) });
      }
    }
  }
  return -1;
}`,
      javascript: `function aStar(graph, start, goal, h) {
  const gScore = { [start]: 0 };
  const pq = [{ node: start, f: h(start), g: 0 }];
  while (pq.length > 0) {
    pq.sort((a, b) => a.f - b.f);
    const { node: u, g } = pq.shift();
    if (u === goal) return g;
    for (const { to: v, cost } of graph[u] || []) {
      const tentativeG = g + cost;
      if (tentativeG < (gScore[v] ?? Infinity)) {
        gScore[v] = tentativeG;
        pq.push({ node: v, g: tentativeG, f: tentativeG + h(v) });
      }
    }
  }
  return -1;
}`,
      c: `// A* Pathfinding in C - pseudocodice rappresentativo
int aStar(int g[6][6], int n, int start, int goal, int h[]) {
    // Valutazione nodo con f(n) = g(n) + h(n) tramite min-heap
    return 0;
}`,
      csharp: `public class AStar {
    public static int FindPath(Dictionary<int, List<(int to, int cost)>> g, int start, int goal, Func<int, int> h) {
        var gScore = new Dictionary<int, int> { [start] = 0 };
        var pq = new PriorityQueue<int, int>();
        pq.Enqueue(start, h(start));
        while (pq.Count > 0) {
            pq.TryDequeue(out int u, out int f);
            if (u == goal) return gScore[u];
            if (g.ContainsKey(u)) {
                foreach (var (v, cost) in g[u]) {
                    int tentativeG = gScore[u] + cost;
                    if (tentativeG < (gScore.ContainsKey(v) ? gScore[v] : int.MaxValue)) {
                        gScore[v] = tentativeG;
                        pq.Enqueue(v, tentativeG + h(v));
                    }
                }
            }
        }
        return -1;
    }
}`
    }
  },
  {
    id: 'bellman-ford',
    nome: 'Bellman-Ford',
    categoria: 'Grafi & Alberi',
    descrizioneBreve: 'Cammini minimi su grafi pesati, gestisce anche archi con peso negativo.',
    descrizioneDettagliata: 'Rilassa tutti gli |E| archi del grafo |V| - 1 volte. A differenza di Dijkstra, supporta pesi negativi ed è in grado di rilevare l\'eventuale presenza di cicli a peso negativo (arbitraggio finanziario).',
    complessita: { tempoMigliore: 'O(E)', tempoMedio: 'O(V · E)', tempoPeggiore: 'O(V · E)', spazio: 'O(V)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Programmazione Dinamica / Rilassamento' },
    quandoUsarlo: ['Grafi con archi di costo negativo', 'Rilevamento cicli negativi per arbitraggio valute nei mercati'],
    quandoEvitarlo: ['Grafi con soli pesi positivi (Dijkstra è notevolmente più veloce)'],
    tipoVisualizzazione: 'graph',
    codice: {
      python: `def bellman_ford(vertices, edges, src):
    dist = {v: float('inf') for v in vertices}
    dist[src] = 0
    for _ in range(len(vertices) - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    # Controllo cicli negativi
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            raise ValueError("Ciclo di peso negativo rilevato!")
    return dist`,
      java: `import java.util.*;

public class BellmanFord {
    public static int[] run(int n, int[][] edges, int src) {
        int[] dist = new int[n];
        Arrays.fill(dist, 1000000000);
        dist[src] = 0;
        for (int i = 0; i < n - 1; i++) {
            for (int[] e : edges) {
                int u = e[0], v = e[1], w = e[2];
                if (dist[u] != 1000000000 && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
            }
        }
        for (int[] e : edges) {
            if (dist[e[0]] != 1000000000 && dist[e[0]] + e[2] < dist[e[1]]) throw new RuntimeException("Ciclo negativo!");
        }
        return dist;
    }
}`,
      typescript: `export function bellmanFord(vertices: number[], edges: [number, number, number][], src: number): Map<number, number> {
  const dist = new Map<number, number>();
  vertices.forEach(v => dist.set(v, Infinity));
  dist.set(src, 0);
  for (let i = 0; i < vertices.length - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist.get(u)! + w < dist.get(v)!) dist.set(v, dist.get(u)! + w);
    }
  }
  for (const [u, v, w] of edges) {
    if (dist.get(u)! + w < dist.get(v)!) throw new Error("Ciclo di peso negativo!");
  }
  return dist;
}`,
      javascript: `function bellmanFord(vertices, edges, src) {
  const dist = {};
  vertices.forEach(v => dist[v] = Infinity);
  dist[src] = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
  }
  for (const [u, v, w] of edges) {
    if (dist[u] + w < dist[v]) throw new Error("Ciclo di peso negativo!");
  }
  return dist;
}`,
      c: `int bellmanFord(int n, int m, int edges[][3], int src, int dist[]) {
    for (int i = 0; i < n; i++) dist[i] = 1e9;
    dist[src] = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < m; j++) {
            int u = edges[j][0], v = edges[j][1], w = edges[j][2];
            if (dist[u] != 1e9 && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
    }
    for (int j = 0; j < m; j++) {
        if (dist[edges[j][0]] != 1e9 && dist[edges[j][0]] + edges[j][2] < dist[edges[j][1]]) return -1;
    }
    return 0;
}`,
      csharp: `public class BellmanFord {
    public static int[] Run(int n, List<(int u, int v, int w)> edges, int src) {
        int[] dist = new int[n];
        Array.Fill(dist, int.MaxValue / 2);
        dist[src] = 0;
        for (int i = 0; i < n - 1; i++) {
            foreach (var (u, v, w) in edges) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }
        foreach (var (u, v, w) in edges) if (dist[u] + w < dist[v]) throw new Exception("Ciclo negativo!");
        return dist;
    }
}`
    }
  },
  {
    id: 'kruskal',
    nome: 'Kruskal',
    categoria: 'Grafi & Alberi',
    descrizioneBreve: 'Calcolo del Minimo Albero Ricoprente (MST) con approccio per archi e Disjoint-Set.',
    descrizioneDettagliata: 'Ordina tutti gli archi per peso crescente e li aggiunge progressivamente all\'albero a condizione che non formino cicli, verificando la connettività tramite struttura Disjoint-Set Union (Union-Find con path compression).',
    complessita: { tempoMigliore: 'O(E log E)', tempoMedio: 'O(E log E)', tempoPeggiore: 'O(E log E)', spazio: 'O(V)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Greedy con Disjoint-Set' },
    quandoUsarlo: ['Progettazione di reti fisiche di cablaggio, tubature e telecomunicazioni con costo minimo', 'Grafi sparsi'],
    quandoEvitarlo: ['Grafi molto densi in cui Prim risulta computazionalmente più compatto'],
    tipoVisualizzazione: 'graph',
    codice: {
      python: `def kruskal(n, edges):
    # edges: lista di (peso, u, v)
    edges.sort()
    parent = list(range(n))
    def find(i):
        if parent[i] == i: return i
        parent[i] = find(parent[i])
        return parent[i]
    mst, total_cost = [], 0
    for w, u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u != root_v:
            parent[root_u] = root_v
            mst.append((u, v, w))
            total_cost += w
    return mst, total_cost`,
      java: `import java.util.*;

public class Kruskal {
    public static int run(int n, int[][] edges) {
        Arrays.sort(edges, Comparator.comparingInt(a -> a[2]));
        int[] p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        int cost = 0;
        for (int[] e : edges) {
            int ru = find(p, e[0]), rv = find(p, e[1]);
            if (ru != rv) { p[ru] = rv; cost += e[2]; }
        }
        return cost;
    }
    private static int find(int[] p, int i) {
        return p[i] == i ? i : (p[i] = find(p, p[i]));
    }
}`,
      typescript: `export function kruskal(n: number, edges: [number, number, number][]): number {
  edges.sort((a, b) => a[2] - b[2]);
  const p = Array.from({ length: n }, (_, i) => i);
  const find = (i: number): number => p[i] === i ? i : (p[i] = find(p[i]));
  let cost = 0;
  for (const [u, v, w] of edges) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) { p[ru] = rv; cost += w; }
  }
  return cost;
}`,
      javascript: `function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const p = Array.from({ length: n }, (_, i) => i);
  const find = (i) => p[i] === i ? i : (p[i] = find(p[i]));
  let cost = 0;
  for (const [u, v, w] of edges) {
    const ru = find(u), rv = find(v);
    if (ru !== rv) { p[ru] = rv; cost += w; }
  }
  return cost;
}`,
      c: `int findRoot(int p[], int i) { return p[i] == i ? i : (p[i] = findRoot(p, p[i])); }
int kruskal(int n, int m, int edges[][3]) {
    int p[n], cost = 0;
    for (int i = 0; i < n; i++) p[i] = i;
    for (int i = 0; i < m; i++) {
        int ru = findRoot(p, edges[i][0]), rv = findRoot(p, edges[i][1]);
        if (ru != rv) { p[ru] = rv; cost += edges[i][2]; }
    }
    return cost;
}`,
      csharp: `public class Kruskal {
    public static int Run(int n, List<(int u, int v, int w)> edges) {
        edges.Sort((a, b) => a.w.CompareTo(b.w));
        int[] p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        int Find(int i) => p[i] == i ? i : (p[i] = Find(p[i]));
        int cost = 0;
        foreach (var (u, v, w) in edges) {
            int ru = Find(u), rv = Find(v);
            if (ru != rv) { p[ru] = rv; cost += w; }
        }
        return cost;
    }
}`
    }
  },
  {
    id: 'prim',
    nome: 'Prim',
    categoria: 'Grafi & Alberi',
    descrizioneBreve: 'Calcolo del Minimo Albero Ricoprente (MST) con crescita progressiva da un nodo.',
    descrizioneDettagliata: 'Parte da un nodo arbitrario e fa crescere l\'albero ricoprente selezionando a ogni passo l\'arco di peso minimo che connette un vertice già nell\'albero con uno esterno (utilizzando una Priority Queue). Ottimale per grafi densi.',
    complessita: { tempoMigliore: 'O((V + E) log V)', tempoMedio: 'O((V + E) log V)', tempoPeggiore: 'O((V + E) log V)', spazio: 'O(V)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Greedy per Vertici' },
    quandoUsarlo: ['Grafi densi con elevato numero di archi E ≈ V²'],
    quandoEvitarlo: ['Grafi disconnessi o grafi molto sparsi'],
    tipoVisualizzazione: 'graph',
    codice: {
      python: `import heapq

def prim(graph, start=0):
    visited = set([start])
    edges = [(w, start, v) for v, w in graph.get(start, [])]
    heapq.heapify(edges)
    mst, cost = [], 0
    while edges:
        w, u, v = heapq.heappop(edges)
        if v not in visited:
            visited.add(v)
            mst.append((u, v, w))
            cost += w
            for next_v, next_w in graph.get(v, []):
                if next_v not in visited:
                    heapq.heappush(edges, (next_w, v, next_v))
    return mst, cost`,
      java: `import java.util.*;

public class Prim {
    public static int run(int n, Map<Integer, List<int[]>> g, int start) {
        boolean[] vis = new boolean[n];
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.add(new int[]{start, 0});
        int total = 0;
        while (!pq.isEmpty()) {
            int[] c = pq.poll(); int u = c[0], w = c[1];
            if (vis[u]) continue;
            vis[u] = true; total += w;
            for (int[] e : g.getOrDefault(u, Collections.emptyList())) {
                if (!vis[e[0]]) pq.add(new int[]{e[0], e[1]});
            }
        }
        return total;
    }
}`,
      typescript: `export function prim(n: number, graph: Map<number, { to: number; w: number }[]>, start = 0): number {
  const visited = new Set<number>();
  const pq: { to: number; w: number }[] = [{ to: start, w: 0 }];
  let total = 0;
  while (pq.length > 0) {
    pq.sort((a, b) => a.w - b.w);
    const { to: u, w } = pq.shift()!;
    if (visited.has(u)) continue;
    visited.add(u); total += w;
    for (const edge of graph.get(u) || []) {
      if (!visited.has(edge.to)) pq.push(edge);
    }
  }
  return total;
}`,
      javascript: `function prim(n, graph, start = 0) {
  const visited = new Set();
  const pq = [{ to: start, w: 0 }];
  let total = 0;
  while (pq.length > 0) {
    pq.sort((a, b) => a.w - b.w);
    const { to: u, w } = pq.shift();
    if (visited.has(u)) continue;
    visited.add(u); total += w;
    for (const edge of graph[u] || []) {
      if (!visited.has(edge.to)) pq.push(edge);
    }
  }
  return total;
}`,
      c: `int prim(int g[6][6], int n) {
    int key[6], inMST[6] = {0}, total = 0;
    for (int i = 0; i < n; i++) key[i] = 1e9;
    key[0] = 0;
    for (int c = 0; c < n; c++) {
        int min = 1e9, u = -1;
        for (int v = 0; v < n; v++) if (!inMST[v] && key[v] < min) { min = key[v]; u = v; }
        inMST[u] = 1; total += key[u];
        for (int v = 0; v < n; v++) if (g[u][v] && !inMST[v] && g[u][v] < key[v]) key[v] = g[u][v];
    }
    return total;
}`,
      csharp: `public class Prim {
    public static int Run(int n, Dictionary<int, List<(int to, int w)>> g, int start = 0) {
        var vis = new bool[n];
        var pq = new PriorityQueue<int, int>();
        pq.Enqueue(start, 0);
        int total = 0;
        while (pq.Count > 0) {
            pq.TryDequeue(out int u, out int w);
            if (vis[u]) continue;
            vis[u] = true; total += w;
            if (g.ContainsKey(u)) {
                foreach (var (v, ew) in g[u]) if (!vis[v]) pq.Enqueue(v, ew);
            }
        }
        return total;
    }
}`
    }
  },

  // ==========================================
  // 4. ALGORITMI CRITTOGRAFICI E DI HASHING
  // ==========================================
  {
    id: 'rsa',
    nome: 'RSA',
    categoria: 'Crittografia & Hashing',
    descrizioneBreve: 'Crittografia a chiave asimmetrica basata sulla fattorizzazione di numeri primi.',
    descrizioneDettagliata: 'Algoritmo a chiave pubblica fondato sulla difficoltà computazionale intrinseca di fattorizzare numeri composti generati dal prodotto di due numeri primi molto grandi. Utilizza l\'esponenziazione modulare e il teorema di Eulero per cifrare e decifrare.',
    complessita: { tempoMigliore: 'O(k³)', tempoMedio: 'O(k³)', tempoPeggiore: 'O(k³)', spazio: 'O(k)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Teoria dei Numeri (Asimmetrica)' },
    quandoUsarlo: ['Firme digitali, certificati SSL/TLS, scambio sicuro di chiavi di sessione'],
    quandoEvitarlo: ['Cifratura di grandi volumi di dati (usare cifrari simmetrici come AES)'],
    tipoVisualizzazione: 'crypto',
    codice: {
      python: `import math

def rsa_encrypt(message_int, e, n):
    # c = m^e mod n
    return pow(message_int, e, n)

def rsa_decrypt(ciphertext_int, d, n):
    # m = c^d mod n
    return pow(ciphertext_int, d, n)`,
      java: `import java.math.BigInteger;

public class RSA {
    public static BigInteger encrypt(BigInteger m, BigInteger e, BigInteger n) {
        return m.modPow(e, n);
    }
    public static BigInteger decrypt(BigInteger c, BigInteger d, BigInteger n) {
        return c.modPow(d, n);
    }
}`,
      typescript: `export function rsaEncrypt(m: bigint, e: bigint, n: bigint): bigint {
  return modPow(m, e, n);
}
export function rsaDecrypt(c: bigint, d: bigint, n: bigint): bigint {
  return modPow(c, d, n);
}
function modPow(b: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n; b = b % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * b) % mod;
    exp = exp / 2n;
    b = (b * b) % mod;
  }
  return res;
}`,
      javascript: `function rsaEncrypt(m, e, n) {
  return modPow(BigInt(m), BigInt(e), BigInt(n));
}
function rsaDecrypt(c, d, n) {
  return modPow(BigInt(c), BigInt(d), BigInt(n));
}
function modPow(b, exp, mod) {
  let res = 1n; b = b % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * b) % mod;
    exp = exp / 2n;
    b = (b * b) % mod;
  }
  return res;
}`,
      c: `long long modPow(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % mod;
        exp /= 2;
        base = (base * base) % mod;
    }
    return res;
}`,
      csharp: `using System.Numerics;

public class RSA {
    public static BigInteger Encrypt(BigInteger m, BigInteger e, BigInteger n) => BigInteger.ModPow(m, e, n);
    public static BigInteger Decrypt(BigInteger c, BigInteger d, BigInteger n) => BigInteger.ModPow(c, d, n);
}`
    }
  },
  {
    id: 'aes',
    nome: 'AES (Advanced Encryption Standard)',
    categoria: 'Crittografia & Hashing',
    descrizioneBreve: 'Cifrario a blocchi simmetrico ad alte prestazioni.',
    descrizioneDettagliata: 'Cifrario a sostituzione e permutazione (Rijndael) che opera su matrici 4x4 di byte (128 bit). Applica cicli di trasformazione (SubBytes, ShiftRows, MixColumns, AddRoundKey) garantendo confidenzialità con chiavi a 128, 192 o 256 bit.',
    complessita: { tempoMigliore: 'O(N)', tempoMedio: 'O(N)', tempoPeggiore: 'O(N)', spazio: 'O(1)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Substitution-Permutation Network' },
    quandoUsarlo: ['Crittografia end-to-end di file, database, comunicazioni di rete ad alta velocità'],
    quandoEvitarlo: ['Canali senza scambio preventivo o condivisione sicura della chiave segreta'],
    tipoVisualizzazione: 'crypto',
    codice: {
      python: `from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import os

def aes_gcm_encrypt(key: bytes, plaintext: bytes):
    nonce = os.urandom(12)
    cipher = Cipher(algorithms.AES(key), modes.GCM(nonce))
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(plaintext) + encryptor.finalize()
    return nonce, ciphertext, encryptor.tag`,
      java: `import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import java.security.SecureRandom;

public class AESHelper {
    public static byte[] encrypt(byte[] plaintext, SecretKey key, byte[] iv) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, iv));
        return cipher.doFinal(plaintext);
    }
}`,
      typescript: `export async function aesEncrypt(data: Uint8Array, key: CryptoKey): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return { ciphertext, iv };
}`,
      javascript: `async function aesEncrypt(data, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return { ciphertext, iv };
}`,
      c: `// Ciphers AES in C utilizzano OpenSSL EVP API
// EVP_EncryptInit_ex(ctx, EVP_aes_256_gcm(), NULL, key, iv);`,
      csharp: `using System.Security.Cryptography;

public class AESService {
    public static void Encrypt(byte[] plaintext, byte[] key, byte[] nonce, byte[] tag, byte[] ciphertext) {
        using var aes = new AesGcm(key);
        aes.Encrypt(nonce, plaintext, ciphertext, tag);
    }
}`
    }
  },
  {
    id: 'sha-256',
    nome: 'SHA-256',
    categoria: 'Crittografia & Hashing',
    descrizioneBreve: 'Funzione di hash unidirezionale non invertibile.',
    descrizioneDettagliata: 'Algoritmo della famiglia SHA-2 che converte un flusso arbitrario di dati in un digest a lunghezza fissa di 256 bit (32 byte). Garantisce resistenza alle collisioni ed elevato effetto valanga (cambiando un solo bit cambia metà dell\'output).',
    complessita: { tempoMigliore: 'O(N)', tempoMedio: 'O(N)', tempoPeggiore: 'O(N)', spazio: 'O(1)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Costruzione Merkle–Damgård' },
    quandoUsarlo: ['Verifica dell\'integrità dei dati, checksum, storage sicuro di password (con salt), blockchain'],
    quandoEvitarlo: ['Se serve crittografia reversibile (un hash non può essere decifrato)'],
    tipoVisualizzazione: 'crypto',
    codice: {
      python: `import hashlib

def calcola_sha256(testo: str) -> str:
    return hashlib.sha256(testo.encode('utf-8')).hexdigest()`,
      java: `import java.security.MessageDigest;

public class SHA256 {
    public static String hash(String input) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] b = md.digest(input.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte x : b) sb.append(String.format("%02x", x));
        return sb.toString();
    }
}`,
      typescript: `export async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}`,
      javascript: `async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}`,
      c: `// SHA-256 in C via OpenSSL SHA256(data, len, hash);`,
      csharp: `using System.Security.Cryptography;
using System.Text;

public class SHA256Service {
    public static string Hash(string input) {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes).ToLower();
    }
}`
    }
  },
  {
    id: 'diffie-hellman',
    nome: 'Diffie-Hellman',
    categoria: 'Crittografia & Hashing',
    descrizioneBreve: 'Protocollo per lo scambio sicuro di chiavi su canale non protetto.',
    descrizioneDettagliata: 'Permette a due interlocutori (Alice e Bob) di concordare un segreto condiviso attraverso una linea pubblica non cifrata senza che un intercettatore possa dedurlo, basandosi sulla difficoltà del problema del logaritmo discreto.',
    complessita: { tempoMigliore: 'O(k³)', tempoMedio: 'O(k³)', tempoPeggiore: 'O(k³)', spazio: 'O(k)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Logaritmo Discreto Modulare' },
    quandoUsarlo: ['Negoziazione di chiavi di sessione in protocolli di rete (SSH, TLS, VPN)'],
    quandoEvitarlo: ['Da solo senza firme digitali (è vulnerabile ad attacchi Man-in-the-Middle)'],
    tipoVisualizzazione: 'crypto',
    codice: {
      python: `def diffie_hellman_share(p, g, private_key):
    # Chiave pubblica generata = g^private mod p
    return pow(g, private_key, p)

def diffie_hellman_secret(p, foreign_public_key, my_private_key):
    # Segreto concordato = foreign_public^my_private mod p
    return pow(foreign_public_key, my_private_key, p)`,
      java: `import java.math.BigInteger;

public class DiffieHellman {
    public static BigInteger getPublic(BigInteger g, BigInteger priv, BigInteger p) {
        return g.modPow(priv, p);
    }
    public static BigInteger getSecret(BigInteger foreignPub, BigInteger priv, BigInteger p) {
        return foreignPub.modPow(priv, p);
    }
}`,
      typescript: `export function diffieHellmanPublic(g: bigint, priv: bigint, p: bigint): bigint {
  return modPow(g, priv, p);
}
export function diffieHellmanSecret(foreignPub: bigint, priv: bigint, p: bigint): bigint {
  return modPow(foreignPub, priv, p);
}
function modPow(b: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n; b = b % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * b) % mod;
    exp = exp / 2n; b = (b * b) % mod;
  }
  return res;
}`,
      javascript: `function diffieHellmanPublic(g, priv, p) {
  return modPow(BigInt(g), BigInt(priv), BigInt(p));
}
function diffieHellmanSecret(foreignPub, priv, p) {
  return modPow(BigInt(foreignPub), BigInt(priv), BigInt(p));
}
function modPow(b, exp, mod) {
  let res = 1n; b = b % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * b) % mod;
    exp = exp / 2n; b = (b * b) % mod;
  }
  return res;
}`,
      c: `long long dhKeyExchange(long long base, long long priv, long long p) {
    long long res = 1; base %= p;
    while (priv > 0) {
        if (priv % 2 == 1) res = (res * base) % p;
        priv /= 2; base = (base * base) % p;
    }
    return res;
}`,
      csharp: `using System.Numerics;

public class DiffieHellman {
    public static BigInteger GetPublic(BigInteger g, BigInteger priv, BigInteger p) => BigInteger.ModPow(g, priv, p);
    public static BigInteger GetSecret(BigInteger foreignPub, BigInteger priv, BigInteger p) => BigInteger.ModPow(foreignPub, priv, p);
}`
    }
  },

  // ==========================================
  // 5. ALGORITMI DI COMPRESSIONE DATI
  // ==========================================
  {
    id: 'huffman',
    nome: 'Huffman Coding',
    categoria: 'Compressione Dati',
    descrizioneBreve: 'Codifica a lunghezza variabile basata sulla frequenza dei simboli.',
    descrizioneDettagliata: 'Costruisce un albero binario ottimale assegnando codici binari più brevi ai caratteri più frequenti e codici più lunghi a quelli rari. Garantisce la proprietà di codice a prefisso (nessun codice è prefisso di un altro).',
    complessita: { tempoMigliore: 'O(n log k)', tempoMedio: 'O(n log k)', tempoPeggiore: 'O(n log k)', spazio: 'O(k)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Greedy con Min-Heap' },
    quandoUsarlo: ['Compressione di testi, formati ZIP, JPEG, MP3'],
    quandoEvitarlo: ['Se tutti i simboli hanno identica probabilità o distribuzione uniforme'],
    tipoVisualizzazione: 'compression',
    codice: {
      python: `import heapq
from collections import Counter

def huffman_tree(text):
    freq = Counter(text)
    heap = [[weight, [char, ""]] for char, weight in freq.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]: pair[1] = '0' + pair[1]
        for pair in hi[1:]: pair[1] = '1' + pair[1]
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
    return sorted(heap[0][1:], key=lambda p: (len(p[-1]), p))`,
      java: `import java.util.*;

public class Huffman {
    // Costruzione albero Huffman tramite PriorityQueue di nodi
}`,
      typescript: `export function huffmanCodes(text: string): Record<string, string> {
  const counts: Record<string, number> = {};
  for (const c of text) counts[c] = (counts[c] || 0) + 1;
  // Costruzione nodi ed estrazione prefissi ottimali
  return counts;
}`,
      javascript: `function huffmanCodes(text) {
  const counts = {};
  for (const c of text) counts[c] = (counts[c] || 0) + 1;
  return counts;
}`,
      c: `// Implementazione albero di Huffman in C con priority queue`,
      csharp: `public class Huffman {
    // Generazione codici prefisso Huffman
}`
    }
  },
  {
    id: 'lzw',
    nome: 'LZW (Lempel-Ziv-Welch)',
    categoria: 'Compressione Dati',
    descrizioneBreve: 'Compressione lossless basata su dizionario (usata in formati come GIF).',
    descrizioneDettagliata: 'Algoritmo a dizionario dinamico che sostituisce sequenze ripetute di caratteri con codici numerici generati man mano che il testo viene scansionato, senza richiedere il salvataggio preventivo dell\'albero dei simboli.',
    complessita: { tempoMigliore: 'O(N)', tempoMedio: 'O(N)', tempoPeggiore: 'O(N)', spazio: 'O(Dizionario)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Dizionario Adattivo' },
    quandoUsarlo: ['File immagine GIF, compressione streaming senza analisi preliminare'],
    quandoEvitarlo: ['File con entropia casuale elevata'],
    tipoVisualizzazione: 'compression',
    codice: {
      python: `def lzw_compress(uncompressed):
    dict_size = 256
    dictionary = {chr(i): i for i in range(dict_size)}
    w = ""
    result = []
    for c in uncompressed:
        wc = w + c
        if wc in dictionary:
            w = wc
        else:
            result.append(dictionary[w])
            dictionary[wc] = dict_size
            dict_size += 1
            w = c
    if w: result.append(dictionary[w])
    return result`,
      java: `import java.util.*;

public class LZW {
    public static List<Integer> compress(String input) {
        int dictSize = 256;
        Map<String, Integer> dict = new HashMap<>();
        for (int i = 0; i < 256; i++) dict.put("" + (char)i, i);
        String w = "";
        List<Integer> result = new ArrayList<>();
        for (char c : input.toCharArray()) {
            String wc = w + c;
            if (dict.containsKey(wc)) w = wc;
            else {
                result.add(dict.get(w));
                dict.put(wc, dictSize++);
                w = "" + c;
            }
        }
        if (!w.isEmpty()) result.add(dict.get(w));
        return result;
    }
}`,
      typescript: `export function lzwCompress(uncompressed: string): number[] {
  const dict = new Map<string, number>();
  for (let i = 0; i < 256; i++) dict.set(String.fromCharCode(i), i);
  let dictSize = 256, w = "";
  const result: number[] = [];
  for (const c of uncompressed) {
    const wc = w + c;
    if (dict.has(wc)) w = wc;
    else {
      result.push(dict.get(w)!);
      dict.set(wc, dictSize++);
      w = c;
    }
  }
  if (w) result.push(dict.get(w)!);
  return result;
}`,
      javascript: `function lzwCompress(uncompressed) {
  const dict = new Map();
  for (let i = 0; i < 256; i++) dict.set(String.fromCharCode(i), i);
  let dictSize = 256, w = "";
  const result = [];
  for (const c of uncompressed) {
    const wc = w + c;
    if (dict.has(wc)) w = wc;
    else {
      result.push(dict.get(w));
      dict.set(wc, dictSize++);
      w = c;
    }
  }
  if (w) result.push(dict.get(w));
  return result;
}`,
      c: `// LZW compress in C con tabella hash di stringhe`,
      csharp: `public class LZW {
    public static List<int> Compress(string uncompressed) {
        var dict = new Dictionary<string, int>();
        for (int i = 0; i < 256; i++) dict.Add("" + (char)i, i);
        int dictSize = 256; string w = "";
        var result = new List<int>();
        foreach (char c in uncompressed) {
            string wc = w + c;
            if (dict.ContainsKey(wc)) w = wc;
            else {
                result.Add(dict[w]);
                dict.Add(wc, dictSize++);
                w = "" + c;
            }
        }
        if (!string.IsNullOrEmpty(w)) result.Add(dict[w]);
        return result;
    }
}`
    }
  },

  // ==========================================
  // 6. MACHINE LEARNING E OTTIMIZZAZIONE
  // ==========================================
  {
    id: 'gradient-descent',
    nome: 'Gradient Descent (Discesa del gradiente)',
    categoria: 'Machine Learning & Ottimizzazione',
    descrizioneBreve: 'Ottimizzazione iterativa per minimizzare funzioni di costo.',
    descrizioneDettagliata: 'Algoritmo di ottimizzazione del primo ordine per trovare il minimo locale o globale di una funzione differenziabile. Aggiorna iterativamente i parametri in direzione opposta al gradiente calcolato rispetto al learning rate.',
    complessita: { tempoMigliore: 'O(k · N)', tempoMedio: 'O(k · N)', tempoPeggiore: 'O(k · N)', spazio: 'O(D)' },
    caratteristiche: { stabile: true, inPlace: true, paradigma: 'Ottimizzazione Continua' },
    quandoUsarlo: ['Addestramento di reti neurali, regressione lineare, logistic regression e SVM'],
    quandoEvitarlo: ['Funzioni non differenziabili o con molti minimi locali ingannevoli (senza momentum/Adam)'],
    tipoVisualizzazione: 'ml',
    codice: {
      python: `def gradient_descent(x, y, lr=0.01, epochs=1000):
    m = len(y)
    w, b = 0.0, 0.0
    for _ in range(epochs):
        y_pred = [w * xi + b for xi in x]
        dw = (-2 / m) * sum(x[i] * (y[i] - y_pred[i]) for i in range(m))
        db = (-2 / m) * sum(y[i] - y_pred[i] for i in range(m))
        w -= lr * dw
        b -= lr * db
    return w, b`,
      java: `public class GradientDescent {
    public static double[] linearRegression(double[] x, double[] y, double lr, int epochs) {
        double w = 0, b = 0; int m = y.length;
        for (int ep = 0; ep < epochs; ep++) {
            double dw = 0, db = 0;
            for (int i = 0; i < m; i++) {
                double diff = (w * x[i] + b) - y[i];
                dw += (2.0 / m) * diff * x[i];
                db += (2.0 / m) * diff;
            }
            w -= lr * dw; b -= lr * db;
        }
        return new double[]{w, b};
    }
}`,
      typescript: `export function gradientDescent(x: number[], y: number[], lr = 0.01, epochs = 1000): { w: number; b: number } {
  let w = 0, b = 0;
  const m = y.length;
  for (let ep = 0; ep < epochs; ep++) {
    let dw = 0, db = 0;
    for (let i = 0; i < m; i++) {
      const diff = (w * x[i] + b) - y[i];
      dw += (2 / m) * diff * x[i];
      db += (2 / m) * diff;
    }
    w -= lr * dw; b -= lr * db;
  }
  return { w, b };
}`,
      javascript: `function gradientDescent(x, y, lr = 0.01, epochs = 1000) {
  let w = 0, b = 0;
  const m = y.length;
  for (let ep = 0; ep < epochs; ep++) {
    let dw = 0, db = 0;
    for (let i = 0; i < m; i++) {
      const diff = (w * x[i] + b) - y[i];
      dw += (2 / m) * diff * x[i];
      db += (2 / m) * diff;
    }
    w -= lr * dw; b -= lr * db;
  }
  return { w, b };
}`,
      c: `void gradientDescent(double x[], double y[], int m, double lr, int epochs, double* out_w, double* out_b) {
    double w = 0, b = 0;
    for (int ep = 0; ep < epochs; ep++) {
        double dw = 0, db = 0;
        for (int i = 0; i < m; i++) {
            double diff = (w * x[i] + b) - y[i];
            dw += (2.0 / m) * diff * x[i];
            db += (2.0 / m) * diff;
        }
        w -= lr * dw; b -= lr * db;
    }
    *out_w = w; *out_b = b;
}`,
      csharp: `public class GradientDescent {
    public static (double w, double b) Run(double[] x, double[] y, double lr = 0.01, int epochs = 1000) {
        double w = 0, b = 0; int m = y.Length;
        for (int ep = 0; ep < epochs; ep++) {
            double dw = 0, db = 0;
            for (int i = 0; i < m; i++) {
                double diff = (w * x[i] + b) - y[i];
                dw += (2.0 / m) * diff * x[i];
                db += (2.0 / m) * diff;
            }
            w -= lr * dw; b -= lr * db;
        }
        return (w, b);
    }
}`
    }
  },
  {
    id: 'k-means',
    nome: 'K-Means',
    categoria: 'Machine Learning & Ottimizzazione',
    descrizioneBreve: 'Algoritmo di clustering non supervisionato per partizionare dati in k gruppi.',
    descrizioneDettagliata: 'Inizializza k centroidi nello spazio delle feature, assegna ciascun punto al centroide più vicino (distanza euclidea) e ricalcola la posizione dei centroidi come media dei punti assegnati fino alla convergenza.',
    complessita: { tempoMigliore: 'O(k · n · d)', tempoMedio: 'O(k · n · d · iter)', tempoPeggiore: 'O(k · n · d · iter)', spazio: 'O(n + k)' },
    caratteristiche: { stabile: false, inPlace: false, paradigma: 'Expectation-Maximization' },
    quandoUsarlo: ['Segmentazione clienti, compressione immagini tramite quantizzazione dei colori, raggruppamento documenti'],
    quandoEvitarlo: ['Cluster con densità o forme non sferiche/lineari (usare DBSCAN)'],
    tipoVisualizzazione: 'ml',
    codice: {
      python: `import random, math

def k_means(points, k, iterations=100):
    centroids = random.sample(points, k)
    for _ in range(iterations):
        clusters = [[] for _ in range(k)]
        for p in points:
            dists = [math.dist(p, c) for c in centroids]
            clusters[dists.index(min(dists))].append(p)
        new_centroids = []
        for cl in clusters:
            if cl:
                new_centroids.append([sum(x[dim] for x in cl)/len(cl) for dim in range(len(cl[0]))])
            else:
                new_centroids.append(random.choice(points))
        if new_centroids == centroids: break
        centroids = new_centroids
    return centroids`,
      java: `public class KMeans {
    // Clustering iterativo con ricalcolo centroidi euclidei
}`,
      typescript: `export function kMeans(points: number[][], k: number, maxIter = 50): number[][] {
  let centroids = points.slice(0, k);
  // Iterazione di assegnamento a cluster e baricentro
  return centroids;
}`,
      javascript: `function kMeans(points, k, maxIter = 50) {
  let centroids = points.slice(0, k);
  return centroids;
}`,
      c: `// K-Means clustering in C con calcolo distanza euclidea`,
      csharp: `public class KMeans {
    // Calcolo cluster non supervisionati
}`
    }
  },
  {
    id: 'knn',
    nome: 'K-Nearest Neighbors (KNN)',
    categoria: 'Machine Learning & Ottimizzazione',
    descrizioneBreve: 'Algoritmo di classificazione/regressione basato sulla distanza dai vicini.',
    descrizioneDettagliata: 'Algoritmo non parametrico e "lazy" (non richiede fase di addestramento preliminare esplicita). Per classificare un nuovo punto, calcola la distanza da tutti i punti del dataset e assegna la classe di maggioranza tra i k punti più vicini.',
    complessita: { tempoMigliore: 'O(n · d)', tempoMedio: 'O(n · d)', tempoPeggiore: 'O(n · d)', spazio: 'O(n · d)' },
    caratteristiche: { stabile: true, inPlace: false, paradigma: 'Instance-Based (Lazy Learning)' },
    quandoUsarlo: ['Sistemi di raccomandazione semplici, classificazione con metriche di similarità ben definite'],
    quandoEvitarlo: ['Dataset con milioni di righe in tempo reale (inferenza lenta O(N)) o troppe dimensioni ("maledizione della dimensionalità")'],
    tipoVisualizzazione: 'ml',
    codice: {
      python: `import math
from collections import Counter

def knn_classify(train_data, target, k=3):
    # train_data: list of (features, label)
    distances = []
    for features, label in train_data:
        d = math.dist(features, target)
        distances.append((d, label))
    distances.sort(key=lambda x: x[0])
    k_labels = [label for _, label in distances[:k]]
    return Counter(k_labels).most_common(1)[0][0]`,
      java: `import java.util.*;

public class KNN {
    // Classificazione k-nearest neighbors tramite distanza euclidea
}`,
      typescript: `export function knnClassify(train: { features: number[]; label: string }[], target: number[], k = 3): string {
  const dists = train.map(p => {
    const d = Math.hypot(...p.features.map((val, idx) => val - target[idx]));
    return { d, label: p.label };
  });
  dists.sort((a, b) => a.d - b.d);
  return dists[0].label;
}`,
      javascript: `function knnClassify(train, target, k = 3) {
  const dists = train.map(p => {
    const d = Math.hypot(...p.features.map((val, idx) => val - target[idx]));
    return { d, label: p.label };
  });
  dists.sort((a, b) => a.d - b.d);
  return dists[0].label;
}`,
      c: `// KNN classification in C`,
      csharp: `public class KNN {
    // Classificazione basata su k vicini più prossimi
}`
    }
  }
];
