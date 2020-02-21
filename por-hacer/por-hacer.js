


const fs = require('fs');

//guardar datos en json
let listadoPorHacer = [];

const guardarDB = () => {

   let data =  JSON.stringify (listadoPorHacer);
   
   fs.writeFile('db/data.json', data, (err) => {
    if (err) throw new Error('No se pudo grabar', err);
    console.log('el archivo ha sido guardado.');
  });


}

//leer json
const cargarDB = () => {
   //si esto no se hace correctamente
   try {
     listadoPorHacer = require('../db/data.json');
     //listadoPorHacer va a ser igual a un arreglo vacío
   } catch (error) {
     listadoPorHacer = [];
   }
  
   

}








const crear = (descripcion) => {

   //leer json
   cargarDB();

   //tarea por hacer
   let porHacer = {
       descripcion: descripcion,
       completado: false,
   };
   listadoPorHacer.push(porHacer);


   //guardar datos
   guardarDB();
   return porHacer;
}



//hacer que retorne todo el arreglo de listado
const getListado = () => {
   cargarDB();
   return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

   cargarDB();

   let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);
      if (index >= 0) {
         listadoPorHacer[index].completado = completado;
         guardarDB();
         return true;

      } else {
         return false;
      }
   }


const borrar = (descripcion) => {
   //cargo la "base de datos"
   cargarDB();
   //creo un nuevo listado con todas las tareas que NO tengan la descripción igual a la que le mande por parametro con el comando borrar.
   let nuevoListado = listadoPorHacer.filter(tarea => {
      return tarea.descripcion !== descripcion;
   });


   //Si el largo de listadoPorHacer es exactamente igual a nuevoListado, significa que la tarea no se borró, y regreso false.
   if (listadoPorHacer.length === nuevoListado.length){
      return false;
   }

   //de lo contrario SI se borró la tarea, el valor de listadoPorHacer va a ser igual a nuevoListado
   else{
      listadoPorHacer = nuevoListado;
      //guardo los nuevos datos y regreso true.
      guardarDB();
      return true;
   }
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}