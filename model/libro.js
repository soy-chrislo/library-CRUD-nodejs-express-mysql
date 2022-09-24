module.exports={
    get:function(conection, callback){
        conection.query("SELECT * FROM libros", callback);
    },
    insert:function(conection, data, files, callback){
        //conection.query("INSERT INTO libros SET ?", data, callback);
        conection.query("INSERT INTO libros ( nombre, imagen ) VALUES ( ?, ? )", [data.nombre, files.filename], callback);
    },
    returnDataID:function(conection, id, callback){
        conection.query("SELECT * FROM libros WHERE id=?", [id], callback)
    },
    remove: function(conection, id, callback){
        conection.query("DELETE FROM libros WHERE id=?", [id], callback);
    },
    actualizar: function(conection, data, callback){
        conection.query("UPDATE libros SET nombre=? WHERE id=?", [data.nombre, data.id], callback);
    },
    actualizarArchivo: function(conection, data, file, callback){
        conection.query("UPDATE libros SET imagen=? WHERE id=?", [file.filename, data.id], callback);
    }

}