import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import { useQuery } from 'react-query';
import styled from "styled-components";
import back from '../assets/back.png';
import likeFilled from '../assets/like-filled.png';
import like from '../assets/like.png';
import { Movie } from '../components';
import { api, getData, IMAGE_URL, MOVIE_DB_API_KEY, ROUTES, storeData } from '../utils';

const MovieDetails = ({ route, navigation }) => {
    const { movie } = route.params;
    const [movieInfo, setMovieInfo] = useState(null);
    const [genres, setGenres] = useState(null);

    const [liked, setLiked] = useState(false);

    const recommended = useQuery({
        queryKey: 'movieRecommendation',
        queryFn: () => api.get(`${movie?.id}/recommendations?api_key=${MOVIE_DB_API_KEY}`)
    });
    
    const { data, isLoading, isFetched } = useQuery({
        queryKey: 'movieDetails',
        queryFn: () => api.get(`${movie?.id}?api_key=${MOVIE_DB_API_KEY}&append_to_response=credits`)
    });

    useEffect(() => {
        if (isFetched) {
            setMovieInfo(data);
            let _genres = [];
            data?.genres?.map(genre => _genres.push(genre.name));
            setGenres(_genres?.join(', '));
        }
    }, [isLoading, isFetched, data]);

    const loadFav = async () => await getData('favMovie') || [];

    checkIfMovieIsLiked = async () => {
        const favMovies = await loadFav();
        const isPreviouslyLiked = favMovies?.find(item => item.id === movie.id);

        if (isPreviouslyLiked?.id) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(async () => {
        const check = await checkIfMovieIsLiked();
        setLiked(check);
    }, []);

    const moveToDetails = item => navigation.push(ROUTES.MOVIE_DETAILS, { movie: item });

    const likeMovie = async () => {
        let favMovie;
        if (liked) {
            // you want to unlike
            favMovie = await loadFav();
            favMovie = favMovie?.filter(item => item.id !== movie.id);
        } else {
            // you want to like
            favMovie = await loadFav();
            favMovie = [...favMovie, movieInfo];
        }

        await storeData('favMovie', favMovie);
        setLiked(x => !x);
    }

    return (
        <Container>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center',
                        marginTop: 8,
                        marginBottom: 16,
                    }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={back} style={{ width: 32, height: 32 }} />
                        </Pressable>
                        <Title style={{ flex: 1 }}>{movieInfo?.title}</Title>
                    </View>

                    <View style={{ position: 'relative' }}>
                        <Picture source={{ uri: `${IMAGE_URL}w400${movieInfo?.poster_path}` }} resizeMode="cover" />
                        <Pressable onPress={likeMovie}>
                            <Image
                                source={liked ? likeFilled : like}
                                style={{
                                    position: 'absolute',
                                    bottom: 20, right: 20,
                                    width: 25, height: 23
                                }}
                            />
                        </Pressable>

                    </View>

                    <Overview>
                        <SubTitle>Year of release</SubTitle>: {movieInfo?.release_date}
                    </Overview>
                    {/* <Overview style={{}}>
                        <Rating />
                    </Overview> */}
                    <Overview>
                        <SubTitle>Genre</SubTitle>: {genres}
                    </Overview>
                    <Overview>
                        <SubTitle>Rating</SubTitle>: {movieInfo?.vote_average} ratings
                    </Overview>
                    <Overview>
                        <SubTitle>Overview</SubTitle>: {movieInfo?.overview}
                    </Overview>

                    <SubTitle>Cast</SubTitle>
                    <Cast
                        horizontal={true}
                        data={movieInfo?.credits?.cast}
                        renderItem={({ item }, index) => (
                            <Image
                                key={index}
                                source={{ uri: `${IMAGE_URL}w200${item?.profile_path}` }}
                                style={{ width: 100, height: 100, borderRadius: 8, marginRight: 10 }}
                            />
                        )}
                        keyExtractor={item => item?.id}

                    />

                    <SubTitle>Recommendations</SubTitle>
                    <Cast
                        horizontal={true}
                        data={recommended?.data?.results}
                        renderItem={({ item }, index) => (
                            <Pressable key={index} onPress={() => moveToDetails(item)} style={{ marginRight: 10 }}>
                                <Movie {...item} variant="thumb" />
                            </Pressable>

                        )}
                        keyExtractor={item => item?.id}
                    />
                </>
            )}


        </Container>
    );
};

export default MovieDetails;

const Title = styled.Text`
  fontSize: 20px;
    lineHeight: 28px;
    letterSpacing: -0.6px;
    fontWeight: bold;
    color: #02075C;
    textAlign: center;
`;
const SubTitle = styled.Text`
    fontWeight: bold;
  fontSize: 14px;
    lineHeight: 20px;
    color: #071827;
`;
const Overview = styled.Text`
  fontSize: 14px;
    lineHeight: 20px;
    color: #071827;
    marginTop:8px;
    marginBottom: 10px;
`;

const Picture = styled.Image`
height: 500px;
width: 100%;
border-radius: 8px;
`;

const Cast = styled.FlatList`
  flex: 1;
  marginBottom: 20px;
  marginTop: 2px;
`;

const Container = styled.ScrollView.attrs(() => ({
    contentContainerStyle: {
        flexGrow: 1,
    }
}))`height: 100%; flex: 1; paddingHorizontal:10px;`;