import express from 'express'
import { addShow, getNowPlayingMovies, getShow, getShows } from '../configs/showController.js';
import { protectedAdmin } from '../middleware/auth.js';

const showRouter=express.Router();
showRouter.get('/now-playing',protectedAdmin, getNowPlayingMovies)
showRouter.post('/add', addShow)
showRouter.get('/all',getShows)
showRouter.get('/:movieId',getShow)


export default showRouter; 