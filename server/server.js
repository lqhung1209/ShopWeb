const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

// const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nlsywhz.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const createdDate = new Date()
      .toISOString()
      .replaceAll('-', '')
      .replaceAll(':', '')
      .replaceAll('.', '');
    cb(null, createdDate + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const chatRoutes = require('./routes/chat');

const whitelist = [
  `${process.env.SERVER_URL}`,
  `${process.env.CLIENT_URL}`,
  `${process.env.ADMIN_URL}`,
];
app.use(
  cors({
    origin: whitelist,
    // origin: function (origin, callback) {
    //   console.log(origin);
    //   if (whitelist.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
    // origin: 'http://localhost:3001',
    // methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    // credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static('images'));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).any('images'));

app.set('trust proxy', 1);
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      // // deploy
      // sameSite: 'none',
      // secure: true,
      // chạy localhost
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60,
      // httpOnly: true,
    },
  })
);

app.get('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});
app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(chatRoutes);
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found!</h1>');
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    const server = app.listen(`${process.env.SERVER_PORT}`);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      // console.log('Client connected' + socket.id);
    });
  })
  .catch(err => {
    console.log(err + 'sssssssssss');
  });
