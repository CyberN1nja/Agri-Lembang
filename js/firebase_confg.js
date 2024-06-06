// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDMvVnx6aJa1QISoq8ojNwAJnigMCldbOI',
  authDomain: 'sensor-a277d.firebaseapp.com',
  databaseURL: 'https://sensor-a277d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sensor-a277d',
  storageBucket: 'sensor-a277d.appspot.com',
  messagingSenderId: '534779913780',
  appId: '1:534779913780:web:74a75fe4d9271741668c61',
  measurementId: 'G-X2EMST73G5',
};

// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);


// // Function to load initial data from Firebase and set up real-time streaming
// function setupFirebaseStreaming() {
//   // Reference to the location of your data in Firebase
//   const suhuRef = database.ref('suhu');
//   const kelembapanRef = database.ref('kelembapan');
//   const tanahRef = database.ref('kelembapan_tanah');

//   // Set up real-time streaming for each sensor
//   setupStreamingForSensor(suhuRef, suhuChart, 'suhu');
//   setupStreamingForSensor(kelembapanRef, kelembapanChart, 'kelembapan');
//   setupStreamingForSensor(tanahRef, tanahChart, 'kelembapan_tanah');
// }

// // Function to handle loading data and initializing charts
// function loadDataAndInitializeCharts(snapshot, chart, dataType) {
//   const data = snapshot.val();
//   console.log('Loaded data for', dataType, ':', data);
//   if (data) {
//     // Extract values and timestamps from the loaded data
//     const values = Object.values(data).map((item) => item.nilai);
//     const timestamps = Object.values(data).map((item) => item.waktu);

//     // Update chart with loaded data
//     addData(chart, values, dataType, timestamps);
//   }
// }

// // Function to set up real-time streaming for a sensor
// function setupStreamingForSensor(sensorRef, chart, dataType) {
//   sensorRef.on('value', (snapshot) => {
//     loadDataAndInitializeCharts(snapshot, chart, dataType);
//   });
// }

// // Load initial data and set up real-time streaming
// setupFirebaseStreaming();
