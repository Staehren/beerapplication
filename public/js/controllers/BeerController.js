beerApp.controller('BeerController', ['$scope', '$http', 'multipartForm', function($scope, $http, multipartForm) {
  console.log("Loading BeerController");

  var refresh = function() {
    $http.get('/beerlist').success(function(response) {
      console.log("I got the data I requested");
      $scope.beerlist = response;
      $scope.newBeer = "";
      $scope.editBeer = "";
      $scope.showBeer = "";
    });
  };

  refresh();

  $scope.showbeer = function(id) {
    console.log(id);
    $scope.showNewBeer = false;
    $scope.showEditBeer = false;
    $scope.showShowBeer = true;
    $scope.popupOverlay = true;
    $http.get('/beerlist/' + id).success(function(response) {
      $scope.showBeer = response;
    });
  };

  $scope.addBeer = function() {
    console.log($scope.newBeer);
    $http.post('/beerlist', $scope.newBeer).success(function(response) {
      console.log(response);
      $scope.showNewBeer = false;
      $scope.showEditBeer = false;
      $scope.showShowBeer = false;
      $scope.popupOverlay = false;
      refresh();
    });
  };


  $scope.deleteBeer = function(id) {
    console.log(id);
    $http.delete('/beerlist/' + id).success(function(response) {
      $scope.showNewBeer = false;
      $scope.showEditBeer = false;
      $scope.showShowBeer = false;
      $scope.popupOverlay = false;
      refresh();
    });
  };

  $scope.editbeer = function(id) {
    console.log(id);
    $scope.showNewBeer = false;
    $scope.showEditBeer = true;
    $scope.showShowBeer = false;
    $scope.popupOverlay = true;
    $http.get('/beerlist/' + id).success(function(response) {
      $scope.editBeer = response;
    });
  };

  $scope.updateBeer = function() {
    console.log($scope.editBeer._id);
    $http.put('/beerlist/' + $scope.editBeer._id, $scope.editBeer).success(function(response) {
      $scope.showNewBeer = false;
      $scope.showEditBeer = false;
      $scope.showShowBeer = false;
      $scope.popupOverlay = false;
      refresh();
    });
  };

  $scope.submitbeer = function() {
    // $scope.newBeer = {};
    console.log("test");
    var uploadUrl = '/upload';
    console.log(uploadUrl);
    console.log($scope.newBeer);
    multipartForm.post(uploadUrl, $scope.newBeer);
  };


}]);
