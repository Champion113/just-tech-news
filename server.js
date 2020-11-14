const path = require('path');
const express = require('express');
//set up handlebars template
const exphbs = require('express-handlebars');

//updated from routes
const routes = require('./controllers/');


const sequelize = require('./config/connection');
//set up handlebars template
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//create homepage
app.use(express.static(path.join(__dirname, 'public')));
//set up handlebar template
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
