var express = require('express'); 
var router = express.Router();
var librosController = require('../controllers/librosController.js');
var multer = require('multer');
var fecha = Date.now();
var rutaAlmacen = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './public/images/');
    },
    filename:function(request, file, callback){
        console.log(file);
        callback(null, fecha + "_" + file.originalname)

    }
});
var cargar = multer({ storage: rutaAlmacen });

router.get('/', librosController.index);
router.get('/crear', librosController.crear);
// Si hay un error, cambiar la comilla simple por doble.
router.post('/', cargar.single('imagen') ,librosController.guardar);

router.post('/eliminar/:id', librosController.eliminar);
router.get('/editar/:id', librosController.editar);

router.post('/actualizar/:id', cargar.single('imagen'), librosController.actualizar);



module.exports = router;