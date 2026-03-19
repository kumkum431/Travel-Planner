import { Router } from "express";
import {signIn,signUp} from "../controllers/auth.controller.js"

const router =Router()

router.post("/signIn",signIn)
router.post("/signUp",signUp)

export default router