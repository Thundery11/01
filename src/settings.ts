import express , {Request, Response} from "express"; 
import bodyParser from "body-parser";
export const app = express();

app.use(express.json())

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type ErrorMessages = {
  message: string,
  field: string
}
type ErrorType = {
  errorMessages : ErrorMessages[]
}
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

  app.get('/videos', (req : Request, res : Response)=>{
    res.status(200).send(videoDb);
  })
  app.get('videos/:id', (req: RequestWithParams<{id:number}> ,res : Response)=>{
    const id = +req.params.id
    const video = videoDb.find(video => video.id === id)
    if(!video){
      res.sendStatus(404)
      return
    } else {
      res.status(200).send(video)
    }

  })



  app.post('/videos', (req: RequestWithBody<{ title: string,
  author: string,
  availableResolutions: AvailableResolution[]}> , res : Response)=>{
    let errors : ErrorType = {
      errorMessages: []
    }
    let {title, author, availableResolutions} = req.body

    if (!title || !title.length || title.trim().length > 40 ){
      errors.errorMessages.push({message: 'Invalid title', field: 'title'})
    }

    if(!author || author.trim().length > 20 || !author){
      errors.errorMessages.push({message: 'Invalid author', field: 'author'})
    }

    if(Array.isArray(availableResolutions) && availableResolutions.length){
    availableResolutions.map((r) =>{
      !AvailableResolution[r] && errors.errorMessages.push({
        message: 'Invalid availableResolutions',
        field: "availableResolutions",
    })  
    })
  } else {
    availableResolutions = []
  }
  if(errors.errorMessages.length){
    res.sendStatus(400).send(errors)
    return
  }

  const createdAt = new Date()
  const publicationDate = new Date()
  publicationDate.setDate(createdAt.getDate() + 1)
  const newVideo: VideoType ={
    id: +(new Date()),
    title,
    author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: createdAt.toISOString(),
    publicationDate:publicationDate.toISOString(),
    availableResolutions
  }
  videoDb.push(newVideo)
  res.status(201).send(newVideo)

  })

  app.delete('/videos', (req: Request, res: Response)=>{
    videoDb.length = 0
    res.sendStatus(204).send()
  })

  app.delete('/videos/:id', (req: RequestWithParams<{id : number}>, res: Response)=>{
    const id = +(req.params.id)
for(let i = 0; i < videoDb.length; i++){
  if(videoDb[i].id === id){
    videoDb.splice(i, 1)
    res.sendStatus(204).send()
    return
  } else{
    res.sendStatus(404).send('sorry, can`t find video')
  }
}
  })