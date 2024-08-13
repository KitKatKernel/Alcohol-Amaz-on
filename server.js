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

const hbs = exphbs.create({
  // Overriding handlebars security that prevents access to properties that are not “own properties”.
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    // Helper function to slice an array from the specified start index to the end index.
    // Useful for limiting or paginating content within Handlebars templates.
    slice: (array, start, end) => array.slice(start, end),
  },
});

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
