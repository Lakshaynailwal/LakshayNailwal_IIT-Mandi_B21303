"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobDescription_1 = __importDefault(require("../models/jobDescription"));
// handling diffrent routes for admin
const router = express_1.default.Router();
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // job adding route
    try {
        //getting the data from frontend
        const data = {
            title: req.body.title,
            description: req.body.description,
            stipend: req.body.stipend,
            company: req.body.company,
            location: req.body.location,
            jobIcon: req.body.jobIcon
        };
        // creating a new job
        const response = new jobDescription_1.default(data);
        //saving in DB
        yield response.save();
        res.status(200).json({ msg: "Added Succesfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "Something Wrong! Not added!" });
    }
}));
router.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // handling the update request based on id filter
    try {
        //extracting the id from body as string
        const _id = req.body._id ? req.body._id : "";
        if (_id === "") {
            return res.json({ msg: "Something wrong!" });
        }
        //extrating the data and update it for the given id
        yield jobDescription_1.default.findOneAndUpdate({ _id }, { $set: {
                title: req.body.title,
                description: req.body.description,
                stipend: req.body.stipend,
                location: req.body.location,
                iobIcon: req.body.jobIcon,
                company: req.body.company
            } });
        res.status(200).json({ msg: "Updated Succesfully " });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "Something Wrong! Not Update" });
    }
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //handling the delete route based on id
    try {
        //extracting the id
        const _id = req.body._id ? req.body._id : "";
        if (_id === "") {
            return res.status(200).json({ msg: "does not exist" });
        }
        //deleting based on id
        yield jobDescription_1.default.findOneAndDelete({ _id });
        res.status(200).json({ msg: "Deleted Successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "Something Wrong! Not Deleted" });
    }
}));
exports.default = router;
