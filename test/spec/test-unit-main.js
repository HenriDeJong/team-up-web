var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    // Removed "Spec" naming from files
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}


requirejs.config(
  {
    baseUrl: '/base/app/scripts',

    paths: {
      localConfig: 'localConfig',
      config: 'configTeamUp',
      angular:      '../vendors/angular/angular',
      jquery:       '../vendors/jquery/dist/jquery',
      bootstrap: '../vendors/bootstrap/dist/js/bootstrap',
      plugins: 'plugins',
      'angular-resource': '../vendors/angular-resource/angular-resource.min',
      'angular-route': '../vendors/angular-route/angular-route.min',
      'angular-md5': '../vendors/angular-md5/angular-md5.min',
      'angular-strap':    '../vendors/angular-strap/dist/angular-strap.min',
      'angular-strap-tpl':    '../vendors/angular-strap/dist/angular-strap.tpl.min',
      'angular-cookie':    '../vendors/angular-cookie/angular-cookie',
      'jquery-ui':        '../vendors/jquery-ui/ui/jquery-ui',
      daterangepicker: '../vendors/bootstrap-daterangepicker/daterangepicker',
      domReady:     '../vendors/requirejs-domready/domReady',
      moment: '../vendors/moment/moment',
      lawnchair: '../vendors/lawnchair/src/Lawnchair',
      'lawnchair-dom': '../vendors/lawnchair/src/adapters/dom',
      'lodash': '../vendors/lodash/lodash.min',
      //'ui-sortable':      '../vendors/angular-ui-sortable/sortable',
      'sortable': '../vendors/Sortable/Sortable',
      'ng-sortable': '../vendors/Sortable/ng-sortable',
      'ui.bootstrap.pagination': '../vendors/angular-ui-bootstrap/src/pagination/pagination',
      domReady:     '../vendors/requirejs-domready/domReady',
      'angular-mocks': '../vendors/angular-mocks/angular-mocks',
      mask: 'removables/angular-ui-utils/modules/mask/mask'
      // unitTest:     '../../test/spec'
    },

    shim: {
      localConfig: {deps: ['jquery'], exports: 'localConfig' },
      profile: {deps: ['jquery'], exports: 'profile' },
      config: { deps: ['profile', 'localConfig'], exports: 'config' },
      plugins: { deps: ['jquery'], exports: 'plugins' },
      bootstrap: { deps: ['jquery'], exports: 'jQuery' },
      'angular-resource': { deps: ['angular'] },
      'angular-route': { deps: ['angular'] },
      'angular-md5': { deps: ['angular'] },
      'angular-strap': { deps: ['angular'] },
      'angular-strap-tpl': { deps: ['angular','angular-strap'] },
      'angular-cookie': { deps: ['angular'] },
      daterangepicker: { deps: ['jquery', 'moment'], exports: 'daterangepicker' },
      'jquery-ui':        { deps: ['jquery'], exports: 'jquery-ui'},
      //moment: { deps: [], exports: 'moment' },
      //'ui-sortable':      { deps: ['jquery','jquery-ui'], exports: 'ui-sortable' },
      angular: {
        deps:    ['jquery'],
        exports: 'angular'
      },
      'angular-mocks': {
        deps: ['angular'],
        exports: 'angular.mock'
      },
      lodash: { exports: '_'},
      lawnchair: { deps: [], exports: 'lawnchair' },
      'lawnchair-dom': { deps: ['lawnchair'], exports: 'dom' },
      mask: { deps: ['angular'] }
    },

    deps: tests,

    callback: window.__karma__.start
  }
);

requirejs.config({
  paths: {
    localConfig: 'localConfig',
    profile: 'profiles/teamtelefoon/profileApp',
    config: 'configTeamUp'
  }
});

var testConfig = {
  host: 'http://test.ask-cs.com/',
  userResources: {
    "uuid": "henkie",
    "userName": "henkie",
    "firstName": "henk",
    "lastName": "R00ijen",
    "phone": "+31654789522",
    "email": "hgvanrooijen@gmail.com",
    "role": "1",
    "function": "1",
    "birthDate": 1420498800000,
    "phoneAddresses": null,
    "emailAddresses": null,
    "teamUuids": [
      "b3915de1-f29c-4609-a67f-73aaef529902"
    ],
    "extraInfo": {
      "photoUUID": "04ecc3e9-c049-4df6-8054-93a26b443917"
    },
    "fullName": "henk R00ijen"
  }
};