/** @format */

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: { type: String, reqired: true },
      company: { type: String, reqired: true },
      location: { type: String },
      from: { type: Date, reqired: true },
      to: { type: Date },
      current: { type: Date, reqired: true },
      description: { type: String }
    }
  ],
  education: [
    {
      school: { type: String, reqired: true },
      degree: { type: String, reqired: true },
      fieldofstudy: { type: String, reqired: true },
      from: { type: Date, reqired: true },
      to: { type: Date },
      current: { type: Date, reqired: true },
      description: { type: String }
    }
  ],
  social: {
    youtube: { String },
    twitter: { String },
    facebook: { String },
    linkedin: { String },
    instagram: { String }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
