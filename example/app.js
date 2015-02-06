angular
  .module('NumericExample', ['purplefox.numeric'])

  .controller('NumericCtrl', function () {
    var vm = this;

    vm.value = 12.34;
  });