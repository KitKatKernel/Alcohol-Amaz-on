const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars'); // Import express-handlebars
const path = require('path'); // Import the path module
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({}); // Create a handlebars instance
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); // Set the view engine to handlebars
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
