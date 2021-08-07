const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware.js');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to database
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware);
//HTTP logger
// app.use(morgan("combined"));

// template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'bi bi-filter-circle-fill',
                    asc: 'bi bi-sort-down-alt',
                    desc: 'bi bi-sort-up-alt',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];
                return `
                    <a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i>
                    </a>
                `;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route initialize
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
