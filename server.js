const express = require('express');
const fs = require('fs');
const connect = require('./connect.js');
const Faculty = require('./models/Faculty.js');
const cors = require('cors');

const app = express();

app.use(cors());
connect();

// app.use(express.urlencoded({ extended: false }));

// code for crud operations using mongoDB
app.use(express.json());

app
  .get('/', (req, res) => {
    const getFaculties = async (req, res) => {
      try {
        const faculty = await Faculty.find();
        res.status(200).json(faculty);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };
    getFaculties(req, res);
  })
  .post('/', (req, res) => {
    const addFaculty = async (req, res) => {
      try {
        const faculty = await Faculty.create(req.body);
        res.status(200).json(faculty);
      } catch (error) {
        res.status(404).json({ message: error });
      }
    };
    addFaculty(req, res);
  })
  .put('/:id', (req, res) => {
    const updateFaculty = async (req, res) => {
      try {
        const faculty = await Faculty.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json(faculty);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };
    updateFaculty(req, res);
  })
  .delete('/:id', (req, res) => {
    const deleteFaculty = async (req, res) => {
      try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        res.status(200).json(faculty);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };
    deleteFaculty(req, res);
  });

// Code for reading from json file without using mongoDB
// app
//   .get('/', (req, res) => {
//     res.send(readStudData());
//   })
//   .post('/', (req, res) => {
//     const studData = readStudData();
//     const newStud = req.body;
//     studData[studData.length] = newStud;
//     writeStudData(studData);
//     res.json(studData);
//   })
//   .delete('/', (req, res) => {
//     let studData = readStudData();
//     const { id } = req.body;
//     studData = studData.filter((stud) => stud.id !== id);
//     writeStudData(studData);
//     res.json(studData);
//   })
//   .put('/', (req, res) => {
//     const studData = readStudData();
//     const stud = req.body;
//     const curStud = studData.find((s) => s.id === stud.id);
//     curStud.name = stud.name;
//     curStud.id = stud.id;
//     curStud.loc = stud.loc;
//     writeStudData(studData);
//     res.json(studData);
//   });

// const readStudData = () => {
//   return JSON.parse(fs.readFileSync('./faculty.json'));
// };
// const writeStudData = (data) => {
//   fs.writeFileSync('./faculty.json', JSON.stringify(data));
// };

app.listen(4000, () => console.log('server has started'));
