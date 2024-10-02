//  toggle menu
toggle = document.querySelector(".toggle");
navigation = document.querySelector(".navigation");
main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Chart
$(document).ready(function () {
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  Highcharts.chart('charter', {
    chart: {
      type: 'areaspline',
      animation: Highcharts.svg,
      marginRight: 10,
      events: {
        load: function () {

          var series = this.series[0];
          setInterval(function () {
            var x = (new Date()).getTime(),
              y = Math.random();
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },
    title: {
      text: 'It`s My Glowing Review'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Our Result'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
          Highcharts.numberFormat(this.y, 2);
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: true
    },
    series: [{
      name: 'Performance',
      color: '#4e7460',
      data: (function () {
        var data = [],
          time = (new Date()).getTime(),
          i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random()
          });
        }
        return data;
      }())
    }]
  });
});

// calander
$(document).ready(function () {
  ShowCalendar();
});

var events = [];
var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {

  initialView: 'dayGridMonth',

  events: function (info, successCallback, failureCallback) {
    successCallback(events);
  },

});

function ShowCalendar() {
  calendar.render();
}

$("#addEvent").on("click", function () {
  events.push({
    title: $("#eventName").val(),
    start: $("#fromDate").val(),
    end: $("#toDate").val()
  });

  calendar.refetchEvents();
});

// map
var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.homeZoomLevel = 4;
chart.homeGeoPoint = {
  latitude: 23,
  longitude: 83
};

// Set map definition
chart.geodata = am4geodata_worldIndiaLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#4e7460");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#76af91");

// Select India
chart.events.on("ready", function (ev) {
  polygonSeries.getPolygonById("IN").isHover = true;
});
