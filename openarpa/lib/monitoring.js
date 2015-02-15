'use strict';

$( document ).ready( function () {
    
    var type = getUrlParameter('type');
    var url = arpa_data.get(type, false);
    var near_station;
    var lat;
    var lng;
    
    if (url != '') {
        console.log('change title...');
        $('#title_span').html(type);      
    };

    $('#loader_div').show();
    $('#error').hide();
    
    var zoom_default = 8;
    
    var options_map = {
        center: [41.1112893, 16.8820664],
        zoom: zoom_default,
        minzoom: zoom_default,
        maxzoom: zoom_default
    };
    
    var map = L.map("map", options_map);
        
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
                {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
        
    $("#header").empty();    
    $("#poll").empty();
    $("#warning").empty();
    $("#near").empty();
    $('#error').hide();
    
    // -------------------------------------
    // Geolocation
    map.locate(
        {
        setView: true, 
        maxZoom: zoom_default
    });
    
    function onLocationFound(e) {
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("La tua posizione").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    };
    map.on('locationfound', onLocationFound);
    
    function onLocationError(e) {
        console.log(e.message);
    }
    map.on('locationerror', onLocationError);
    // -------------------------------------
    
    function onlayerAdd(layer) {
        console.log('layer added..' +  JSON.stringify(near_station));    
    }
    map.on('layeradd', onlayerAdd);

    console.log('getting data by ' + url);
    
    getJSON(url, function (geojson) {
        // console.log(JSON.stringify(geojson));
        
        L.geoJson(geojson, {
            pointToLayer: function (feature, latlng) {
                
                var radius = 4;
                
                if (feature.properties.radius > 4) {
                    radius = feature.properties.radius;        
                };
                
                var options = {
                    opacity: 0.1,
                    clickable: true,
                    color: getColorbyWarn(feature.properties.warning_value),
                    fillOpacity: 0.1
                };
                
                checkNearStation(feature);

                console.log(JSON.stringify(feature.properties));
                
                var title = feature.properties.title;
                
                var circle_point = L.circleMarker(latlng, options);
                circle_point.setRadius(radius);
                circle_point.bindPopup(title);
                
                return circle_point;
            }
        }).addTo(map);
        
    });
    
    map.on('zoomstart', function (e) {
        $('#loader_div').show();    
    });
    
    map.on('dragstart', function (e) {
        $('#loader_div').show();    
    });  
        
    function checkNearStation(feature) {
        // controllo la distanza con le coordinate
        if (typeof near_station === 'undefined') {
            near_station = feature;    
        } else {
            var d1 = distance(lat, 
                             lng, 
                             feature.properties.lat, 
                             feature.properties.lng);  
            var d2 = distance(lat, 
                             lng, 
                             near_station.properties.lat, 
                             near_station.properties.lng);
            
            if (d1 < d2) {
                near_station = feature;    
            }
        }
    };
    
    function getJSON(url, callback) {
    
    $('#error_msg').empty();
        
    var jqxhr = $.getJSON( url, function() {
        console.log( "success" );
    })
    .done(function(data) {
        if (typeof callback === 'function') {
            callback(data);
        }
    })
    .fail(function() {
        $('#error_msg').html('non riesco a caricare i dati.');
        if (typeof callback === 'function') {
            callback(null);
        }
    })
    .always(function() {
        console.log( "complete" );
        $('#loader_div').hide();
    });
 
    // Set another completion function for the request above
    jqxhr.complete(function() {
        console.log( "aggiungo centralina meteo più vicina" );
        
        /*
        
        {"type":"Feature","properties":{"id":"65","centralina":"Casamassima","descrizione":"Via Lapenna","lat":40.953154,"lng":16.920731,"comune":"Casamassima","inquinanti":"PM10, NO2, O3","warning_value":0.16,"warning_poll":"PM10","color":"#000000","radius":0.64,"opacity":0.1,"title":"<h4>PM10 0.16</h4><h5>Casamassima - Casamassima </h5>","values":[{"centralina":"Casamassima","prov":"Bari","comune":"Casamassima","valore":8,"ngiorni":0,"warning":0.16,"level":"8 µg/m³ (50µg/m³)","poll":"PM10","location":{"lat":40.953154,"lng":16.920731},"weather":{}}]},"geometry":{"type":"Point","coordinates":[16.920731,40.953154]}}
        
        */
        
        var centralina = L.AwesomeMarkers.icon({
            icon: 'glyphicon-screenshot',
            prefix: 'glyphicon',
            markerColor: 'red'
        });

        var latlng = new L.LatLng(near_station.properties.lat, 
                                  near_station.properties.lng);
        
        var title = near_station.properties.title + 
                    '<br /> centralina più vicina';
        
        L.marker(latlng, {
            icon: centralina
        }).addTo(map).bindPopup(near_station.properties.title);
        
        console.log('layer added..' +  JSON.stringify(near_station));
    });
    
    };
    
});

function distance (lat1, lng1, lat2, lng2) {
          
  var R = 6371; // Radius of the earth in km
  var dStr = "";

  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lng2-lng1); 

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = Math.ceil((R * c) * 1000); // Distance in mt

  return d;

};

function deg2rad(deg) {
    return deg * (Math.PI/180)
};

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}; 

function get_direction_wind(degree) {
    var wind_dir;
    
    if (degree < 45) {
        wind_dir = 'N';    
    } else if (degree < 90) {
        wind_dir = 'NE';
    } else if (degree < 135) {
        wind_dir = 'E';
    } else if (degree < 180) {
        wind_dir = 'SE';
    } else if (degree < 225) {
        wind_dir = 'S';
    } else if (degree < 270) {
        wind_dir = 'SW';
    } else if (degree < 315) {
        wind_dir = 'W';
    } else {
        wind_dir = 'NW';
    };
    
    return wind_dir;
    
};

var arpa_data = {
    url_monitoring: '/monitoring',
    url_monitoring_geojson: '/monitoring/geojson',
    url_warning: '/warning',
    url_warning_geojson: '/warning/geojson',
    url_localhost: 'http://localhost:3000',
    url_endpoints: 'http://openpuglia-test.apigee.net/arpa/v1',
    url_dataset: 'http://dati.openbsk.it/dataset/e1887afc-345a-43ae-b9f8-95b5515eb6df/resource/8df7cff6-7605-456d-9d33-238d7905c115/download/arpacentraline.geojson',
    url_amianto: '/amianto',
    url_taranto: '/taranto',
    get: function(type, localhost) {
        var self = this;
        
        var url = this.url_endpoints;
        
        if (localhost) {
            url = self.url_localhost;
        };
        
        if (type == 'monitoring') {
            url += self.url_monitoring_geojson;   
        } else if (type == 'warning') {
            url += self.url_warning_geojson;
        } else if (type == 'amianto') {
            url += self.url_amianto;   
        } else if (type == 'taranto'){
            url += self.url_taranto;
        } else {
            url = '';   
        }
        
        return url;
    }
};

function getColorbyWarn(warn) {
    
    var color = '#000000';
    
    if (warn < 1) {
        color = '#00FF00';
    } else if (warn < 2) {
        color = '#FF9999';
    } else if (warn < 3) {
        color = '#FF6666';
    } else if (warn < 4) {
        color = '#FF3333';
    } else if (warn < 5) {    
        color = '#FF0000';
    } else if (warn < 6) {
        color = '#CC0000';
    } else if (warn < 7) {
        color = '#990000';
    } else if (warn < 8) {    
        color = '#660000'
    } else {    
        color = '#330000';
    };
    
    return color;
    
};

function getColorbyPoll(poll) {

    var color;

    if (poll.indexOf('PM10') != -1) {
        color = "#66cdaa";
    } if (poll.indexOf('PM2.5') != -1) {
        color = "#2f4f4f";
    } else if (poll.indexOf('NO2') != -1) {
        color = "#696969";
    } else if (poll.indexOf('O3') != -1) {
        color = "#708090";
    } else if (poll.indexOf('C6H6') != -1) {
        color = "#8b8989";
    } else if (poll.indexOf('SO2') != -1) {
        color = "#8b8378";
    } else if (poll.indexOf('H2S') != -1) {
        color = "#000080";
    } else if (poll.indexOf('PM10 ENV') !=-1) {
        color = "#0000ff";
    } else if (poll.indexOf('IPA') != -1) {
        color = "#20b2aa";
    } else if (poll.indexOf('PM2.5 SWAM') != -1) {
        color = "#bebebe";
    } else if (poll.indexOf('PM10 SWAM') != -1) {
        color = "#778899";
    } else if (poll.indexOf('PM10 B') != -1) {
        color = "#696969";
    } else {
        color = "#000000";
    };

    console.log('checking color ' + poll + ' - ' + color);

    return color;
};
