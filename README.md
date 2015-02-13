# openARPA
NodeJS Server API per i dati di monitoraggio ambientale di ARPA Puglia

## API's

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
            "weather":{
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

### Weather JSON

<pre>
    
    {"temp":
        {
            "v":276.5,
            "c":237,
            "mi":272.55,
            "ma":282.75
        },
    "pressure":{
        "v":991.8,
        "c":239,
        "mi":988.8,
        "ma":997.2
    },
    "humidity":{
        "v":86.7,
        "c":237,
        "mi":71,
        "ma":91
    },
    "rain":{
        "1h":{
            "v":0.15,
            "c":236,
            "mi":0,
            "ma":2.1
        }
    },
    "calc":{
        "dewpoint":{
            "v":1.31,
            "c":237,
            "mi":-2.8,
            "ma":6.1
        }
    },
    "wind":{
        "gust":{
            "v":1.53,
            "c":237,
            "mi":0,
            "ma":7.6
        },
        "deg":{
            "v":169
        }
    },
    "precipitation":{
        "v":""
    },
    "main":{
        "humidity":{
            "v":86.7,
            "c":237,
            "mi":71,
            "ma":91
        },
        "temp":{
            "v":276.5,
            "c":237,
            "mi":272.55,
            "ma":282.75
        },
        "temp_max":272.55,
        "pressure":{
            "v":991.8,
            "c":239,
            "mi":988.8,
            "ma":997.2
        }
    },
    "dt":1422835200
    }

</pre>

Maggiori info sui dati json [OpenWeatherMap](http://openweathermap.org/api)

## Dipendenze

* [openarpa-scrape](https://github.com/opendatabari/openARPA-scrape)

## Developers & Support
Giuseppe Zileni ([Twitter](https://twitter.com/gzileni)/[Mail](mailto:me@gzileni.name)/[Site](http://www.gzileni.name))
