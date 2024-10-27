let startTime;
let elapsedTime = 0; // Menyimpan total waktu yang telah berlalu
let running = false;
let timerInterval;
let activeButton = null;

const equipmentSelect = document.getElementById('equipment');
const toolButtonsContainer = document.getElementById('toolButtons');
const equipmentHistoryList = document.getElementById('equipmentHistoryList');
const timerDisplay = document.getElementById('timerDisplay'); // Elemen untuk menampilkan waktu berjalan

// Konfigurasi alat dan tombol
const toolConfigs = {
    excavator: [
        { label: '1', description: 'Waktu Menggali' },
        { label: '2', description: 'Swing Isi' },
        { label: '3', description: 'Waktu Tumpah' },
        { label: '4', description: 'Swing Kosong' }
    ],
    dumtruk: [
        { label: '1', description: 'Posisi Siap Muat' },
        { label: '2', description: 'Pengisian' },
        { label: '3', description: 'Pergi Isi' },
        { label: '4', description: 'Posisi Untuk Menumpah' },
        { label: '5', description: 'Dumping' }
    ],
    bulldozer: [
        { label: '1', description: 'Maju Dorong' },
        { label: '2', description: 'Mundur' }
    ],
    grader: [
        { label: '1', description: 'Maju Dorong' },
        { label: '2', description: 'Mundur' }
    ],
    drum_roller: [
        { label: '1', description: 'Maju Compaction' },
        { label: '2', description: 'Mundur Compaction' }
    ]
};

// Fungsi untuk menampilkan tombol berdasarkan alat yang dipilih
function displayToolButtons(tool) {
    toolButtonsContainer.innerHTML = ''; // Bersihkan tombol sebelumnya

    const buttons = toolConfigs[tool];
    
    if (!buttons) {
        alert('Kategori alat tidak ditemukan.');
        return;
    }

    // Membuat tombol berdasarkan konfigurasi alat
    buttons.forEach(buttonConfig => {
        const button = document.createElement('button');
        button.innerText = buttonConfig.label;
        button.classList.add('tool-button', 'red');
        button.dataset.description = buttonConfig.description; // Simpan deskripsi
        button.addEventListener('click', () => handleButtonPress(button, buttonConfig.description));
        toolButtonsContainer.appendChild(button);
    });

    // Tombol Pause dan Stop
    const pauseButton = document.createElement('button');
    pauseButton.innerText = 'Pause';
    pauseButton.classList.add('tool-button', 'red');
    pauseButton.addEventListener('click', () => togglePause(pauseButton));
    toolButtonsContainer.appendChild(pauseButton);

    const stopButton = document.createElement('button');
    stopButton.innerText = 'Stop';
    stopButton.classList.add('tool-button', 'red');
    stopButton.addEventListener('click', stopTimer);
    toolButtonsContainer.appendChild(stopButton);

    // Tombol Hapus Riwayat
    const clearHistoryButton = document.createElement('button');
    clearHistoryButton.innerText = 'Hapus Riwayat';
    clearHistoryButton.classList.add('tool-button', 'red');
    clearHistoryButton.addEventListener('click', clearHistory);
    toolButtonsContainer.appendChild(clearHistoryButton);
}

// Fungsi untuk menangani tombol yang ditekan
function handleButtonPress(button, description) {
    if (activeButton !== button) {
        if (activeButton) {
            stopTimer(); // Hentikan timer sebelumnya
        }
        elapsedTime = 0; // Reset waktu sebelum memulai timer baru
        startTimer(button, description);
    }
}

// Fungsi untuk memulai timer
function startTimer(button, description) {
    button.classList.remove('red');
    button.classList.add('blue'); // Ubah warna tombol aktif
    activeButton = button;
    startTime = new Date().getTime(); // Waktu mulai
    running = true;

    // Mulai timer interval untuk memperbarui tampilan setiap 100ms
    timerInterval = setInterval(updateTimerDisplay, 100);
}

// Fungsi untuk memperbarui tampilan waktu
function updateTimerDisplay() {
    if (!running) return;

    const currentTime = new Date().getTime();
    elapsedTime += (currentTime - startTime) / 1000; // Waktu total dalam detik
    startTime = currentTime;

    // Format waktu dalam jam:menit:detik
    const hours = Math.floor(elapsedTime / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(elapsedTime % 60).toString().padStart(2, '0');
    const decimalSeconds = Math.floor((elapsedTime % 1) * 100).toString().padStart(2, '0');

    timerDisplay.innerText = `${hours}:${minutes}:${seconds}.${decimalSeconds}`;
}

// Fungsi untuk menghentikan timer
function stopTimer() {
    if (running) {
        running = false;
        clearInterval(timerInterval);
        const durationFormatted = timerDisplay.innerText;

        // Tambahkan riwayat waktu
        const listItem = document.createElement('li');
        listItem.innerText = `${activeButton.innerText} (${activeButton.dataset.description}) = ${durationFormatted}`;
        equipmentHistoryList.appendChild(listItem);

        // Reset tampilan timer dan tombol
        timerDisplay.innerText = '00:00:00.00';
        activeButton.classList.remove('blue');
        activeButton.classList.add('red');
        activeButton = null;
    }
}

// Fungsi untuk menjeda dan melanjutkan timer
function togglePause(pauseButton) {
    if (running) {
        running = false;
        clearInterval(timerInterval);
        pauseButton.innerText = 'Lanjut'; // Ubah teks tombol menjadi 'Lanjut'
    } else {
        startTime = new Date().getTime();
        startTimer(activeButton, activeButton.dataset.description);
        pauseButton.innerText = 'Pause'; // Ubah teks tombol menjadi 'Pause'
    }
}

// Fungsi untuk menghapus riwayat
function clearHistory() {
    equipmentHistoryList.innerHTML = ''; // Bersihkan riwayat
}

// Event listener untuk dropdown alat
equipmentSelect.addEventListener('change', (e) => {
    displayToolButtons(e.target.value);  // Tampilkan tombol sesuai alat yang dipilih
});
