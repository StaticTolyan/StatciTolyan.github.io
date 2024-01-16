// Ініціалізація карти
var map = L.map('map').setView([49.2324, 28.4736], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© Учасники OpenStreetMap'
}).addTo(map);

var map2 = L.map('map2').setView([49.2324, 28.4736], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© Учасники OpenStreetMap'
}).addTo(map2);

//L.marker([49.2324, 28.4736]).addTo(map).bindPopup("Center Vin");
//-----------------------------------------------------------------------------------------------

function colorMarker(color) {
  const svgTemplate = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
        <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
        <path stroke="#fff" fill="${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>`;

  const icon = L.divIcon({
    className: "marker",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });

  return icon;
}

function addIconMarker(coord, icon) {
  let markers = L.markerClusterGroup();

  const marker = L.marker(coord, {
    icon: icon,
  });
  markers.addLayer(marker);
  
  map2.addLayer(markers);
  return markers;
}

function addColorMarkers(coords, color) {
  let markers = L.markerClusterGroup();

  coords.forEach(coord => {
    const marker = L.marker(coord, {
      icon: colorMarker(color),
    });
    markers.addLayer(marker);
  });

  map.addLayer(markers);
  return markers;
}

// Функція для відображення маркерів
function addMarkers(coords) {
  let markers = L.markerClusterGroup();

  coords.forEach(coord => {
    const marker = L.marker(coord);
    markers.addLayer(marker);
  });

  map.addLayer(markers);
  return markers;
}

//-----------------------------------------------------------------------------------------------

function planRoute(coordinates, start, end) {

  // Оптимізувати маршрут 3-OPT алгоритмом
  coordinates = optimizeRoute3OPT(coordinates);

  // Створити маршрут з оптимізованими координатами
  var route = L.Routing.control({
    waypoints: [
      L.latLng(start),
      ...coordinates.map(c => L.latLng(c)),
      L.latLng(end)
    ],
    lineOptions: {
      styles: [{ color: "green", opacity: 0.7, weight: 5 }],
    }
  }).addTo(map2);

  return route;
}

// Функція оптимізації 3-OPT 
function optimizeRoute3OPT(coordinates) {

  let optimizedRoute = [...coordinates];

  while (true) {

    // Знайти найкращу можливу 3-OPT заміну
    let bestGain = 0;
    let bestIndexes = [];

    for (let i = 0; i < optimizedRoute.length - 2; i++) {
      for (let j = i + 1; j < optimizedRoute.length - 1; j++) {
        for (let k = j + 1; k < optimizedRoute.length; k++) {

          // Обчислити виграш від заміни
          let gain = calcGain(optimizedRoute, i, j, k);

          if (gain > bestGain) {
            bestGain = gain;
            bestIndexes = [i, j, k];
          }
        }
      }
    }

    // Якщо не знайдено покращення, зупинитися
    if (bestGain <= 0) {
      break;
    }

    // Зробити кращу заміну
    make3OPTSwap(optimizedRoute, bestIndexes[0], bestIndexes[1], bestIndexes[2]);
  }

  return optimizedRoute;

}

// Функція обчислення виграшу від 3-OPT заміни
function calcGain(route, i, j, k) {

  // Відстань до заміни
  let d0 = calcDistance(route[i - 1], route[i]) +
    calcDistance(route[j - 1], route[j]) +
    calcDistance(route[k - 1], route[k]);

  // Відстань після заміни
  let d1 = calcDistance(route[i - 1], route[j - 1]) +
    calcDistance(route[j], route[k]) +
    calcDistance(route[k], route[i]);

  // Різниця відстаней
  let gain = d0 - d1;

  return gain;

}

// Функція обчислення відстані між двома точками
function calcDistance(a, b) {
  // Код обчислення відстані між a і b
}


// Функція заміни 3 ребер
function make3OPTSwap(route, i, j, k) {

  // Зберегти частину маршруту для реверсу
  let reversedPart = route.slice(j, k + 1);

  // Реверснути частину маршруту
  reversedPart.reverse();

  // Скласти новий маршрут
  let newRoute = [
    ...route.slice(0, i + 1),
    ...reversedPart,
    ...route.slice(k + 1)
  ];

  return newRoute;

}


//-----------------------------------------------------------------------------------------------

function kMeans(coords, k) {
  let centroids = coords.slice(0);
  centroids = centroids.sort(() => 0.5 - Math.random());
  centroids = centroids.slice(0, k);

  let oldCentroids;
  let iterations = 0;
  let maxIterations = 100;
  let clusters = new Array(k);

  do {
    // Перед кожною ітерацією ініціалізуємо масив кластерів
    for (let i = 0; i < k; i++) clusters[i] = [];

    for (let coord of coords) {
      let distances = centroids.map(centroid => euclideanDistance(coord, centroid));
      let closestCentroidIndex = distances.indexOf(Math.min(...distances));
      clusters[closestCentroidIndex].push(coord);
    }

    oldCentroids = centroids.slice();

    centroids = clusters.map(cluster => {
      if (cluster.length === 0) return null; // Обробка порожнього кластера
      let sums = cluster.reduce((acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]], [0, 0]);
      return sums.map(sum => sum / cluster.length);
    });

    // Видалення центроїдів, які не мають призначених точок
    centroids = centroids.filter(centroid => centroid != null);
    clusters = clusters.filter(cluster => cluster.length > 0);

    iterations++;
  } while (!centroidsEqual(oldCentroids, centroids) && iterations < maxIterations);

  return clusters;
}

function euclideanDistance(coord1, coord2) {
  return Math.sqrt(
    (coord1[0] - coord2[0]) ** 2 +
    (coord1[1] - coord2[1]) ** 2
  );
}

function centroidsEqual(centroids1, centroids2) {
  if (centroids1.length !== centroids2.length) return false;
  return centroids1.every((centroid, i) => {
    return (
      centroid[0] === centroids2[i][0] &&
      centroid[1] === centroids2[i][1]
    );
  });
}




// Читання даних з файлу
const loadButton = document.getElementById('loadButton');
const klusterButton = document.getElementById('klusterButton');
const routingButton = document.getElementById('routingButton');
const fileInput = document.getElementById('fileInput');
var fromFileLayer;
var clustersfromFile;
var clustersLayers;
var coordinatesArray;
var map2legend;



//-----------------------------------------------------------------------------------------------

loadButton.addEventListener('click', () => {
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    const data = reader.result;
    const rows = data.split('\r\n');

    coordinatesArray = rows.map(row => {
      const [x, y] = row.split(',').map(Number);
      return [x, y];
    });

    console.log(coordinatesArray);
    fromFileLayer = addMarkers(coordinatesArray);



  }

  reader.readAsText(file);
});

//-----------------------------------------------------------------------------------------------

klusterButton.addEventListener('click', () => {
  const k = document.getElementById('kBus').value; // Максимальна кількість точок в одному кластері
  const clusters = kMeans(coordinatesArray, k);
  clustersfromFile = clusters;
  console.log(clusters);

  map.removeLayer(fromFileLayer);
  clustersfromFile.forEach(cluster => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    addColorMarkers(cluster, "#" + randomColor);
  });

  $('#clusterSelect').removeAttr('disabled');
  $('#clusterSelect').attr({
    "max": clusters.length
  });

});

routingButton.addEventListener('click', async () => {

  map2.eachLayer(layer => {
    map2.removeLayer(layer);
  });

  if(map2legend)
  map2legend.remove();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Учасники OpenStreetMap'
  }).addTo(map2);

  const [schoolCoords, depoCoords] = await Promise.all([
    getCoordinates(document.getElementById('school').value),
    getCoordinates(document.getElementById('depo').value)
  ]);

  const busNum = document.getElementById('clusterSelect').value - 1;

  // Значки для маркерів
  var busIcon = L.icon({
    iconUrl: 'img/bus-icon.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
  });

  var personIcon = L.icon({
    iconUrl: 'img/person-icon.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
  });

  var schoolIcon = L.icon({
    iconUrl: 'img/school-icon.png',
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64]
  });

  map2legend = planRoute(clustersfromFile[busNum], schoolCoords, depoCoords);

  addIconMarker(schoolCoords, schoolIcon);
  addIconMarker(depoCoords, busIcon);

});

function getCoordinates(address) {
  return new Promise((resolve, reject) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          resolve([Number(data[0].lat), Number(data[0].lon)]);
        } else {
          reject('Адресу не знайдено');
        }
      })
      .catch(error => {
        reject('Помилка під час запиту');
      });
  });
}

//-----------------------------------------------------------------------------------------------
