(function() {
  "use strict";

  angular
    .module("spa-demo.cities")
    .controller("spa-demo.cities.CitiesController", CitiesController);

  CitiesController.$inject = ["spa-demo.cities.City"];

  function CitiesController(City) {
      var vm = this;
      vm.cities;
			vm.city;
			vm.edit = edit;
      vm.create = create;
      vm.update = update;
      vm.remove = remove;
		
      activate();
		
			return;
 
      function activate() {
   			newCity();
        vm.cities = City.query();
      }
		
		  function newCity() {
        vm.city = new City();
      }
      function handleError(response) {
        console.log(response);
      } 
      function edit(object) {
        console.log("selected", object);
        vm.city = object;
      }
 			function create() {
			
        vm.city.$save()
        .then(function(response){
            //console.log(response);
            vm.cities.push(vm.city);
            newCity();
        })
        .catch(handleError);
      }
      function update() {
        vm.city.$update()
        .then(function(response){
            //console.log(response);
        })
        .catch(handleError);
      }
      function remove() {
        vm.city.$delete()
        .then(function(response){
            //console.log(response);
            removeElement(vm.cities, vm.city);
            newCity();
        })
        .catch(handleError);
      }

      function removeElement(elements, element) {
        for (var i=0; i<elements.length; i++) {
          if (elements[i].id == element.id) {
            elements.splice(i,1);
            break;
          }        
        } 
      }  
  

  }
})();