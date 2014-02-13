/*jslint node: true */
/*global angular */
/*global profile */
'use strict';


/**
 * App configuration
 */
angular.module('WebPaige')
.value(
  '$config',
  {
    title:    'TeamUp',
    version:  '0.1.0',
    lang:     'nl',

    fullscreen: true,

    // REMOVE
    demo_users: false,

    profile: {
      meta:   profile.meta,
      title:  profile.title,
      logos: {
        login:  'profiles/' + profile.meta + '/img/login_logo.png',
        app:    ''
      },
      background: 'profiles/' + profile.meta + '/img/login_bg.jpg', // jpg for smaller size,
      p2000:      profile.p2000,
      mobileApp:  profile.mobileApp
    },

    statesall: {
      'com.ask-cs.State.Available':
      {
        className:'state-available',
        label:    'Beschikbaar',
        color:    '#4f824f',
        type:     'Beschikbaar'
      },
      'com.ask-cs.State.KNRM.BeschikbaarNoord':
      {
        className:'state-available-north',
        label:    'Beschikbaar voor Noord',
        color:    '#000',
        type:     'Beschikbaar'
      },
      'com.ask-cs.State.KNRM.BeschikbaarZuid':
      {
        className:'state-available-south',
        label:    'Beschikbaar voor Zuid',
        color:    '#e08a0c',
        type:     'Beschikbaar'
      },
      'com.ask-cs.State.Unavailable':
      {
        className:'state-unavailable',
        label:    'Niet Beschikbaar',
        color:    '#a93232',
        type:     'Niet Beschikbaar'
      },
      'com.ask-cs.State.KNRM.SchipperVanDienst':
      {
        className:'state-schipper-service',
        label:    'Schipper van Dienst',
        color:    '#e0c100',
        type:     'Beschikbaar'
      },
      'com.ask-cs.State.Unreached':
      {
        className:'state-unreached',
        label:    'Niet Bereikt',
        color:    '#65619b',
        type:     'Niet Beschikbaar'
      }
    },

    host: profile.host(),

    formats: {
      date:         'dd-MM-yyyy',
      time:         'HH:mm',
      datetime:     'dd-MM-yyyy HH:mm',
      datetimefull: 'dd-MM-yyyy HH:mm'
    },

    roles: profile.roles,
    
    mfunctions: profile.mfunctions,
    
    stateIcons : profile.stateIcons,
    
    stateColors : profile.stateColors,
    
    noImgURL : profile.noImgURL,
    
    timeline: {
      options: {
        axisOnTop:        true,
        width:            '100%',
        height:           'auto',
        selectable:       true,
        editable:         true,
        style:            'box',
        groupsWidth:      '200px',
        eventMarginAxis:  0,
        showCustomTime:   true,
        groupsChangeable: false,
        showNavigation:   false,
        intervalMin:      1000 * 60 * 60 * 1
      },
      config: {
        zoom:       '0.4',
        bar:        false,
        layouts:    profile.timeline.config.layouts,
        wishes:     false,
        legenda:    {},
        legendarer: false,
        states:     {},
        divisions:  profile.divisions,
        densities: {
          less:   '#a0a0a0',
          even:   '#ba6a24',
          one:    '#415e6b',
          two:    '#3d5865',
          three:  '#344c58',
          four:   '#2f4550',
          five:   '#2c424c',
          six:    '#253943',
          more:   '#486877'
        }
      }
    },

    pie: {
      colors: ['#415e6b', '#ba6a24', '#a0a0a0']
    },

    defaults: {
      settingsWebPaige: {
        user: {
          language: 'nl'
        },
        app: {
          widgets: {
            groups: {}
          }
        }
      }
    },

    cookie: {
      expiry: 30,
      path:   '/'
    },

    // notifications: {
    //   webkit: {
    //     user: true,
    //     app: window.webkitNotifications && (window.webkitNotifications.checkPermission() == 0) ? true : false
    //   }
    // },

    init: function ()
    {
      var _this = this;

      angular.forEach(profile.states, function (state, index)
      {
        _this.timeline.config.states[state] = _this.statesall[state];
      });
    },


    countries: [
      {
        id:     44,
        label: 'United Kingdom (44)'
      },
      {
        id:     32,
        label: 'Belgium (32)'
      }, 
      {
        id:     33,
        label: 'France (33)'
      }, 
      {
        id:     49,
        label: 'Germany (49)'
      },
      {
        id:     31,
        label: 'Netherlands (31)'
      },
      {
        id:     90,
        label: 'Turkey (90)'
      }
    ],


    regions: {
      31: [
        {
          id:     297,
          label:  'Aalsmeer (297)'
        },
        {
          id:     72,
          label:  'Alkmaar (72)'
        },
        {
          id:     546,
          label:  'Almelo (546)'
        },
        {
          id:     36,
          label:  'Almere (36)'
        },
        {
          id:     172,
          label:  'Alphen A/D Rijn (172)'
        },
        {
          id:     33,
          label:  'Amersfoort (33)'
        },
        {
          id:     20,
          label:  'Amsterdam (20)'
        },
        {
          id:     55,
          label:  'Apeldoorn (55)'
        },
        {
          id:     26,
          label:  'Arnhem (26)'
        },
        {
          id:     10,
          label:  'Rotterdam (10)'
        }
      ],
      90: [
        {
          id:     1,
          label:  'Turkey 1'
        },
        {
          id:     2,
          label:  'Turkey 2'
        }
      ],
      44: [
        {
          id:     1,
          label:  'United Kingdom 1'
        },
        {
          id:     2,
          label:  'United Kingdom 2'
        }
      ],
      49: [
        {
          id:     1,
          label:  'Germany 1'
        },
        {
          id:     2,
          label:  'Germany 2'
        }
      ],
      33: [
        {
          id:     1,
          label:  'France 1'
        },
        {
          id:     2,
          label:  'France 2'
        }
      ],
      32: [
        {
          id:     1,
          label:  'Belgium 1'
        },
        {
          id:     2,
          label:  'Belgium 2'
        }
      ]
    },

    packages: {
      1: {
        id:    1,
        label: 'Local Numbers',
        prices:{
          monthly: {
            normal:   5,
            premium:  15
          },
          yearly: {
            normal:   50,
            premium:  150
          }
        }
      },
      2: {
        id:    2,
        label: 'Virtual Numbers',
        prices:{
          monthly: {
            normal:   10,
            premium:  30
          },
          yearly: {
            normal:   100,
            premium:  300
          }
        }
      }
    },

    packages__: [
      {
        id:    1,
        label: 'Local Numbers',
        prices:{
          monthly: {
            normal:   5,
            premium:  15
          },
          yearly: {
            normal:   50,
            premium:  150
          }
        }
      },
      {
        id:    2,
        label: 'Virtual Numbers',
        prices:{
          monthly: {
            normal:   10,
            premium:  30
          },
          yearly: {
            normal:   100,
            premium:  300
          }
        }
      }
    ],


    virtuals: [
      {
        id:     1,
        label:  'Personal assistant services (84-87)'
      },
      {
        id:     2,
        label:  'VPN (82)'
      },
      {
        id:     3,
        label:  'Elektronisch communicatie (85 - 91)'
      },
      {
        id:     4,
        label:  'Company numbers (88)'
      }
    ],

    ranges: {
      1: [84, 85, 86, 87],
      2: [82],
      3: [85, 86, 87, 88, 89, 90, 91],
      4: [88]
    },

    premiums: [
      {
        package:  1,
        country:  31,
        region:   10,
        number:   2222222
      },
    ]

  }
);