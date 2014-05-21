define(
  ['services/services'],
  function (services)
  {
    'use strict';

    services.factory(
      'Sloter',
      [
        '$rootScope', 'Store',
        function ($rootScope, Store)
        {
          return {
//            get: {
//              groups: function ()
//              {
//                var groups = {};
//
//                angular.forEach(
//                  Store('app').get('groups'),
//                  function (group)
//                  {
//                    groups[group.uuid] = group.name;
//                  });
//
//                return groups;
//              },
//
//              members: function ()
//              {
//                var members = {};
//
//                angular.forEach(
//                  Store('app').get('members'),
//                  function (member)
//                  {
//                    members[member.uuid] = member.name;
//                  });
//
//                return members;
//              }
//            },

            wrapper: function (rank) { return '<span style="display:none;">' + rank + '</span>' },

            secret: function (content) { return '<span class="secret">' + content + '</span>' },

            addLoading: function (data, timedata, rows)
            {
              angular.forEach(
                rows, function (row)
                {
                  timedata.push(
                    {
                      start:     data.periods.end,
                      end:       1577836800000,
                      group:     row,
                      content:   'loading',
                      className: 'state-loading-right',
                      editable:  false
                    });

                  timedata.push(
                    {
                      start:     0,
                      end:       data.periods.start,
                      group:     row,
                      content:   'loading',
                      className: 'state-loading-left',
                      editable:  false
                    });
                });

              return timedata;
            },

            user: function (data, timedata, config)
            {
              var _this = this;

              angular.forEach(
                data.user, function (slot)
                {
                  angular.forEach(
                    config.legenda, function (value, legenda)
                    {
                      if (slot.text == legenda && value)
                      {
                        timedata.push(
                          {
                            start:     Math.round(slot.start),
                            end:       Math.round(slot.end),
                            group: (slot.recursive) ?
                                   _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') :
                                   _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                            content:   _this.secret(
                              angular.toJson(
                                {
                                  type:      'slot',
                                  id:        slot.id,
                                  recursive: slot.recursive,
                                  state:     slot.text
                                })),
                            className: config.states[slot.text].className,
                            editable:  true
                          });
                      }
                    });
                });

              timedata = _this.addLoading(
                data, timedata, [
                    _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
                    _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning')
                ]);

              return timedata;
            },

            profile: function (data, config)
            {
              var _this = this,
                  timedata = [];

              angular.forEach(
                data, function (slot)
                {
                  angular.forEach(
                    config.legenda, function (value, legenda)
                    {
                      if (slot.text == legenda && value)
                      {
                        timedata.push(
                          {
                            start:     Math.round(slot.start),
                            end:       Math.round(slot.end),
                            group: (slot.recursive) ?
                                   _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') :
                                   _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                            content:   _this.secret(
                              angular.toJson(
                                {
                                  type:      'slot',
                                  id:        slot.id,
                                  recursive: slot.recursive,
                                  state:     slot.text
                                })),
                            className: config.states[slot.text].className,
                            editable:  true
                          });
                      }
                    });
                });

              timedata.push(
                {
                  start:     0,
                  end:       1,
                  group: _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
                  content:   '',
                  className: null,
                  editable:  false
                });

              timedata.push(
                {
                  start:     0,
                  end:       1,
                  group: _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                  content:   '',
                  className: null,
                  editable:  false
                });

              return timedata;
            },

            process: function (data)
            {
              var timedata = [];

              var offset = Number(Date.now());

              angular.forEach(
                data.members,
                (function (member)
                {
                  var tasks = [];

                  if (data.section == "teams")
                  {
                    if (data.teams.tasks[member.memId] != null)
                    {
                      tasks.push(data.teams.tasks[member.memId]);
                    }
                  }
                  else if (data.section == "clients")
                  {
                    if (data.clients.tasks[member.memId] != null)
                    {
                      tasks.push(data.clients.tasks[member.memId]);
                    }
                  }

                  angular.forEach(
                    tasks,
                    function (memberTasks)
                    {
                      angular.forEach(
                        memberTasks,
                        function (task)
                        {
                          var relatedUser = '';

                          if (data.section == "teams")
                          {
                            // should get the name from team members ;
                            relatedUser = $rootScope.getClientByID(task.relatedClientUuid);
                          }
                          else if (data.section == "clients")
                          {
                            // should get the name from clients;
                            relatedUser = $rootScope.getTeamMemberById(task.assignedTeamMemberUuid);
                          }

                          var slotContent = "";

                          if (typeof relatedUser != 'undefined')
                          {
                            slotContent = relatedUser.firstName + " " + relatedUser.lastName;
                          }

                          // deal with the unfinished task
                          if (task.plannedEndVisitTime == 0)
                          {
                            task.plannedEndVisitTime = offset;
                          }

                          var content = "<span>" + slotContent + "</span>" +
                                        "<input type=hidden value='" +
                                        angular.toJson(
                                          {
                                            type:       'slot',
                                            id:         task.uuid,
                                            mid:        task.authorUuid,
                                            state:      task.description,
                                            clientUuid: task.relatedClientUuid,
                                            memberId:   task.assignedTeamMemberUuid
                                          }
                                        ) +
                                        "'>";

                          timedata.push(
                            {
                              start:     Math.round(task.plannedStartVisitTime),
                              end:       Math.round(task.plannedEndVisitTime),
                              group:     member.head,
                              content:   content,
                              className: 'state-available',
                              editable:  false
                            }
                          );
                        }
                      );
                    }
                  );

                  timedata = this.addLoading(data, timedata, [member.head]);
                }).bind(this)
              );

              return timedata;
            }

          }
        }
      ]);

  }
);


