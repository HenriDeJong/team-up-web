define(
  ['app', 'config', 'localization'],
  function (app, config, localization)
  {
    'use strict';

    app.run(
      [
        '$rootScope', '$location', '$timeout', 'Session', 'Store', '$window', 'Teams', 'Dater',
        function ($rootScope, $location, $timeout, Session, Store, $window, Teams, Dater)
        {
          $rootScope.config = config.app;

          // TODO: Remove later if it is not needed?!
          // $rootScope.config.init();

          $rootScope.browser = $.browser;

          angular.extend(
            $rootScope.browser, {
              screen: $window.screen
            });

          if ($rootScope.browser.ios)
          {
            angular.extend(
              $rootScope.browser, {
                landscape: Math.abs($window.orientation) == 90 ? true : false,
                portrait: Math.abs($window.orientation) != 90 ? true : false
              });
          }
          else
          {
            angular.extend(
              $rootScope.browser, {
                landscape: Math.abs($window.orientation) != 90 ? true : false,
                portrait: Math.abs($window.orientation) == 90 ? true : false
              });
          }

          $window.onresize = function () { $rootScope.browser.screen = $window.screen };

          $window.onorientationchange = function ()
          {
            $rootScope.$apply(
              function ()
              {
                if ($rootScope.browser.ios)
                {
                  angular.extend(
                    $rootScope.browser, {
                      landscape: Math.abs($window.orientation) == 90 ? true : false,
                      portrait: Math.abs($window.orientation) != 90 ? true : false
                    });
                }
                else
                {
                  angular.extend(
                    $rootScope.browser, {
                      landscape: Math.abs($window.orientation) != 90 ? true : false,
                      portrait: Math.abs($window.orientation) == 90 ? true : false
                    });
                }
              });
          };

          var ui = localization.ui;

          $rootScope.changeLanguage = function (lang) { $rootScope.ui = ui[lang] };
          $rootScope.ui = ui[$rootScope.config.lang];

          if (! Store('app').get('periods') || Store('app').get('periods') == null) Dater.registerPeriods();

          $rootScope.app = $rootScope.app || {};

          $rootScope.app.resources = Store('app').get('resources');

          $rootScope.statusBar =
          {
            init: function ()
            {
              $rootScope.loading = {
                status:  false,
                message: 'Loading..'
              };
            },

            display: function (message)
            {
              $rootScope.loading = {
                status:  true,
                message: message
              };
            },

            off: function () { $rootScope.loading.status = false }
          };

          $rootScope.statusBar.init();

          $rootScope.notification = {
            status:  false,
            type:    '',
            message: ''
          };

          $rootScope.notifier =
          {
            init: function (status, type, message)
            {
              $rootScope.notification.status = true;

              if ($rootScope.browser.mobile && status == true)
              {
                $window.alert(message);
              }
              else
              {
                $rootScope.notification = {
                  status:  status,
                  type:    type,
                  message: message
                };
              }
            },

            success: function (message, permanent)
            {
              this.init(true, 'alert-success', message);

              if (! permanent) this.destroy();
            },

            error: function (message, permanent)
            {
              this.init(true, 'alert-danger', message);

              if (! permanent) this.destroy();
            },

            destroy: function ()
            {
              setTimeout(
                function ()
                {
                  $rootScope.notification.status = false;
                }, 5000);
            }
          };

          $rootScope.notifier.init(false, '', '');

          $rootScope.nav = function (tabName)
          {
            if ($location.path() == "/manage")
            {
              if ($rootScope.checkDataChangedInManage())
              {
                return;
              }
            }

            switch (tabName)
            {
              case 'tasks':
                $location.path("/tasks").search({}).hash('');
                break;
              case 'team':
                $location.path("/team").search({local: "true"}).hash("team");
                break;
              case 'client':
                $location.path("/client").search({local: "true"}).hash("client");
                break;
              case 'planboard':
                $location.path("/planboard").search({local: "true"}).hash("teams");
                break;
              case 'profile':
                $location.path("/profile").search({local: "true"}).hash("");
                break;
              case 'logout':
                $location.path("/logout");
                break;
              default:
                console.log("scope nav : " + tabName);
            }
          };

          $rootScope.checkDataChangedInManage = function ()
          {
            var changes = {};

            if ($location.hash() == "teamClients")
            {
              var argument = $rootScope.$$childTail.$$childTail.getData.teamClients();

              changes = $rootScope.$$childTail.getChangesFromTeamClients(argument);
            }
            else if ($location.hash() == "teams")
            {
              var preTeams = $rootScope.$$childTail.connections.teams;
              var afterTeams = $rootScope.$$childTail.$$childTail.getData.teams();

              changes = $rootScope.$$childTail.getChanges(preTeams, afterTeams);
            }
            else if ($location.hash() == "clients")
            {
              var preClients = $rootScope.$$childTail.connections.clients;
              var afterClients = $rootScope.$$childTail.$$childTail.getData.clients();

              changes = $rootScope.$$childTail.getChanges(preClients, afterClients);
            }

            if (angular.equals({}, changes))
            {
              // console.log("no changes ! ");
              return false;
            }
            else
            {
              if (! confirm($rootScope.ui.teamup.managePanelchangePrompt))
              {
                return true;
              }
            }
          };

          $rootScope.$on(
            '$routeChangeStart', function ()
            {
              function resetLoaders ()
              {
                $rootScope.loaderIcons = {
                  general:  false,
                  teams:    false,
                  clients:  false,
                  messages: false,
                  manage:   false,
                  profile:  false,
                  settings: false
                };
              }

              resetLoaders();

              switch ($location.path())
              {
                case '/team':
                  $rootScope.loaderIcons.team = true;

                  $rootScope.location = 'team';
                  break;

                case '/client':
                  $rootScope.loaderIcons.client = true;

                  $rootScope.location = 'cilent';
                  break;

                case '/messages':
                  $rootScope.loaderIcons.messages = true;

                  $rootScope.location = 'messages';
                  break;

                case '/manage':
                  $rootScope.loaderIcons.messages = true;

                  $rootScope.location = 'manage';
                  break;

                case '/logout':

                  $rootScope.location = 'logout';

                  var logindata = Store('app').get('logindata');

                  // TODO: Test this later on!
                  Store('app').nuke();

                  if (logindata.remember)
                  {
                    Store('app').save(
                      'logindata',
                      {
                        username: logindata.username,
                        password: logindata.password,
                        remember: logindata.remember
                      }
                    );
                  }

                  break;

                default:
                  if ($location.path().match(/profile/))
                  {
                    $rootScope.loaderIcons.profile = true;

                    $rootScope.location = 'profile';
                  }
                  else
                  {
                    $rootScope.loaderIcons.general = true;
                  }
              }

              if (! Session.check()) $location.path("/login");

              $rootScope.loadingBig = true;

              $rootScope.statusBar.display('Loading..');

              $rootScope.location = $location.path().substring(1);

              $('div[ng-view]').hide();
            });

          $rootScope.$on(
            '$routeChangeSuccess', function ()
            {
              $rootScope.newLocation = $location.path();

              $rootScope.loadingBig = false;

              $rootScope.statusBar.off();

              $('div[ng-view]').show();
            });

          $rootScope.$on(
            '$routeChangeError', function (event, current, previous, rejection)
            {
              $rootScope.notifier.error(rejection);
            });

          /**
           * Fix styles
           */
          $rootScope.fixStyles = function ()
          {
            var tabHeight = $('.tabs-left .nav-tabs').height();

            $.each(
              $('.tab-content').children(),
              function ()
              {
                var $this = $(this).attr('id'),
                    contentHeight = $('.tabs-left .tab-content #' + $this).height();

                if (tabHeight > contentHeight)
                {
                  $('.tabs-left .tab-content #' + $this).css(
                    {
                      height: $('.tabs-left .nav-tabs').height() + 6
                    });
                }
                else if (contentHeight > tabHeight)
                {
                  // $('.tabs-left .nav-tabs').css( { height: contentHeight } );
                }
              });

            if ($.os.mac || $.os.linux)
            {
              $('.nav-tabs-app li a span').css(
                {
                  paddingTop:   '10px',
                  marginBottom: '0px'
                }
              );
            }
          };

          if ($.os.windows)
          {
            $('#loading p').css(
              {
                paddingTop: '130px'
              });
          }

          $rootScope.getTeamMemberById = function (memberId)
          {
            var member;

            angular.forEach(
              Store('app').get('teams'),
              function (team)
              {
                angular.forEach(
                  Store('app').get(team.uuid),
                  function (_member)
                  {
                    if (_member.uuid == memberId)
                    {
                      member = _member;
                      return;
                    }
                  });
              });

            if (typeof member == "undefined")
            {
              member = {
                uuid:      memberId,
                firstName: memberId,
                lastName:  ''
              };
            }

            return member;
          };

          $rootScope.getClientByID = function (clientId)
          {
            var ret;

            angular.forEach(
              Store('app').get('clients'),
              function (client)
              {
                if (clientId == client.uuid)
                {
                  ret = client;
                  return;
                }
              });

            if (ret == null)
            {
              angular.forEach(
                Store('app').get('ClientGroups'),
                function (group)
                {
                  angular.forEach(
                    Store('app').get(group.id),
                    function (client)
                    {
                      if (client.uuid = clientId)
                      {
                        ret = client;
                        return;
                      }
                    });

                });
            }

            return ret;
          };

          /**
           * Here we need to find the clients for this team member,
           * 1> get the team,
           * 2> find the groups belong to this team,
           * 3> get all the clients under the group
           */
          $rootScope.getClientsByTeam = function (teamIds)
          {
            var clients = [];
            var clientIds = [];

            angular.forEach(
              teamIds,
              function (teamId)
              {
                angular.forEach(
                  Store('app').get('teamGroup_' + teamId),
                  function (teamGroup)
                  {
                    angular.forEach(
                      Store('app').get(teamGroup.id),
                      function (member)
                      {
                        if (clientIds.indexOf(member.uuid) == - 1)
                        {
                          clientIds.push(member.uuid);

                          clients.push(
                            {
                              uuid: member.uuid,
                              name: member.firstName + ' ' + member.lastName
                            }
                          );
                        }
                      });
                  });
              });

            return clients;
          };

          /**
           * Here we need to find the team members that can actually take this client
           * 1> get the team link to this client group ,
           * 2> get the members in the team.
           */
          $rootScope.getMembersByClient = function (clientGroup)
          {
            var members = [];
            var memberIds = [];

            angular.forEach(
              Store('app').get('teams'),
              function (team)
              {
                angular.forEach(
                  Store('app').get('teamGroup_' + team.uuid),
                  function (teamGrp)
                  {
                    if (clientGroup == teamGrp.id)
                    {
                      angular.forEach(
                        Store('app').get(team.uuid),
                        function (member)
                        {
                          if (memberIds.indexOf(member.uuid) == - 1)
                          {
                            memberIds.push(member.uuid);

                            members.push(
                              {
                                uuid: member.uuid,
                                name: member.firstName + ' ' + member.lastName
                              }
                            );
                          }
                        });
                    }
                  });
              });

            return members;
          };

          $rootScope.getAvatarURL = function (userId)
          {
            var ret = '';

            angular.forEach(
              Store('app').get('avatarUrls'),
              function (avatar)
              {
                if (avatar.userId == userId)
                {
                  ret = avatar.url;
                }
              }
            );

            return ret;
          };
        }
      ]
    );
  }
);