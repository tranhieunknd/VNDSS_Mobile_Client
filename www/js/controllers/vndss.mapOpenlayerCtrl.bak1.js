// 13:55 29-03-2016 HieuTM: 
controllerGlobal.controller('MapOpenLayerCtrl', function ($scope, $rootScope, $state, $location, $compile, $ionicHistory, $vndssLogicCommon, $vndssLogic_Hieutm) {
	console.log('vao ban do =))');
	// Ham dung chung
	
	var container = document.getElementById('popup');
	var content = document.getElementById('popup-content');
	var closer = document.getElementById('popup-closer');
	var linksource = 'http://www.thuyloivietnam.vn/';
	var objectMapTableName;
	$scope.input = {imgwarrningmap: "img/danger.png"}
	
	var vectorSourceCau = new ol.source.Vector({
		source: new ol.source.Vector()
	});
	
	// a default style is good practice!
	
	var defaultStyle = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: "#f05a53",
			width: 4,
			opacity: 0.5
		})
	});
	
	var color = "240,90,83";
	var pointStyle = new ol.style.Style({
		image: new ol.style.Circle({
			radius: 4,
			stroke: new ol.style.Stroke({
				color: "rgba(" + color + ",0.5)",
				width: 15
			}),
			fill: new ol.style.Fill({
				color: "rgba(" + color + ",1)"
			})
		})
	});
	
	var g_layer_search = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: []
		}),
		style: defaultStyle
	});
	var g_layer_searchPoint = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: []
    }),
    style: pointStyle
});
	
	$scope.onclick = function () {
		console.log("vao close");
		$scope.configMap.closeWindowPopup();
	};
	
	$scope.configMap = {
		animating: false,
		styles: {
			'route': new ol.style.Style({
				stroke: new ol.style.Stroke({
					width: 6, color: [237, 212, 0, 0.8]
				})
			}),
			'mua': new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 1],
					src: 'img/danger.png'
				})
			}),
			'ho': new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 1],
					src: 'img/danger.png'
				})
			}),
			'song': new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 1],
					src: 'img/danger.png'
				})
			}),
			'tuychinh': new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 1],
					src: $scope.input.imgwarrningmap
				})
			}),
			'geoMarker': new ol.style.Style({
				image: new ol.style.Circle({
					radius: 7,
					snapToPixel: false,
					fill: new ol.style.Fill({ color: 'black' }),
					stroke: new ol.style.Stroke({
						color: 'white', width: 2
					})
				})
			}),
			// 'defaultStyle': new ol.style.Style({
				// stroke: new ol.style.Stroke({
					// color: "#f05a53",
					// width: 4,
					// opacity: 0.5
				// })
			// });
		},
		closeWindowPopup: function () {
			console.log("tat popup");
			$scope.overlayPopup.setPosition(undefined);
			// closer.blur();
			return false;
		}
	}
	
	$scope.data = {
		titlePage: $rootScope._data._passParam._titlePage
	}
	
	function returnTemplate(feature){
		console.log(feature);
		var htm = "";
		htm += "<div class=\"tippy\">";
		htm += "<div class=\"main ng-scope pinned tippy\">";

		htm += "<div class=\"details\">";
		// htm += "<figure><img class=\"circle green\" src=\"/Images/biogas.png\"></figure>";
		htm += "<figure></figure>";
		htm += "<div class=\"inner\">";
		htm += "<p><b>Mã công trình:</b> " + feature.get('name') + "<br>";
		htm +=  feature.get('description') + "</p>";
		
		// htm += "<p class=\"ng-binding\">Loại công trình: " + feature.get('category_name') + "</p>";

		// htm += "<p class=\"ng-binding\">Dung tích: " + feature.get('volume_plant') + "</p>";
		// htm += "<p class=\"ng-binding\">Địa điểm: " + feature.get('address') + "</p>";
		// htm += "<p class=\"ng-binding\">Trạng thái: " + feature.get('status') + "</p>";
		htm += "</div>";
		htm += "</div>";

		htm += "</div>";
		htm += "</div>";

		return htm;
	}
	
	/*
		vectorSource: vectorSource can them feature
		element: thong tin phan tu can tao marker
		type: 0-Mua; 1-Ho; 2-Song
	*/
	function addMarker(vectorSource, element){
		var tmplocation = element.location.split(",").map(Number);
		var tmpvalue = {
			name: element.name,
			code: element.code,
			description: element.description,
			geometry: new ol.geom.Point(tmplocation),
			// type: new ol.style.Style({
				// image: new ol.style.Icon({
					// anchor: [0.5, 1],
					// src: element.img
				// })
			// })
			type: 'tuychinh'
			// style: 
		};
		// switch(type)
		// {
			// case 0: tmpvalue.type = 'mua'; break;
			// case 1: tmpvalue.type = 'ho'; break;
			// case 2: tmpvalue.type = 'song'; break;
		// };
		var tmp = new ol.Feature(tmpvalue);
		vectorSource.addFeature(tmp);
	}
	
	// Ham xu li
	$scope.addLayer = function () {
		var featuresCanhBaoHo = [];
		
		// Canh bao Muc Nuoc Ho
		var http = $vndssLogic_Hieutm.LocationCanhBaoHo();	
		http.success(function(data){	
		
			// var features = new ol.format.GeoJSON().readFeatures(datageojson, {
				// featureProjection: 'EPSG:3857'
			// });
			// $scope.vectorSource.addFeature(features);
			
			
			var kml = data.data.kml;
			if(kml.length > 0)
			kml.forEach(function (element) {
				addMarker($scope.vectorSourceHo, element);
			}, this);
		});	
		
		// Canh bao Muc Nuoc Song
		var http = $vndssLogic_Hieutm.LocationCanhBaoSong();	
		http.success(function(data){	
			var kml = data.data.kml;
			if(kml.length > 0)
			kml.forEach(function (element) {
				$scope.input.imgwarrningmap = element.img;
				addMarker($scope.vectorSourceSong, element);
			}, this);
		});
		
		// Canh Bao Mua
		var http = $vndssLogic_Hieutm.LocationCanhBaoMua();	
		http.success(function(data){
		
			var kml = data.data.kml;
			if(kml.length > 0)
			kml.forEach(function (element) {
				addMarker($scope.vectorSourceMua, element);
			}, this);
		});
		
		// var popup = new ol.Overlay({
			// element: document.getElementById('popup')
		// });
		
		
		// // Create a popup overlay which will be used to display feature info
		// var popup = new ol.Overlay.Popup();
		// map.addOverlay(popup);
		
		function clickPopup(pixel, coordinate){
			console.log('===================');
			var feature = $scope.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
				// console.log('---------------------');
				return feature;
			});
			
			if (feature){
				console.log(feature.get('name'));
				// var c = feature.get('features');
				// if (c != 'undefined' && c != '' && c != null)
				// {
					// if (c.length == 1) {
						// var feature_one = c[0];
						// overlayPopup.setPosition(coordinate);
						// var properties = feature_one.getProperties();
						// content.innerHTML = 'medksdas';
					// }
				// } 
				
				var coord = feature.getGeometry().getCoordinates();
				$scope.overlayPopup.setPosition(coord);
				content.innerHTML = returnTemplate(feature);
				
				var coordtmp = [coord[0]* 1 - 100000, coord[1]];
				$scope.map.getView().setZoom(13);
				$scope.map.getView().setCenter(coord);
				
			}else {
				// console.log('aaaaaaaaaaaaaaaaaaaa');
				$scope.configMap.closeWindowPopup();
			}
		}
		
		$scope.map.on('singleclick', function(evt) {    
			
			if (evt.dragging) {
				return;
			}
			
			var pixel = $scope.map.getEventPixel(evt.originalEvent);
			var coordinate = evt.coordinate;
			
			clickPopup(pixel, coordinate);
			
			// var feature = $scope.map.forEachFeatureAtPixel(evt.pixel,
				// function(feature, layer) {
					// console.log("demo");
					// return [feature, layer];                                  
				// });   
			// var c = feature.get('features');
            // if (c != 'undefined' && c != '' && c != null){
				// if (c.length == 1) {
                    // var feature_one = c[0];
					// $scope.overlayPopup.setPosition(coordinate);
					// var properties = feature_one.getProperties();
					// content.innerHTML = 'demo abc';
				// }
			// }

			// ============================================
			
			// if (feature) {
				// var coord = feature.getGeometry().getCoordinates();
				// var props = feature.getProperties();
				// var info = "<h2><a href='" + props.caseurl + "'>" + props.casereference + "</a></h2>";
					// info += "<p>" + props.locationtext + "</p>";
					// info += "<p>Status: " + props.status + " " + props.statusdesc + "</p>";
				// // Offset the popup so it points at the middle of the marker not the tip
				// popup.setOffset([0, -22]);
				// popup.show(coord, info);

			// }

		}); 
	}

	$scope.initMap = function () {
		
		// console.log('demo du lieu');
		var address = "http://thuyloivietnam.vn";
		var wmsPathFull = address + '/Wms.ashx';
		var extent = [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
		var projection = ol.proj.get('EPSG:3857');

		var layer = new ol.layer.Tile({
			title: 'Global Imagery',
			name: 'bgMainBaseLayer',
			//title: "bgMainBaseLayer",
			extent: extent,
			source: new ol.source.TileWMS({
				url: wmsPathFull,
				params: { LAYERS: 'MainBg', VERSION: '1.1.1' }
			})
        });

		var view = new ol.View({
			projection: 'EPSG:3857',
			center: [11701235.7800985, 1866772.8945195],
			zoom: 6,
			maxResolution: 156543.0339,
			numZoomLevels: 22,
			units: 'm'
		});

		var view_old = new ol.View({
			center: ol.proj.fromLonLat([37.41, 8.82]),
			zoom: 4
        })
		
		$scope.overlayPopup = new ol.Overlay(/** @type {olx.OverlayOptions} */({
			element: container,
			autoPan: true,
			autoPanAnimation: {
				duration: 250
			}
		}));
		
		// $scope.vectorSource,
				
		// Lop vector hien thi canh bao mua
		$scope.vectorSourceMua = new ol.source.Vector({
			source: new ol.source.Vector()
		});
		var vectorMua = new ol.layer.Vector({
			source: $scope.vectorSourceMua,
			// source: vectorSourceCau,
			style: function (feature) {
				// hide geoMarker if animation is active
				if ($scope.configMap.animating && feature.get('type') === 'geoMarker') {
					return null;
				}
				return $scope.configMap.styles[feature.get('type')];
			}
		});
		
		// Lop vector hien thi canh bao song
		$scope.vectorSourceSong = new ol.source.Vector({
			source: new ol.source.Vector()
		});
		var vectorSong = new ol.layer.Vector({
			source: $scope.vectorSourceSong,
			// source: vectorSourceCau,
			style: function (feature) {
				// hide geoMarker if animation is active
				if ($scope.configMap.animating && feature.get('type') === 'geoMarker') {
					return null;
				}
				return $scope.configMap.styles[feature.get('type')];
			}
		});
		
		// Lop vector hien thi canh bao ho
		$scope.vectorSourceHo = new ol.source.Vector({
			source: new ol.source.Vector()
		});
		var vectorHo = new ol.layer.Vector({
			source: $scope.vectorSourceHo,
			// source: vectorSourceCau,
			style: function (feature) {
				// hide geoMarker if animation is active
				if ($scope.configMap.animating && feature.get('type') === 'geoMarker') {
					return null;
				}
				return $scope.configMap.styles[feature.get('type')];
			}
		});
		
		var map = new ol.Map({
			target: 'map',
			layers: [layer, vectorMua, vectorSong, vectorHo],
			overlays: [$scope.overlayPopup],
			view: view,
			maxScale: 1000,
			minScale: 50000000
		});
		
		$scope.map = map;
		$scope.addLayer();
		
		console.log("vao nhe");
		console.log($rootScope._data._passParam);
		console.log($rootScope._data._passParam._tableName != "");
		console.log($rootScope._data._passParam._geomid != -1);
		if($rootScope._data._passParam._tableName != "" && $rootScope._data._passParam._geomid != -1){
			console.log('vao roi nhe');
			console.log($rootScope._data._passParam);
			$scope.loadLocationLake($rootScope._data._passParam._tableName, $rootScope._data._passParam._geomid)
			$rootScope._data._passParam._tableName = "";
			$rootScope._data._passParam._geomid = -1;
		}
	}

	$scope.loadLocationLake = function(tableName, geomId){
		
		function QuichSearch(tableName, geomId) {
			if (geomId != null && geomId != '' && geomId != 'null') {
				objectMapTableName = tableName;
				objectMapTableId = geomId;
				var http = $vndssLogic_Hieutm.GetAshxTLVN(tableName, geomId);
				http.success(ObjectMapOnComplete)
				// $.ajax({
					// url: address + '/MapObject.ashx',
					// contentType: "application/json; charset=utf-8",
					// dataType: "json",
					// data: {
						// table: tableName,
						// id: geomId
					// },
					// responseType: "json",
					// success: ObjectMapOnComplete,
					// error: ObjectOnFail
				// });
			}
		}
		function ObjectMapOnComplete(result) {
			var minX = result.minX;
			var maxY = result.maxY;
			var maxX = result.maxX;
			var minY = result.minY;
			var geo = result.Geo;
			// console.log(objectMapTableName);
			if (geo != null) {
				var isZoomBound = false;
				if (objectMapTableName == "province_tb" || objectMapTableName == "main_basin_tb") {
					isZoomBound = true;
				}

				if (objectMapTableName == "province_tb" || objectMapTableName == "main_basin_tb") {

					var extent = [minX, minY, maxX, maxY];
					$scope.map.getView().fit(extent, $scope.map.getSize());

					var format = new ol.format.WKT();
					var feature = format.readFeature(geo);

					$scope.map.removeLayer(g_layer_search);
					$scope.map.removeLayer(g_layer_searchPoint);

					g_layer_search = new ol.layer.Vector({
						source: new ol.source.Vector({
							features: [feature]
						}),
						style: defaultStyle
					});
					$scope.map.addLayer(g_layer_search);

				} else {
					var rlat, rlon;
					rlon = (parseFloat(maxX) + parseFloat(minX)) / 2;
					rlat = (parseFloat(maxY) + parseFloat(minY)) / 2;

					$scope.map.getView().setCenter(ol.proj.transform([rlon, rlat], 'EPSG:3857', 'EPSG:3857'));
					$scope.map.getView().setZoom(14);

					var format = new ol.format.WKT();
					var feature = format.readFeature(geo);

					$scope.map.removeLayer(g_layer_searchPoint);
					$scope.map.removeLayer(g_layer_search);

					g_layer_searchPoint = new ol.layer.Vector({
						source: new ol.source.Vector({
							features: [feature]
						}),
						style: pointStyle
					});
					$scope.map.addLayer(g_layer_searchPoint);
				}

				var format = new ol.format.WKT();
				var feature = format.readFeature(geo);

				$scope.map.removeLayer(g_layer_search);

				g_layer_search = new ol.layer.Vector({
					source: new ol.source.Vector({
						features: [feature]
					}),
					style: defaultStyle
				});
				$scope.map.addLayer(g_layer_search);

			}
		}
		function ObjectOnFail(result) {
			console.log(result);
		}
		QuichSearch(tableName, geomId);
	}
});