 // 11:45 29/03/2016
 // HieuTM: Thư viện chung kết nối service
angular.module('vndss.services', ['ngResource', 'vndss.logic'])
.factory('$vndssServices', ['$http','$resource', '$ionicPopup',
	function($http,$resource, $ionicPopup){
		var popupAlertConfig = function(msg, title, buttonType) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: msg,
				okType: buttonType
			});
			alertPopup.then(function(res) {
			});
		}
		var showError = function(msg){
			//return this.popupAlert(msg,"ERROR");
			return popupAlertConfig(msg,"Lỗi","button-assertive")
		}
		var vndssServices = {
			
			get : function(url,p){
				return this.getHttp(url,p);
			},
			post : function (url,p){
				return this.postHttp(url,p);
			},
			getHttp : function (url,p){
				this.log('getHttp->url=' + url);
				p = this.httpData(p);
				var ret = $http.get(url,p);//for session
				console.log(JSON.stringify({'ret': ret}));
				ret.error(function(data, status, headers, config) {
					this.showError("Không thể kết nối với máy chủ"); 
				}.bind(this));
				return ret;
			},
			postHttp : function (url,p){
				this.log('getHttp->url=' + url);
				p = this.httpData(p);
				var ret = $http.post(url,p);//for session
				ret.error(function(data, status, headers, config) {
					// this.showError("Can't access to server: " + JSON.stringify(data)); 
					showError("Không thể kết nối với máy chủ");
				}.bind(this));
				return ret;
			},
			httpData : function(p){
				var param ;
				if (p){
					param = p;
				}else{
					param = new Object();
				}
				//param.callback = 'JSON_CALLBACK';
				var ret = {
					cache	: false,
					params    : param,
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
				}
				if (p){
					//ret.data = $.param(p);
				}
				return ret;
			},
			showError : function(msg){
				// return this.alert(msg,"ERROR");
				popupAlertConfig(msg,"Lỗi","button-assertive");
			},
			showMsg : function(msg){
				return this.alert(msg,"Message");
			},
			alert : function(msg,title){
				return  alert(msg,title);
			},
			log : function(msg){
				console.log(msg);
			}
		}
		return vndssServices;
	}
])
;