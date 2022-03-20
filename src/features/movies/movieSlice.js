import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";



export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
    async (term) => {
        
      const response = await movieApi
          .get(`?apiKey=${APIKey}&s=${term}&type=movie`)
          .catch((err) => {
              console.log("Error :" + err);
          });
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",
    async (term) => {
        
        const response = await movieApi
            .get(`?apiKey=${APIKey}&s=${term}&type=series`)
            .catch((err) => {
                console.log("Error :" + err);
            });
      return response.data;
    }
);
  
export const fetchAsyncMovieShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieShowDetail",
    async (id) => {
        const response = await movieApi
            .get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
            .catch((err) => {
                console.log("Error :" + err);
            });
      return response.data;
    }
  );

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow:{}
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addMovies: (state, { payload }) => {
    //   state.movies = payload;
    //   },
      removeSelectedMovieOrShow: (state) => {
          state.selectMovieOrShow ={}
      }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
      },
      [fetchAsyncShows.fulfilled]: (state, { payload }) => {
        console.log("Fetched Successfully");
        return { ...state, shows: payload };
      },
      [fetchAsyncMovieShowDetail.fulfilled]: (state, { payload }) => {
        console.log("Fetched Successfully");
        return { ...state, selectMovieOrShow: payload };
      },
    [fetchAsyncMovies.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const {
   // addMovies,
    removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
