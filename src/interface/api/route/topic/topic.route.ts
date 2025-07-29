import { Router } from "express";
import { Di } from "../../../../shared/di/init.di";

const router = Router();
const { topicController } = Di.getInstance();

router.get("/", topicController.getAllTopics);
router.get("/:id", topicController.getTopicById);
router.post("/", topicController.createTopic);
router.put("/:id", topicController.updateTopic);
router.delete("/:id", topicController.deleteTopic);

export { router };