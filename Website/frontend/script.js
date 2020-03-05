var LAeqChart = null;
var LAmaxChart = null;
var batteryChart = null;
var deviceName = "agh-noise-measurement-unit-1";
var timeSpan = "1h";

getSoundData(deviceName, timeSpan);

function getSoundData(deviceNameIn, timeSpanIn) {
    $.get("/get_data", { deviceName: deviceNameIn, timeSpan: timeSpanIn }, function (data) {
        if(!data){
            alert("NO DATA!");
        }
        listDevices(data);
        createChartLeq(data);
        createChartLmaxLmin(data);
        createChartBattery(data);
    })
}

function changeDevice(newDeviceName) {
    deviceName = newDeviceName;
    getSoundData(deviceName, timeSpan);
}

function createChartLeq(data) {
    var lebels = [];
    var data_chart = [];

    /*extract data form raw input */
    for(var i = 0; i < data.length; ++i){
        lebels.push(i);
        data_chart.push(data[i].sound);
    }

    /*Destorying previous chart */
    if(LAeqChart!=null){
        LAeqChart.destroy();
    }

    /*making a chart*/
    var ctx = document.getElementById("soundDev1");
    LAeqChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: lebels,
            datasets: [{
                backgroundColor: 'rgb(10,100,54)',
                borderColor: 'rgb(10,100,54)',
                label: 'Leq',
                lineTension: 0,
                data: data_chart
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'RMS dźwięku w pomieszczeniu w dB'
            }
        }
    });
}

function createChartLmaxLmin(data) {
    var lebels = [];
    var data_chart_1 = [];
    var data_chart_2= [];

    /*extract data form raw input */
    for(var i = 0; i < data.length; ++i){
        lebels.push(i);
        data_chart_1.push(data[i].soundmax);
        data_chart_2.push(data[i].soundmin);
    }

    /*Destorying previous chart */
    if(LAmaxChart!=null){
        LAmaxChart.destroy();
    }

    /*making a chart*/
    var ctx = document.getElementById("soundmaxDev1");
    LAmaxChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: lebels,
            datasets: [{
                borderColor: 'rgb(0,0,0)',
                lineTension: 0,
                label: "LMin",
                data: data_chart_2
            }, {
                borderColor: 'rgb(255,158,74)',
                lineTension: 0,
                label: "LMax",
                data: data_chart_1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'LMax i LMin w dB'
            }
        }
    });
}

function createChartBattery(data) {
    var lebels = [];
    var data_chart = [];

    /*extract data form raw input */
    for(var i = 0; i < data.length; ++i){
        lebels.push(i);
        data_chart.push(data[i].battery);
    }

    /*Destorying previous chart */
    if(batteryChart!=null){
       batteryChart.destroy();
    }

    /*making a chart*/
    var ctx = document.getElementById("batteryLifeDev1");
    batteryChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: lebels,
            datasets: [{
                backgroundColor: 'rgb(121,0,5)',
                borderColor: 'rgb(121,0,5)',
                label: "Poziom baterii w %",
                lineTension: 0,
                data: data_chart
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Poziom baterii w %'
            }
        }
    });
}

function listDevices(sample_data) {


    var dataSection = document.getElementById("dev_status");

    for(var i = 0; i < sample_data.length; ++i){
        var device = document.createElement("device");
        device.className += "dev_status";
        var device_id = document.createElement("time_stamp");
        device_id.innerHTML = sample_data[i].device_id;
        device.appendChild(device_id);
        dataSection.replaceChild(device, dataSection.childNodes[0]);
    }

}

function getData1h() {
    timeSpan = "1h";
    getSoundData(deviceName, timeSpan);
}

function getData3h() {
    timeSpan = "3h";
    getSoundData(deviceName, timeSpan);
}

function getData6h() {
    timeSpan = "6h";
    getSoundData(deviceName, timeSpan);
}

function destroyCharts() {
    var ctx = document.getElementById("soundDev1");
    ctx.destroy();
}