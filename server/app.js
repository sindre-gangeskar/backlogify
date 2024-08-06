require('dotenv').config();
var express = require('express');
var cors = require('cors');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const corsOptions = {
    origin: process.env.CLIENT_BASEURL,
    credentials: true,
};

console.log('CORS options:', corsOptions);
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

const dbDirectory = path.join(__dirname, 'db');
if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(path.join(__dirname, 'db'));
}

var app = express();

app.set('trust proxy', 'all');

app.use((req, res, next) => {
    if (req.secure) {
        return next();
    }
    res.redirect(`https://${req.headers.host}${req.url}`);
});

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3,
        secure: true
    },
    store: new SQLiteStore({
        ttl: 60 * 60 * 3,
        pruneInterval: 60 * 60 * 15,
        dir: path.join(__dirname, 'db'),
        db: 'sessions.db'
    })
}));

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
