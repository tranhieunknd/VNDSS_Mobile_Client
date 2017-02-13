// 13:55 29-03-2016 HieuTM: 
controllerGlobal.controller('HomeDefaultCtrl', function($scope, $rootScope, $state, $vndssLogicCommon, $vndssLogic_Hieutm) {
	$scope.graph = {};
	$scope.graph.data = [
		//Awake
		[16, 15, 20, 12, 16, 12, 8],
		//Asleep
		[8, 9, 4, 12, 8, 12, 14]
	];
	$scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	$scope.graph.series = ['Awake', 'Asleep'];
		
	
	$scope.data = {};
	$scope.clickService =  function(){
		var http = $vndssLogic_Hieutm.memberTypeList();
		
		if(http != null){
			http.success(function(data){
				console.log(data);
				var error = $vndssLogicCommon.parserError(data);
				if(!error){
					$scope.data = data;
				}
				else{
					$scope.error = error;
					return 1;
				}
			}.bind(this));
		}
	}
	
	$scope.showchart =  function(){
		$scope.angularChart = {
			data: [
				//Awake
				[16, 15, 20, 12, 16, 12, 8],
				//Asleep
				[8, 9, 4, 12, 8, 12, 14]
			],
			labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			series: ['Awake', 'Asleep'],
			legend: true
		};
	}
	
	$scope.addnotechart =  function(){
		$scope.angularChart.data[0].push(17);
		$scope.angularChart.data[1].push(10);
		$scope.angularChart.labels.push('abc');
	}
	
	$scope.changechart =  function(){
		$scope.angularChart.data[0][2] = 5;
	}
});