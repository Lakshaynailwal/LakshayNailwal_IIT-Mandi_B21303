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
const ConnectionDB_1 = require("./db/ConnectionDB");
const jobDescription_1 = __importDefault(require("./models/jobDescription"));
const admin_1 = __importDefault(require("./routes/admin"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const Port = 4000;
//Connection to DB
(0, ConnectionDB_1.connection)();
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // to get json data from body
app.get("/", (req, res) => {
    res.json({ msg: "Hi from API" });
});
app.get("/jobs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //pagination
        const page = req.query.page ? parseInt(req.query.page) : 1;
        //setting indexes for limiting
        const stIndex = (page - 1) * 6;
        const edIndex = page * 6;
        //Total no of jobs
        const totalCount = yield jobDescription_1.default.countDocuments({});
        // Forward and Previous controls
        const isNext = edIndex < totalCount ? true : false;
        const isPrev = stIndex > 0 ? true : false;
        //searching
        const filterString = req.query.filter ? req.query.filter : "";
        // searching via filter string 
        // checking case insensitive checking in title location and company
        const allJobs = yield jobDescription_1.default.find({
            $or: [
                { title: { $regex: filterString, $options: 'i' } },
                { location: { $regex: filterString, $options: 'i' } },
                { company: { $regex: filterString, $options: 'i' } }
            ]
        }).limit(6).skip(stIndex);
        res.status(200).json({ data: allJobs, isNext, isPrev, total: totalCount });
    }
    catch (error) {
        res.status(401).send("Error Occured");
        console.log(error);
    }
}));
//defining the admin routes
app.use("/admin", admin_1.default);
//Listing the app at 4000 port
app.listen(Port, () => {
    console.log("Running...");
});
