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
exports.app.get('/videos', (req, res) => {
    res.status(200).send(videoDb);
});
exports.app.get('videos/:id', (req, res) => {
    const id = +req.params.id;
    const video = videoDb.find(video => video.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    else {
        res.status(200).send(video);
    }
});
exports.app.post('/videos', (req, res) => {
    let errors = {
        errorMessages: []
    };
    let { title, author, availableResolutions } = req.body;
    if (!title || !title.length || title.trim().length > 40) {
        errors.errorMessages.push({ message: 'Invalid title', field: 'title' });
    }
    if (!author || author.trim().length > 20 || !author) {
        errors.errorMessages.push({ message: 'Invalid author', field: 'author' });
    }
    if (Array.isArray(availableResolutions) && availableResolutions.length) {
        availableResolutions.map((r) => {
            !AvailableResolution[r] && errors.errorMessages.push({
                message: 'Invalid availableResolutions',
                field: "availableResolutions",
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (errors.errorMessages.length) {
        res.sendStatus(400).send(errors);
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);
    const newVideo = {
        id: +(new Date()),
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions
    };
    videoDb.push(newVideo);
    res.status(201).send(newVideo);
});
