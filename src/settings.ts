import express from "express"; 
import bodyParser from "body-parser";
export const app = express();

app.use(express.json())
enum AvailableResolution {
    P144="P144", P240= "P240", P360="P360", P480="P480", P720="P720", P1080="P1080", P1440="P1440", P2160="P2160"
}
type VideoType ={
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: AvailableResolution[]



}
const videoDb: VideoType[] =[{
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
  }]