System.register("app.ats", [], function() {
  "use strict";
  var __moduleName = "app.ats";
  var Router = System.get("router.ats").Router;
  var homeModule = System.get("home/home.ats").homeModule;
  var Something = System.get("something.ats").Something;
  var appModule = angular.module("App", ["ui.router", homeModule.name]);
  appModule.config(Router);
  var s = new Something();
  console.log(s.sum(5, 5));
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
      controller: "HomeCtrl as homeCtrl",
      templateUrl: "modules/home/home.html"
    }).state('details', {
      url: "/details",
      controller: "DetailsCtrl as detailsCtrl",
      templateUrl: "modules/home/details.html"
    });
  }
  var Router = ['$stateProvider', '$urlRouterProvider', Router];
  return {get Router() {
      return Router;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("something.ats", [], function() {
  "use strict";
  var __moduleName = "something.ats";
  var assert = System.get("assert").assert;
  var Something = function Something() {};
  ($traceurRuntime.createClass)(Something, {sum: function(a, b) {
      assert.argumentTypes(a, $traceurRuntime.type.number, b, $traceurRuntime.type.number);
      return assert.returnType((a + b), $traceurRuntime.type.number);
    }}, {});
  Object.defineProperty(Something.prototype.sum, "parameters", {get: function() {
      return [[$traceurRuntime.type.number], [$traceurRuntime.type.number]];
    }});
  var Inject = function Inject() {};
  ($traceurRuntime.createClass)(Inject, {}, {});
  var Component = function Component($__2) {
    var string = $__2.selector;
    this.selector = selector;
  };
  ($traceurRuntime.createClass)(Component, {}, {});
  return {get Something() {
      return Something;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("home/home-controller.ats", [], function() {
  "use strict";
  var __moduleName = "home/home-controller.ats";
  function HomeController(HomeService) {
    this.HomeService = HomeService;
  }
  HomeController.prototype.sayHello = function() {
    var $__0 = this;
    this.HomeService.getGreeting(this.name).then((function(greeting) {
      return $__0.greeting = greeting;
    }));
  };
  var HomeController = ['HomeService', HomeController];
  return {get HomeController() {
      return HomeController;
    }};
});

//# sourceMappingURL=<compileOutput>

System.register("home/home-service.ats", [], function() {
  "use strict";
  var __moduleName = "home/home-service.ats";
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

System.register("home/home.ats", [], function() {
  "use strict";
  var __moduleName = "home/home.ats";
  var homeModule = angular.module("Home", []);
  var HomeController = System.get("home/home-controller.ats").HomeController;
  var HomeService = System.get("home/home-service.ats").HomeService;
  homeModule.controller("HomeCtrl", HomeController);
  homeModule.service("HomeService", HomeService);
  return {get homeModule() {
      return homeModule;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5hdHMiLCJyb3V0ZXIuYXRzIiwic29tZXRoaW5nLmF0cyIsImhvbWUvaG9tZS1jb250cm9sbGVyLmF0cyIsImhvbWUvaG9tZS1zZXJ2aWNlLmF0cyIsImhvbWUvaG9tZS5hdHMiLCJhc3NlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBTyxFQUFDLE1BQUssQ0FBQyxLQUFPLGFBQVcsQ0FBQztBQUNqQyxLQUFPLEVBQUMsVUFBUyxDQUFDLEtBQU8sZ0JBQWMsQ0FBQztBQUN4QyxLQUFPLEVBQUMsU0FBUSxDQUFDLEtBQU8sZ0JBQWMsQ0FBQztBQUV2QyxBQUFJLEVBQUEsQ0FBQSxTQUFRLEVBQUksQ0FBQSxPQUFNLE9BQU8sQUFBQyxDQUFDLEtBQUksQ0FBRyxFQUFDLFdBQVUsQ0FBRyxDQUFBLFVBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUVyRSxRQUFRLE9BQU8sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBRXhCLEFBQUksRUFBQSxDQUFBLENBQUEsRUFBSSxJQUFJLFVBQVEsQUFBQyxFQUFDLENBQUM7QUFDdkIsTUFBTSxJQUFJLEFBQUMsQ0FBQyxDQUFBLElBQUksQUFBQyxDQUFDLENBQUEsQ0FBRyxFQUFBLENBQUMsQ0FBQyxDQUFDO0FBQ3hCOzs7Ozs7OztBQ1ZBLE9BQVMsT0FBSyxDQUFFLGNBQWEsQ0FBRyxDQUFBLGtCQUFpQixDQUFHO0FBR2hELG1CQUFpQixVQUFVLEFBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztBQUVyQyxlQUFhLE1BQ0osQUFBQyxDQUFDLE1BQUssQ0FBRztBQUNYLE1BQUUsQ0FBRyxRQUFNO0FBQ1gsYUFBUyxDQUFJLHVCQUFxQjtBQUNsQyxjQUFVLENBQUcseUJBQXVCO0FBQUEsRUFDeEMsQ0FBQyxNQUNJLEFBQUMsQ0FBQyxTQUFRLENBQUc7QUFDZCxNQUFFLENBQUcsV0FBUztBQUNkLGFBQVMsQ0FBSSw2QkFBMkI7QUFDeEMsY0FBVSxDQUFHLDRCQUEwQjtBQUFBLEVBQzNDLENBQUMs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LEtBQUssS0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNsQixLQUFLLGNBQWMsRUFBSSxvQkFBa0IsQ0FBQztBQUMxQyxLQUFLLFdBQVcsRUFBSSxXQUFTLENBQUM7QUFDOUIsS0FBSyxPQUFPLEVBQUksT0FBSyxDQUFDO0FBQ3RCLEtBQUssS0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNsQixLQUFLLE9BQU8sRUFBSSxPQUFLLENBQUM7QUFDdEIsS0FBSyxPQUFPLEVBQUksT0FBSyxDQUFDO0FBQ3RCLEtBQUssUUFBUSxFQUFJLFFBQU0sQ0FBQztBQUN4QixLQUFLLFFBQVEsRUFBSSxRQUFNLENBQUM7QUFDeEIsS0FBSyxVQUFVLEVBQUksVUFBUSxDQUFDO0FBQzVCLEtBQU8sQ0FBQSxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBQUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ3JvdXRlci5hdHMnO1xuaW1wb3J0IHtob21lTW9kdWxlfSBmcm9tICdob21lL2hvbWUuYXRzJztcbmltcG9ydCB7U29tZXRoaW5nfSBmcm9tICdzb21ldGhpbmcuYXRzJztcblxudmFyIGFwcE1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiQXBwXCIsIFtcInVpLnJvdXRlclwiLCBob21lTW9kdWxlLm5hbWVdKTtcblxuYXBwTW9kdWxlLmNvbmZpZyhSb3V0ZXIpO1xuXG52YXIgcyA9IG5ldyBTb21ldGhpbmcoKTtcbmNvbnNvbGUubG9nKHMuc3VtKDUsIDUpKTtcbiIsImZ1bmN0aW9uIFJvdXRlcigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAvLyBGb3IgYW55IHVubWF0Y2hlZCB1cmwsIHJlZGlyZWN0IHRvIC9ob21lXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9ob21lXCIpO1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiBcIi9ob21lXCIsXG4gICAgICAgICAgICBjb250cm9sbGVyIDogXCJIb21lQ3RybCBhcyBob21lQ3RybFwiLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwibW9kdWxlcy9ob21lL2hvbWUuaHRtbFwiXG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnZGV0YWlscycsIHtcbiAgICAgICAgICAgIHVybDogXCIvZGV0YWlsc1wiLFxuICAgICAgICAgICAgY29udHJvbGxlciA6IFwiRGV0YWlsc0N0cmwgYXMgZGV0YWlsc0N0cmxcIixcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIm1vZHVsZXMvaG9tZS9kZXRhaWxzLmh0bWxcIlxuICAgICAgICB9KTtcbn1cblxuZXhwb3J0IHZhciBSb3V0ZXIgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsIFJvdXRlcl07IiwiZXhwb3J0IGNsYXNzIFNvbWV0aGluZyB7XG4gICAgc3VtKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgIH1cbn1cblxuY2xhc3MgSW5qZWN0IHt9XG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHtzZWxlY3RvcjpzdHJpbmd9KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB9XG59XG4iLCJmdW5jdGlvbiBIb21lQ29udHJvbGxlcihIb21lU2VydmljZSkge1xuXG4gICAgdGhpcy5Ib21lU2VydmljZSA9IEhvbWVTZXJ2aWNlO1xufVxuXG5Ib21lQ29udHJvbGxlci5wcm90b3R5cGUuc2F5SGVsbG8gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBOb3RlICd0aGlzJyBmb3IgZ3JlZXRpbmcgaXMgYm91bmQgdG8gdGhpcyBvYmplY3QgdXNpbmcgbGV4aWNhbCBzY29wZVxuICAgIHRoaXMuSG9tZVNlcnZpY2UuZ2V0R3JlZXRpbmcodGhpcy5uYW1lKS50aGVuKGdyZWV0aW5nID0+IHRoaXMuZ3JlZXRpbmcgPSBncmVldGluZyk7XG59O1xuXG5leHBvcnQgdmFyIEhvbWVDb250cm9sbGVyID0gWydIb21lU2VydmljZScsIEhvbWVDb250cm9sbGVyXTsiLCJmdW5jdGlvbiBIb21lU2VydmljZSAoJHEpIHtcblxuICAgIHRoaXMuZ2V0R3JlZXRpbmcgPSBmdW5jdGlvbiAobmFtZTpzdHJpbmcgPSBcIk5vbmFtZSBNY0RlZmF1bHRcIikge1xuXG4gICAgICAgIHJldHVybiAkcShyZXNvbHZlID0+IHJlc29sdmUoXCJIZWxsbywgXCIgKyBuYW1lICsgXCIuICBXZWxjb21lIHRvIEFuZ3VsYXIgaW4gQXRTY3JpcHQhIVwiKSk7XG4gICAgfTtcbn1cblxuZXhwb3J0IHZhciBIb21lU2VydmljZSA9IFsnJHEnLCBIb21lU2VydmljZV07XG5cblxuIiwiZXhwb3J0IHZhciBob21lTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJIb21lXCIsIFtdKTtcblxuaW1wb3J0IHtIb21lQ29udHJvbGxlcn0gZnJvbSBcImhvbWUvaG9tZS1jb250cm9sbGVyLmF0c1wiO1xuaW1wb3J0IHtIb21lU2VydmljZX0gZnJvbSBcImhvbWUvaG9tZS1zZXJ2aWNlLmF0c1wiO1xuXG5ob21lTW9kdWxlLmNvbnRyb2xsZXIoXCJIb21lQ3RybFwiLCBIb21lQ29udHJvbGxlcik7XG5ob21lTW9kdWxlLnNlcnZpY2UoXCJIb21lU2VydmljZVwiLCBIb21lU2VydmljZSk7XG4iLCJ2YXIgUE9TSVRJT05fTkFNRSA9IFsnJywgJzFzdCcsICcybmQnLCAnM3JkJ107XG5mdW5jdGlvbiBhcmdQb3NpdGlvbk5hbWUoaSkge1xuICB2YXIgcG9zaXRpb24gPSAoaSAvIDIpICsgMTtcbiAgcmV0dXJuIFBPU0lUSU9OX05BTUVbcG9zaXRpb25dIHx8IChwb3NpdGlvbiArICd0aCcpO1xufVxudmFyIHByaW1pdGl2ZXMgPSAkdHJhY2V1clJ1bnRpbWUudHlwZTtcbmZ1bmN0aW9uIGFzc2VydEFyZ3VtZW50VHlwZXMoLi4ucGFyYW1zKSB7XG4gIHZhciBhY3R1YWwsXG4gICAgICB0eXBlO1xuICB2YXIgY3VycmVudEFyZ0Vycm9ycztcbiAgdmFyIGVycm9ycyA9IFtdO1xuICB2YXIgbXNnO1xuICBmb3IgKHZhciBpID0gMCxcbiAgICAgIGwgPSBwYXJhbXMubGVuZ3RoOyBpIDwgbDsgaSA9IGkgKyAyKSB7XG4gICAgYWN0dWFsID0gcGFyYW1zW2ldO1xuICAgIHR5cGUgPSBwYXJhbXNbaSArIDFdO1xuICAgIGN1cnJlbnRBcmdFcnJvcnMgPSBbXTtcbiAgICBpZiAoIWlzVHlwZShhY3R1YWwsIHR5cGUsIGN1cnJlbnRBcmdFcnJvcnMpKSB7XG4gICAgICBlcnJvcnMucHVzaChhcmdQb3NpdGlvbk5hbWUoaSkgKyAnIGFyZ3VtZW50IGhhcyB0byBiZSBhbiBpbnN0YW5jZSBvZiAnICsgcHJldHR5UHJpbnQodHlwZSkgKyAnLCBnb3QgJyArIHByZXR0eVByaW50KGFjdHVhbCkpO1xuICAgICAgaWYgKGN1cnJlbnRBcmdFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRBcmdFcnJvcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMgZ2l2ZW4hXFxuJyArIGZvcm1hdEVycm9ycyhlcnJvcnMpKTtcbiAgfVxufVxuZnVuY3Rpb24gcHJldHR5UHJpbnQodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJ1wiJyArIHZhbHVlICsgJ1wiJztcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHZhbHVlLm1hcCkge1xuICAgICAgcmV0dXJuICdbJyArIHZhbHVlLm1hcChwcmV0dHlQcmludCkuam9pbignLCAnKSArICddJztcbiAgICB9XG4gICAgdmFyIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgcmV0dXJuICd7JyArIHByb3BlcnRpZXMubWFwKChwKSA9PiBwICsgJzogJyArIHByZXR0eVByaW50KHZhbHVlW3BdKSkuam9pbignLCAnKSArICd9JztcbiAgfVxuICByZXR1cm4gdmFsdWUuX19hc3NlcnROYW1lIHx8IHZhbHVlLm5hbWUgfHwgdmFsdWUudG9TdHJpbmcoKTtcbn1cbmZ1bmN0aW9uIGlzVHlwZSh2YWx1ZSwgVCwgZXJyb3JzKSB7XG4gIGlmIChUID09PSBwcmltaXRpdmVzLnZvaWQpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbiAgfVxuICBpZiAoVCA9PT0gcHJpbWl0aXZlcy5hbnkgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoVCA9PT0gcHJpbWl0aXZlcy5zdHJpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgfVxuICBpZiAoVCA9PT0gcHJpbWl0aXZlcy5udW1iZXIpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgfVxuICBpZiAoVCA9PT0gcHJpbWl0aXZlcy5ib29sZWFuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xuICB9XG4gIGlmICh0eXBlb2YgVC5hc3NlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgcGFyZW50U3RhY2sgPSBjdXJyZW50U3RhY2s7XG4gICAgdmFyIGlzVmFsaWQ7XG4gICAgY3VycmVudFN0YWNrID0gZXJyb3JzO1xuICAgIHRyeSB7XG4gICAgICBpc1ZhbGlkID0gVC5hc3NlcnQodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGZhaWwoZS5tZXNzYWdlKTtcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgY3VycmVudFN0YWNrID0gcGFyZW50U3RhY2s7XG4gICAgaWYgKHR5cGVvZiBpc1ZhbGlkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaXNWYWxpZCA9IGVycm9ycy5sZW5ndGggPT09IDA7XG4gICAgfVxuICAgIHJldHVybiBpc1ZhbGlkO1xuICB9XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFQ7XG59XG5mdW5jdGlvbiBmb3JtYXRFcnJvcnMoZXJyb3JzLCBpbmRlbnQgPSAnICAnKSB7XG4gIHJldHVybiBlcnJvcnMubWFwKChlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJylcbiAgICAgIHJldHVybiBpbmRlbnQgKyAnLSAnICsgZTtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3JzKGUsIGluZGVudCArICcgICcpO1xuICB9KS5qb2luKCdcXG4nKTtcbn1cbmZ1bmN0aW9uIHR5cGUoYWN0dWFsLCBUKSB7XG4gIHZhciBlcnJvcnMgPSBbXTtcbiAgaWYgKCFpc1R5cGUoYWN0dWFsLCBULCBlcnJvcnMpKSB7XG4gICAgdmFyIG1zZyA9ICdFeHBlY3RlZCBhbiBpbnN0YW5jZSBvZiAnICsgcHJldHR5UHJpbnQoVCkgKyAnLCBnb3QgJyArIHByZXR0eVByaW50KGFjdHVhbCkgKyAnISc7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIG1zZyArPSAnXFxuJyArIGZvcm1hdEVycm9ycyhlcnJvcnMpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgfVxufVxuZnVuY3Rpb24gcmV0dXJuVHlwZShhY3R1YWwsIFQpIHtcbiAgdmFyIGVycm9ycyA9IFtdO1xuICBpZiAoIWlzVHlwZShhY3R1YWwsIFQsIGVycm9ycykpIHtcbiAgICB2YXIgbXNnID0gJ0V4cGVjdGVkIHRvIHJldHVybiBhbiBpbnN0YW5jZSBvZiAnICsgcHJldHR5UHJpbnQoVCkgKyAnLCBnb3QgJyArIHByZXR0eVByaW50KGFjdHVhbCkgKyAnISc7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIG1zZyArPSAnXFxuJyArIGZvcm1hdEVycm9ycyhlcnJvcnMpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgfVxuICByZXR1cm4gYWN0dWFsO1xufVxudmFyIHN0cmluZyA9IGRlZmluZSgnc3RyaW5nJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59KTtcbnZhciBib29sZWFuID0gZGVmaW5lKCdib29sZWFuJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xufSk7XG52YXIgbnVtYmVyID0gZGVmaW5lKCdudW1iZXInLCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbn0pO1xuZnVuY3Rpb24gYXJyYXlPZiguLi50eXBlcykge1xuICByZXR1cm4gYXNzZXJ0LmRlZmluZSgnYXJyYXkgb2YgJyArIHR5cGVzLm1hcChwcmV0dHlQcmludCkuam9pbignLycpLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmIChhc3NlcnQodmFsdWUpLmlzKEFycmF5KSkge1xuICAgICAgZm9yICh2YXIgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICBhc3NlcnQoaXRlbSkuaXMoLi4udHlwZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBzdHJ1Y3R1cmUoZGVmaW5pdGlvbikge1xuICB2YXIgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGRlZmluaXRpb24pO1xuICByZXR1cm4gYXNzZXJ0LmRlZmluZSgnb2JqZWN0IHdpdGggcHJvcGVydGllcyAnICsgcHJvcGVydGllcy5qb2luKCcsICcpLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmIChhc3NlcnQodmFsdWUpLmlzKE9iamVjdCkpIHtcbiAgICAgIGZvciAodmFyIHByb3BlcnR5IG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXNzZXJ0KHZhbHVlW3Byb3BlcnR5XSkuaXMoZGVmaW5pdGlvbltwcm9wZXJ0eV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG52YXIgY3VycmVudFN0YWNrID0gW107XG5mdW5jdGlvbiBmYWlsKG1lc3NhZ2UpIHtcbiAgY3VycmVudFN0YWNrLnB1c2gobWVzc2FnZSk7XG59XG5mdW5jdGlvbiBkZWZpbmUoY2xhc3NPck5hbWUsIGNoZWNrKSB7XG4gIHZhciBjbHMgPSBjbGFzc09yTmFtZTtcbiAgaWYgKHR5cGVvZiBjbGFzc09yTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICBjbHMgPSBmdW5jdGlvbigpIHt9O1xuICAgIGNscy5fX2Fzc2VydE5hbWUgPSBjbGFzc09yTmFtZTtcbiAgfVxuICBjbHMuYXNzZXJ0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gY2hlY2sodmFsdWUpO1xuICB9O1xuICByZXR1cm4gY2xzO1xufVxuZnVuY3Rpb24gYXNzZXJ0KHZhbHVlKSB7XG4gIHJldHVybiB7aXM6IGZ1bmN0aW9uIGlzKC4uLnR5cGVzKSB7XG4gICAgICB2YXIgYWxsRXJyb3JzID0gW107XG4gICAgICB2YXIgZXJyb3JzO1xuICAgICAgZm9yICh2YXIgdHlwZSBvZiB0eXBlcykge1xuICAgICAgICBlcnJvcnMgPSBbXTtcbiAgICAgICAgaWYgKGlzVHlwZSh2YWx1ZSwgdHlwZSwgZXJyb3JzKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGFsbEVycm9ycy5wdXNoKHByZXR0eVByaW50KHZhbHVlKSArICcgaXMgbm90IGluc3RhbmNlIG9mICcgKyBwcmV0dHlQcmludCh0eXBlKSk7XG4gICAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgYWxsRXJyb3JzLnB1c2goZXJyb3JzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3VycmVudFN0YWNrLnB1c2goLi4uYWxsRXJyb3JzKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9fTtcbn1cbmFzc2VydC50eXBlID0gdHlwZTtcbmFzc2VydC5hcmd1bWVudFR5cGVzID0gYXNzZXJ0QXJndW1lbnRUeXBlcztcbmFzc2VydC5yZXR1cm5UeXBlID0gcmV0dXJuVHlwZTtcbmFzc2VydC5kZWZpbmUgPSBkZWZpbmU7XG5hc3NlcnQuZmFpbCA9IGZhaWw7XG5hc3NlcnQuc3RyaW5nID0gc3RyaW5nO1xuYXNzZXJ0Lm51bWJlciA9IG51bWJlcjtcbmFzc2VydC5ib29sZWFuID0gYm9vbGVhbjtcbmFzc2VydC5hcnJheU9mID0gYXJyYXlPZjtcbmFzc2VydC5zdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmU7XG5leHBvcnQge2Fzc2VydH07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=