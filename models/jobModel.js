import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const jobSchema = new Schema({
  appliedDate: {type: Date, required: true},
  companyName: {type: String, required: true},
  location: { type: String, required: true },
  title: { type: String, required: true },
  skills: {type: [String], required: true},
  status: {type: String, required: true},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

// const JobApplied = models.JobApplied || model('JobApplied', jobSchema)  //check first if there's a existing model called JobApplied to avoid error

// export default JobApplied;

module.exports = mongoose.models?.JobApplied || mongoose.model('JobApplied', jobSchema)