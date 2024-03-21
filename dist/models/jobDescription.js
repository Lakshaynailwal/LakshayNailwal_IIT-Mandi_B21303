"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//defining the schema for job model
const jobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stipend: {
        type: Number,
        required: true
    },
    jobIcon: {
        type: String
    }
});
//defining the model for above schema
const jobModel = mongoose_1.default.model("jobDescription", jobSchema);
exports.default = jobModel;
