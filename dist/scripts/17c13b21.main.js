window.location.port=="8080"&&document.getElementsByTagName("html")[0].setAttribute("ng-app"),require.config({paths:{jquery:"../vendors/jquery/dist/jquery.min",localConfig:"localConfig"},shim:{localConfig:{deps:["jquery"],exports:"localConfig"}}}),requirejs(["jquery","localConfig"],function(e,t){var n=t.defaultProfile,r=window.location.host;r.indexOf("teamtelefoon")>-1?n="teamtelefoon":r.indexOf("teamup")>-1&&(n="teamup"),require.config({waitSeconds:100,paths:{profile:"profiles/"+n+"/profile",date:"removables/date",angular:"../vendors/angular/angular.min",plugins:"plugins",domReady:"../vendors/requirejs-domready/domReady",bootstrap:"../vendors/bootstrap/dist/js/bootstrap","angular-resource":"../vendors/angular-resource/angular-resource.min","angular-route":"../vendors/angular-route/angular-route.min","angular-md5":"../vendors/angular-md5/angular-md5.min","angular-strap":"../vendors/angular-strap/dist/angular-strap.min","angular-strap-tpl":"../vendors/angular-strap/dist/angular-strap.tpl.min","ui-bootstrap":"removables/ui-bootstrap-custom",lawnchair:"../vendors/lawnchair/src/Lawnchair",dom:"../vendors/lawnchair/src/adapters/dom",timeline:"removables/timeline",treegrid:"removables/treegrid",underscore:"../vendors/underscore/underscore",store:"../vendors/web-lib-store/dist/store",offline:"../vendors/web-lib-offline/dist/offline",daterangepicker:"../vendors/bootstrap-daterangepicker/daterangepicker",moment:"../vendors/moment/moment",phone:"../vendors/web-lib-phonenumber/libphonenumber",log:"../vendors/web-lib-log/dist/log",session:"../vendors/web-lib-session/dist/session","jquery-form":"../vendors/jquery-form/jquery.form",lodash:"../vendors/lodash/dist/lodash.min","jquery-ui":"../vendors/jquery-ui/ui/jquery-ui",sortable:"../vendors/Sortable/Sortable","ng-sortable":"../vendors/Sortable/ng-sortable","ui.bootstrap.pagination":"../vendors/angular-ui-bootstrap/src/pagination/pagination",locale_nl:"i18n/angular-locale_nl","clj-fuzzy":"../vendors/clj-fuzzy/src-js/clj-fuzzy",mask:"removables/angular-ui-utils/modules/mask/mask"},shim:{profile:{deps:["jquery"],exports:"profile"},config:{deps:["profile","localConfig"],exports:"config"},date:{deps:[],exports:"date"},plugins:{deps:["jquery"],exports:"plugins"},angular:{deps:["jquery"],exports:"angular"},"angular-resource":{deps:["angular"]},"angular-route":{deps:["angular"]},"angular-strap":{deps:["angular"],exports:"angular-strap"},"angular-strap-tpl":{deps:["angular","angular-strap"]},"angular-md5":{deps:["angular"]},"ui-bootstrap":{deps:["angular","bootstrap"],exports:"ui-bootstrap"},bootstrap:{deps:["jquery"],exports:"bootstrap"},lawnchair:{deps:[],exports:"lawnchair"},dom:{deps:["lawnchair"],exports:"dom"},timeline:{deps:[],exports:"timeline"},daterangepicker:{deps:["jquery","moment"],exports:"daterangepicker"},treegrid:{deps:[],exports:"treegrid"},underscore:{exports:"underscore"},mask:{deps:["angular"]},store:{deps:["angular","underscore"]},offline:{deps:["angular"]},log:{deps:["angular"]},phone:{deps:["angular"]},session:{deps:["angular"]},"jquery-form":{deps:["jquery"],exports:"jquery-form"},lodash:{deps:[],exports:"lodash"},"jquery-ui":{deps:["jquery"],exports:"jquery-ui"},"ui.bootstrap.pagination":{deps:["angular"]},locale_nl:{deps:["angular"]}}}),require(["angular","domReady","date","plugins","angular-resource","angular-route","angular-md5","angular-strap","angular-strap-tpl","ui-bootstrap","locals","profile","config","app","run","routes","states","services/browsers","services/teamup","services/clients","services/dater","services/sloter","services/stats","services/strings","services/teams","services/phone","services/sloter","services/md5","services/storage","services/stats","services/pincode","directives/widgets","directives/date-range-picker","directives/log-ranger","modals/task","modals/slots","modals/logs","modals/agenda","modals/slots","modals/permission","modals/testModal","modals/profile","resources/ClientResource","resources/TeamMessageResource","resources/TeamResource","resources/TaskResource","resources/ClientGroupResource","filters/avatars","filters/all-filters","controllers/clients","controllers/login","controllers/manage","controllers/treegridCtrl","controllers/messages","controllers/status","controllers/planboard","controllers/vis","controllers/profile","controllers/teams","controllers/tasks","controllers/tasks2","controllers/timeline","controllers/timeline-navigation","controllers/agenda-timeline","controllers/agenda-timeline-navigation","controllers/treegrid","controllers/support","controllers/upload","controllers/admin","controllers/logs","controllers/order","controllers/agenda","controllers/exampleTest","bootstrap","lawnchair","dom","timeline","daterangepicker","treegrid","underscore","mask","store","offline","log","phone","session","jquery-form","lodash","jquery-ui","ng-sortable","locale_nl","clj-fuzzy"],function(e,t){t(function(){e.bootstrap(document,["TeamUp"])})})});