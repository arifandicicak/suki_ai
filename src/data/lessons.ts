import { Lesson } from "../types";

export const LESSONS: Lesson[] = [
  // --- TREE MUDAH ---
  {
    id: "m1",
    title: "Seni Logika Proposisi & Percabangan",
    category: "mudah",
    shortDesc: "Belajar dasar pemikiran logis komputer menggunakan ekspresi Boolean dan percabangan keputusan.",
    xpReward: 50,
    content: `### Apa itu Logika Proposisi di Komputer?

Komputer bekerja berdasarkan sinyal listrik yang bernilai 0 (mati) atau 1 (hidup). Representasi ini di dalam dunia pemrograman dikenal sebagai tipe data **Boolean**, yang hanya memiliki dua kemungkinan nilai: **True** (benar) atau **False** (salah).

Logika proposisi memungkinkan kita membuat keputusan berdasarkan kondisi tertentu menggunakan operator dasar:
1. **AND (&&)**: Menghasilkan True jika dan hanya jika semua kondisi bernilai benar.
2. **OR (||)**: Menghasilkan True jika salah satu atau semua kondisi bernilai benar.
3. **NOT (!)**: Membalikkan nilai logika (True menjadi False, dan sebaliknya).

#### Percabangan Keputusan (If-Else)
Struktur percabangan memungkinkan kode kita melompat ke blok perintah tertentu bergantung pada kondisi logika. Contoh sederhana dalam JavaScript/TypeScript:

\`\`\`typescript
const nilaiKuis = 85;
const lulusKuis = nilaiKuis >= 70; // bernilai True

if (lulusKuis) {
  console.log("Selamat, kamu memperoleh +50 EXP!");
} else {
  console.log("Jangan menyerah, coba lagi!");
}
\`\`\`

Dengan menguasai logika dasar ini, kamu bisa merantai ratusan keputusan untuk membuat aplikasi yang cerdas!`,
    quiz: {
      id: "q_m1",
      question: "Jika variabel A = True dan variabel B = False, manakah ekspresi logika di bawah ini yang menghasilkan nilai True?",
      options: [
        "A && B",
        "A && !B",
        "!A || B",
        "!(A || !B)"
      ],
      answerIndex: 1,
      explanation: "A && !B bernilai True karena A bernilai True, dan !B (bukan False) juga bernilai True. Sesuai hukum AND, jika kedua kondisi True, maka hasilnya adalah True."
    }
  },
  {
    id: "m2",
    title: "Misteri Variabel & Memori Komputer",
    category: "mudah",
    shortDesc: "Bagaimana komputer menaruh dan mengingat informasi di dalam RAM menggunakan wadah variabel.",
    xpReward: 50,
    content: `### Wadah Pintar Bernama Variabel

Bayangkan RAM (Random Access Memory) di komputermu sebagai lemari penyimpanan raksasa yang memiliki jutaan laci kecil berlabel angka. Menulis alamat laci secara manual untuk membaca data tentu merupakan siksaan bagi pemrogram. Di sinilah **variabel** bertindak sebagai penyelamat!

Variabel adalah label nama manusiawi yang merujuk pada alamat memori fisik tertentu, sehingga kita dapat menyimpan, mengubah, dan memanggil data dengan mudah.

#### Tipe Data Dasar
Komputer perlu tahu jenis barang apa yang kita masukkan ke dalam laci memori, agar dapat mengalokasikan ukuran laci yang pas. Beberapa tipe data primitif terpenting:
- **String**: Teks biasa (misal: "StudiBuddy AI") yang biasanya dibungkus tanda kutip.
- **Number**: Angka numerik baik bulat (integer) maupun pecahan (float).
- **Boolean**: Nilai kebenaran (True / False).
- **Null / Undefined**: Menunjukkan ketidakberadaan nilai atau wadah kosong.

#### Mendeklarasikan Variabel di TypeScript
Dalam bahasa pemrograman modern seperti TypeScript, kita menggunakan kata kunci \`let\` untuk variabel yang nilainya bisa diubah, dan \`const\` untuk konstanta yang nilainya tetap:

\`\`\`typescript
const namaAplikasi: string = "StudySuki AI";
let levelUser: number = 1;
\`\`\`

Menggunakan tipe data yang tepat menjaga memori komputer tetap ramping dan menghindari bug fatal!`,
    quiz: {
      id: "q_m2",
      question: "Kata kunci mana yang paling sesuai digunakan di TypeScript untuk mendeklarasikan nilai gravitasi bumi (9.8 m/s²) yang tidak boleh diubah?",
      options: [
        "let gravitasi = 9.8",
        "var gravitasi = 9.8",
        "const gravitasi = 9.8",
        "mutable gravitasi = 9.8"
      ],
      answerIndex: 2,
      explanation: "Kata kunci 'const' digunakan khusus untuk mendeklarasikan variabel konstanta yang nilainya bersifat read-only setelah diinisialisasi awal, ideal untuk nilai sains seperti gravitasi."
    }
  },
  {
    id: "m3",
    title: "Bagaimana Paket Data Internet Mengelilingi Dunia",
    category: "mudah",
    shortDesc: "Menjelajahi jalur rahasia protokol TCP/IP, Router, dan DNS dalam mengirimkan pesan dalam milidetik.",
    xpReward: 50,
    content: `### Keajaiban Jaringan Internet

Setiap kali kamu membuka browser dan mengetik \`google.com\`, terjadi perjalanan epik ribuan kilometer di dasar samudera melalui kabel serat optik dengan kecepatan cahaya yang selesai dalam hitungan milidetik. Bagaimana ini mungkin?

#### 1. DNS (Domain Name System) - Buku Telepon Internet
Komputer tidak memahami kata-kata seperti \`google.com\`. Mereka berkomunikasi dengan alamat angka unik bernama **IP Address** (contoh: \`142.250.190.46\`). DNS bertugas menerjemahkan nama domain yang manusiawi menjadi IP Address yang dimengerti mesin.

#### 2. Pembagian Menjadi Paket-Paket Kecil
Ketika kamu mengirim foto kucing berukuran 5MB ke temanmu, gambar tersebut tidak dikirim utuh satu gumpalan besar. Protokol **TCP** (Transmission Control Protocol) memotong-motong file tersebut menjadi ribuan kepingan kecil bernama **Paket**.

Setiap paket dilabeli dengan:
- Alamat asal dan tujuan.
- Urutan potongan (misal: Paket 1 dari 100).

#### 3. Peran Router di Jalan Raya Internet
Paket-paket ini dikirim ke jaringan. **Router** bertindak sebagai polisi lalu lintas internet, yang mencarikan rute tercepat dan tidak macet untuk mengirimkan paket tersebut dari satu komputer ke komputer lain. 

Begitu semua paket terkumpul di tempat tujuan, protokol TCP akan menyusun ulang paket-paket tersebut sesuai urutan aslinya. Jika ada paket yang hilang atau rusak di perjalanan, penerima akan otomatis meminta pengiriman ulang khusus untuk paket yang hilang tersebut!`,
    quiz: {
      id: "q_m3",
      question: "Apakah peran utama dari Domain Name System (DNS) dalam berselancar di internet?",
      options: [
        "Enkripsi password agar aman dari peretas",
        "Menerjemahkan nama domain manusiawi menjadi alamat IP angka yang dimengerti jaringan",
        "Menyatukan paket-paket data yang terpecah",
        "Mematikan virus berbahaya sebelum masuk ke komputer kita"
      ],
      answerIndex: 1,
      explanation: "DNS berfungsi seperti buku telepon raksasa yang menerjemahkan nama domain berformat teks seperti 'google.com' menjadi alamat IP tujuan (misalnya 172.217.0.0) agar browser tahu server mana yang harus dihubungi."
    }
  },

  // --- TREE SEDANG ---
  {
    id: "s1",
    title: "Algoritma Pencarian Heuristik & Logika AI",
    category: "sedang",
    shortDesc: "Bagaimana AI menemukan jalur terpendek atau memprediksi langkah taktis menggunakan algoritma heuristic.",
    xpReward: 50,
    content: `### Pencarian Heuristik: Jalan Pintas Cerdas AI

Bayangkan kamu berada di sebuah labirin raksasa dan ingin mencari pintu keluar. Pencarian konvensional (seperti *Breadth-First Search* atau pencarian buta) akan memaksa kamu menelusuri setiap lorong satu per satu secara berurutan. Ini membutuhkan waktu teramat lama dan memakan banyak memori!

Di dunia kecerdasan buatan, kita menggunakan teknik **Pencarian Heuristik** (Heuristic Search).

#### Apa itu Heuristik?
Secara sederhana, **heuristik** adalah nilai tebakan terdidik atau aturan perkiraan (rule of thumb) untuk memperkirakan seberapa dekat posisi kita sekarang dengan tujuan akhir.

Contoh paling populer adalah dalam pencarian rute peta seperti algoritma **A\* (A-Star)**. A* menghitung biaya setiap persimpangan jalan menggunakan rumus:
$$f(n) = g(n) + h(n)$$

Dimana:
- $g(n)$ adalah jarak nyata dari titik awal ke titik saat ini.
- $h(n)$ adalah perkiraan jarak udara garis lurus (*heuristic*) dari titik saat ini langsung ke tujuan akhir.

#### Mengapa Heuristik Penting untuk game Catur?
Dalam catur, komputer tidak bisa menghitung hingga akhir permainan dari langkah pertama karena ada lebih banyak kemungkinan posisi catur dibanding atom di seluruh alam semesta (Hukum Shannon). 

Maka, AI menggunakan fungsi heuristik (evaluasi posisi) untuk menebak kualitas papan catur, misalnya:
- **Pion (1 poin)**, **Kuda/Gajah (3 poin)**, **Benteng (5 poin)**, **Menteri (9 poin)**.
- Keamanan posisi Raja dan kontrol area tengah papan.

Dengan menjumlahkan nilai ini, AI tahu langkah mana yang paling menguntungkan tanpa menduga setiap kemungkinan jalan buntu!`,
    quiz: {
      id: "q_s1",
      question: "Mengapa algoritma pencarian rute A* (A-star) jauh lebih efisien dibandingkan dengan pencarian buta (Dijkstra biasa) dalam peta yang sangat luas?",
      options: [
        "A* tidak pernah memeriksa jalan buntu",
        "A* menggunakan fungsi perkiraan heuristik untuk mengarahkan pencarian tepat menuju arah tujuan, daripada melebar ke segala arah",
        "A* mengecilkan ukuran data peta sebelum dicari",
        "A* ditulis dalam bahasa rakitan (Assembly) khusus"
      ],
      answerIndex: 1,
      explanation: "A* menggunakan informasi heuristik (h(n)) yang mengukur estimasi jarak tersisa menuju titik target, memandu ekspansi node selalu condong mengarah ke tujuan awal sehingga memangkas pengerjaan penelusuran rute kosong."
    }
  },
  {
    id: "s2",
    title: "Mantra Machine Learning: Mengajar Mesin Belajar",
    category: "sedang",
    shortDesc: "Pelajari perbedaan dasar pembelajaran terpandu (Supervised) dan mandiri (Unsupervised) yang menggerakkan filter spam hingga self-driving car.",
    xpReward: 50,
    content: `### Paradigma Baru: Pemrograman vs Pembelajaran

Pada pemrograman konvensional, kita memasukkan **Aturan logika (Code)** dan **Data**, lalu komputer mengeluarkan **Jawaban**.

Pada **Machine Learning**, paradigmanya dibalik secara revolusioner! Kita memberikan komputer **Data** dan **Jawaban Contoh**, lalu mesin tersebut akan mencari serta melahirkan sendiri **Aturan Logika** yang mengikatnya!

#### 3 Pilar Utama Pembelajaran Mesin
1. **Supervised Learning (Pembelajaran Terbimbing)**
   Komputer belajar dari data yang sudah diberi *label/jawaban*. Contoh: Kita memberi AI 10.000 foto kucing lengkap dengan label "Kucing", dan 10.000 foto anjing berlabel "Anjing". Setelah dilatih, model bisa menebak hewan pada foto baru.
   - *Aplikasi*: Deteksi filter email spam, pengenal wajah.

2. **Unsupervised Learning (Pembelajaran Tanpa Bimbingan)**
   Data yang diberikan tidak memiliki label apa pun. Komputer ditantang untuk mencari pola tersembunyi, kemiripan fitur, struktur data, atau pengelompokan (*clustering*) tersendiri.
   - *Aplikasi*: Rekomendasi segmentasi pasar belanja, pengelompokan lagu Spotify.

3. **Reinforcement Learning (Pembelajaran Penguatan)**
   Mesin belajar melalui sistem coba-coba (*trial and error*) dalam sebuah simulasi lingkungan virtual, mendapatkan **hadiah (rewards)** ketika bertindak benar, dan mendapat **hukuman (penalties)** atas kesalahan.
   - *Aplikasi*: AI yang memenangkan permainan catur, Go (AlphaGo), dan pengendali autopilot robotik.`,
    quiz: {
      id: "q_s2",
      question: "Jika kamu ingin mengajari komputer mendeteksi transaksi kartu kredit asing palsu berdasarkan sekumpulan riwayat transaksi yang ditandai manual sebagai 'Sah' atau 'Penipuan', paradigma pembelajaran mesin apa yang sedang kamu terapkan?",
      options: [
        "Unsupervised Learning",
        "Supervised Learning",
        "Reinforcement Learning",
        "Genetic Mutation Learning"
      ],
      answerIndex: 1,
      explanation: "Karena data latihan menyertakan label penanda yang jelas ('Sah' atau 'Penipuan') sebagai panduan koreksi jawaban ke komputer, tipe ini tergolong ke dalam Supervised Learning."
    }
  },
  {
    id: "s3",
    title: "Struktur Data Pohon Biner (Binary Tree)",
    category: "sedang",
    shortDesc: "Bagaimana menata ribuan antrean data kompleks agar pencarian selesai dalam fraksi mili-detik dengan Binary Search Tree.",
    xpReward: 50,
    content: `### Mengapa Array Biasa Terlalu Lambat?

Bayangkan memiliki daftar 1 Juta kontak telepon yang diurutkan dalam bentuk barisan antrean (*Array*). Jika kamu ingin mencari nama 'Zidan' di pojok belakang, komputermu harus mengecek satu demi satu dari indeks nomor 1 sampai selesai. Operasi pencarian linear ini membutuhkan waktu $O(N)$!

Struktur **Binary Search Tree (BST)** menata data seperti akar pohon beranting dua yang memangkas waktu pencarian secara drastis menjadi $O(\\log N)$.

#### Aturan Emas Binary Search Tree
Peta petualangan *StudySuki AI* kamu dibuat menggunakan struktur bertingkat seperti pohon keputusan. Pada BST, setiap titik (atau dinamakan **Node**) menyimpan nilai dengan hukum ketat:
- **Anak Kiri (Left Child)** selalu menyimpan nilai yang **LEBIH KECIL** dari Node Utama induknya.
- **Anak Kanan (Right Child)** selalu menyimpan nilai yang **LEBIH BESAR** dari Node Utama induknya.

#### Pencarian Secepat Kilat
Ketika mencari angka \`7\` dalam BST:
1. Bandingkan dengan akar atas (misal akar bernilai \`10\`). Karena \`7 < 10\`, beloklah ke kiri seluruh cabang kanan otomatis terbuang!
2. Di node berikutnya bernilai \`5\`. Karena \`7 > 5\`, beloklah ke kanan cabang kiri terbuang!
3. Kita langsung menemukan node \`7\` hanya dalam 3 langkah pembagian, dibanding harus mengecek puluhan deret array!

Inilah fondasi di belakang database super cepat modern dan struktur sistem berkas komputermu!`,
    quiz: {
      id: "q_s3",
      question: "Di dalam Binary Search Tree (BST) yang valid, jika sebuah Node memiliki kunci bernilai 15, di manakah posisi node bernilai 18 harus ditempatkan?",
      options: [
        "Sebagai anak di cabang bagian kiri node 15",
        "Sebagai anak di cabang bagian kanan node 15",
        "Menjadi node akar utama menggantikan node 15",
        "Tidak bisa diletakkan karena merusak keselarasan BST"
      ],
      answerIndex: 1,
      explanation: "Karena nilai 18 lebih besar dibandingkan 15 (18 > 15), aturan baku Binary Search Tree mewajibkan semua nilai yang lebih besar mutlak menghuni sub-tree lereng sebelah kanan."
    }
  },

  // --- TREE SUSAH ---
  {
    id: "h1",
    title: "Arsitektur Jaringan Saraf Tiruan & Deep Learning",
    category: "susah",
    shortDesc: "Menyelami rumus biologis otak manusia yang ditiru komputer berupa lapisan neuron, fungsi aktivasi, dan backpropagation.",
    xpReward: 50,
    content: `### Meniru Otak Biologis dengan Kode

**Jaringan Saraf Tiruan** (Artificial Neural Networks - ANN) adalah jaringan komputasi yang terinspirasi dari sambungan miliaran sel neuron di dalam otak manusia untuk mengenali pola-pola yang rumit.

#### Anatomi Neuron Buatan
Setiap neuron tiruan (disebut juga *Perceptron*) menerima beberapa sinyal masukan ($x$), mengalikannya dengan faktor kepentingan berbeda yang disebut **Bobot ($w$ - weights)**, lalu menjumlahkannya dengan menambahkan nilai pergeseran bernama **Bias ($b$)**:

$$z = w_1x_1 + w_2x_2 + ... + b$$

Hasil akhir penjumlahan ini dimasukkan ke dalam **Fungsi Aktivasi** (seperti *ReLU* atau *Sigmoid*) untuk menentukan apakah neuron tersebut harus mengeluarkan sinyal aktif (menembak) atau tetap diam.

#### Lapisan-Lapisan Jaringan (Layers)
Model Deep Learning bertumpuk atas tiga golongan lapisan utama:
1. **Input Layer**: Menerima data mentah (misal: piksel sebuah gambar).
2. **Hidden Layers (Lapisan Tersembunyi)**: Puluhan atau ratusan lapisan perantara yang secara abstrak mempelajari fitur gambar (lapisan awal mendeteksi garis lurus, lapisan tengah mendeteksi pola mata/lingkaran, lapisan akhir menyimpulkan objek wajah).
3. **Output Layer**: Mengeluarkan tebakan keputusan akhir (contoh: '94% Wajah Kucing').

#### Bagaimana Saraf AI Memperbaiki Kesalahannya?
Ketika pertama kali dihidupkan, bobot ($w$) neuron dipasang acak, sehingga tebakan AI sangat berantakan. 
- Kita menghitung seberapa jauh melesetnya tebakan tersebut dengan **Loss Function**.
- Algoritma **Backpropagation** kemudian membisikkan pesan balik ke belakang jaringan untuk menggeser sedikit demi sedikit nilai bobot di setiap lapisan menggunakan ilmu kalkulus turunan (**Gradient Descent**), mempersempit kesalahan di latihan berikutnya. Proses ini diulang jutaan kali hingga AI menjadi sangat pintar!`,
    quiz: {
      id: "q_h1",
      question: "Apa fungsi utama dari algoritma Backpropagation dalam melatih jaringan saraf tiruan?",
      options: [
        "Menginisiasi angka masukan gambar menjadi deret biner",
        "Menghitung gradien tingkat error dan meneruskannya ke belakang untuk meramu/memperbarui bobot (weights) di tiap neuron",
        "Menggabungkan dua buah model AI yang berbeda agar bersatu",
        "Menghapus neuron yang jarang terpakai untuk menghemat RAM"
      ],
      answerIndex: 1,
      explanation: "Backpropagation menggunakan aturan rantai turunan kalkulus untuk merayap mundur dari hasil tebakan akhir, mengukur porsi kontribusi kesalahan masing-masing neuron, lalu merevisi bobot agar performa generasi berikutnya kian presisi."
    }
  },
  {
    id: "h2",
    title: "Arsitektur Transformer: Lahirnya Mesin GPT",
    category: "susah",
    shortDesc: "Bagaimana mekanisme Self-Attention memungkinkan komputer memahami konteks kalimat utuh sekaligus dan melahirkan gelombang AI modern.",
    xpReward: 50,
    content: `### Revolusi Transformer

Sebelum tahun 2017, AI pemroses bahasa alami (seperti Google Translate lama) membaca kalimat kata demi kata secara berurutan (*Recurrent Neural Networks* - RNN). Jika diberi novel panjang, komputer akan sering lupa konteks awal saat berada di halaman tengah karena ingatan jangka pendeknya bocor.

Semua itu berubah total ketika peneliti Google menerbitkan makalah bersejarah: **"Attention Is All You Need"**, mengenalkan arsitektur **Transformer**.

#### Mekanisme Self-Attention (Perhatian Mandiri)
Kunci rahasia Transformer adalah **Self-Attention**. Mekanisme ini menilai keterkaitan makna antar setiap kata dalam satu kalimat sekaligus secara mendalam, tidak peduli seberapa jauh posisinya berada.

Contoh kalimat:
> *"Kucing itu tidak mau naik ke atas pohon karena **ia** sangat lelah."*

Ketika membaca kata **"ia"**, manusia secara naluriah tahu itu merujuk pada **"Kucing itu"**, bukan "pohon". Transformer meniru insting manusia ini dengan menghitung matriks matematis yang memberikan skor keterkaitan sangat besar antara neuron kata "ia" dengan "Kucing itu".

#### Keunggulan Paralelisasi
Karena Transformer memproses seluruh kata secara serentak (paralel), tidak lagi baris per baris bertahap, kita dapat melatih model raksasa ini menggunakan jutaan data artikel internet di ribuan kartu grafis (GPU) super cepat.

Inilah mesin penggerak mahakarya Generative AI modern seperti ChatGPT, Claude, dan tentu saja model **Gemini** yang sedang menyokong obrolan jeniusmu dengan StudySuki AI sekarang!`,
    quiz: {
      id: "q_h2",
      question: "Apakah inovasi terpenting dari arsitektur Transformer dibandingkan dengan model sekuensial RNN terdahulu?",
      options: [
        "Menggunakan baterai tambahan di server fisik",
        "Sistem Self-Attention yang memproses seluruh kata secara paralel sekaligus dan mengikat relasi semantik jarak jauh",
        "Menolak penggunaan format file teks biasa dalam melatih dataset",
        "Membatasi jumlah kata ekspresi bahasa gaul"
      ],
      answerIndex: 1,
      explanation: "Transformer melupakan pemrosesan berurutan selangkah demi selangkah dan memperkenalkan mekanisme Self-Attention yang membaca seluruh kalimat secara bersama-sama, menyerap koherensi semantik teks multikalimat secara paralel serta efisien."
    }
  },
  {
    id: "h3",
    title: "Misteri Teori Komputasi: Pertempuran P vs NP",
    category: "susah",
    shortDesc: "Menelaah pertanyaan terbesar matematika bernilai $1 Juta tentang batas kemampuan komputer dalam memecahkan masalah tersulit sejagat.",
    xpReward: 50,
    content: `### Masalah Hadiah Milenium Matematika

Maukah kamu kaya mendadak dalam semalam dengan menyelesaikan satu pertanyaan coretan kertas? Clay Mathematics Institute menawarkan hadiah tunai **$1.000.000** bagi siapa saja yang sanggup membuktikan apakah:
$$\\mathbf{P = NP}$$

Ini bukan sekadar coretan nirlaba, ini adalah batas filosofis seberapa kuat komputer kita mampu berpikir!

#### P (Polynomial Time): Masalah yang Cepat Dipecahkan
Masalah golongan **P** adalah teka-teki yang bisa dipecahkan komputer dengan algoritma yang relatif cepat dan efisien. 
- *Contoh*: Melakukan pengurutan alfabet 1000 nama kontak, perkalian angka besar, mencari jalur rute GPS tercepat. Waktu pengerjaannya tumbuh wajar selaras ukuran data ($O(N^2)$).

#### NP (Nondeterministic Polynomial Time): Masalah yang Cepat Dilakukan Verifikasi
Masalah golongan **NP** adalah jenis tantangan yang **sangat sulit dicari jawabannya** dari nol (bisa menghabiskan miliaran tahun bagi komputer super sekalipun), namun **sangat mudah bagi komputer untuk memverifikasi** kebenaran jawabannya jika kita menyodorkan kunci jawabannya.

- *Contoh Sudoku*: Menyelesaikan papan Sudoku raksasa berukuran 100x100 sangat memeras otak. Namun jika seseorang menunjukkan Sudoku yang sudah terisi penuh, kamu bisa memvalidasinya dengan cepat dalam detik hanya dengan mengecek baris dan kolom.
- *Contoh Kriptografi*: Meretas kata sandi akun bank terlindungi (mencari faktor prima raksasa) bisa memakan waktu berabad-abad. Tapi memverifikasi apakah sidik jari sandi yang dimasukkan user itu cocok hanya butuh mikrodetik.

#### Teori P = NP
Jika $P = NP$ terbukti benar, artinya **setiap masalah yang penyelesaiannya mudah diverifikasi, sebenarnya juga mudah untuk dipecahkan jika kita berani mencari algoritmanya**. 

Jika dikonfirmasi $P=NP$:
- Seluruh enkripsi kata sandi perbankan dunia akan runtuh seketika karena sangat mudah dibongkar.
- Tugas optimasi sulit seperti mendesain struktur kimia obat penyembuh kanker bisa diselesaikan komputer dalam hitungan jam!
- Dipercaya mayoritas ilmuwan saat ini bahwa $P \\neq NP$ (keduanya terpisah), tetapi belum ada seorang pun di planet bumi yang mampu melahirkan bukti formal matematikanya secara sah.`,
    quiz: {
      id: "q_h3",
      question: "Manakah pernyataan di bawah ini yang menggambarkan hakikat sejati dari kelas masalah NP?",
      options: [
        "Masalah yang sama sekali tidak bisa diselesaikan oleh komputer jenis apa pun",
        "Masalah yang memakan waktu lama untuk dicari jawabannya, namun solusinya sangat cepat diverifikasi/dibuktikan kebenarannya",
        "Masalah yang hanya berisi angka bilangan negatif",
        "Masalah optimasi yang dirancang oleh pembuat game catur"
      ],
      answerIndex: 1,
      explanation: "Kelas NP (Nondeterministic Polynomial) mencakup masalah-masalah di mana mencari solusinya langsung bisa memerlukan pengerjaan eksponensial yang melelahkan, tetapi memvalidasi sebuah kandidat solusi yang diajukan hanya memakan waktu polinomial yang efisien."
    }
  }
];
