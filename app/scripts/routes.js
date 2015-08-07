define(
  ['app'],
  function (app)
  {
    'use strict';

    app.config(
      [
        '$locationProvider', '$routeProvider', '$httpProvider', '$provide',
        function ($locationProvider, $routeProvider, $httpProvider, $provide)
        {
          $provide
            .decorator(
            "$exceptionHandler",
            [
              "$delegate",
              function($delegate)
              {
                return function (exception, cause)
                {
                  trackGa('send', 'exception', {
                    exDescription: exception.message,
                    exFatal: false,
                    exStack: exception.stack
                  });

                  $delegate(exception, cause);
                };
              }
            ]
          );

          //Chrome Ipad solution in case of using $location.hash()
          $provide
            .decorator(
            '$browser',
            [
              '$delegate',
              function($delegate)
              {
                var originalUrl = $delegate.url;
                $delegate.url = function() {
                  var result = originalUrl.apply(this, arguments);
                  if (result && result.replace) {
                    result = result.replace(/%23/g, '#');
                  }
                  return result;
                };
                return $delegate;
              }
            ]
          );

          $routeProvider
            .when(
            '/login',
            {
              templateUrl: 'views/login.html',
              controller: 'login'
            })

            .when(
            '/logout',
            {
              templateUrl: 'views/logout.html',
              resolve: {
                data: [
                  '$rootScope',
                  function ($rootScope)
                  {
                    trackGa('send', 'event', 'Logout', 'User logout', 'team uuid ' + $rootScope.app.resources.teamUuids[0]);
                    $rootScope.logout();
                  }
                ]
              }
            })

            .when(
            '/tasks',
            {
              templateUrl: 'views/tasks.html',
              controller: 'tasksCtrl'
            })

            .when(
            '/tasks2',
            {
              templateUrl: 'views/tasks2.html',
              controller: 'tasks2Ctrl'
            })

            .when('/admin', {
              templateUrl: 'views/admin.html',
              controller: 'adminCtrl'
            })

            .when('/scenarios', {
              templateUrl: 'views/scenarios.html',
              controller: 'adminCtrl'
            })

            .when(
            '/team/',
            {
              templateUrl: 'views/teams.html',
              controller: 'teamCtrl',
              reloadOnSearch: false,
              resolve: {
                data: [
                  'Teams', '$route', '$q',
                  function (Teams, $route, $q)
                  {
                    var teamId = Teams.checkExistence($route.current.params.uuid);

                    return $q.all([Teams.getSingle(teamId), Teams.getAllLocal()])
                      .then(function(teamsData)
                      {
                        return {
                          members: teamsData[0],
                          teams: teamsData[1],
                          teamId: teamId
                        };
                      });
                  }
                ]
              }
            })

            .when(
            '/client',
            {
              templateUrl: 'views/clients.html',
              controller: 'clientCtrl',
              reloadOnSearch: false,
              resolve: {
                data: [
                  'Clients', '$route',
                  function (Clients, $route)
                  {
                    return ($route.current.params.local && $route.current.params.local == 'true') ?
                      Clients.queryLocal() :
                      Clients.query(false, $route.current.params);
                  }
                ]
              }
            })

            .when(
            '/clientProfile/:clientId',
            {
              templateUrl: 'views/clients.html',
              controller: 'clientCtrl',
              reloadOnSearch: false,
              resolve: {
                data: [
                  '$rootScope', '$route',
                  function ($rootScope, $route)
                  {
                    angular.element('.navbar #clientMenu').addClass('active');

                    return { clientId: $route.current.params.clientId };
                  }
                ]
              }
            })

            .when(
            '/manage',
            {
              templateUrl: 'views/manage.html',
              controller: 'manageCtrl',
              reloadOnSearch: false,
              resolve: {
                data: [
                  'Clients', 'Teams', '$location',
                  function (Clients, Teams, $location)
                  {
                    // TODO: Lose short property names and make them more readable!
                    return (($location.hash() && $location.hash() == 'reload')) ?
                    {
                      t: Teams.query(),
                      cg: Clients.query()
                    } :
                    { local: true};
                  }
                ],
                dataMembers: function(Teams) {
                  return Teams.updateMembersLocal();
                }
              }
            })

            .when(
            '/treegrid',
            {
              templateUrl: 'views/treegrid.html',
              controller: 'treegridCtrl',
              reloadOnSearch: false,
              resolve: {
                data: [
                  'Clients', 'Teams', '$location',
                  function (ClientGroups, Teams, $location)
                  {
                    // TODO: Lose short property names and make them more readable!
                    return (($location.hash() && $location.hash() == 'reload')) ?
                    {
                      t: Teams.query(),
                      cg: ClientGroups.query()
                    } :
                    { local: true };
                  }
                ]
              }
            })

            .when(
            '/dashboard/options',
            {
              templateUrl: 'views/team-telephone/options.html',
              controller: 'options as options',
              reloadOnSearch: false,
              resolve: {
                data: [
                  'Teams',
                  function (Teams)
                  {
                    removeActiveClass('.teamMenu');
                    return Teams.getAllLocal();
                  }
                ]
              }
            })

            .when('/dashboard/agenda/:userId?', {
              templateUrl: 'views/team-telephone/agenda.html',
              controller: 'agenda',
              resolve: {
                data: function($route, Slots, Storage, Dater, Store, Teams,
                               $q, $rootScope, $location, CurrentSelection, Profile)
                {
                  //remove active class TODO create a directive to solve this bug
                  removeActiveClass('.teamMenu');

                  var groupId = CurrentSelection.getTeamId(),
                    userId = $route.current.params.userId,
                    data = {
                      members: null,
                      user: null,
                      timeline: null
                    };

                  if(_.isUndefined(userId))
                  {
                    redirectLocationLoggedUser();
                  }

                  return Teams.getSingle(groupId)
                    .then(function(members)
                    {
                      data.members = members;
                      return members.error && members || Profile.fetchUserData(userId);
                    })
                    .then(function(user)
                    {
                        var loggedUserTeams = $rootScope.app.resources.teamUuids,
                          urlUserTeams = user.teamUuids,
                          userAllow = true;

                        data.user = user;

                        //Check if there are equal team, otherwise it's not aloud to edit this user's
                        //timeline with the role of team lid
                        if($rootScope.app.resources.role > 1)
                        {
                          userAllow = hasEqualTeams(
                            loggedUserTeams.concat(urlUserTeams)
                          );
                        }

                      return (! userAllow)
                          ? $q.reject(user)
                          : $q.all([
                              getAllSlots(userId, groupId),
                              Teams.getAllLocal()
                            ]);

                      function hasEqualTeams(teams) {
                        return _.uniq(teams).length !== teams.length;
                      }
                    })
                    .then(function(result)
                    {
                      return {
                        members: data.members,
                        timeline: result[0],
                        user: data.user,
                        teams: result[1]
                      };
                    },
                    function ()
                    {
                      redirectLocationLoggedUser();
                    });

                  /**
                   * All slots timeline
                   * @param userId current user timeline
                   * @param groupId current team timeline
                   */
                  function getAllSlots(userId, groupId)
                  {
                    var periods = Store('app').get('periods');

                    return Slots.all({
                      groupId: groupId,
                      stamps: (Dater.current.today() > 360) ? {
                        start: periods.days[358].last.timeStamp,
                        end: periods.days[365].last.timeStamp
                      } : {
                        start: periods.days[Dater.current.today() - 1].last.timeStamp,
                        end: periods.days[Dater.current.today() + 6].last.timeStamp
                      },
                      month: Dater.current.month(),
                      layouts: {
                        user: true,
                        group: true,
                        members: (userId != $rootScope.app.resources.uuid)
                      },
                      user: userId
                    });
                  }

                  /**
                   * redirect to the timeline of the logged user
                   */
                  function redirectLocationLoggedUser()
                  {
                    $location.path('/dashboard/agenda/' + $rootScope.app.resources.uuid);
                  };
                }
              },
              reloadOnSearch: false
            })

            .when(
            '/dashboard/logs',
            {
              templateUrl: 'views/team-telephone/logs.html',
              controller: 'logs as logs',
              resolve: {
                data: function(Logs)
                {
                  removeActiveClass('.teamMenu');

                  return Logs.fetchByTeam();
                }
              },
              reloadOnSearch: false
            })

            .when(
            '/dashboard',
            {
              redirectTo: function(route, path)
              {
                return path + '/agenda';
              }
            })

            .when(
            '/tasks2/planboard',
            {
              templateUrl: 'views/planboard.html',
              controller: 'planboard',
              reloadOnSearch: false
            })

            .when(
            '/dashboard/status/phones',
            {
              templateUrl: 'views/phones.html',
              controller: 'phones',
              reloadOnSearch: false,
              resolve: {
                data: [
                  'Teams',
                  function (Teams)
                  {
                    removeActiveClass('.teamMenu');

                    return Teams.queryLocal();
                  }
                ]
              }
            })

            .when(
            '/dashboard/status',
            {
              templateUrl: 'views/team-telephone/status.html',
              controller: 'status',
              reloadOnSearch: false,
              resolve: {
                data: function (Teams, Slots, $q, CurrentSelection)
                {
                  var teamId = CurrentSelection.getTeamId();
                  removeActiveClass('.teamMenu');

                  return $q.all([
                    Teams.getSingle(teamId),
                    Slots.MemberReachabilitiesByTeam(teamId, null),
                    Teams.getAllLocal()
                  ]).then(function(result) {
                    return {
                      members: result[0],
                      membersReachability: result[1],
                      teams: result[2]
                    };
                  });
                }
              }
            })

            .when(
            '/dashboard/order',
            {
              templateUrl: 'views/team-telephone/order.html',
              controller: 'order',
              resolve: {
                data: function(TeamUp, Teams, CurrentSelection, $q)
                {
                  removeActiveClass('.teamMenu');

                  var teamId = CurrentSelection.getTeamId(),
                    teamStatus = Teams.getSingle(teamId),
                    teamOrder = TeamUp._('callOrderGet', {second: teamId}),
                    allTeams = Teams.getAllLocal();

                  return $q.all([teamStatus, teamOrder, allTeams])
                    .then(
                    function(teamResult)
                    {
                      return {
                        teamMembers: teamResult[0],
                        teamOrder: teamResult[1],
                        teams: teamResult[2]
                      };
                    });
                }
              },
              reloadOnSearch: false
            })

            .when(
            '/messages',
            {
              templateUrl: 'views/messages.html',
              controller: 'messages',
              reloadOnSearch: false
            })

            .when(
            '/profile/:userId?',
            {
              templateUrl: 'views/profile.html',
              controller: 'profileCtrl',
              reloadOnSearch: false,
              resolve: {
                data: [
                  '$rootScope', '$route', 'Profile', '$location',
                  function ($rootScope, $route, Profile, $location)
                  {
                    if (! $route.current.params.userId)
                    {
                      $location.path('/profile/' + $rootScope.app.resources.uuid).hash('profile');
                    }

                    return Profile.fetchUserData($route.current.params.userId);
                  }
                ]
              }
            })

            .when(
            '/vis',
            {
              templateUrl: 'views/vis.html',
              controller: 'vis',
              reloadOnSearch: false
            })

            .when(
            '/help',
            {
              templateUrl: 'views/help.html',
              controller: 'helpCtrl',
              reloadOnSearch: false
            })

            .when(
            '/video/:videoId?',
            {
              templateUrl: 'views/video.html',
              controller: 'videoCtrl',
              resolve: {
                'check': function ($rootScope, $location, Session)
                {
                  if(Session.check())
                  {
                    $location.path($rootScope.currentLocation);
                  }
                }
              },
              reloadOnSearch: false
            })

            .otherwise({ redirectTo: '/login' });

          $httpProvider.interceptors.push(
            [
              '$location', 'Store', '$injector', '$q',
              function ($location, Store, $injector, $q)
              {
                return {
                  request: function (config)
                  {
                    return config || $q.when(config);
                  },
                  requestError: function (rejection)
                  {
                    return $q.reject(rejection);
                  },
                  response: function (response)
                  {
                    return response || $q.when(response);
                  },
                  responseError: function (rejection)
                  {
                    var promise = $q.reject(rejection);

                    if(rejection.status > 0)
                    {
                      var rejections = $injector.get('Rejections');

                      switch (rejection.status)
                      {
                        case 403:
                          var loginData = Store('app').get('loginData');

                          if(loginData.password)
                          {
                            promise = rejections.reSetSession(loginData, rejection.config);
                          }
                          else
                          {
                            rejections.sessionTimeOut();
                          }
                          break;
                        default:
                          rejections.trowError(rejection);
                          break;
                      }
                    }

                    return promise;
                  }
                };
              }
            ]);

          var removeActiveClass = function(divId)
          {
            angular.element(divId).removeClass('active');
          };
        }
      ]);
  }
);
