'use strict';

describe('angular-numeric-directive', function () {
  var $compile, scope, inputEl, form;

  function setValue(val) {
    form.number.$setViewValue(val);
    scope.$digest();
  }

  function setupDirective(attrs) {
    attrs = attrs || '';

    var formEl = angular.element(
      '<form name="form">' +
      '  <input name="number" ng-model="model.number" numeric ' + attrs + '>' +
      '  <input name="min" ng-model="model.min">' +
      '  <input name="max" ng-model="model.max">' +
      '</form>');
    $compile(formEl)(scope);

    scope.$digest();

    form = scope.form;
    inputEl = formEl.find('input')
  }


  beforeEach(module('purplefox.numeric'));
  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_;
    scope = $rootScope.$new();
    scope.model = {};
  }));

  describe('when ngModel is undefined', function () {
    beforeEach(function () {
      setupDirective();
      setValue(undefined);
    });

    it('displays an empty string', function () {
      expect(inputEl.val()).toEqual('');
      expect(form.number.$valid).toBe(true);
    });
  });

  describe('when min = 0 (default)', function () {
    beforeEach(function () {
      setupDirective();
    });

    it('displays an empty string in the view by default', function () {
      expect(inputEl.val()).toEqual('');
    })

    it('accepts in-range values', function () {
      setValue('50.4');
      expect(scope.model.number).toEqual(50.4);
   });

    it('accepts decimals without a leading zero', function () {
      setValue('.5');
      expect(scope.model.number).toEqual(0.5);
    });

    it('rounds off to two decimal points', function () {
      setValue('41.999');
      expect(scope.model.number).toEqual(42);
    });

    it('disallows negative values', function () {
      setValue('-5');
      expect(inputEl.val()).toEqual('');
    });

    it('reverts to the last valid value on invalid char', function () {
      // A valid value is first entered
      setValue('50.4');

      // Then "a" is entered next
      setValue('50.4a');

      expect(scope.model.number).toEqual(50.4);
      expect(inputEl.val()).toEqual('50.4');
    });

    it('formats decimals on blur', function () {
      setValue('50');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('50.00');
    });

    it('formats thousands on blur', function () {
      setValue('1234');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('1,234.00');
    });

    it('removes format on focus', function () {
      setValue('1234.56');
      inputEl.triggerHandler('focus');
      expect(inputEl.val()).toEqual('1234.56');
    });
  });

  describe('when min < 0', function () {
    beforeEach(function () {
      setupDirective('min="-10"');
    });

    it('allows negative values', function () {
      setValue('-5.41');
      expect(scope.model.number).toEqual(-5.41);
      //expect(inputEl.val()).toEqual('-5.40');
    });

    it('clears the value', function () {
      setValue('-');
      //expect(scope.model.number).toEqual(-5.41);
      expect(inputEl.val()).toEqual('');
    });

    it('takes the min value', function () {
      setValue('-20');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('-10.00');
      expect(scope.model.number).toEqual(-10);
    });

    it('limits the input', function () {
      setupDirective('min="-20" max="100"');
      setValue('1000');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('100.00');
      expect(scope.model.number).toEqual(100.00);
    });
  });

  describe('when value < min', function () {
    it('takes the min value', function () {
      setupDirective('min="20"');
      setValue('10');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('20.00');
    });
  });

  describe('when value > max', function () {
    it('takes the max value', function () {
      setupDirective('max="100"');
      setValue('100.5');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('100.00');
    });
  });

  describe('when decimals = 0', function () {
    it('should round to int', function () {
      setupDirective('decimals="0"');
      setValue('42.01');
      expect(scope.model.number).toEqual(42);
    });
  });

  describe('when formatting = false', function () {
    it('should not format', function () {
      setupDirective('formatting="false"');
      setValue('1234.56');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('1234.56');
    });
  });

  describe('when value has no min', function () {
    it('takes the value', function () {
      setValue('-10');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('-10.00');
    });
  });

  describe('when min = 0', function () {
    it('does not accept minus', function () {
      setupDirective('min="0"');
      setValue('-10');
      inputEl.triggerHandler('blur');
      expect(inputEl.val()).toEqual('');
    });
  });
});