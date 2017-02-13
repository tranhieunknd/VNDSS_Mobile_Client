// 20/04/2016 ManhDV: 
controllerGlobal.controller('ViewCameraCtrl',
	function ($scope, $rootScope, $timeout, $interval, $state, $http, $ionicHistory, $location, $window, $vndssLogicCommon, $vndssLogic_Hieutm) {

		var interval = 1000;
		var arr = [];
		var arrtmp = [];
		var arrtlink = [];
		var arrcode = [];
		$scope.lakecurrent = {}; // Lưu thông tin hồ và mã camera được chọn.
		var urlservercamera = 'http://103.15.50.142:8032/GetJPEGFrame.aspx';
		var funInterval;
		$scope.disconectshow = false;
		$scope.data = {showbuttonconnect: true}; // Chứa thông tin dữ liệu trên page.
		$scope.input = { run: false};
		
		$scope.camera = [
			{
				index: 0,
				name: 'Đá Bàn',
				link_cam: [
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=cb89249157d99b9a1834ef2721ad612d-cc4f02ad8543da8b4667c193c2272053&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=d14dd82e41106df52a363c6b2af2ad7b-1d8183225e2b0b7a8ab1290f866f1637&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=b6af8c4d98a879cfaa2e59487ba90ea5-fd873498975e62e746fc8b5b20ee391d&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=1b4ae48145be48559f4ba572bf2ea03e-090c35ea992f244ec5cd951318830a03&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=c8cdf3296bf78ac704c2234491e57e32-04c6305ee658865951d62c9afdeafe5f&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=c861ef7e5219f78c24c6117dacde14ed-6ad6a60438ac91ab2bd2420515f74f1f&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=e9ea9b36227b8866c979c082f96594cf-3cc8a0b81afecaed33653c829b798b16&PAM=ABC&NoCache=1460650630389"
				],
				code_cam: [
					"cb89249157d99b9a1834ef2721ad612d-cc4f02ad8543da8b4667c193c2272053",
					"d14dd82e41106df52a363c6b2af2ad7b-1d8183225e2b0b7a8ab1290f866f1637",
					"b6af8c4d98a879cfaa2e59487ba90ea5-fd873498975e62e746fc8b5b20ee391d",
					"1b4ae48145be48559f4ba572bf2ea03e-090c35ea992f244ec5cd951318830a03",
					"c8cdf3296bf78ac704c2234491e57e32-04c6305ee658865951d62c9afdeafe5f",
					"c861ef7e5219f78c24c6117dacde14ed-6ad6a60438ac91ab2bd2420515f74f1f",
					"e9ea9b36227b8866c979c082f96594cf-3cc8a0b81afecaed33653c829b798b16"
				]
			},
			{
				index: 1,
				name: 'Dầu Tiếng',
				link_cam: [
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=6a763dfb521b9b07e4068496d62be8a3-2ab080a7dc212237153de44dc63c916d&PAM=ABC&NoCache=1460650630389"
				],
				code_cam: [
					"6a763dfb521b9b07e4068496d62be8a3-2ab080a7dc212237153de44dc63c916d"
				]
			},
			{
				index: 2,
				name: 'EaSoupThuong',
				link_cam: [
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=c2fa15fa33437c2cbad43c28b5684ae1-13f6b81046d2bd66a5698737bbb3d312&PAM=ABC&NoCache=1460650630389"
				],
				code_cam: [
					"c2fa15fa33437c2cbad43c28b5684ae1-13f6b81046d2bd66a5698737bbb3d312"
				]
			},
			{
				index: 3,
				name: 'Nước Trong',
				link_cam: [
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=ee120451aad9b761d9745dedddaa4250-ddf82983edb3c4edd140a25837005427&PAM=ABC&NoCache=1460652405417"
				],
				code_cam: [
					"ee120451aad9b761d9745dedddaa4250-ddf82983edb3c4edd140a25837005427"
				]
			},
			{
				index: 4,
				name: 'Sông Rác',
				link_cam: [
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=bd6c823605804cde5b94e67332e9adc7-037ac55f3ec923588d9c9386cf9a22f9&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=d71f4f116e075ae99e3bc44a38f828a9-7cd7cbd7880ebe873498cb52e7ae2f2c&PAM=ABC&NoCache=1460650630389"
				],
				code_cam: [
					"bd6c823605804cde5b94e67332e9adc7-037ac55f3ec923588d9c9386cf9a22f9",
					"d71f4f116e075ae99e3bc44a38f828a9-7cd7cbd7880ebe873498cb52e7ae2f2c"
				]
			},
			{
				index: 5,
				name: 'Tà Pao',
				link_cam: ["http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=806f12612d513fd7369ec00ee1b0be4a-e10b6370d9af8d092ad6237e4ce3a2b0&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=ee60d8725e25d1fc0c79b17d6da51f41-16959f72595535cb56b767e1428eeacf&PAM=ABC&NoCache=1460650630389"
				]
			},
			{
				index: 6,
				name: 'Văn Phong',
				link_cam: [
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=79e842e63336c3098df52dd593be3945-e83bcbe68e71b169f8cd9e2bee8c4311&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=5402e9ddc535148305bf9aed34ad5cb2-0768acff38762da7cd865d57ec4d3ef5&PAM=ABC&NoCache=1460650630389",
					"http://thuyloivietnam.vn:3737/GetJPEGFrame.aspx?req=950cbdf733b02c70d730551a0dd7a3d5-99f48708172f6ab276f2a100647799a2&PAM=ABC&NoCache=1460650630389"
				]
			},
		]

		var loadimgfull = function (iditem) {
			var image = document.getElementById(iditem);
			var downloadingImage = new Image();
			downloadingImage.onload = function () {
				// image.attr("src", this.src);
				image.setAttribute("src", this.src);
			};
			downloadingImage.onerror = function () {
				image.setAttribute("src", "http://thuyloivietnam.vn/Areas/CustomAsm/Views/Camera2/Rs/Default.jpg");
				// image.attr("src", "http://thuyloivietnam.vn/Areas/CustomAsm/Views/Camera2/Rs/Default.jpg");
			};
			
			var d = new Date();
			var n = d.getSeconds();
			downloadingImage.src = urlservercamera + '?req=' + iditem + '&PAM=ABC&NoCache=' + n;
		};
		
		$scope.initcamera = function () {
			// $scope.view = {};
			// $scope.view.arr = [];
			
			// lay du lieu danh sach camera tu server
			var http = $vndssLogic_Hieutm.ListCamera();
			http.success(function(xdata){	
				$scope.dataServer = xdata.data.datas;
				
				if($scope.dataServer != {}){
					console.log('vao check');
					$scope.data.selectlake = $scope.dataServer[0];
					$scope.lakecurrent = $scope.data.selectlake;
				}
				// $scope.data = {};
				// $scope.data.tmp = $scope.camera[1];
				// $scope.input = {};
				// $scope.input.run = false;

				$scope.data.width = $window.innerWidth; // Lấy kích thước màn hình.
				var nho = false;
			});
		}
		$scope.back = function () {
			//	$ionicHistory.goBack();
			$location.path('/tab/forecast');

		}
		$scope.connect = function () {
			// $scope.conectshow = false;
			// $scope.disconectshow = true;
			$scope.input.run = true;
			$scope.data.showbuttonconnect = false;
			$scope.thread_new_v2();
			// $scope.view.arr = [];
			// // $scope.thread();
			// for(i = 0; i < $scope.data.tmp.link_cam.length; i++){
				// $scope.thread_new(i);
			// }
		}
		$scope.backHome = function () {
			$location.path('/tab/forecast');
		}
		$scope.goMap = function () {
			$location.path('/apphome/map');
		}
		$scope.disconnect = function () {
			$scope.input.run = false;
			$scope.data.showbuttonconnect = true;
			if (angular.isDefined(funInterval)) {
				$interval.cancel(funInterval);
				funInterval = undefined;
			}
			// $scope.input.linkimg = "";
			// $scope.conectshow = true;
			// $scope.disconectshow = false;
		}
		$scope.changecbb = function(){
			// $scope.view.arr = $scope.data.tmp.link_cam;
			// arrtlink = $scope.data.tmp.link_cam;
			// arrcode = $scope.data.tmp.code_cam;
			// $scope.view.arr = [];
			
			// $scope.$apply(function () {
			$scope.lakecurrent = $scope.data.selectlake;
			// });
			$scope.disconnect();
		}
		$scope.thread = function () {
			if ($scope.input.run) {
				$timeout(function () {
					var itemtmp = $scope.camera[$scope.data.tmp.index];
					for (i = 0; i < itemtmp.link_cam.length; i++) {
						$scope.$apply(function () {
							var tam = itemtmp.link_cam[i] + '&date=' + new Date().getMinutes() + '-' + new Date().getSeconds();
							$scope.data.tmp.link_cam[i] = tam;
						});
					}
					nho = true;
					interval = 990;
					$scope.thread();
				}, interval);
			}
		}
		$scope.thread_new = function (indexsource) {
			if ($scope.input.run) {
				$timeout(function () {
					var tam = arrtlink[indexsource] + '&date=' + new Date().getMinutes() + '-' + new Date().getSeconds();
					$scope.view.arr[indexsource] = tam;
					nho = true;
					interval = 990;
					$scope.thread_new(indexsource);
					
				}, interval);
			}
		}
		$scope.thread_new_v2 = function() {
          // Don't start a new fight if we are already fighting
          if ( angular.isDefined(funInterval) ) return;

			funInterval = $interval(function() {
				if ($scope.input.run) {
					for(i = 0; i < $scope.lakecurrent.lstcamera.length; i++){
						loadimgfull($scope.lakecurrent.lstcamera[i].cameracode);
					}
				}else{
					if (angular.isDefined(funInterval)) {
						$interval.cancel(funInterval);
						funInterval = undefined;
					}
				}
			}, 700);
        };
		
		// $scope.thread_new_v2 = function () {
			
			// if ($scope.input.run) {
				// $timeout(function () {
					// var tam = arrtlink[indexsource] + '&date=' + new Date().getMinutes() + '-' + new Date().getSeconds();
					// $scope.view.arr[indexsource] = tam;
					// nho = true;
					// interval = 990;
					// $scope.thread_new(indexsource);
					
				// }, interval);
			// }
		// }
	});