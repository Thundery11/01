import request from 'supertest'
import {app} from '../src/settings'
describe('/videos', ()=>{
    it('should return 200 and array of objects', async ()=>{
      await  request(app)
        .get('/videos')
        .expect(200)
    })
    it('should return 404 for not exiting video', async ()=>{
        await  request(app)
        .get('/videos/2323223')
        .expect(404)
    })




})