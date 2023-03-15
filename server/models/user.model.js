const mongoose = require('mongoose')
//mongoose is an odm (orm) package or library which means that it converts javascript objects into mongodb documents 


const Schema = mongoose.Schema;         //schema is the fundamental structer of a document
//model > schema > collections > document > fields

const UserSchema = new Schema({
    firstname:{type:String, require:true},
    lastname:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password :{type:String, require:true}
},)


module.exports = mongoose.model('userdata', UserSchema );        //from here you are exporting the model created as userdata

