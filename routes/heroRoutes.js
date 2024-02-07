import express from 'express';
import {
    uploadPic, display, updatePic, deletePic
} from '../controllers/heroController.js'
import upload from "../middlewares/multer.js"

export const heroRouter = express.Router();

heroRouter.post('/upload', upload.single('picture'), uploadPic)
heroRouter.get('/display', display)
heroRouter.put('/update',upload.single('picture'),updatePic )
heroRouter.delete('/deletepic', deletePic)