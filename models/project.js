import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
  title: String,
  description: String,
  explanation: String,
  amount: Number,
  createdDate: Date,
  expirationDate: Date,
  images: [{preview:String}],
  video: String,
  donationList: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    donationAmount: Number
  }]
});


const Project = mongoose.model('Project', ProjectSchema);

export default Project;
