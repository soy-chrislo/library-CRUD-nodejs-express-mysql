var con = require('../config/conection.js');
var libro = require('../model/libro.js');
var fs = require('fs');

module.exports = {
    // req = lo que se solicita.
    // res = lo que se responde.
    index:function(req, res){
        libro.get(con, function(err, data){
            if (err) throw err;
            console.log(data);
            res.render('./libros/index', { title: 'Aplicación de Libros', libros: data });
        })
        
    },
    crear:function(req, res){
        res.render('./libros/crear');
    },
    guardar:function(req, res){
        libro.insert(con, req.body, req.file, function(err){
            // Gracias al patrón de arquitectura, redirect() envia directamente a /views. 
            if (err) throw err;
            res.redirect('/libros');
        });
        // En /routes/libros.js se crea el atributo filename que es una función.
        console.log(req.filename);
        console.log(req.body);
    },
    // send() vs render()
    eliminar:function(req, res){
        console.log("Recepción de datos");
        console.log(req.params.id);
        libro.returnDataID(con, req.params.id, function(err, data){
            if (err) throw err;
            console.log(data);
            var rutaImagen = 'public/images/' + data[0].imagen;

            if (fs.existsSync(rutaImagen) && rutaImagen != 'public/images/'){
                fs.unlinkSync(rutaImagen);
            }
            console.log(rutaImagen);
            libro.remove(con, req.params.id, function(err){
                if (err) throw err;
                res.redirect('/libros');
            });
        })
    },
    editar: function(req, res){
        libro.returnDataID(con, req.params.id, function(err, data){
            //console.log(data[0]);
            res.render('./libros/editar', { libro: data[0] });
        });
    },
    actualizar: function(req, res){
        if (req.body.nombre){
            libro.actualizar(con, req.body, function(err){
                if (err) throw err;
            });
        }
        if (req.file){
            if(req.file.filename){
                libro.returnDataID(con, req.body.id, function(err, data){
                    if (err) throw err;
                    console.log(data[0]);
                    var rutaImagen = 'public/images/' + (data[0].imagen);
                    if(fs.existsSync(rutaImagen) && rutaImagen !== 'public/images/'){
                        fs.unlinkSync(rutaImagen);
                    }
                    libro.actualizarArchivo(con, req.body, req.file, function(err){
                        if (err) throw err;
                    });
                });
            }
        }
        res.redirect('/libros');

        
    }
}

