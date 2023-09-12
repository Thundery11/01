"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
var AvailableResolution;
(function (AvailableResolution) {
    AvailableResolution["P144"] = "P144";
    AvailableResolution["P240"] = "P240";
    AvailableResolution["P360"] = "P360";
    AvailableResolution["P480"] = "P480";
    AvailableResolution["P720"] = "P720";
    AvailableResolution["P1080"] = "P1080";
    AvailableResolution["P1440"] = "P1440";
    AvailableResolution["P2160"] = "P2160";
})(AvailableResolution || (AvailableResolution = {}));
const videoDb = [{
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-09-12T15:45:16.047Z",
        publicationDate: "2023-09-12T15:45:16.047Z",
        availableResolutions: [
            AvailableResolution.P144
        ]
    }];
