
const descripcion = {
   alias: 'd', //alias es para abreviar la opción --descripción por simplemente -d
   desc: 'Descripción de la tarea por hacer',
   demand: true, //hacer obligatorio una opción / parametro
};

const completado = {
   alias: 'c', //alias es para abreviar la opción --completado por simplemente -c
   default: true, //si no tiene ningún valor, entonces el valor por defecto será true.
   desc: 'Marca como completado o pendiente la tarea'
}



const argv = require('yargs')
                .command('crear','crea un elemento por hacer', 
                //opciones
                {
                    descripcion
               
               })
               .command('actualizar','actualiza el estado completado de una tarea',
               //opciones
               {
                    descripcion,
                    completado
                
                })
                .command('borrar','borra un elemento', 
                //opciones
                {
                    descripcion
               
               })
                .help() // para tener la opción de ayuda
                .argv; // hay que regresar el argv al final.

//es necesario exportar argv para usarlo en otros archivos (app.js) 
 module.exports = {
     argv
 }