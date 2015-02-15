---
layout: default
---

[openARPA](http://opendatabari.github.io/openpuglia) ha l'obiettivo di fornire dati aperti dell'agenzia regionale pugliese [ARPA](http://www.arpa.puglia.it/web/guest/arpa_home) preposta all’esercizio di attività e compiti in materia di prevenzione e tutela ambientale.

<iframe src="http://ghbtns.com/github-btn.html?user=opendatabari &amp;repo=openARPA&amp;type=watch&amp;count=true&amp;size=large"
  allowtransparency="true" frameborder="0" scrolling="0" width="170" height="30"></iframe><br/>
  
![ARPA]({{ site.url }}/img/ilva.jpg)  

## Dati ARPA

[ARPA Puglia](http://www.arpa.puglia.it/web/guest/chi_siamo), Agenzia Regionale per la Prevenzione e la Protezione dell'Ambiente, è Organo Tecnico della Regione Puglia, istituito e disciplinato con Legge Regionale 22 gennaio 1999, n. 6, così come modificata dalla Legge Regionale 4 ottobre 2006, n. 27, di seguito denominata legge istitutiva.

![ARPA]({{ site.url }}/img/logo-arpa-small.jpg)

* [Rete di monitoraggio](http://www.arpa.puglia.it/c/document_library/get_file?uuid=8ba309ba-713d-46a2-9d5c-d8bfcf4cc766&groupId=13883): Rete di monitoraggio della qualità dell’aria

* [Serie storiche](http://www.arpa.puglia.it/web/guest/aria_monit): Ogni giorno dell’anno ha 24 dati, uno per ogni ora, che è la media oraria di quell’inquinante per quell’ora. I dati sono gli stessi pubblicati da Ispra nel progetto [Brace](http://www.brace.sinanet.apat.it/web/struttura.html).

* [Dati giornalieri](http://www.arpa.puglia.it/web/guest/qariainq): Dati raccolti giorno x giorno attraverso le centraline di rilevamento. 

* [Documentazione](http://www.arpa.puglia.it/web/guest/aria_doc_rapp)(PDF)

## Architettura
![openARPA]({{ site.url }}/img/openARPA.png) 

## Dataset
* [Centraline di monitoraggio ARPA](http://dati.openbsk.it/dataset/monitoraggio-aria)

* [Inquinanti Atmosferici](http://dati.openbsk.it/dataset/inquinanti-atmosferici)



![openARPA]({{ site.url }}/img/openbsk.png)


## Endpoints API

* [/monitoring/json](http://openpuglia-prod.apigee.net/arpa/v1/monitoring/json): Monitoraggio giornaliero dei dati sulla qualità dell'aria completo di dato meteo.

* [/monitoring/geojson](http://openpuglia-prod.apigee.net/arpa/v1/monitoring/geojson): Monitoraggio giornaliero dei dati sulla qualità dell'aria in formato [geojson](http://geojson.org)

    [Demo]({{ site.url }}/openarpa/index.html?type=monitoring)
    [Info](https://github.com/opendatabari/openARPA)

* [/warning/json](http://openpuglia-prod.apigee.net/arpa/v1/warning/json): Monitoraggio giornaliero dei dati sulla qualità dell'aria che hanno superato il valore limite, completi di dati meteo.

* [/warning/geojson](http://openpuglia-prod.apigee.net/arpa/v1/warning/geojson): Monitoraggio giornaliero dei dati sulla qualità dell'aria che hanno superato il valore limite, in formato [geojson](http://geojson.org).

    [Demo]({{ site.url }}/openarpa/index.html?type=warning)
    [Info](https://github.com/opendatabari/openARPA)

* [/taranto](http://openpuglia-prod.apigee.net/arpa/v1/taranto): Monitoraggio giornaliero dei dati sulla qualità dell'aria sulla città di Taranto, completo di dati meteo nei 7 giorni precedenti, in formato [geojson](http://geojson.org).

    [Demo]({{ site.url }}/openarpa/index.html?type=taranto)
    [Info](https://github.com/opendatabari/openARPA)

* [/amianto](http://openpuglia-prod.apigee.net/arpa/v1/amianto): Restituisce dati geojson per visualizzare una mappa con tutti i siti inquinanti di amianto

    [Dataset](http://dati.openbsk.it/dataset/amianto/resource/9eed961a-5e9a-4e21-89a9-c5a345fff65b)
    [Info](http://opendatabari.github.io/blog/civic%20hacking/2013/11/24/come-organizzare-una-passeggiata-di-monitoraggio-una-ricerca-sullilva.html)
    [Demo]({{ site.url }}/openarpa/index.html?type=amianto)
    
* [/prevision/:lat/:lng/:limit/:format](http://openpuglia-prod.apigee.net/arpa/v1/prevision/40.4391506/17.2503822/hour/json)
Restituisce un json, oppure geojson, con i dati di rilevamento della qualità dell'aria più vicina, con le previsioni meteo.

    * ´lat´: latitudine
    * ´lng´: longitudine
    * ´limit´: ´hour´ per le previsioni meteo nei prossimi 5 giorni per ore, ´daily´ per le previsioni meteo nei prossimi 16 giorni
    * ´format´: ´json´ oppure ´geojson´
    
* /history (coming soon...): Visualizzazione serie storica giornaliera e confronto con le serie storiche degli anni precedenti.

    [Dataset](http://dati.openbsk.it/organization/openbari)
    

## Dipendenze
* [openarpa-scrape](https://github.com/opendatabari/openARPA-scrape) 

## Author

openPuglia ([Web](http://opendatabari.github.io/openpuglia)/[Blog](http://opendatabari.github.io/blog/)/[Twitter](http://twitter.com/odpuglia)/[GitHub](http://github.com/opendatabari)/[G+](https://plus.google.com/u/0/communities/114201169795304528470)/[Facebook](https://www.facebook.com/groups/1582370461982907/)/[LinkedIN](https://www.linkedin.com/groups?home=&gid=8227043&trk=my_groups-tile-grp))

![openPuglia]({{ site.url }}/img/logo-openpuglia-small.jpg)

## Developers

* Vincenzo Patruno, Data Analyst [GitHub](https://github.com/patrunomeister)
* Giuseppe Zileni - Developers, API Designer, Web Specialist ([Twitter](http://twitter.com/gzileni)/[GitHub](http://github.com/giuseppezileni)/[G+](https://plus.google.com/u/0/+GiuseppeZileni/posts)).

### License

[CC 1.0](http://en.wikipedia.org/wiki/Creative_Commons_license)

<div class="github-fork-ribbon-wrapper right fixed" style="width: 150px;height: 150px;position: fixed;overflow: hidden;top: 0;z-index: 9999;pointer-events: none;right: 0;"><div class="github-fork-ribbon" style="position: absolute;padding: 2px 0;background-color: #333;background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));-webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);-moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);z-index: 9999;pointer-events: auto;top: 42px;right: -43px;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);"><a href="https://github.com/opendatabari/openARPA" style="font: 700 13px &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;color: #fff;text-decoration: none;text-shadow: 0 -1px rgba(0, 0, 0, 0.5);text-align: center;width: 200px;line-height: 20px;display: inline-block;padding: 2px 0;border-width: 1px 0;border-style: dotted;border-color: rgba(255, 255, 255, 0.7);">Fork me on GitHub</a></div></div>
