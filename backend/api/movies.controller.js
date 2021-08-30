import MoviesDAO from "../dao/moviesDAO.js";


export default class MoviesController {
    static async apiGetMovies(req,res,next){
        const moviesPerPage = req.query.moviesPerPage 
        ? parseInt(req.query.moviesPerPage,10) 
        : 20;
        const page = req.query ? parseInt(req.query.page,10):0;

        let filters ={};
        if(req.query.genre) {
            filters.genre = req.query.genre;
        }else if(req.query.name){
            filters.name = req.query.name;
        }

        const {moviesList,totalNumMovies}=
        await MoviesDAO.getMovies({
            filters,
            page,
            moviesPerPage
        })

        let response = {
            movies:moviesList,
            page:page,
            filters:filters,
            enteries_per_page:moviesPerPage,
            totalResults:totalNumMovies,
        };
        res.json(response)
    }

    static async apiGetMoviesById(req,res,next){
        try{
            let id = req.params.id || {};
            let movie = await MoviesDAO.getMoviesByID(id);
            if(!movie){
                res.status(404).json({error:"Not found"});
                return ;
            }
            res.json(movie);
        }catch(e){
            console.log(`api, ${e}`);
            res.status(500).json({error:e})
        }
    }

    static async apiGetGenres(req,res,next){
        try{
            let genres = await MoviesDAO.getGenres();
            res.json(genres);
        }catch(e){
            console.log(`api, ${e}`);
            res.status(500).json({error:e})
        }
    }

}