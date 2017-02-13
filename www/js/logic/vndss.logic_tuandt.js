angular.module('nt.logic', ['nt.services', 'ionic', 'ngCordova'])
.factory('$ntLogic', ['$ntServices', '$ionicPopup', '$cordovaFileTransfer',
	function($ntServices, $ionicPopup, $cordovaFileTransfer){
		var ntLogic = {
			setting : _nt_global_setting,
					
			/* Member Type */
			memberTypeList : function(){
				console.log('vao logic member Type list');
				var param = {};
				return this.get(
					'memberType/select',
					param);
			},
			
			/* Member */
			memberList : function(){
				var param = {};
				return this.get(
					'member/select',
					param);
			},
			memberByID : function(id){
				var param = {};
				return this.get(
					'member/select/id/' + id,
					param);
			},
			memberSuggestLocation : function(lat, lng, find){
				var param = {lat: lat, lng: lng};
				param.min = find.priceMin;
				param.max = find.priceMax;
				param.motelTypeID = find.motelTypeID;
				return this.get('motel/select/suggest/location',param);
			},
			memberCheckLogin : function(user, pass){
				return this.post('member/login/' + user + '/'+pass);
			},
			memberCreate : function(input){
				if(!input.memberID){
					return this.post('member/insert/' + input.name + '/'+ input.pass1 + '/'+ input.email + '/'+ input.phone + '/'+ input.memberTypeID);
				}else{
					return this.post('member/update/' + input.memberID + '/' + input.name + '/' + input.email + '/' + input.phone + '/' + input.memberTypeID);
				}
			},
			memberDelete : function(memberID){
				console.log("vao logic");
				return this.post('member/delete/' + memberID);
			},
			memberStatusChange : function(memberID, status){
				console.log('change staus');
				return this.post('member/update/status/' + memberID + '/' + status);
			},
			memberPassChange : function(memberID, pass){
				console.log('change pass');
				return this.post('member/update/pass/' + memberID + '/' + pass);
			},
			memberResetPass : function(user, email){
				return this.post('member/resetpass/' + user + '/' + email);
			},
			
			/* Motel Type */
			motelTypeList : function(){
				var param = {};
				return this.get(
					'motelType/select',
					param);
			},
			motelTypeListFulll : function(){
				var param = {};
				return this.get(
					'motelType/select/full',
					param);
			},
			motelTypeUpdate : function(input){
				var param = {};
				// insert motelTypeID = -1
				var link = this.formatString('motelType/updatefull/{0}/{1}/{2}/{3}',input.motelTypeID, input.name, input.status, input.description);
				return this.post(link);
			},
			motelTypeByID : function(motelTypeID){
				var param = {};
				return this.get('motelType/select/motelType/' + motelTypeID, param);
			},
			
			/* Motel */
			motelList : function(min, max, regionParentID, regionID, motelTypeID){
				var param = {};
				console.log(min);
				if(min){
					param = {
						min: min,
						max: max,
						regionParentID: regionParentID,
						regionID: regionID,
						motelTypeID: motelTypeID
					}
				}
				console.log(param);
				return this.get(
					'motel/select',
					param);
			},
			motelListGuest : function(min, max, regionParentID, regionID, motelTypeID){
				var param = {};
				console.log(min);
				if(min){
					param = {
						min: min,
						max: max,
						regionParentID: regionParentID,
						regionID: regionID,
						motelTypeID: motelTypeID
					}
				}
				console.log(param);
				return this.get(
					'motel/select/guest',
					param);
			},
			motelListMember : function(memberID, min, max, regionParentID, regionID, motelTypeID){
				var param = {};
				console.log(min);
				if(min) param.min = min;
				if(min) param.max = max;
				if(min) param.regionParentID = regionParentID;
				if(min) param.regionID = regionID;
				if(min) param.motelTypeID = motelTypeID;
				/* if(min){
					param = {
						min: min,
						max: max,
						regionParentID: regionParentID,
						regionID: regionID,
						motelTypeID: moteTyleID
					}
				} */
				console.log(param);
				return this.get(
					'motel/select/member/' + memberID,
					param);
			},
			motelByID : function(id){
				var param = {};
				return this.get(
					// 'motel/select/id/' + id,
					this.formatString('motel/select/id/{0}',id),
					param);
			},
			ImagesByMotelID : function(id){
				var param = {};
				return this.get(
					this.formatString('motel/select/images/{0}',id),
					param);
			},
			motelCreate : function(input){
				console.log('vao logic');
				console.dir(input);
				if(input.newID == -1){
					// Insert Motel
					console.log('vao insert motel');
					// var link = 'motel/insert/' + input.title + '/' + input.description + '/' + input.memberID + '/' + input.motelTypeID + '/' + input.contact + '/' + input.address + '/' + input.regionID + '/' + input.acreage + '/' + input.longitude + '/' + input.latitule + '/' + input.price + '/' + input.status + '/' + input.avatar + '/' + input.images;
					
					console.log(input.description);
					console.log('===========================');
					var re = /\//g
					console.log(input.description.replace(re, '-'));
					var link= this.formatString('motel/insert/{0}/{1}/{2}/{3}/{4}/{5}/{6}/{7}/{8}/{9}/{10}/{11}/{12}/{13}',input.title.replace(re,'-'), input.description.replace(re,'-'), input.memberID, input.motelTypeID, input.contact.replace(re,'-'), input.address.replace(re,'-'), input.regionID, input.acreage, input.longitude, input.latitule, input.price, input.status, input.avatar, JSON.stringify(input.images));
					
					return this.post(link);
				}else{
					// Update dư liệu
					var link= this.formatString('motel/update/{0}/{1}/{2}/{3}/{4}/{5}/{6}/{7}/{8}/{9}/{10}/{11}/{12}/{13}/{14}', input.newID,input.title.replace(re,'-'), input.description.replace(re,'-'), input.memberID, input.motelTypeID, input.contact.replace(re,'-'), input.address.replace(re,'-'), input.regionID, input.acreage, input.longitude, input.latitule, input.price, input.status, input.avatar, JSON.stringify(input.images));
					
					return this.post(link);
				}
			},
			motelStatusChange : function(motelID, status){
				return this.post('motel/update/' + motelID + '/' + status);
			},
			/* Region */
			regionListFull : function(){
				var param = {};
				return this.get(
					'region/select/full',
					param);
			},
			regionList : function(){
				var param = {};
				return this.get(
					'region/select',
					param);
			},
			regionListByType : function(type){
				var param = {};
				return this.get(
					'region/select/type/' + type,
					param);
			},
			regionByID : function(id){
				var param = {};
				return this.get(
					'region/select/id/' + id,
					param);
			},
			regionCreate : function(input){
				/* Ham vua update vua insert voi insert thi regionID khong ton tai */
				console.log("vao logic");
				console.log(input);
				if(input.regionID){
					return this.post('region/update/' + input.regionID + '/'+ input.name + '/'+ input.description + '/'+ input.regionTypeID + '/'+ input.regionParentID);
				}else{
					return this.post('region/insert/' + input.name + '/'+ input.description + '/'+ input.regionTypeID + '/'+ input.regionParentID);	
				}
			},
			regionStatusChange : function(regionID, status){
				console.log("vao logic");
				return this.post('region/update/' + regionID + '/' + status);
			},
			regionUpdate : function(input){
				console.log(input);
				return this.post('region/update/' + input.regionID + '/'+ input.name + '/'+ input.description + '/'+ input.regionTypeID + '/'+ input.regionParentID);
			},
			
			/* Upload Image */
			uploadBase64 : function(img, name){
				var param = {'img' : img, 'name': name};
				console.log(param);
				return this.get('common', param);
				//return this.post('common/' + name + '/' + img);
			},
			
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
			get : function(url,param){
				return $ntServices.get(this.url(url),param);
			},
			post : function(url,param){
				return $ntServices.post(this.url(url),param);
			},
			postParam : function(url,param){
				return $ntServices.postParam(this.url(url),param);
			},
			getHttpJsonp : function(url,param){
				return $ntServices.getHttpJsonp(this.url(url),param);
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
			popupAlertConfig : function(msg, title, buttonType) {
				var alertPopup = $ionicPopup.alert({
					title: title,
					template: msg,
					okType: buttonType
				});
				alertPopup.then(function(res) {
				});
			},
			formatString : function() {
				// The string containing the format items (e.g. "{0}")
				// will and always has to be the first argument.
				var theString = arguments[0];
				
				// start with the second argument (i = 1)
				for (var i = 1; i < arguments.length; i++) {
					// "gm" = RegEx options for Global search (more than one instance)
					// and for Multiline search
					var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
					theString = theString.replace(regEx, arguments[i]);
				}
			
				return theString;
			}
		}
		return ntLogic;
	}
]);