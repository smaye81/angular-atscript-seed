System.register("app.ats", [], function() {
  "use strict";
  var __moduleName = "app.ats";
  var Router = System.get("router.ats").Router;
  var homeModule = System.get("modules/home/home.ats").homeModule;
  var appModule = angular.module("App", ["ui.router", homeModule.name]);
  appModule.config(Router);
  return {};
});

//# sourceMappingURL=<compileOutput>

System.register("router.ats", [], function() {
  "use strict";
  var __moduleName = "router.ats";
  function Router($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state('home', {
      url: "/home",
      templateUrl: "modules/home/home.html"
    }).state('details', {
      url: "/details",
      templateUrl: "modules/home/details.html"
    });
  }
  var Router = ['$stateProvider', '$urlRouterProvider', Router];
  return {get Router() {
      return Router;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("modules/home/calculator.ats", [], function() {
  "use strict";
  var __moduleName = "modules/home/calculator.ats";
  var assert = System.get("assert").assert;
  var Calculator = function Calculator() {};
  ($traceurRuntime.createClass)(Calculator, {
    sum: function(a, b) {
      assert.argumentTypes(a, $traceurRuntime.type.number, b, $traceurRuntime.type.number);
      return assert.returnType((a + b), $traceurRuntime.type.number);
    },
    difference: function(a, b) {
      assert.argumentTypes(a, $traceurRuntime.type.number, b, $traceurRuntime.type.number);
      return assert.returnType((a - b), $traceurRuntime.type.number);
    }
  }, {});
  Object.defineProperty(Calculator.prototype.sum, "parameters", {get: function() {
      return [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
    }});
  Object.defineProperty(Calculator.prototype.difference, "parameters", {get: function() {
      return [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
    }});
  return {get Calculator() {
      return Calculator;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("modules/home/home-component.ats", [], function() {
  "use strict";
  var __moduleName = "modules/home/home-component.ats";
  function HomeComponent(HomeService) {
    return {
      restrict: "E",
      templateUrl: "./modules/home/home-component.html",
      link: function(scope) {
        scope.sayHello = function() {
          HomeService.getGreeting(scope.name).then((function(greeting) {
            return scope.greeting = greeting;
          }));
        };
      }
    };
  }
  var HomeComponent = ['HomeService', HomeComponent];
  return {get HomeComponent() {
      return HomeComponent;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("modules/home/home-service.ats", [], function() {
  "use strict";
  var __moduleName = "modules/home/home-service.ats";
  var assert = System.get("assert").assert;
  function HomeService($q) {
    assert.argumentTypes(name, $traceurRuntime.type.string);
    this.getGreeting = function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "Noname McDefault";
      return $q((function(resolve) {
        return resolve("Hello, " + name + ".  Welcome to Angular in AtScript!!");
      }));
    };
  }
  var HomeService = ['$q', HomeService];
  return {get HomeService() {
      return HomeService;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("modules/home/home.ats", [], function() {
  "use strict";
  var __moduleName = "modules/home/home.ats";
  var homeModule = angular.module("Home", []);
  var HomeComponent = System.get("modules/home/home-component.ats").HomeComponent;
  var MathComponent = System.get("modules/home/math-component.ats").MathComponent;
  var HomeService = System.get("modules/home/home-service.ats").HomeService;
  homeModule.directive("homeComponent", HomeComponent);
  homeModule.directive("mathComponent", MathComponent);
  homeModule.service("HomeService", HomeService);
  return {get homeModule() {
      return homeModule;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("modules/home/math-component.ats", [], function() {
  "use strict";
  var __moduleName = "modules/home/math-component.ats";
  var Calculator = System.get("modules/home/calculator.ats").Calculator;
  function MathComponent() {
    return {
      restrict: "E",
      templateUrl: "modules/home/math-component.html",
      scope: {name: "="},
      link: function(scope) {
        var calculator = new Calculator();
        scope.calculate = function() {
          var aNumber;
          var bNumber;
          if (!isNaN(scope.a)) {
            aNumber = parseInt(scope.a, 10);
          }
          if (!isNaN(scope.b)) {
            bNumber = parseInt(scope.b, 10);
          }
          scope.sumResult = calculator.sum(aNumber, bNumber);
          scope.diffResult = calculator.difference(aNumber, bNumber);
        };
      }
    };
  }
  var MathComponent = [MathComponent];
  return {get MathComponent() {
      return MathComponent;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("assert", [], function() {
  "use strict";
  var __moduleName = "assert";
  var POSITION_NAME = ['', '1st', '2nd', '3rd'];
  function argPositionName(i) {
    var position = (i / 2) + 1;
    return POSITION_NAME[position] || (position + 'th');
  }
  var primitives = $traceurRuntime.type;
  function assertArgumentTypes() {
    for (var params = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      params[$__2] = arguments[$__2];
    var actual,
        type;
    var currentArgErrors;
    var errors = [];
    var msg;
    for (var i = 0,
        l = params.length; i < l; i = i + 2) {
      actual = params[i];
      type = params[i + 1];
      currentArgErrors = [];
      if (!isType(actual, type, currentArgErrors)) {
        errors.push(argPositionName(i) + ' argument has to be an instance of ' + prettyPrint(type) + ', got ' + prettyPrint(actual));
        if (currentArgErrors.length) {
          errors.push(currentArgErrors);
        }
      }
    }
    if (errors.length) {
      throw new Error('Invalid arguments given!\n' + formatErrors(errors));
    }
  }
  function prettyPrint(value) {
    if (typeof value === 'undefined') {
      return 'undefined';
    }
    if (typeof value === 'string') {
      return '"' + value + '"';
    }
    if (typeof value === 'boolean') {
      return value.toString();
    }
    if (value === null) {
      return 'null';
    }
    if (typeof value === 'object') {
      if (value.map) {
        return '[' + value.map(prettyPrint).join(', ') + ']';
      }
      var properties = Object.keys(value);
      return '{' + properties.map((function(p) {
        return p + ': ' + prettyPrint(value[p]);
      })).join(', ') + '}';
    }
    return value.__assertName || value.name || value.toString();
  }
  function isType(value, T, errors) {
    if (T === primitives.void) {
      return typeof value === 'undefined';
    }
    if (T === primitives.any || value === null) {
      return true;
    }
    if (T === primitives.string) {
      return typeof value === 'string';
    }
    if (T === primitives.number) {
      return typeof value === 'number';
    }
    if (T === primitives.boolean) {
      return typeof value === 'boolean';
    }
    if (typeof T.assert === 'function') {
      var parentStack = currentStack;
      var isValid;
      currentStack = errors;
      try {
        isValid = T.assert(value);
      } catch (e) {
        fail(e.message);
        isValid = false;
      }
      currentStack = parentStack;
      if (typeof isValid === 'undefined') {
        isValid = errors.length === 0;
      }
      return isValid;
    }
    return value instanceof T;
  }
  function formatErrors(errors) {
    var indent = arguments[1] !== (void 0) ? arguments[1] : '  ';
    return errors.map((function(e) {
      if (typeof e === 'string')
        return indent + '- ' + e;
      return formatErrors(e, indent + '  ');
    })).join('\n');
  }
  function type(actual, T) {
    var errors = [];
    if (!isType(actual, T, errors)) {
      var msg = 'Expected an instance of ' + prettyPrint(T) + ', got ' + prettyPrint(actual) + '!';
      if (errors.length) {
        msg += '\n' + formatErrors(errors);
      }
      throw new Error(msg);
    }
  }
  function returnType(actual, T) {
    var errors = [];
    if (!isType(actual, T, errors)) {
      var msg = 'Expected to return an instance of ' + prettyPrint(T) + ', got ' + prettyPrint(actual) + '!';
      if (errors.length) {
        msg += '\n' + formatErrors(errors);
      }
      throw new Error(msg);
    }
    return actual;
  }
  var string = define('string', function(value) {
    return typeof value === 'string';
  });
  var boolean = define('boolean', function(value) {
    return typeof value === 'boolean';
  });
  var number = define('number', function(value) {
    return typeof value === 'number';
  });
  function arrayOf() {
    for (var types = [],
        $__3 = 0; $__3 < arguments.length; $__3++)
      types[$__3] = arguments[$__3];
    return assert.define('array of ' + types.map(prettyPrint).join('/'), function(value) {
      var $__5;
      if (assert(value).is(Array)) {
        for (var $__0 = value[Symbol.iterator](),
            $__1; !($__1 = $__0.next()).done; ) {
          var item = $__1.value;
          {
            ($__5 = assert(item)).is.apply($__5, $traceurRuntime.spread(types));
          }
        }
      }
    });
  }
  function structure(definition) {
    var properties = Object.keys(definition);
    return assert.define('object with properties ' + properties.join(', '), function(value) {
      if (assert(value).is(Object)) {
        for (var $__0 = properties[Symbol.iterator](),
            $__1; !($__1 = $__0.next()).done; ) {
          var property = $__1.value;
          {
            assert(value[property]).is(definition[property]);
          }
        }
      }
    });
  }
  var currentStack = [];
  function fail(message) {
    currentStack.push(message);
  }
  function define(classOrName, check) {
    var cls = classOrName;
    if (typeof classOrName === 'string') {
      cls = function() {};
      cls.__assertName = classOrName;
    }
    cls.assert = function(value) {
      return check(value);
    };
    return cls;
  }
  function assert(value) {
    return {is: function is() {
        var $__5;
        for (var types = [],
            $__4 = 0; $__4 < arguments.length; $__4++)
          types[$__4] = arguments[$__4];
        var allErrors = [];
        var errors;
        for (var $__0 = types[Symbol.iterator](),
            $__1; !($__1 = $__0.next()).done; ) {
          var type = $__1.value;
          {
            errors = [];
            if (isType(value, type, errors)) {
              return true;
            }
            allErrors.push(prettyPrint(value) + ' is not instance of ' + prettyPrint(type));
            if (errors.length) {
              allErrors.push(errors);
            }
          }
        }
        ($__5 = currentStack).push.apply($__5, $traceurRuntime.spread(allErrors));
        return false;
      }};
  }
  assert.type = type;
  assert.argumentTypes = assertArgumentTypes;
  assert.returnType = returnType;
  assert.define = define;
  assert.fail = fail;
  assert.string = string;
  assert.number = number;
  assert.boolean = boolean;
  assert.arrayOf = arrayOf;
  assert.structure = structure;
  ;
  return {get assert() {
      return assert;
    }};
});

//# sourceMappingURL=<compileOutput>

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5hdHMiLCJyb3V0ZXIuYXRzIiwibW9kdWxlcy9ob21lL2NhbGN1bGF0b3IuYXRzIiwibW9kdWxlcy9ob21lL2hvbWUtY29tcG9uZW50LmF0cyIsIm1vZHVsZXMvaG9tZS9ob21lLXNlcnZpY2UuYXRzIiwibW9kdWxlcy9ob21lL2hvbWUuYXRzIiwibW9kdWxlcy9ob21lL21hdGgtY29tcG9uZW50LmF0cyIsImFzc2VydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxLQUFPLEVBQUMsTUFBSyxDQUFDLEtBQU8sYUFBVyxDQUFDO0FBQ2pDLEtBQU8sRUFBQyxVQUFTLENBQUMsS0FBTywwQkFBd0IsQ0FBQztBQUVsRCxBQUFJLEVBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxPQUFNLE9BQU8sQUFBQyxDQUFDLEtBQUksQ0FBRyxFQUFDLFdBQVUsQ0FBRyxDQUFBLFVBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUVyRSxRQUFRLE9BQU8sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBRXhCOzs7Ozs7OztBQ1BBLE9BQVMsT0FBSyxDQUFFLGNBQWEsQ0FBRyxDQUFBLGtCQUFpQixDQUFHO0FBR2hELG1CQUFpQixVQUFVLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUVyQyxlQUFhLE1BQ0osQUFBQyxDQUFDLE1BQUssQ0FBRztBQUNYLE1BQUUsQ0FBRyxRQUFNO0FBQ1gsY0FBVSxDQUFHLHlCQUF1QjtBQUFBLEVBQ3hDLENBQUMsTUFDSSxBQUFDLENBQUMsU0FBUSxDQUFHO0FBQ2QsTUFBRSxDQUFHLFdBQVM7QUFDZCxjQUFVLENBQUcsNEJBQTBCO0FBQUEsRUFDM0MsQ0FBQyxDQUFDO0FBQ1Y7QUFBQSxBQUVBLEtBQU8sQ0FBSSxHQUFBLENBQUEsTUFBSyxFQUFJLEVBQUMsZ0JBQWUsQ0FBRyxxQkFBbUIsQ0FBRyxPQUFLLENBQUMsQ0FBQztBQUFBOzs7Ozs7Ozs7O0FDaEJwRSxLQUFPLE1BQU0sV0FBUztBQUNsQixJQUFFLENBQUUsQ0FB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LG9CQUFrQixDQUFDO0FBQzFDLEtBQUssV0FBVyxFQUFJLFdBQVMsQ0FBQztBQUM5QixLQUFLLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDdEIsS0FBSyxLQUFLLEVBQUksS0FBRyxDQUFDO0FBQ2xCLEtBQUssT0FBTyxFQUFJLE9BQUssQ0FBQztBQUN0QixLQUFLLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDdEIsS0FBSyxRQUFRLEVBQUksUUFBTSxDQUFDO0FBQ3hCLEtBQUssUUFBUSxFQUFJLFFBQU0sQ0FBQztBQUN4QixLQUFLLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDNUIsS0FBTyxDQUFBLENBQUMsTUFBSyxDQUFDLENBQUM7QUFBQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlcn0gZnJvbSAncm91dGVyLmF0cyc7XG5pbXBvcnQge2hvbWVNb2R1bGV9IGZyb20gJy4vbW9kdWxlcy9ob21lL2hvbWUuYXRzJztcblxudmFyIGFwcE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiQXBwXCIsIFtcInVpLnJvdXRlclwiLCBob21lTW9kdWxlLm5hbWVdKTtcblxuYXBwTW9kdWxlLmNvbmZpZyhSb3V0ZXIpO1xuXG4iLCJmdW5jdGlvbiBSb3V0ZXIoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgLy8gRm9yIGFueSB1bm1hdGNoZWQgdXJsLCByZWRpcmVjdCB0byAvaG9tZVxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvaG9tZVwiKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogXCIvaG9tZVwiLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwibW9kdWxlcy9ob21lL2hvbWUuaHRtbFwiXG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnZGV0YWlscycsIHtcbiAgICAgICAgICAgIHVybDogXCIvZGV0YWlsc1wiLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwibW9kdWxlcy9ob21lL2RldGFpbHMuaHRtbFwiXG4gICAgICAgIH0pO1xufVxuXG5leHBvcnQgdmFyIFJvdXRlciA9IFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgUm91dGVyXTsiLCJleHBvcnQgY2xhc3MgQ2FsY3VsYXRvciB7XG4gICAgc3VtKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgIH1cblxuICAgIGRpZmZlcmVuY2UoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgfVxufVxuIiwiZnVuY3Rpb24gSG9tZUNvbXBvbmVudChIb21lU2VydmljZSkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3QgOiBcIkVcIixcbiAgICAgICAgdGVtcGxhdGVVcmwgOiBcIi4vbW9kdWxlcy9ob21lL2hvbWUtY29tcG9uZW50Lmh0bWxcIixcbiAgICAgICAgbGluayA6IGZ1bmN0aW9uIChzY29wZSkge1xuXG4gICAgICAgICAgICBzY29wZS5zYXlIZWxsbyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIC8vIE5vdGUgJ3RoaXMnIGZvciBncmVldGluZyBpcyBib3VuZCB0byB0aGlzIG9iamVjdCB1c2luZyBsZXhpY2FsIHNjb3BlXG4gICAgICAgICAgICAgICAgSG9tZVNlcnZpY2UuZ2V0R3JlZXRpbmcoc2NvcGUubmFtZSkudGhlbihncmVldGluZyA9PiBzY29wZS5ncmVldGluZyA9IGdyZWV0aW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB2YXIgSG9tZUNvbXBvbmVudCA9IFsnSG9tZVNlcnZpY2UnLCBIb21lQ29tcG9uZW50XTtcblxuIiwiZnVuY3Rpb24gSG9tZVNlcnZpY2UgKCRxKSB7XG5cbiAgICB0aGlzLmdldEdyZWV0aW5nID0gZnVuY3Rpb24gKG5hbWU6c3RyaW5nID0gXCJOb25hbWUgTWNEZWZhdWx0XCIpIHtcblxuICAgICAgICByZXR1cm4gJHEocmVzb2x2ZSA9PiByZXNvbHZlKFwiSGVsbG8sIFwiICsgbmFtZSArIFwiLiAgV2VsY29tZSB0byBBbmd1bGFyIGluIEF0U2NyaXB0ISFcIikpO1xuICAgIH07XG59XG5cbmV4cG9ydCB2YXIgSG9tZVNlcnZpY2UgPSBbJyRxJywgSG9tZVNlcnZpY2VdO1xuXG5cbiIsImV4cG9ydCB2YXIgaG9tZU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiSG9tZVwiLCBbXSk7XG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCB7SG9tZUNvbXBvbmVudH0gZnJvbSBcIi4vaG9tZS1jb21wb25lbnQuYXRzXCI7XG5pbXBvcnQge01hdGhDb21wb25lbnR9IGZyb20gXCIuL21hdGgtY29tcG9uZW50LmF0c1wiO1xuXG4vLyBTZXJ2aWNlc1xuaW1wb3J0IHtIb21lU2VydmljZX0gZnJvbSBcIi4vaG9tZS1zZXJ2aWNlLmF0c1wiO1xuXG5ob21lTW9kdWxlLmRpcmVjdGl2ZShcImhvbWVDb21wb25lbnRcIiwgSG9tZUNvbXBvbmVudCk7XG5ob21lTW9kdWxlLmRpcmVjdGl2ZShcIm1hdGhDb21wb25lbnRcIiwgTWF0aENvbXBvbmVudCk7XG5ob21lTW9kdWxlLnNlcnZpY2UoXCJIb21lU2VydmljZVwiLCBIb21lU2VydmljZSk7XG4iLCJpbXBvcnQge0NhbGN1bGF0b3J9IGZyb20gJy4vY2FsY3VsYXRvci5hdHMnO1xuXG5mdW5jdGlvbiBNYXRoQ29tcG9uZW50ICgpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0IDogXCJFXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsIDogXCJtb2R1bGVzL2hvbWUvbWF0aC1jb21wb25lbnQuaHRtbFwiLFxuICAgICAgICBzY29wZSA6IHtcbiAgICAgICAgICAgIG5hbWUgOiBcIj1cIlxuICAgICAgICB9LFxuICAgICAgICBsaW5rIDogZnVuY3Rpb24gKHNjb3BlKSB7XG5cbiAgICAgICAgICAgIHZhciBjYWxjdWxhdG9yID0gbmV3IENhbGN1bGF0b3IoKTtcblxuICAgICAgICAgICAgc2NvcGUuY2FsY3VsYXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFOdW1iZXI7XG4gICAgICAgICAgICAgICAgdmFyIGJOdW1iZXI7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihzY29wZS5hKSkge1xuICAgICAgICAgICAgICAgICAgICBhTnVtYmVyID0gcGFyc2VJbnQoc2NvcGUuYSwgMTApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oc2NvcGUuYikpIHtcbiAgICAgICAgICAgICAgICAgICAgYk51bWJlciA9IHBhcnNlSW50KHNjb3BlLmIsIDEwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzY29wZS5zdW1SZXN1bHQgPSBjYWxjdWxhdG9yLnN1bShhTnVtYmVyLCBiTnVtYmVyKTtcbiAgICAgICAgICAgICAgICBzY29wZS5kaWZmUmVzdWx0ID0gY2FsY3VsYXRvci5kaWZmZXJlbmNlKGFOdW1iZXIsIGJOdW1iZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHZhciBNYXRoQ29tcG9uZW50ID0gW01hdGhDb21wb25lbnRdOyIsInZhciBQT1NJVElPTl9OQU1FID0gWycnLCAnMXN0JywgJzJuZCcsICczcmQnXTtcbmZ1bmN0aW9uIGFyZ1Bvc2l0aW9uTmFtZShpKSB7XG4gIHZhciBwb3NpdGlvbiA9IChpIC8gMikgKyAxO1xuICByZXR1cm4gUE9TSVRJT05fTkFNRVtwb3NpdGlvbl0gfHwgKHBvc2l0aW9uICsgJ3RoJyk7XG59XG52YXIgcHJpbWl0aXZlcyA9ICR0cmFjZXVyUnVudGltZS50eXBlO1xuZnVuY3Rpb24gYXNzZXJ0QXJndW1lbnRUeXBlcyguLi5wYXJhbXMpIHtcbiAgdmFyIGFjdHVhbCxcbiAgICAgIHR5cGU7XG4gIHZhciBjdXJyZW50QXJnRXJyb3JzO1xuICB2YXIgZXJyb3JzID0gW107XG4gIHZhciBtc2c7XG4gIGZvciAodmFyIGkgPSAwLFxuICAgICAgbCA9IHBhcmFtcy5sZW5ndGg7IGkgPCBsOyBpID0gaSArIDIpIHtcbiAgICBhY3R1YWwgPSBwYXJhbXNbaV07XG4gICAgdHlwZSA9IHBhcmFtc1tpICsgMV07XG4gICAgY3VycmVudEFyZ0Vycm9ycyA9IFtdO1xuICAgIGlmICghaXNUeXBlKGFjdHVhbCwgdHlwZSwgY3VycmVudEFyZ0Vycm9ycykpIHtcbiAgICAgIGVycm9ycy5wdXNoKGFyZ1Bvc2l0aW9uTmFtZShpKSArICcgYXJndW1lbnQgaGFzIHRvIGJlIGFuIGluc3RhbmNlIG9mICcgKyBwcmV0dHlQcmludCh0eXBlKSArICcsIGdvdCAnICsgcHJldHR5UHJpbnQoYWN0dWFsKSk7XG4gICAgICBpZiAoY3VycmVudEFyZ0Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudEFyZ0Vycm9ycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cyBnaXZlbiFcXG4nICsgZm9ybWF0RXJyb3JzKGVycm9ycykpO1xuICB9XG59XG5mdW5jdGlvbiBwcmV0dHlQcmludCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnXCInICsgdmFsdWUgKyAnXCInO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnbnVsbCc7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAodmFsdWUubWFwKSB7XG4gICAgICByZXR1cm4gJ1snICsgdmFsdWUubWFwKHByZXR0eVByaW50KS5qb2luKCcsICcpICsgJ10nO1xuICAgIH1cbiAgICB2YXIgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICByZXR1cm4gJ3snICsgcHJvcGVydGllcy5tYXAoKHApID0+IHAgKyAnOiAnICsgcHJldHR5UHJpbnQodmFsdWVbcF0pKS5qb2luKCcsICcpICsgJ30nO1xuICB9XG4gIHJldHVybiB2YWx1ZS5fX2Fzc2VydE5hbWUgfHwgdmFsdWUubmFtZSB8fCB2YWx1ZS50b1N0cmluZygpO1xufVxuZnVuY3Rpb24gaXNUeXBlKHZhbHVlLCBULCBlcnJvcnMpIHtcbiAgaWYgKFQgPT09IHByaW1pdGl2ZXMudm9pZCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICB9XG4gIGlmIChUID09PSBwcmltaXRpdmVzLmFueSB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChUID09PSBwcmltaXRpdmVzLnN0cmluZykge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICB9XG4gIGlmIChUID09PSBwcmltaXRpdmVzLm51bWJlcikge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xuICB9XG4gIGlmIChUID09PSBwcmltaXRpdmVzLmJvb2xlYW4pIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG4gIH1cbiAgaWYgKHR5cGVvZiBULmFzc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBwYXJlbnRTdGFjayA9IGN1cnJlbnRTdGFjaztcbiAgICB2YXIgaXNWYWxpZDtcbiAgICBjdXJyZW50U3RhY2sgPSBlcnJvcnM7XG4gICAgdHJ5IHtcbiAgICAgIGlzVmFsaWQgPSBULmFzc2VydCh2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZmFpbChlLm1lc3NhZ2UpO1xuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICBjdXJyZW50U3RhY2sgPSBwYXJlbnRTdGFjaztcbiAgICBpZiAodHlwZW9mIGlzVmFsaWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpc1ZhbGlkID0gZXJyb3JzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWQ7XG4gIH1cbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVDtcbn1cbmZ1bmN0aW9uIGZvcm1hdEVycm9ycyhlcnJvcnMsIGluZGVudCA9ICcgICcpIHtcbiAgcmV0dXJuIGVycm9ycy5tYXAoKGUpID0+IHtcbiAgICBpZiAodHlwZW9mIGUgPT09ICdzdHJpbmcnKVxuICAgICAgcmV0dXJuIGluZGVudCArICctICcgKyBlO1xuICAgIHJldHVybiBmb3JtYXRFcnJvcnMoZSwgaW5kZW50ICsgJyAgJyk7XG4gIH0pLmpvaW4oJ1xcbicpO1xufVxuZnVuY3Rpb24gdHlwZShhY3R1YWwsIFQpIHtcbiAgdmFyIGVycm9ycyA9IFtdO1xuICBpZiAoIWlzVHlwZShhY3R1YWwsIFQsIGVycm9ycykpIHtcbiAgICB2YXIgbXNnID0gJ0V4cGVjdGVkIGFuIGluc3RhbmNlIG9mICcgKyBwcmV0dHlQcmludChUKSArICcsIGdvdCAnICsgcHJldHR5UHJpbnQoYWN0dWFsKSArICchJztcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgbXNnICs9ICdcXG4nICsgZm9ybWF0RXJyb3JzKGVycm9ycyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICB9XG59XG5mdW5jdGlvbiByZXR1cm5UeXBlKGFjdHVhbCwgVCkge1xuICB2YXIgZXJyb3JzID0gW107XG4gIGlmICghaXNUeXBlKGFjdHVhbCwgVCwgZXJyb3JzKSkge1xuICAgIHZhciBtc2cgPSAnRXhwZWN0ZWQgdG8gcmV0dXJuIGFuIGluc3RhbmNlIG9mICcgKyBwcmV0dHlQcmludChUKSArICcsIGdvdCAnICsgcHJldHR5UHJpbnQoYWN0dWFsKSArICchJztcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgbXNnICs9ICdcXG4nICsgZm9ybWF0RXJyb3JzKGVycm9ycyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICB9XG4gIHJldHVybiBhY3R1YWw7XG59XG52YXIgc3RyaW5nID0gZGVmaW5lKCdzdHJpbmcnLCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn0pO1xudmFyIGJvb2xlYW4gPSBkZWZpbmUoJ2Jvb2xlYW4nLCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG59KTtcbnZhciBudW1iZXIgPSBkZWZpbmUoJ251bWJlcicsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufSk7XG5mdW5jdGlvbiBhcnJheU9mKC4uLnR5cGVzKSB7XG4gIHJldHVybiBhc3NlcnQuZGVmaW5lKCdhcnJheSBvZiAnICsgdHlwZXMubWFwKHByZXR0eVByaW50KS5qb2luKCcvJyksIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKGFzc2VydCh2YWx1ZSkuaXMoQXJyYXkpKSB7XG4gICAgICBmb3IgKHZhciBpdGVtIG9mIHZhbHVlKSB7XG4gICAgICAgIGFzc2VydChpdGVtKS5pcyguLi50eXBlcyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHN0cnVjdHVyZShkZWZpbml0aW9uKSB7XG4gIHZhciBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoZGVmaW5pdGlvbik7XG4gIHJldHVybiBhc3NlcnQuZGVmaW5lKCdvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzICcgKyBwcm9wZXJ0aWVzLmpvaW4oJywgJyksIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKGFzc2VydCh2YWx1ZSkuaXMoT2JqZWN0KSkge1xuICAgICAgZm9yICh2YXIgcHJvcGVydHkgb2YgcHJvcGVydGllcykge1xuICAgICAgICBhc3NlcnQodmFsdWVbcHJvcGVydHldKS5pcyhkZWZpbml0aW9uW3Byb3BlcnR5XSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbnZhciBjdXJyZW50U3RhY2sgPSBbXTtcbmZ1bmN0aW9uIGZhaWwobWVzc2FnZSkge1xuICBjdXJyZW50U3RhY2sucHVzaChtZXNzYWdlKTtcbn1cbmZ1bmN0aW9uIGRlZmluZShjbGFzc09yTmFtZSwgY2hlY2spIHtcbiAgdmFyIGNscyA9IGNsYXNzT3JOYW1lO1xuICBpZiAodHlwZW9mIGNsYXNzT3JOYW1lID09PSAnc3RyaW5nJykge1xuICAgIGNscyA9IGZ1bmN0aW9uKCkge307XG4gICAgY2xzLl9fYXNzZXJ0TmFtZSA9IGNsYXNzT3JOYW1lO1xuICB9XG4gIGNscy5hc3NlcnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBjaGVjayh2YWx1ZSk7XG4gIH07XG4gIHJldHVybiBjbHM7XG59XG5mdW5jdGlvbiBhc3NlcnQodmFsdWUpIHtcbiAgcmV0dXJuIHtpczogZnVuY3Rpb24gaXMoLi4udHlwZXMpIHtcbiAgICAgIHZhciBhbGxFcnJvcnMgPSBbXTtcbiAgICAgIHZhciBlcnJvcnM7XG4gICAgICBmb3IgKHZhciB0eXBlIG9mIHR5cGVzKSB7XG4gICAgICAgIGVycm9ycyA9IFtdO1xuICAgICAgICBpZiAoaXNUeXBlKHZhbHVlLCB0eXBlLCBlcnJvcnMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYWxsRXJyb3JzLnB1c2gocHJldHR5UHJpbnQodmFsdWUpICsgJyBpcyBub3QgaW5zdGFuY2Ugb2YgJyArIHByZXR0eVByaW50KHR5cGUpKTtcbiAgICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICBhbGxFcnJvcnMucHVzaChlcnJvcnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjdXJyZW50U3RhY2sucHVzaCguLi5hbGxFcnJvcnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH19O1xufVxuYXNzZXJ0LnR5cGUgPSB0eXBlO1xuYXNzZXJ0LmFyZ3VtZW50VHlwZXMgPSBhc3NlcnRBcmd1bWVudFR5cGVzO1xuYXNzZXJ0LnJldHVyblR5cGUgPSByZXR1cm5UeXBlO1xuYXNzZXJ0LmRlZmluZSA9IGRlZmluZTtcbmFzc2VydC5mYWlsID0gZmFpbDtcbmFzc2VydC5zdHJpbmcgPSBzdHJpbmc7XG5hc3NlcnQubnVtYmVyID0gbnVtYmVyO1xuYXNzZXJ0LmJvb2xlYW4gPSBib29sZWFuO1xuYXNzZXJ0LmFycmF5T2YgPSBhcnJheU9mO1xuYXNzZXJ0LnN0cnVjdHVyZSA9IHN0cnVjdHVyZTtcbmV4cG9ydCB7YXNzZXJ0fTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==