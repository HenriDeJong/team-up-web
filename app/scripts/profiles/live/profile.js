/**
 * Installation profile
 */
var profile = {

  meta: 'teamup',

  own: true,

  title: 'Dev-TeamUp',

  lang: 'nl',

  showBackground: false,

  tabs: {
    tasks2: true,
    team: true,
    client: true,
    manage: true,
    support: true
  },

  statesall: {
    'com.ask-cs.State.Available': {
      className: 'state-available',
      label: 'Beschikbaar',
      color: '#4f824f',
      type: 'Beschikbaar'
    },
    'com.ask-cs.State.Unavailable': {
      className: 'state-unavailable',
      label: 'Niet Beschikbaar',
      color: '#a93232',
      type: 'Niet Beschikbaar'
    },
    'com.ask-cs.State.Unreached': {
      className: 'state-unreached',
      label: 'Niet Bereikt',
      color: '#65619b',
      type: 'Niet Beschikbaar'
    }
  },

  host: "https://backend.ask-cs.nl/",

  states: [
    'com.ask-cs.State.Available',
    'com.ask-cs.State.Unavailable',
    'com.ask-cs.State.Unreached'
  ],

  timeline: {
    config: {
      layouts: {
        groups: true,
        members: true
      }
    }
  },

  divisions: [],

  roles: [
    {
      id: '1',
      label: 'coordinator'
    },
    {
      id: '2',
      label: 'team_member'
    },
    {
      id: '3',
      label: 'client'
    }
  ],

  p2000: {
    status: true,
    // url: 'http://couchdb.ask-cs.com:5984/p2000/_design/search/_view/standby?limit=4&descending=true',
    url:    'http://backend.ask-cs.com/~ask/p2000/p2000.php',
    codes: '1201958'
  },

  mobileApp: {
    android: 'https://play.google.com/store/apps/details?id=com.askcs.standby',
    ios: 'https://itunes.apple.com/nl/app/standby/id655588325?mt=8&uo=4',
    status: true,
    experimental: false
  },

  analytics: {
    url: 'dev.standby.ask-cs.com',
    // url: 'test.standby.ask-cs.com',
    // url: 'brandweer.standby.ask-cs.com',

    // Depreciated
    status: false,
    code: function () {
    }
  },

  smartAlarm: false,

  timers: {
    TICKER: 100,
    NOTIFICATION_DELAY: 5000,
    MEMBER_TIMELINE_RENDER: 2000,
    ALARM_SYNC: 60000,
    PLANBOARD_SYNC: 60000,
    TV_SYNC: 60000
  }
};