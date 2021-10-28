//import { Vector } from 'ol/source';
//import { GeoJSON } from 'ol/format';
//import { bbox } from 'ol/loadingstrategy';


//function custominit() {

//    let custom_Map, custom_Draw, custom_Source, custom_Layer;

//    custom_Source = new Vector({
//        format: new GeoJSON(),
//        loader: function (extent, resolution, projection, success, failure) {
//            var proj = projection.getCode();
//            var url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
//                'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
//                'outputFormat=application/json&srsname=' + proj + '&' +
//                'bbox=' + extent.join(',') + ',' + proj;
//            var xhr = new XMLHttpRequest();
//            xhr.open('GET', url);
//            var onError = function () {
//                vectorSource.removeLoadedExtent(extent);
//                failure();
//            }
//            xhr.onerror = onError;
//            xhr.onload = function () {
//                if (xhr.status == 200) {
//                    var features = vectorSource.getFormat().readFeatures(xhr.responseText);
//                    vectorSource.addFeatures(features);
//                    success(features);
//                } else {
//                    onError();
//                }
//            }
//            xhr.send();
//        },
//        strategy: bbox
//    });

//}

var _Map, _Draw, _Source, _Layer;

InitializeMap = () => {
    _Source = new ol.source.Vector({ wrapX: false });
    _Layer = new ol.layer.Vector({
        source: _Source,
    });
    _Map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            _Layer
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7
        })
    });


    //var iconFeature = new ol.Feature({
    //    geometry: new ol.geom.Point([0, 0]),
    //    name: 'Null Island',
    //    population: 4000,
    //    rainfall: 500,
    //});

    //var iconStyle = new ol.style.Icon({
    //    image: new ol.style.Icon({
    //        anchor: [0.5, 46],
    //        anchorXUnits: 'fraction',
    //        anchorYUnits: 'pixels',
    //        src: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/16/map-marker-icon.png',
    //    }),
    //});

    //iconFeature.setStyle(iconStyle);

    //var vectorSource = new VectorSource({
    //    features: [iconFeature],
    //});

    //var vectorLayer = new VectorLayer({
    //    source: vectorSource,
    //});

    //var rasterLayer = new TileLayer({
    //    source: new TileJSON({
    //        url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json',
    //        crossOrigin: '',
    //    }),
    //});

    //var map = new Map({
    //    layers: [rasterLayer, vectorLayer],
    //    target: document.getElementById('map'),
    //    view: new View({
    //        center: [0, 0],
    //        zoom: 3,
    //    }),
    //});
    //var markers = new ol.Layer.Markers('Markers');
    //map.addLayer(markers);
    //markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(venues.location.lng, venues.location.lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")), icon));


    var markers = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/16/map-marker-icon.png'
            })
        })
    });
    _Map.addLayer(markers);

    //var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([365,485])));
    //markers.getSource().addFeature(marker);

    //console.log("map",_Map, "draw",_Draw, "source",_Source,"layer", _Layer)



    $.ajax({
        url: '/Home/GetCoordinates/',
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (data) {
            savedCoordinates = data;
            $.each(JSON.parse(data), function (i, item) {
                console.log("kordinat", item.Coordinate);

                var xCordinate = item.Coordinate.substring(0, 6);
                var focusCor = item.Coordinate.substring(item.Coordinate.indexOf(",") + 1);
                var yCordinate = String(focusCor).substring(0, 6);
                //var lonlat = ol.proj.transform(item.Coordinate, "EPSG:3857", 'EPSG:3857');
                //console.log("transformlu",lonlat);
                //var lon = lonlat[0];
                //var lat = lonlat[1];
                //console.log("lon", lon);
                //console.log("lat", lat);
                var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([xCordinate, yCordinate])));
                //var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([parseInt(xCordinate), parseInt(yCordinate)])));
                markers.getSource().addFeature(marker);

                //features.push(new ol.Feature({
                //    geometry: new ol.geom.Point(ol.proj.fromLonLat([
                //        30, 38
                //    ]))
                //}));
                //console.log(item.Coordinate);
            });

        },
        error: function (hata) {

        }

    });

}

AddInteraction = () => {
    //var marker = new ol.Fetature({
    //    geometry: new ol.geom.Point([82.50, 23.56]),
    //    type: 'hospital',
    //    name: 'test'
    //});

    //var marker1 = new ol.Fetature({
    //    geometry: new ol.geom.Point([75.50, 32.56]),
    //    type: 'park',
    //    name: 'test1'
    //});

    //var vectorLayer = new ol.layer.Vector({
    //    title: 'POI',
    //    source: new ol.source.Vector({
    //        features: [marker, marker1]
    //    })
    //});

    //_Map.addLayer(vectorLayer);
    //var vectorSource = new ol.source.Vector({});
    //var thing = new ol.geom.Polygon([[
    //    ol.proj.transform([3875337.272593909, 4773762.797695817], 'EPSG:4326', 'EPSG:3857'),
    //    ol.proj.transform([3875337.272593909, 4873762.797695817], 'EPSG:4326', 'EPSG:3857'),
    //    ol.proj.transform([3875337.272593909, 4973762.797695817], 'EPSG:4326', 'EPSG:3857')
    //]]);
    //var featurething = new ol.Feature({
    //    name: "Thing",
    //    geometry: thing
    //});
    //vectorSource.addFeature(featurething);


    _Draw = new ol.interaction.Draw({
        source: _Source,
        type: "Point"
    });
    _Map.addInteraction(_Draw);
    _Draw.setActive(false);

    //_Map.on('click', function (evt) {
    //    $("#modalBtn").click();
    //    return false;
    //});

    _Draw.on(
        //"drawstart",
        "drawend",
        (_event) => {
            //console.log('işaretten önce');
            //let [x, y] = _event.feature.getGeometry().getCoordinates()
            //console.log(x, y);
            $("#modalBtn").click();
            
            //console.log('işaretten sonra')
            //if (true) {
            //    console.log("mark öncesi", x, y);
            //    addMarker(x, y)
            //    console.log("mark sonrası", x, y);
            //}
            _Draw.setActive(false);
            _Draw.removeLastPoint();
            //return false
        });

    _Map.on('click', function (evt) {
        //alert(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
        $('#coordinate').val(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    });


}

AddPoint = () => {
    _Draw.setActive(true);



    // generate 300 random points features
    //const getRandomNumber = function (min, ref) {
    //    return Math.random() * ref + min;
    ////}
    //const features = [];
    ////for (i = 0; i < 300; i++) {
    ////    features.push(new ol.Feature({
    ////        geometry: new ol.geom.Point(ol.proj.fromLonLat([
    ////            -getRandomNumber(50, 50), getRandomNumber(10, 50)
    ////        ]))
    ////    }));
    ////}



    //features.push(new ol.Feature({
    //    geometry: new ol.geom.Point(ol.proj.fromLonLat([
    //        3775337.2, 4373762.797
    //    ]))
    //}));


    //// create the source and layer for random features
    //const vectorSource = new ol.source.Vector({
    //    features
    //});
    //const vectorLayer = new ol.layer.Vector({
    //    source: vectorSource,
    //    style: new ol.style.Style({
    //        image: new ol.style.Circle({
    //            radius: 2,
    //            fill: new ol.style.Fill({ color: 'red' })
    //        })
    //    })
    //});

    //_layers = [
    //    new ol.layer.Tile({
    //        source: new ol.source.OSM()
    //    }),
    //    vectorLayer
    //];
}

//function addMarker(x, y) {
    //var markers = new ol.layer.Vector({
    //    source: new ol.source.Vector(),
    //    style: new ol.style.Style({
    //        image: new ol.style.Icon({
    //            anchor: [0.5, 1],
    //            src: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/16/map-marker-icon.png'
    //        })
    //    })
    //});
    //_Map.addLayer(markers);

    //var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([x, y])));
    //markers.getSource().addFeature(marker);

    //var layer = new ol.layer.Vector({
    //    source: new ol.source.Vector({
    //        features: [new ol.Feature({
    //            geometry: new ol.geom.Point(ol.proj.fromLonLat([x, y]))
    //        })]
    //    })
    //});
    //_Map.addLayer(layer);
    //let said = _Map.addMarker([x, y])
    //console.log(said);
    //_Map.render();
//}


//function addMarker(coordinates) {
//    console.log(coordinates);
//    var marker = new ol.Feature(new ol.geom.Point(coordinates));
//    var zIndex = 1;
//    marker.setStyle(new ol.style.Style({
//        image: new ol.style.Icon(({
//            anchor: [0.5, 36],
//            anchorXUnits: "fraction",
//            anchorYUnits: "pixels",
//            opacity: 1,
//            src: "mapIcons/pinother.png",
//            zIndex: zIndex,
//            type:"Point"
//        })),
//        zIndex: zIndex
//    }));
//    _Source.addFeature(marker);
//}

//addMarker("3658256.1122640083, 4854154.184448834");



    //ol.Map.prototype.addMarker = function (lonlat, style) {
    //    console.log("1");
    //    var feature = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(lonlat, this.getView().getProjection())));

    //    console.log("2");
    //    if (style === undefined) {
    //    console.log("3");
    //        var kml = new ol.format.KML().writeFeatures([feature]);
    //        kmlFeature = new ol.format.KML().readFeature(kml);
    //        feature.setStyle(kmlFeature.getStyle());
    //    } else {
    //    console.log("4");
    //        feature.setStyle(style);
    //    }
    //    console.log("5");

    //    var layer = new ol.layer.Vector({
    //        source: new ol.source.Vector({
    //            features: [feature]
    //        })
    //    });

    //    this.addLayer(layer);
    //    console.log("6",this.getLayers());

    //    return layer; // e.g. to allow it to be removed

    //}




//function myfunction() {
//    var map = new ol.Map({
//        layers: [
//            new ol.layer.Tile({
//                source: new ol.source.OSM()
//            })
//        ],
//        target: 'map',
//        view: new ol.View({
//            center: [0, 0],
//            zoom: 2
//        })
//    });

//    map.addMarker([-0.00149, 51.47795]);
//}