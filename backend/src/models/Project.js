import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    tags: [{ type: String }],
    repoUrl: { type: String },
    demoUrl: { type: String },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' }
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);
export default Project;








