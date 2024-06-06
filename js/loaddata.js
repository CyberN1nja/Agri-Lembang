// Firebase Database Reference
const database = firebase.database();

// Function to load initial data from Firebase
function loadDataAndInitializeCharts(snapshot, dataType) {
  const data = snapshot.val();
  console.log('Loaded data for', dataType, ':', data);
  if (data) {
    // Extract values and timestamps from the loaded data
    const values = Object.values(data).map((item) => item.nilai);
    const timestamps = Object.values(data).map((item) => item.waktu);

    // Update table with loaded data
    updateHistoryTable(dataType, timestamps, values);
  }
}

function updateHistoryTable(dataType, timestamps, values) {
  // Clear existing table data
  clearHistoryTable(dataType);

  // Add new data to the table
  const tableBodyId = getTableBodyId(dataType);
  for (let i = 0; i < values.length; i++) {
    addDataToHistoryTable(timestamps[i], values[i], tableBodyId);
  }
}

function addDataToHistoryTable(timestamp, value, tableBodyId) {
  const tableBody = document.getElementById(tableBodyId);

  // Create a new row to be added to the table
  const newRow = document.createElement('tr');

  // Add a cell for timestamp
  const timestampCell = document.createElement('td');
  timestampCell.textContent = timestamp;
  newRow.appendChild(timestampCell);

  // Add a cell for value
  const valueCell = document.createElement('td');
  valueCell.textContent = value;
  newRow.appendChild(valueCell);

  // Add the row to the table
  tableBody.appendChild(newRow);
}

function clearHistoryTable(dataType) {
  const tableBodyId = getTableBodyId(dataType);
  const tableBody = document.getElementById(tableBodyId);

  // Remove all rows from the table
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

function getTableBodyId(dataType) {
  // Get the table ID based on the sensor type
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

// Load data from Firebase and initialize tables
database
  .ref('suhu')
  .once('value')
  .then((snapshot) => {
    loadDataAndInitializeCharts(snapshot, 'suhu');
  });

database
  .ref('kelembapan')
  .once('value')
  .then((snapshot) => {
    loadDataAndInitializeCharts(snapshot, 'kelembapan');
  });

database
  .ref('kelembapan_tanah')
  .once('value')
  .then((snapshot) => {
    loadDataAndInitializeCharts(snapshot, 'kelembapan_tanah');
  });
