import { Request } from "express";
import mongoose from "mongoose";

export interface IRequest extends Request{
    id?: mongoose.Types.ObjectId;
}