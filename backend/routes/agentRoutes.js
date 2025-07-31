import { Router } from "express";
import { addAgent,getAgents } from "../controllers/agentController.js";
const agentRouter = Router();

agentRouter.post('/agents',addAgent);
agentRouter.get('/agents',getAgents);

export default agentRouter;