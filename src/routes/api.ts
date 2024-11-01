import { Router } from 'express';
import * as ApiController from '../controllers/api-controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);
router.get("/profile", authMiddleware, ApiController.profile);
router.get("/refresh", authMiddleware, ApiController.refreshToken);
router.get("/logout", authMiddleware, ApiController.logout);

export default router;
