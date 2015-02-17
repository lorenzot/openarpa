# openARPA
NodeJS Server API per i dati di monitoraggio ambientale di ARPA Puglia

## Installazione

<pre>
$ git clone https://github.com/opendatabari/openarpa.git
$ cd openarpa-master/resource/node
$ node server-usergrid.js
</pre>

## API Endpoints

* [/monitoring/:format](http://openpuglia-prod.apigee.net/arpa/v1/monitoring)
Restituisce i dati di monitoraggio ambientale giornalieri

* [/warning/:format](http://openpuglia-prod.apigee.net/arpa/v1/warning)
Restituisce i dati di monitoraggio ambientale giornalieri che hanno superato la soglia limite. il parametro format indica il tipo di dato da restiruire:

* json
* geojson

* [/taranto](http://openpuglia-prod.apigee.net/arpa/v1/taranto)
Restituisce i dati di monitoraggio ambientale giornalieri della citta di Taranto con i dati meteo nei 7 giorni precedenti, in formato geojson.

* [/amianto](http://openpuglia-prod.apigee.net/arpa/v1/amianto)
Restituisce i siti di amianto nel territorio barese in formato geojson

    [Dataset](http://dati.openbsk.it/dataset/amianto/resource/9eed961a-5e9a-4e21-89a9-c5a345fff65b)
    [Info](http://opendatabari.github.io/blog/civic%20hacking/2013/11/24/come-organizzare-una-passeggiata-di-monitoraggio-una-ricerca-sullilva.html)

### JSON Response

<pre>

{
    {
    "header": [["ARPA Puglia", "29/01/2015"]],
    "geojson": {},
    "items": [{
        "item":{
            "name":"PM10",
            "element":"",
            "description":
            "Insieme di sostanze solide e liquide con diametro inferiore a 10 micron. Derivano da emissioni di autoveicoli, processi industriali, fenomeni naturali.",
            "parameter":"media giornaliero",
            "limit":"50",
            "warning":"50",
            "um":"Âµg/mÂ³"
        },
        "values": [
        {
            "data":{
                "centralina": '',
                "prov": '',
                "comune": '',
                "valore": '',
                "giorni_sup": ''
            },
            "warning":0,
            "level": "",
            "location":{
                "lat":0,
                "lng":0
            },
            "weather":{                     // Weather data JSON
                "station": [{
                    "station":{
                        "name":"Stari Grad, Otok Hva",
                        "type":5,
                        "status":20,
                        "user_id":9677,
                        "id":168081,
                        "coord":{
                            "lon":16.6229,
                            "lat":43.1662
                            }
                        },
                        "distance":229.697,
                        "last":{
                            "main":{
                                "temp":281.45,
                                "humidity":82,
                                "pressure":982.1
                            },"wind":{
                                "gust":1.8,
                                "deg":203
                            },
                            "rain":{
                                "1h":0
                            },
                            "calc":{
                                "dewpoint":5.4
                            },
                            "dt":1422798913
                            }
                        }
                ],
                "data": {
                    "message":"",
                    "cod":"200",
                    "type":"day",
                    "station_id":168081,
                    "calctime":0.003,
                    "cnt":4,
                    "list":[{
                        "temp":{
                            "v":278.16,
                            "c":234,
                            "mi":272.45,
                            "ma":283.55
                        },
                        "pressure":{
                            "v":996.19,
                            "c":234,
                            "mi":988.7,
                            "ma":1000.7
                        },
                        "humidity":{
                            "v":72.11,
                            "c":234,
                            "mi":50,
                            "ma":86
                        },
                        "rain":{
                            "1h":{
                                "v":0.36,
                                "c":114,
                                "mi":0,
                                "ma":4.1
                            }
                        },
                        "calc":{
                            "dewpoint":{
                                "v":0.25,
                                "c":234,
                                "mi":-3.4,
                                "ma":3.9
                            }
                        },
                        "wind":{
                            "gust":{
                                "v":4.62,
                                "c":234,
                                "mi":0,
                                "ma":18.6
                            },
                            "deg":{
                                "v":118
                            }
                        },
                        "precipitation":{
                            "v":""
                        },
                        "main":{
                            "humidity":{
                                "v":72.11,
                                "c":234,
                                "mi":50,
                                "ma":86
                        }]
                }
                
            }
        }
    ]
}

</pre>

### Weather Data JSON
Maggiori info sui dati json [OpenWeatherMap](http://openweathermap.org/api)

### GEOJSON Response

<pre>

{ 
        type: "Feature", 
        properties: { 
            id: item.id, 
            centralina: item.centralina, 
            descrizione: item.descrizione, 
            lat: Number(item.lat), 
            lng: Number(item.lng), 
            citta: item.citta, 
            localita: item.localita, 
            inquinanti: item.inquinanti,
            warning_poll: '',
            warning_value: 0,
            values: [],
            title: '',
            color: '#000000',
            weather: {}
        }, "geometry": { 
            type: "Point", 
            "coordinates": [ Number(item.lng), Number(item.lat) ] 
        }
    }

</pre>

* [/prevision](http://openpuglia-prod.apigee.net/arpa/v1/prevision/40.4391506/17.2503822/hour/json)

Restituisce un json, oppure geojson, con i dati di rilevamento della qualità dell'aria più vicina, con le previsioni meteo.

  * ´lat´: latitudine
  * ´lng´: longitudine
  * ´limit´: ´hour´ per le previsioni meteo nei prossimi 5 giorni per 3 ore, ´daily´ per le previsioni meteo nei prossimi 16 giorni
  * ´format´: ´json´ oppure ´geojson´

## Response

<pre>

{  
   "date":"12/02/2015",
   "header":[  
      "ARPA Puglia",
      "12 febbraio 2015"
   ],
   "geojson":{  
      "type":"FeatureCollection",
      "features":[  
         {  
            "type":"Feature",
            "properties":{  
               "id":"22",
               "centralina":"Via Alto Adige",
               "descrizione":"Via Alto Adige",
               "lat":40.460553,
               "lng":17.263602,
               "comune":"Taranto",
               "inquinanti":"CO, C6H6, PM10, NO2, SO2, PM2.5",
               "warning_value":1.9,
               "warning_poll":"CO",
               "color":"#000000",
               "radius":7.6,
               "opacity":0.29000000000000004,
               "title":"..... ", // html code
               "values":[  
                  {  
                     "centralina":"Via Alto Adige",
                     "prov":"",
                     "comune":"Taranto",
                     "valore":19,
                     "ngiorni":2,
                     "warning":1.9,
                     "level":"19 mg/m³ (10mg/m³)",
                     "poll":"CO",
                     "risk":0,
                     "location":{  
                        "lat":40.460553,
                        "lng":17.263602
                     },
                     "weather":{  
                        "data":[  
                           {  
                              "dt":1424066400,
                              "main":{  
                                 "temp":12.68,
                                 "temp_min":12.68,
                                 "temp_max":12.68,
                                 "pressure":1029.24,
                                 "sea_level":1030.83,
                                 "grnd_level":1029.24,
                                 "humidity":100,
                                 "temp_kf":0
                              },
                              "weather":[  
                                 {  
                                    "id":802,
                                    "main":"Clouds",
                                    "description":"scattered clouds",
                                    "icon":"03d"
                                 }
                              ],
                              "clouds":{  
                                 "all":44
                              },
                              "wind":{  
                                 "speed":8.26,
                                 "deg":151.002
                              },
                              "rain":{  
                                 "3h":0
                              },
                              "sys":{  
                                 "pod":"d"
                              },
                              "dt_txt":"2015-02-16 06:00:00"
                           }, ......
                           ],
                        "title":"",
                        "station":null,
                        "error":""
                     }
                  }
               ]
            },
            "geometry":{  
               "type":"Point",
               "coordinates":[  
                  17.263602,
                  40.460553
               ]
            }
         }
      ]
   },
   "items":[  
      {  
         "item":{  
            "name":"PM10",
            "element":"",
            "description":"Insieme di sostanze solide e liquide con diametro inferiore a 10 micron. Derivano da emissioni di autoveicoli, processi industriali, fenomeni naturali.",
            "parameter":"media giornaliero",
            "limit":"50",
            "warning":"50",
            "um":"µg/m³"
         },
         "values":[  
            {  
               "centralina":"Ceglie Messapica",
               "prov":"",
               "comune":"Ceglie Messapica",
               "valore":28,
               "ngiorni":1,
               "warning":0.56,
               "level":"28 µg/m³ (50µg/m³)",
               "poll":"PM10",
               "risk":0,
               "location":{  
                  "lat":40.649166,
                  "lng":17.5125
               },
               "weather":{          
                  "data":[  
                     {  
                        "dt":1424066400,
                        "main":{  
                           "temp":12.68,
                           "temp_min":12.68,
                           "temp_max":12.68,
                           "pressure":1029.24,
                           "sea_level":1030.83,
                           "grnd_level":1029.24,
                           "humidity":100,
                           "temp_kf":0
                        },
                        "weather":[  
                           {  
                              "id":802,
                              "main":"Clouds",
                              "description":"scattered clouds",
                              "icon":"03d"
                           }
                        ],
                        "clouds":{  
                           "all":44
                        },
                        "wind":{  
                           "speed":8.26,
                           "deg":151.002
                        },
                        "rain":{  
                           "3h":0
                        },
                        "sys":{  
                           "pod":"d"
                        },
                        "dt_txt":"2015-02-16 06:00:00"
                     }, ......
                     
                  ],
                  "title":"",
                  "station":null,
                  "error":""
               }
            }
         ]
      }, 
      ...........
   ]
}

</pre>

## Dipendenze

* [openarpa-scrape](https://github.com/opendatabari/openARPA-scrape)

## Developers & Support
Giuseppe Zileni ([Twitter](https://twitter.com/gzileni)/[Mail](mailto:me@gzileni.name)/[Site](http://www.gzileni.name))
