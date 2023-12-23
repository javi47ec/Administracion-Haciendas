const express = require('express');
const mongoose = require('mongoose');
const app = express();  


// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Configurar Express para servir archivos estáticos desde la carpeta public
app.use(express.static("/public"));

// Configuración de la aplicación Express
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Conexión a la base de datos MongoDB 
const mongoURI = 'mongodb://127.0.0.1:27017/myHacienda';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err));

// Verificar la conexión a la base de datos
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log('Se conectó correctamente a MongoDB');});

// Rutas y lógica de la aplicación
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const haciendaRouter = require('./routes/haciendaRouter');
app.use('/haciendas', haciendaRouter);
const animalRouter = require('./routes/animalRouter');
app.use('/animales', animalRouter);
const cultivoRouter = require('./routes/cultivoRouter');
app.use('/cultivos', cultivoRouter);
const empleadosRouter = require('./routes/empleadoRouter');
app.use('/empleados', empleadosRouter);
const parcelaRouter = require('./routes/parcelaRouter');
app.use('/parcelas', parcelaRouter);
const maquinariaRouter = require('./routes/maquinariaRouter');
app.use('/maquinarias', maquinariaRouter);


// Puerto en el que se ejecutará la aplicación Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}`));
