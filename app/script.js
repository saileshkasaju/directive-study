angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.user1 = {
        name: "Luke Skywalker",
        selected: false,
        address: {
            street: 'P O Box 123',
            city: 'Kathmandu',
            planet: 'Nepal'
        },
        friends: [
            'Han',
            'Liea',
            'Chewbecca'
        ],
        level: 0
    };
    $scope.user2 = {
        name: "Hans Solo",
        address: {
            street: 'P O Box 234',
            city: 'Patan',
            planet: 'Nepal'
        },
        friends: [
            'Han',
            'Liea',
            'Chewbecca'
        ],
        level: 1
    };
    $scope.messages = [];
    $scope.handlePause = function(e) {
        console.log(e);
        $scope.messages.push({text: 'paused!'});
        console.log('paused!');
    };
    $scope.data = {message: 'I have not been clicked'};
    $scope.clickHandler = function(p) {
        p.message = 'I have been clicked';
    };
    $scope.size = 150;
});

angular.module('app').directive('userInfoCard', function() {
    return {
        templateUrl: "userInfoCard.html",
        restrict: "E",
        scope: {
            user: '=person',
            initialCollapsed: '@collapsed'
        },
        link: function(scope, el, attrs) {
            scope.nextState = function() {
                scope.user.level++;
                scope.user.level = scope.user.level % 3;
                setState();
            };
            function setState() {
                switch(scope.user.level) {
                    case 0:
                        el.find('.panel-body').css('background-color', 'white');
                        break;
                    case 1:
                        el.find('.panel-body').css('background-color', 'yellow');
                        break;
                    case 2:
                        el.find('.panel-body').css('background-color', 'red');
                        break;
                }
            }
            setState();

        },
        controller: function($scope) {
            $scope.collapsed = ($scope.initialCollapsed === 'true');
            $scope.knightMe = function(user) {
                user.rank = "knight";
            };
            $scope.collapse = function() {
                $scope.collapsed = !$scope.collapsed;
            };
            $scope.removeFriend = function(friend) {
                var idx = $scope.user.friends.indexOf(friend);
                if(idx > -1) {
                    $scope.user.friends.splice(idx, 1);
                }
            }
        }
    }
});

angular.module('app').directive('removeFriend', function() {
    return {
        restrict: "E",
        templateUrl: "removeFriend.html",
        scope: {
            notifyParent: '&method'
        },
        controller: function($scope) {
            $scope.removing = false;
            $scope.startRemove = function() {
                $scope.removing = true;
            };
            $scope.cancelRemove = function() {
                $scope.removing = false;
            };
            $scope.confirmRemove = function() {
                $scope.notifyParent();
                //$scope.notifyParent({friend: 'Han'}); // this will override the parameter passed and always remove Han
            }
        }
    }
});
angular.module('app').directive('address', function() {
    return {
        restrict: "E",
        scope: true,
        templateUrl: "address.html",
        controller: function ($scope) {
            $scope.collapsed = false;
            $scope.collapseAddress = function() {
                $scope.collapsed = true;
            };
            $scope.expandAddress = function() {
                $scope.collapsed = false;
            };
        }
    }
});

angular.module('app').directive('spacebarSupport', function() {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $('body').on('keypress', function(evt) {
                var vidEl = el[0];
                if(evt.keyCode === 32) {
                    if(vidEl.paused) {
                        vidEl.play();
                    } else {
                        vidEl.pause();
                    }
                }
            })
        }
    }
});

angular.module('app').directive('eventPause', function($parse) {
    return {
        restrict: "A",
        link: function(scope, el, attrs) {
            el.on('pause', function(event) {
                var fn = $parse(attrs['eventPause']);
                scope.$apply(function() {
                    fn(scope, {evt: event});
                });
            });
        }
    };
});
angular.module('app').directive('myClick', function($parse) {
   return {
       link: function(scope, el, attrs) {
           var fn = $parse(attrs['myClick']);
           el.on('click', function() {
               scope.$apply(function() {
                   fn(scope);
               });
           });
       }
   };
});

angular.module('app').directive('userTile', function() {
    return {
        restrict: 'E',
        scope: {
            user: '='
        },
        templateUrl: 'userTile.html'
    }
});

angular.module('app').directive('userClickSelect', function() {
   return {
       link: function(scope, el, attrs) {
           el.on('click', function() {
               scope.user.selected = !scope.user.selected;
               scope.$apply();
           })
       }
   }
});

angular.module('app').directive('fontScale', function() {
    return {
        link: function(scope, el, attrs) {
            scope.$watch(attrs['fontScale'], function(newVal) {
                el.css('font-size', newVal + '%');
            })
        }
    }
})