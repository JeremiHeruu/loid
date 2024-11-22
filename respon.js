
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjjX3vqvTlwxWoN97Q9WQ2uuRAmfESQRo",
  authDomain: "heru-4c2e6.firebaseapp.com",
  databaseURL: "https://heru-4c2e6-default-rtdb.firebaseio.com",
  projectId: "heru-4c2e6",
  storageBucket: "heru-4c2e6.firebasestorage.app",
  messagingSenderId: "252446420072",
  appId: "1:252446420072:web:7e1b023c9d8f55ff6b5fdd",
  measurementId: "G-WPKCN3MEKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const form = document.querySelector("#my-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Mencegah reload halaman

  // Ambil nilai dari input form
  const nama = document.querySelector("#nama").value;
  const pesan = document.querySelector("#pesan").value;
  const status = document.querySelector("#status").value;

  // Simpan ke Firebase
  const responseRef = ref(db, "responses");
  push(responseRef, { nama, pesan, status })
    .then(() => {
      alert("Respon berhasil dikirim!");
      form.reset();
    })
    .catch((error) => {
      console.error("Gagal menyimpan data:", error);
    });
});

const responseList = document.querySelector("#response-list");

// Dapatkan data dari Firebase
const responseRef = ref(db, "responses");
onValue(responseRef, (snapshot) => {
  const data = snapshot.val();
  responseList.innerHTML = ""; // Kosongkan daftar sebelum menambahkan data baru

  if (data) {
    // Ambil 3 data terakhir
    const entries = Object.entries(data).slice(-3).reverse();
    entries.forEach(([id, { nama, pesan, status }]) => {
      const responseItem = document.createElement("div");
      responseItem.innerHTML = `
        <h4>${nama} (${status})</h4>
        <p>${pesan}</p>
      `;
      responseList.appendChild(responseItem);
    });
  }
});

