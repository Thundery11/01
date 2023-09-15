import express , {Request, Response} from "express"; 
export const app = express();

app.use(express.json())

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<PB> = Request<PB, {}, PB, {} >
type ErrorsMessages = {
  message: string,
  field: string
}
type ErrorType = {
  errorsMessages : ErrorsMessages[]
}
enum AvailableResolution {
    P144="P144", P240= "P240", P360="P360", P480="P480", P720="P720", P1080="P1080", P1440="P1440", P2160="P2160"
}
type VideoType ={
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number  ,
    createdAt: string,
    publicationDate: string,
    availableResolutions: AvailableResolution[]
}
export const videoDb: VideoType[] =[{
    id: 0,
    title: "string",
    author: "string",
    canBeDownloaded: false,
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
  app.get('/videos/:id', (req: RequestWithParams<{id:number}> ,res : Response)=>{
    const id = +req.params.id
    const video = videoDb.find(video => video.id === id)
    if(video){
      
      res.status(200).send(video)
    } else {
      res.sendStatus(404)
    }

  })

app.put('/videos/:id', (req: RequestWithParamsAndBody<{id: number, 
  title: string, author: string, availableResolutions: AvailableResolution[],
  canBeDownloaded : boolean,  minAgeRestriction: number | null, publicationDate: string
 }>, res: Response)=>{
let errors : ErrorType ={
  errorsMessages: []
}
const id = +(req.params.id)
let {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body
if(!title || title.trim().length > 40 || !title.length){
  errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
}
if(!author || !author.length || author.trim().length > 20){
  errors.errorsMessages.push({message: 'invalid author', field: 'author'})
}
if(Array.isArray(availableResolutions) && availableResolutions.length){
  availableResolutions.map(v =>{
    !AvailableResolution[v] && errors.errorsMessages.push({
      message: 'Invalid availableResolutions',
      field: 'availableResolutions'
    })
  }) 
}else{
    availableResolutions = []
  }
if(typeof canBeDownloaded !== "boolean"){
  errors.errorsMessages.push({
    message: 'not valid type',
    field: 'canBeDownloaded'
  })
} 

if(!minAgeRestriction || typeof minAgeRestriction !== 'number' || minAgeRestriction > 18 ){
  errors.errorsMessages.push({
    message: 'not valid minAgeRestriction',
    field: 'minAgeRestriction'
  })
} 

if(errors.errorsMessages.length){
  res.status(400).send(errors)
  return
}

const video = videoDb.find(v => v.id === id)
if (video){
  video.author = author
  video.title = title
  video.availableResolutions = availableResolutions
  video.canBeDownloaded = canBeDownloaded 
  video.minAgeRestriction = minAgeRestriction
  video.publicationDate = publicationDate
  res.send(204)

} else{
  res.send(404)
}
})



  app.post('/videos', (req: RequestWithBody<{ title: string,
  author: string,
  availableResolutions: AvailableResolution[]}> , res : Response)=>{
    let errors : ErrorType = {
      errorsMessages: []
    }
    let {title, author, availableResolutions} = req.body

    if (!title || !title.length || title.trim().length > 40 ){
      // res.sendStatus(400).send({errorsMessages:[{message:'Invalid title', field: 'title'}]})
      errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
      
    }

    if(!author || author.trim().length > 20 || !author){
      errors.errorsMessages.push({message: 'Invalid author', field: 'author'})
    }

    if(Array.isArray(availableResolutions) && availableResolutions.length){
    availableResolutions.map((r) =>{
      !AvailableResolution[r] && errors.errorsMessages.push({
        message: 'Invalid availableResolutions',
        field: "availableResolutions",
    })  
    })
  } else {
    availableResolutions = []
  }
  if(errors.errorsMessages.length){
    res.status(400).send(errors)
    return
  }

  const createdAt = new Date()
  const publicationDate = new Date()
  publicationDate.setDate(createdAt.getDate() + 1)
  const newVideo: VideoType ={
    id: +(new Date()),
    title,
    author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: createdAt.toISOString(),
    publicationDate:publicationDate.toISOString(),
    availableResolutions
  }
  videoDb.push(newVideo)
  res.status(201).send(newVideo)

  })

  app.delete('/testing/all-data', (req: Request, res: Response)=>{
    videoDb.length = 0
    res.sendStatus(204).send()
  })

  app.delete('/videos/:id', (req: RequestWithParams<{id : number}>, res: Response)=>{
    const id = +(req.params.id)
    const videoFordelete = videoDb.find(v => v.id === id)
    if(!videoFordelete){
      res.sendStatus(404) // not executed
    }
for(let i = 0; i < videoDb.length; i++){
  if(videoDb[i].id === id){
    videoDb.splice(i, 1)
    res.sendStatus(204).send()
    return
  }
}
  })