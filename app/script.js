angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
    $scope.user1 = {
        name: "Luke Skywalker",
        address: {
            street: 'P O Box 123',
            city: 'Kathmandu',
            planet: 'Nepal'
        },
        friends: [
            'Han',
            'Liea',
            'Chewbecca'
        ]
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
        ]
    };
});

angular.module('app').directive('userInfoCard', function() {
    return {
        templateUrl: "userInfoCard.html",
        restrict: "E",
        scope: {
            user: '=person',
            initialCollapsed: '@collapsed'
        },
        controller: function($scope) {
            $scope.collapsed = ($scope.initialCollapsed === 'true');
            $scope.knightMe = function(user) {
                user.rank = "knight";
            };
            $scope.collapse = function () {
                $scope.collapsed = !$scope.collapsed;
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