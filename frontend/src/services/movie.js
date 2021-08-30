import http from '../http-common';

class MovieDataService {
    getAll(page = 0){
        return http.get(`movies?page=${page}`);
    }

    get(id){
        return http.get(`/movies?id=${id}`);
    }

    find(query,by="name",page=0) {
        return http.get(`movies?${by}=${query}&page=${page}`);
    }

    createReview(data){
        return http.post("/review-new",data);
    }

    updateReview(data){
        return http.put("/review-edit",data);
    }

    deleteReview(id,userId){
        return http.delete(`/review-delete?id=${id}`,{
            data: {user_id:userId},
        });
    }

    getGenres(id){
        return http.get(`/genres`);
    }
}

export default new MovieDataService();