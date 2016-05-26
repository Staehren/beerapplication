beerApp.service('multipartForm', ['$http', function($http) {
  console.log('multipartForm service');
  this.post = function(uploadUrl, data) {
    console.log('multipartForm inner');
    console.log(uploadUrl);
    console.log(data);
    var fd = new FormData();
    // fd.append('file', data.file);
    for(var key in data)
			fd.append(key, data[key]);
    console.log(fd);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    });

  };
}]);

/*
beerApp.service('multipartForm', ['$http', function($http){
	this.post = function(uploadUrl, data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		});
	};
}]);

*/
