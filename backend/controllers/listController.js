import fs from 'fs';
import csv from 'csv-parser';
import List from '../models/List.js';
import Agent from '../models/Agent.js';

export const uploadAndDistribute = async (req, res) => {
  const filePath = req.file.path;
  const items = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      items.push(row);
    })
    .on('end', async () => {
      try {
        // Step 1: Remove all existing distributed lists
        await List.deleteMany({});

        // Step 2: Fetch all agents
        const agents = await Agent.find();

        // Step 3: Calculate chunk size and distribute
        const chunkSize = Math.floor(items.length / agents.length);
        let index = 0;

        for (let i = 0; i < agents.length; i++) {
          // Distribute remainder items to the first few agents
          const chunk = items.slice(index, index + chunkSize + (i < items.length % agents.length ? 1 : 0));
          await List.create({ agentId: agents[i]._id, data: chunk });
          index += chunk.length;
        }

        // Step 4: Delete uploaded file from server
        fs.unlinkSync(filePath);

        res.json({ message: "Distributed successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to distribute lists" });
      }
    });
};



export const getDistributedLists = async (req, res) => {
  try {
    const lists = await List.find().populate('agentId', 'name email mobile');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch lists' });
  }
};