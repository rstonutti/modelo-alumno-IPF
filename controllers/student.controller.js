const { request, response } = require("express");

const ctrlHome = {};

const Student = require('../models/student.js');

//Devuelven todos los alumnos inscriptos en la db.
ctrlHome.rutaDB = async (req = request, res = response) => {
    try {
        const student = await Student.find();
        res.json({
            msg: "Los alumnos inscriptos son:",
            student
        });
    } catch (error) {
        console.log('Error al mostrar los datos de los alumnos: ', error);
    }
};

//Devuelve los datos del alumnos usando el parametro ID en la ruta.
ctrlHome.rutaGet = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id);
        res.json({
            student
        });
    } catch (error) {
        console.log('Error al mostrar los datos del alumno: ', error);
    }
};

//Agrega los datos de un alumno nuevo a la db.
ctrlHome.rutaPost = async (req = request, res = response) => {
    const body = req.body;
    try {
        const student = new Student(body);
        await student.save();
        res.json({
            msg: 'Alumno agregado exitosamente',
            student
        });
    } catch (error) {
        console.log('Error al guardar los datos del alumno: ', error);
    };
};

//Actualiza los datos de un alumno usando el ID como parametro.
ctrlHome.rutaPut = async (req = request, res = response) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const student = await Student.findByIdAndUpdate(id, body, {new: true})
        res.json({
            msg: "Datos del alumno actualizados exitosamente",
            student
        });
    } catch (error) {
        console.log('Error al actualizar los datos del alumno: ', error);
    }
};

//Elimina los datos de un alumno usando el ID como parametro.
ctrlHome.rutaDelete = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        await Student.findByIdAndDelete(id)
        res.json({
            msg: "Alumno borrado de la base de datos exitosamente"
        });
    } catch (error) {
        console.log('Error al borrar los datos del alumno: ', error);
    }
};

module.exports = ctrlHome;