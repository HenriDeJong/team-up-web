define(['controllers/controllers'], function (controllers)
{
  'use strict';

  controllers.controller(
    'status',
      function ($scope, $rootScope, TeamUp, $q, Slots, Store, data, Teams, CurrentSelection)
      {
        $rootScope.notification.status = false;

        $rootScope.fixStyles();

        var dataAllTeams = Teams.queryLocal(),
          teams = dataAllTeams.teams,
          members = _.flatten(_.values(dataAllTeams.members)), //merge members from all teams together
          everyoneId = 'all';

        //Check if there are duplicate usernames
        members = $rootScope.unique(members);

        //Add a all teams option to the selector
        if($rootScope.app.resources.role == 1)
        {
          teams.unshift({
            'name': $rootScope.ui.dashboard.everyone,
            'uuid': everyoneId
          });
        }

        $scope.groups = teams;

        $scope.states = angular.copy($rootScope.config.app.timeline.config.states);

        $scope.states['no-state'] = {
          className: 'no-state',
          label: $rootScope.ui.dashboard.possiblyReachable,
          color: '#ececec',
          type: $rootScope.ui.dashboard.noPlanning,
          display: false
        };

        $scope.current = {
          group: CurrentSelection.getTeamId()
        };

        $scope.teamMembers = data.members;

        getReachability(data.membersReachability, setKeyAsUsername(data.members));

        /**
         * Load the current team(s) including the slots
         */
        $scope.getGroupReachability = function ()
        {
          $scope.loadGroup = $rootScope.ui.dashboard.load;
          $rootScope.statusBar.display('team(s) ' + $rootScope.ui.dashboard.loading);


          if ($scope.current.group == everyoneId)
          {
            Slots.getAllMemberReachabilities(dataAllTeams.teams)
              .then(function(result)
              {
                getReachability(result, members);
              });
          }
          else
          {
            CurrentSelection.local = $scope.current.group;

            $q.all([
              TeamUp._('teamStatusQuery', {third: $scope.current.group}),
              Slots.MemberReachabilitiesByTeam($scope.current.group, null)
            ]).then(function(result)
            {

              $scope.teamMembers = result[0];

              getReachability(result[1], setKeyAsUsername($scope.teamMembers));
            });
          }
        };

        /**
         * merge the member reachability data with the personal data of the member
         * @param reachabilityData reachability data
         */
        function getReachability(currentReachability, currentMembers)
        {
          var ordered = {};
          $scope.loadingReachability = true;

          $scope.loadGroup = '';
          $rootScope.statusBar.off();

          _.each(currentReachability.members, function (slots, id)
          {
            if (currentMembers[id] &&
              (currentMembers[id].role != 0 && currentMembers[id].role != 4))
            {
              var _member = {
                id: id,
                state: (slots.length > 0) ? slots[0].state : 'no-state',
                label: (slots.length > 0) ? $scope.states[slots[0].state].label[0] : '',
                end: (slots.length > 0 && slots[0].end !== undefined) ?
                slots[0].end * 1000 :
                  $rootScope.ui.dashboard.possiblyReachable,
                name: (currentMembers && currentMembers[id]) ?
                currentMembers[id].firstName + ' ' + currentMembers[id].lastName :
                  id
              };

              if(currentMembers && currentMembers[id])
              {
                _member.name = currentMembers[id].firstName + ' ' + currentMembers[id].lastName;
                _member.states = currentMembers[id].states;
              }
              else
              {
                _member.name = id;
                _member.states = null;
              }

              if (slots.length > 0)
              {
                if (!ordered.reachable)
                {
                  ordered.reachable = [];
                }

                if (!ordered.unreachable)
                {
                  ordered.unreachable = [];
                }

                if (slots[0].state == 'com.ask-cs.State.Unavailable')
                {
                  ordered.unreachable.push(_member);
                }
                else
                {
                  if (slots[0].state == 'com.ask-cs.State.Available')
                  {
                    _member.style = 'sa-icon-reserve-available';
                  }

                  ordered.reachable.push(_member);
                }
              }
              else
              {
                if (! ordered.possible)
                {
                  ordered.possible = [];
                }

                ordered.possible.push(_member);
              }
            }
          });

          var sortByEnd = function (a, b)
          {
            if (a.end < b.end)
            {
              return -1;
            }

            if (a.end > b.end)
            {
              return 1;
            }

            return 0;
          };

          if (ordered.hasOwnProperty('reachable'))
          {
            ordered.reachable.sort(sortByEnd);
          }

          if (ordered.hasOwnProperty('unreachable'))
          {
            ordered.unreachable.sort(sortByEnd);
          }

          var _reachables = [];

          _.each(ordered.reachable, function (reachable)
          {
            if (reachable.state == 'com.ask-cs.State.Available')
            {
              _reachables.push(reachable);
            }
          });

          ordered.reachable = _reachables;

          $scope.loadingReachability = false;

          $scope.reachability = {
            members: ordered,
            synced: currentReachability.synced * 1000
          };
        };

        /**
         * Set key as username array of members
         * @param members
         * @returns {Array}
         */
        function setKeyAsUsername(members)
        {
          var newMembers = [];

          _.each(members, function (member)
          {
            newMembers[member.uuid] = member;
          });

          return newMembers;
        }
      }
  );
});