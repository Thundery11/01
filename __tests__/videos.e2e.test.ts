import request from 'supertest'
import {app, videoDb} from '../src/settings'
describe('/testing/all-data', ()=>{
    it('should return 204 and delete all videos',async () => {
        await request(app)
        .delete('/testing/all-data')
        .expect(204)
    })
    it('should return 200 and array of objects', async ()=>{
      await  request(app)
        .get('/videos')
        .expect(200, videoDb)
    })
    it('should return 404 for not exiting video', async ()=>{
        await  request(app)
        .get('/videos/2323223')
        .expect(404)
    })
    it('should return 201 and create new video',async () => {
const video = {
title: 'string',
author: 'string',
availableResolutions:['P144']
}

       const res = await request(app)
        .post('/videos')
        .send(video)
        .expect(201)

        expect(res.body).toEqual({
            id: expect.any(Number),
            title:video.title,
            author: video.author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt:expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: [
            'P144'            ]

        }
        
        )
    })

    // it('should return 200 and array of objects',async () => {
    //     await request(app)
    //     .get(+videoDb[1].id)
    // })




})