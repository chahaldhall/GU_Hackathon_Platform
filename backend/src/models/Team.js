import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    domain: { type: String }, // e.g., AI, Web, Blockchain
    skillsNeeded: [{ type: String }],
    isLookingForMembers: { type: Boolean, default: false },
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    hackathon: { type: String }, // name or id of GU event
    requests: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
      }
    ]
  },
  { timestamps: true }
);

const Team = mongoose.model('Team', TeamSchema);
export default Team;








