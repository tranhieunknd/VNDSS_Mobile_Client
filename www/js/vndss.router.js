app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        /* .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 't ',
            controller: 'AppCtrl'
        }) */

        .state('apphome', {
            url: '/apphome',
            abstract: true,
				cache: false,
            templateUrl: 'templates/vndss.app.html',
            controller: 'AppHomeCtrl'
        })

        .state('applogin', {
            url: '/applogin',
            abstract: true,
            templateUrl: 'templates/vndss.applogin.html',
            controller: 'LoginCtrl'
        })

        .state('applogin.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.login.html',
                    controller: 'LoginCtrl'
                }
            }
        })

        .state('apphome.default', {
            url: '/default',
				cache: false,
            views: {
                'menuHeader': {
                    templateUrl: 'templates/vndss.header_default.html'
                },
                'menuContent': {
                    templateUrl: 'templates/vndss.default.html',
                    controller: 'HomeDefaultCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'// ,
                    // controller: 'ComponentsCtrl'
                }
            }
        })

        .state('apphome.map', {
            url: '/map',
				cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.map_openlayer.html',
                    controller: 'MapOpenLayerCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('apptab', {
            url: '/apptab',
            abstract: true,
            templateUrl: 'templates/vndss.apptab.html',
            controller: 'HomeCtrl'
        })
        .state('apphome.warning_rain', {
           // url: '/warning_rain/:StationCode/:ProviderCode/:StationName/:LM0/:LM1/:LM3/:ProvinceName/:GeomId',
		    url: '/warning_rain/:StationCode/:TypeRain',
			cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.warning_rain.html',
                    controller: 'WarningRainCtrl',
					
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })

        .state('apphome.warning_flow', {
            //url: '/warning_flow/:lake/:LakeName/:TongLuuLuongDen/:MucNuocDangBinhThuong/:MucNuocDangGiaCuong/:MucNuocChet/:SoSanh/:GeomId',
			url: '/warning_flow/:lake',
			cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.warning_flow.html',
                    controller: 'WarningFlowCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('apphome.warning_wave', {
           // url: '/warning_wave/:StationFK/:SoSanhBaoDong/:BD1/:BD2/:BD3/:LLS/:StationName/:BasinName/:GeomId',
		    url: '/warning_wave/:StationFK',
			cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.warning_wave.html',
                    controller: 'WarningWaveCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('apphome.forecast_flow', {
            url: '/forecast_flow/:id/:from/:to/:name/:mucnuoc/:dongchay',
			cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.forecast_flow.html',
                    controller: 'ForecastFlowCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('apphome.view_camera', {
            url: '/camera',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.view_camera.html',
                    controller: 'ViewCameraCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('apphome.forecast_rain', {
            url: '/forecast_rain/:id/:from/:to',
			cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.forecast_rain.html',
                    controller: 'ForecastRainCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('apphome.list_forecast_rain', {
            url: '/list_forecast_rain',
			cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.list_forecast_rain.html',
                    controller: 'ListForecastRainCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('apphome.list_forecast_flow', {
            url: '/list_forecast_flow',
			cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.list_forecast_flow.html',
                    controller: 'listForecastFlowCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })

        .state('tab', {
            url: "/tab",
            abstract: true,			
			cache: false,
            templateUrl: 'templates/vndss.tabs.html',
			controller: 'AppHomeCtrl'
        })

        .state('tab.warning', {
            url: '/warning',
			cache: false,
            views: {
                'tab-warning': {
                    templateUrl: 'templates/vndss.tab-warning.html',
                    controller: 'WarningCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        .state('tab.forecast', {
            url: '/forecast',
			cache: false,
            views: {
                'tab-forecast': {
                    templateUrl: 'templates/vndss.tab-forecast.html',
                    controller: 'ForecastCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
		.state('apphome.list_warning_rain', {
            url: '/list_warning_rain',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.list_warning_rain.html',
                    controller: 'ListWarningRainCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
		.state('apphome.list_warning_flow', {
            url: '/list_warning_flow',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.list_warning_flow.html',
                    controller: 'ListWarningFlowCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
		.state('apphome.list_warning_wave', {
            url: '/list_warning_wave',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vndss.list_warning_wave.html',
                    controller: 'ListWarningWaveCtrl'
                },
                'menuLeft': {
                    templateUrl: 'templates/vndss.menu_left.html'
                }
            }
        })
        /* .state('app.lists', {
            url: '/lists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/lists.html',
                    controller: 'ListsCtrl'
                }
            }
        })

        .state('app.ink', {
            url: '/ink',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ink.html',
                    controller: 'InkCtrl'
                }
            }
        })

        .state('app.motion', {
            url: '/motion',
            views: {
                'menuContent': {
                    templateUrl: 'templates/motion.html',
                    controller: 'MotionCtrl'
                }
            }
        })

        .state('app.components', {
            url: '/components',
            views: {
                'menuContent': {
                    templateUrl: 'templates/components.html',
                    controller: 'ComponentsCtrl'
                }
            }
        })

        .state('app.extensions', {
            url: '/extensions',
            views: {
                'menuContent': {
                    templateUrl: 'templates/extensions.html',
                    controller: 'ExtensionsCtrl'
                }
            }
        }) */
		;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/applogin/login');
});

