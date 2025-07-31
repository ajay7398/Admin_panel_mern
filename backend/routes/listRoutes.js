import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import {
  uploadAndDistribute,
  getDistributedLists
} from '../controllers/listController.js';
// import { protect } from '../middleware/authMiddleware.js';

const listRouter = express.Router();

listRouter.post('/upload', upload.single('file'), uploadAndDistribute);

// 👇 NEW GET route
listRouter.get('/', getDistributedLists);

export default listRouter;
