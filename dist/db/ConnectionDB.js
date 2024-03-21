"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//setting the url of DB
const URL = "mongodb+srv://nailwal001:Cz1i2Gwc6oIDgd3H@forsthack.eqmilza.mongodb.net/";
const connection = () => {
    //connecting to DB
    mongoose_1.default.connect(URL).then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.log(err);
    });
};
exports.connection = connection;
