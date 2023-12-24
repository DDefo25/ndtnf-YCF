const { Schema } = require('mongoose')

const characterSchema = new Schema({
  name: String,
  description: String,
  modified: String,
  thumbnail: String,
  comics: [{ 
    id: Number, 
    name: String 
    }],
});

module.exports = characterSchema