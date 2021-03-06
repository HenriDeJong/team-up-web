var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(app.router);

switch (app.get('env'))
{
  case 'development':
    app.use(express.errorHandler());
    break;
  case 'production':
    // TODO
    break;
}

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/api/items', api.items);
app.get('*', routes.index);

http.createServer(app)
    .listen(app.get('port'),
      function ()
      {
        console.log('Express server listening on port ' + app.get('port'));
      }
);