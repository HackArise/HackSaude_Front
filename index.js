let mymap = L.map('main-map')
    .setView([-15.8309716, -47.995262], 11.75);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibHVjYXNzc20iLCJhIjoiY2ppemZ2bmdxMDZxZjNrbHpzNW5mdGVzaSJ9.uUUJhzYZorS3ntEf1x4MPA'
}).addTo(mymap);

let points = [];

function createPoints() {
    for (let i = 0; i < 3; i++) {
        // static info
        let info = {
            labels: ["Neurocirurgião", "Dentista", "Ortopedista", "Fisioterapeuta", "Psicologista", "Médico geral"],
            data: [12, 19, 3, 5, 2, 3],
            label: 'Quantidade de médicos',
            id: i
        };
        // static mark
        let mark = L.marker([-15.8309 + i * 0.08, -47.9952 + i * 0.08]);
        mark.bindPopup(`<canvas id='${i}'></canvas>`);
        mark.addTo(mymap).on('click', function (e) { onMarkClick(e, info) });

        // saves everything in an array
        let markInfo =
        {
            mark: mark,
            info: info
        }
        points.push(markInfo);
    }
}



function onMarkClick(e, info) {
    console.log(e.target);
    console.log(info);
    openChart(e.target, info);
}


function openChart(target, info) {
    target.closePopup();
    target.openPopup();
    let canvas = document.getElementById(info.id);
    let ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: info.labels,
            datasets: [{
                label: info.label,
                data: info.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });



}



function startApp() {
    createPoints();
}

document.onload = startApp();