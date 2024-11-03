import { createStore } from 'vuex'

export default createStore({
    state: {
        selectedMovie: 1,
    },
    getters: {
        getSelectedMovie: (state) => state.selectedMovie
    },
    mutations: {
        setSelectedMovie(state, movieId) {
            state.selectedMovie = movieId
        }
    },
    actions: {
    },
    modules: {
    }
})
