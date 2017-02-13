 // 11:45 29/03/2016
 // HieuTM: Thư viện chung hỡ trợ truy xuất
 var logic = angular.module('vndss.logic', ['vndss.services', 'ionic', 'ngCordova', 'ngResource'])
logic.factory('$vndssLogicCommon', ['$vndssServices', '$ionicPopup',
	function($vndssServices, $ionicPopup, $cordovaFileTransfer){
		var vndssLogicCommon = {
			setting : _nt_global_setting,
			/* ham co ban */
			getLogin : function (){
				return this.getSession('login');
			},
			setLogin : function (datas){
				return this.setSession('login', datas);
			},
			getSession : function (name){
				var ret = window.localStorage[name];
				if (!ret) return "";
				return JSON.parse(ret);
			},
			setSession : function (name,val){
				window.localStorage[name] = JSON.stringify(val);
				return this;
			},
			parserList : function (data){
				if (data && data.datas){
					return data.datas;
				}
				return 0;
			},
			parserOne : function (data){
				if (data && data.datas){
					return data.datas[0];
				}
				return 0;
			},
			parserError : function (data){
				if (data){
					return data.error ? data.error : '';
				}
				return "Can't connect to server"
			},
			getfullurl : function(url,param){
				return $vndssServices.get(url,param);
			},
			get : function(url,param){
				return $vndssServices.get(this.url(url),param);
			},
			post : function(url,param){
				return $vndssServices.post(this.url(url),param);
			},
			postpublic : function(url,param){
				return $vndssServices.post(url,param);
			},
			url : function (path){
				return this.setting.domain + path;
			},
			showError : function(msg){
				//return this.popupAlert(msg,"ERROR");
				return this.popupAlertConfig(msg,"Lỗi","button-assertive")
			},
			showMsg : function(msg){
				return this.popupAlert(msg,"Thông báo");
			},
			alert : function(msg,title){
				return  alert(msg,title);
			},
			log : function(msg){
				console.log(msg);
			},
			popupQuestion : function() {
				var confirmPopup = $ionicPopup.confirm({
					title: 'Thông báo',
					template: 'Bạn có chắc chắn muốn đăng xuất không?',
					cancelText: 'Không',
					okText: 'Có'
				});
				confirmPopup.then(function(res) {
					if(res) {
					} else {
					}
			   });
			},
			popupAlert : function(msg,title) {
				var alertPopup = $ionicPopup.alert({
					title: title,
					template: msg,
					okType: 'button-positive'
				});
				alertPopup.then(function(res) {
				});
			},
			popupError : function(msg,title) {
				var alertPopup = $ionicPopup.alert({
					title: title,
					template: msg,
					okType: 'button-assertive'
				});
				alertPopup.then(function(res) {
				});
			},
			popupAlertConfig : function(msg, title, buttonType) {
				var alertPopup = $ionicPopup.alert({
					title: title,
					template: msg,
					okType: buttonType
				});
				alertPopup.then(function(res) {
				});
			}
		}
		return vndssLogicCommon;
	}
]);