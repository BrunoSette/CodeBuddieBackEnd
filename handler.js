"use strict";

require("dotenv").config({ path: "./variables.env" });
const connectToDatabase = require("./db");
const User = require("./models/Users");
const Room = require("./models/Rooms");

// var callbackDefault = function(param1, param2) {

// }


// var createUser = function(event, context, callback) {
//   var userTemp = null;
  
//   connectToDatabase()
//     .then(User.create(JSON.parse(event.body)))
//     .then(e => this.userTemp = e)
//     .catch(err => )

//   var user = {
//     nome: this.userTemp.nome,
//     email: this.userTemp.email,
//     token: 'ahsuahfuahgeuageokfaenqmevoqe'
//   }

//   callback(null, {
//     statusCode: 200,
//     body: JSON.stringify(user)
//   })

// }


//Falta Verificar se o Usuário já está criado => User.find({email:'email'}).count()
module.exports.createUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    if (User.find({ email: "email" }).count() === 0  ){
    .then(() => User.create(JSON.parse(event.body)))
    .then(note =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(note)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not create the user."
      })
    );
};

module.exports.createRoom = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Room.create(JSON.parse(event.body)))
    .then(room =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(room)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not create the Room."
      })
    );
};

module.exports.getOneUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => User.findById(event.pathParameters.id))
    .then(note =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(note)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the user."
      })
    );
};

module.exports.getAllUsers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return connectToDatabase()
    .then(() => User.find())
    .then(codeUser =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(codeUser)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the codeUser."
      })
    );
};

module.exports.getRooms = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const Page_size = 10;
  const Skips = Page_size * (event.pathParameters.id - 1);
  return connectToDatabase()
    .then(() =>
      Room.find()
        .skip(Skips)
        .limit(Page_size)
    ) //
    .then(codeUser =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(codeUser)
      })
    )

    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not get all rooms."
      })
    );
};

module.exports.getAllRooms = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Room.find()) //
    .then(codeUser =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(codeUser)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not get all rooms."
      })
    );
};

module.exports.updateUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      User.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
        new: true
      })
    )
    .then(note =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(note)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not fetch the codeUser."
      })
    );
};

module.exports.updateRoom = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Room.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
        new: true
      })
    )
    .then(note =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(note)
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could update a room."
      })
    );
};

module.exports.deleteUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => User.findByIdAndRemove(event.pathParameters.id))
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Removed user with id: " + user._id,
          user: user
        })
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could not delete the user."
      })
    );
};

module.exports.deleteRoom = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Room.findByIdAndRemove(event.pathParameters.id))
    .then(room =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Removed room with id: " + room._id,
          room: room
        })
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: "Could delete the room."
      })
    );
};
