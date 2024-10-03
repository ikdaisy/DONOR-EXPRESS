import { Router } from "express";
import * as rh from "./requestHandler.js";

const router = Router()
router.route("/adddonor").post(rh.addDonor)
router.route("/getdonors").get(rh.getDonors)
router.route("/getdonor/:_id").get(rh.getDonor)
router.route("/updatedonor/:_id").put(rh.updateDonor)
router.route("/deletedonor/:_id").delete(rh.deleteDonor)
router.route("/signup").post(rh.signUp)
router.route("/signin").post(rh.signIn)




export default router