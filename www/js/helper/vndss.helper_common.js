// 11:45 29/03/2016
// HieuTM: Thư viện chung hỡ trợ thao tác 
// var _mico_global_session = new Object({customer:0});
var helper = angular.module('vndss.helper', ['vndss.services', 'ionic']);
helper.factory('$vndssHelperCommon', ['$vndssServices', '$state', '$ionicHistory', '$location', '$window',
	function ($vndssServices, $scope, $state, $window, $location, $ionicHistory) {
		
		this._scope = $scope,
		this._location = $location;
		this._state = $state;
		
		var vndssHelper = {
			// 	preAction : function($scope,$location,$state){
			//	this._rootScope = $scope;
			// 	this._rootScope._ajaxloading = new Object();
			//  this._scope = $scope;
			// 	this._location = $location;
			// 	this._state = $state;
			// 	this._scope.customer = this.getCustomer();
			// 	this._scope.error = "";
			//	},
			// startLoading: function () {
			// this._rootScope._ajaxloading['system'] = 1;
			// },
			// stopLoading: function (data) {
			// this._rootScope._ajaxloading['system'] = 0;
			// },

			/* Convert Image to type base64 */
			convertImagetoBase64: function convertImgToBase64(url, callback, outputFormat) {
				console.log('vao heplper');
				var img = new Image();
				img.crossOrigin = 'Anonymous';
				img.onload = function () {
					console.log(url);
					var canvas = document.createElement('CANVAS');
					var ctx = canvas.getContext('2d');
					canvas.height = this.height;
					canvas.width = this.width;
					ctx.drawImage(this, 0, 0);
					var dataURL = canvas.toDataURL(outputFormat || 'image/png');
					console.log(dataURL);
					callback(dataURL);
					canvas = null;
				};
				img.src = url;
			},

			/* Lấy session */
			getSetting: function (name) {
				return _mico_global_session[name] ? _mico_global_session[name] : 0;
			},
			setSetting: function (name, val) {
				_mico_global_session[name] = val;
			},
			getCustomer: function () {
				return this.getSetting('customer');
			},
			setCustomer: function (val) {
				return this.setSetting('customer', val);
			},
			clearCustomer: function () {
				return this.setSetting('customer', 0);
			},
			/* Quay ngược lại lịch sử */
			backHistory: function () {
				$ionicHistory.goBack();
			},
			go: function (url) {
				$location.path(url);
			},

			/* Tới trang chủ */
			goHome: function () {
				$location.path('/tab/warning');
			},

			getDeviceType: function () {
				// $scope.deviceInformation = ionic.Platform.device();
				// $scope.currentPlatform = ionic.Platform.platform();
				// $scope.currentPlatformVersion = ionic.Platform.version();

				return ionic.Platform.platform();
			},

			getWidthHeightMonion: function () {
				console.log("=======================================" + $window.innerHeight);
				return {
					width: $window.innerWidth,
					height: $window.innerHeight
				}
			},

			log: function (msg) {
				console.log(msg);
			}
		}
		
		return vndssHelper;
	}
]);