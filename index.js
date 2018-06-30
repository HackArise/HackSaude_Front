//globals
let points = [];
let mymap = L.map('main-map')
    .setView([-15.8309716, -47.995262], 11.75);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibHVjYXNzc20iLCJhIjoiY2ppemZ2bmdxMDZxZjNrbHpzNW5mdGVzaSJ9.uUUJhzYZorS3ntEf1x4MPA'
}).addTo(mymap);


function createPoints(pointsInfo, medicInfo) {
    console.log(pointsInfo);
    for (let i = 0; i < 3; i++) {
        // static info
        let info = {
            labels: pointsInfo[i].labels,
            data: pointsInfo[i].data,
            label: pointsInfo[i].label,
            id: pointsInfo[i].id
        };
        // static mark
        let mark = L.marker([pointsInfo[i].lat, pointsInfo[i].long]);
        mark.bindPopup(`<canvas id='${pointsInfo[i].id}'></canvas>`);
        mark.addTo(mymap).on('click', function (e) { onMarkClick(e, info, medicInfo) });

        // saves everything in an array
        let markInfo =
        {
            mark: mark,
            info: info
        }
        points.push(markInfo);
    }
}



function onMarkClick(e, info, medicInfo) {
    console.log(e.target);
    console.log(info);
    openChart(e.target, info);
    createMedicList(medicInfo, info);
}


function createMedicList(medicInfo, info) {
    let main = document.getElementById("main-panel");
    main.innerHTML = "";
    let header = document.createElement("h1");
    header.innerHTML = "Informações";
    main.appendChild(header);
    console.log(medicInfo);

    for (let i in medicInfo) {
        console.log(medicInfo[i].pointId + " - " + info.id);
        if(medicInfo[i].pointId == info.id){
        let div = document.createElement('div');
        div.class = 'medic-info';
        div.innerHTML =
            `
                <ul>
                    <li>${medicInfo[i].name}</li>
                    <li>${medicInfo[i].profession}</li>
                    <li>${medicInfo[i].journey[0] + " - " + medicInfo[i].journey[1]}</li>
                    <li>${medicInfo[i].observation}</li>
                </ul>
                <div class="button-container">
                    <a>Chat</a>
                    <a href="https://www.rd.com/wp-content/uploads/2017/09/02_doctor_Insider-Tips-to-Choosing-the-Best-Primary-Care-Doctor_519507367_Stokkete.jpg"
                    data-lightbox="image-1" data-title="Imagem de perfil">Visualizar</a>
        `
        main.appendChild(div);
        }
        
    }
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
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });



}



function startApp() {
    createPoints(pointsInfo, medicInfo);
}

document.onload = startApp();