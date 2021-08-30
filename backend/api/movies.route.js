import MoviesCtrl from "./movies.controller.js";
import ReviewsCtrl from './reviews.controller.js';
import  express  from 'express';

const router = express.Router();

//router.route("/").get((req,res)=>res.send("Hello World"));
router.route("/").get(MoviesCtrl.apiGetMovies);
router.route("/id/:id").get(MoviesCtrl.apiGetMoviesById);
router.route("/genres").get(MoviesCtrl.apiGetGenres);

router.route("/reviews").post(ReviewsCtrl.apiPostReview)
                        .put(ReviewsCtrl.apiUpdateReview)
                        .delete(ReviewsCtrl.apiDeleteReview);

export default router;