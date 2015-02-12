'use strict';

$( document ).ready( function () {
    
    var type = getUrlParameter('type');
    var url = arpa_data.get(type, false);
    
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
    
    //var center = new L.LatLng(41.1112893, 16.8820664);
    //var map = L.map("map").setView(center, 8);
    
    var map = L.map("map", options_map);
        
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
                {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
        
    $("#header").empty();    
    $("#poll").empty();
    $("#warning").empty();
    $("#near").empty();
        
    var near_station;
    var lat;
    var lng;
    
    $('#error').hide();

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
                    color: feature.properties.color,
                    fillOpacity: 0.1
                };

                console.log(JSON.stringify(feature.properties));
                
                var circle_point = L.circleMarker(latlng, options);
                circle_point.setRadius(radius);
                circle_point.bindPopup(feature.properties.title);
                
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
        
    function add_marker_station(station) {
        var point = L.LatLng(station.lat, station.lng);
        var marker = L.marker(point).addTo(map);
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

var arpa_data = {
    url_monitoring: '/monitoring',
    url_monitoring_geojson: '/monitoring/geojson',
    url_warning: '/warning',
    url_warning_geojson: '/warning/geojson',
    url_localhost: 'http://localhost:3000',
    url_endpoints: 'http://openpuglia-test.apigee.net/arpa/v1',
    url_dataset: 'http://dati.openbsk.it/dataset/e1887afc-345a-43ae-b9f8-95b5515eb6df/resource/8df7cff6-7605-456d-9d33-238d7905c115/download/arpacentraline.geojson',
    url_amianto: '/amianto',
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
        } else {
            url = '';   
        }
        
        return url;
    }
};

function getColorbyWarn(warn) {
    
    var color;
    
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
        console.log( "second complete" );
    });
    
};
