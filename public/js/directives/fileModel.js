beerApp.directive('fileModel', ['$parse', function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
        console.log('fileModel change');
				scope.$apply(function(){
          console.log('fileModel apply');
          console.log(scope);
          console.log(element[0].files[0]);
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);
