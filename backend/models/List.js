import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  data: [{ FirstName: String, Phone: String, Notes: String }]
});

export default mongoose.model('List', listSchema);
