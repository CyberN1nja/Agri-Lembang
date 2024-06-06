// Firebase Database Reference
const database = firebase.database();

// Function to create a Chart
function createChart(id, label) {
  const ctx = document.getElementById(id).getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: label,
          backgroundColor: 'rgba(89,126,82,0.59)',
          borderColor: 'rgb(89,126,82)',
          borderWidth: 2,
          data: [],
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true },
      },
      animation: { duration: 1000 },
    },
  });
}

// Create charts
const suhuChart = createChart('suhuChart', 'Suhu');
const kelembapanChart = createChart('kelembapanChart', 'Kelembapan');
const tanahChart = createChart('tanahChart', 'Kelembapan_Tanah');

// Function to load initial data from Firebase
function loadDataFromFirebase() {
  function loadDataAndInitializeCharts(snapshot, chart, dataType) {
    const data = snapshot.val();
    if (data) {
      const values = Object.values(data).map((item) => item.nilai);
      const timestamps = Object.values(data).map((item) => item.waktu);
      addData(chart, values, dataType, timestamps);
      updateHistoryTable(dataType, timestamps, values);
    }
  }

  function addData(chart, newData, dataType, timestamps) {
    chart.data.labels = timestamps;
    chart.data.datasets[0].data = newData;
    chart.update();
  }

  function updateHistoryTable(dataType, timestamps, values) {
    clearHistoryTable(dataType);
    const tableBodyId = getTableBodyId(dataType);
    for (let i = 0; i < values.length; i++) {
      addDataToHistoryTable(timestamps[i], values[i], tableBodyId);
    }
  }

  function addDataToHistoryTable(timestamp, value, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    const newRow = document.createElement('tr');
    const timestampCell = document.createElement('td');
    timestampCell.textContent = timestamp;
    newRow.appendChild(timestampCell);
    const valueCell = document.createElement('td');
    valueCell.textContent = value;
    newRow.appendChild(valueCell);
    tableBody.appendChild(newRow);
  }

  function clearHistoryTable(dataType) {
    const tableBodyId = getTableBodyId(dataType);
    const tableBody = document.getElementById(tableBodyId);
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  }

  function getTableBodyId(dataType) {
    switch (dataType) {
      case 'suhu':
        return 'historySuhuTableBody';
      case 'kelembapan':
        return 'historyKelembapanTableBody';
      case 'kelembapan_tanah':
        return 'historyTanahTableBody';
      default:
        return '';
    }
  }

  // Load data from Firebase and initialize charts
  database
    .ref('suhu')
    .once('value')
    .then((snapshot) => {
      loadDataAndInitializeCharts(snapshot, suhuChart, 'suhu');
    });

  database
    .ref('kelembapan')
    .once('value')
    .then((snapshot) => {
      loadDataAndInitializeCharts(snapshot, kelembapanChart, 'kelembapan');
    });

  database
    .ref('kelembapan_tanah')
    .once('value')
    .then((snapshot) => {
      loadDataAndInitializeCharts(snapshot, tanahChart, 'kelembapan_tanah');
    });
}

// Load data from Firebase before starting streaming
loadDataFromFirebase();

// animasi

showGrafik('grafik1');

document.getElementById('grafik1-btn').addEventListener('click', function () {
  showGrafik('grafik1');
});

document.getElementById('grafik2-btn').addEventListener('click', function () {
  showGrafik('grafik2');
});

document.getElementById('grafik3-btn').addEventListener('click', function () {
  showGrafik('grafik3');
});

function showGrafik(grafikId) {
  var grafikList = document.getElementsByClassName('grafik');
  for (var i = 0; i < grafikList.length; i++) {
    grafikList[i].style.display = 'none';
  }
  document.getElementById(grafikId).style.display = 'block';
}
