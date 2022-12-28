import { Schema, model, models } from "mongoose";

const jobSchema = new Schema({
  appliedDate: {type: String, required: true},
  companyName: {type: String, required: true},
  location: { type: String, required: true },
  title: { type: String, required: true },
  skills: { type: String, required: true }
}, {
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})

const JobApplied = models.JobApplied || model('JobApplied', jobSchema)  //check first if there's a existing model called JobApplied to avoid error

export default JobApplied;