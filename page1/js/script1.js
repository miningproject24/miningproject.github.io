let startTime;
let updatedTime;
let running = false;
let timerInterval;

const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const categorySelect = document.getElementById('category');
const historyList = document.getElementById('historyList'); // Kolom riwayat

// Fungsi untuk memperbarui tampilan waktu setiap detik
function updateTime() {
    if (running) {
        updatedTime = new Date().getTime() - startTime;
        let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);

        // Format menjadi HH:MM:SS dalam format 24 jam
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeDisplay.innerText = `${hours}:${minutes}:${seconds}`;
    } 
    // Tampilkan jam aktual ketika timer tidak berjalan
    else {
        const now = new Date();
        let currentHours = now.getHours();
        let currentMinutes = now.getMinutes();
        let currentSeconds = now.getSeconds();

        // Format menjadi HH:MM:SS dalam format 24 jam
        currentHours = currentHours < 10 ? "0" + currentHours : currentHours;
        currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
        currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;

        timeDisplay.innerText = `${currentHours}:${currentMinutes}:${currentSeconds}`;
    }
}

// Fungsi untuk memulai timer
function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (updatedTime || 0);
        timerInterval = setInterval(updateTime, 1000);
    }
}

// Fungsi untuk menghentikan timer
function stopTimer() {
    if (running) {
        running = false;
        clearInterval(timerInterval);

        // Tambahkan riwayat waktu ke daftar
        const category = categorySelect.options[categorySelect.selectedIndex].text;
        const endTime = new Date();

        // Formatkan waktu dalam format 24 jam
        const startTimeFormatted = formatTime(new Date(startTime));
        const endTimeFormatted = formatTime(endTime);

        const listItem = document.createElement('li');
        listItem.innerText = `${category} dari ${startTimeFormatted} sampai ${endTimeFormatted}`;
        historyList.appendChild(listItem);
    }
}

// Fungsi untuk mereset timer
function resetTimer() {
    running = false;
    clearInterval(timerInterval);
    timeDisplay.innerText = "00:00:00";
    updatedTime = 0;
}

// Fungsi untuk memformat waktu dalam format 24 jam
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Format menjadi HH:MM:SS
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

// Event listener untuk tombol start
startBtn.addEventListener('click', startTimer);

// Event listener untuk tombol stop
stopBtn.addEventListener('click', stopTimer);

// Event listener untuk tombol reset
resetBtn.addEventListener('click', resetTimer);

// Memperbarui waktu setiap detik, baik timer aktif atau tidak
setInterval(updateTime, 1000);
