import axios from "axios"
import Movie from "../model/Movie.js";
import Show from "../model/Show.js";

export const getNowPlayingMovies=async(req,res)=>{
    try{
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing',
    {
        headers:{Authorization:`Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`}
     });
     const movies=data.results;
     res.json({success:true, movie:movies})

    }catch(error){
        console.error(error);
     res.json({success:false, message:error.message});
    }
}

export const addShow=async(req, res)=>{
    try{
    const {movieId,  showsInput, showPrice} = req.body
    let movie= await Movie.findById(movieId)

if(!movie){
     //fetch movie deetails and credits from TMDB api
     const [movieDetailsResponse, movieCreditsResponse]= await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,{ headers:{Authorization:`Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`}}),

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,{headers:{Authorization:` Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`}})
    ]);
    const MovieApiData=movieDetailsResponse.data;
    const MovieCreditsData=movieCreditsResponse.data;

    const movieDetails={
        _id: movieId,
        title: MovieApiData.title,
        overview:MovieApiData.overview,
        poster_path: MovieApiData.poster_path,
        backdrop_path:MovieApiData.backdrop_path,
        genres: MovieApiData.genres,
        casts:MovieApiData.casts,
        release_date:MovieApiData.release_date,
        original_language: MovieApiData.original_language,
        tagline: MovieApiData.tagline || " ",
        vote_average:MovieApiData.vote_average,
        vote_count: MovieApiData.vote_count,
        runtime: MovieApiData.runtime,
    }
  movie = await  Movie.create(movieDetails); 

}

const showsToCreate=[];
showsInput.forEach(show => {
    const showDate = show.date;
    show.time.forEach((time)=>{
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
            movie:movieId,
            showDateTime:new Date(dateTimeString),
            showPrice,
            occupiedSeats:{}

        })
    })
    
});

if(showsToCreate.length > 0){
 await Show.insertMany(showsToCreate)

}
res.json({success:true, message:'Show Added successfully. '})

    }catch(error){
        console.error(error);
        res.json({success:false, message:error.message});
    }
}

export const getShows=async(req, res)=>{
    try{
         const shows=await Show.find({showDateTime:{$gte: new Date()}}).populate('movie').sort({showDateTime:1});
         
         const uniqueShows= new Set(shows.map(show=>show.movie))
          res.json({success:true , shows:Array.from(uniqueShows)})

    }catch(error){
        console.error(error);
        res.json({success:false, message:error.message});

    }
}

//get single show

export const getShow=async(req,res)=>{
    try{
             const {movieId} = req.params;
             const show= await Show.find({movie:movieId , showDateTime:{$gte: new Date()}});
             const movie= await Movie.findById(movieId)

             const datetime={}

             show.forEach((show)=>{
             const date = show.showDateTime.toISOString().split("T")[0];
             if(!datetime[date]){
                datetime[date]=[];
             }
             datetime[date].push({time:show.showDateTime, showId:show._id})

    })
    res.json({success:true, movie, datetime })


    }catch(error){
        console.error(error);
        res.json({success:false, message:error.message});
    }
}