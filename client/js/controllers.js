myApp.controller('MyCtrl', ['$scope', '$sce', function($scope, $sce) {
    $scope.urlPath = ''

    $scope.goURL = function() {
	console.log('xxxxx')
	$scope.urlPath =  $sce.trustAsResourceUrl($scope.inputText)
//	$scope.inputText = ''
    }



}])
