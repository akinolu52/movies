import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import styled from "styled-components";
import likeFilled from '../assets/like-filled.png';
import like from '../assets/like.png';
import { Movie, Rating } from '../components';
import { api, IMAGE_URL, MOVIE_DB_API_KEY, ROUTES } from '../utils';

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

    const { mutateAsync } = useMutation(api.post);

    const onRate = async (payload) => {
        try {
            const values = { ...payload, agentId: user.agentId };
            const response = await mutateAsync(["v1/agentBank", values]);
            navigation.navigate(ROUTES.ACCOUNT_HOME);

            console.log("response >>>>", response);
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        if (isFetched) {
            setMovieInfo(data);
            let _genres = [];
            data?.genres?.map(genre => _genres.push(genre.name));
            setGenres(_genres?.join(', '));
        }
    }, [isLoading, isFetched, data]);

    const moveToDetails = item => navigation.push(ROUTES.MOVIE_DETAILS, { movie: item });

    return (
        <Container>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Title>{movieInfo?.title}</Title>

                    <View style={{ position: 'relative' }}>
                        <Picture source={{ uri: `${IMAGE_URL}w400${movieInfo?.poster_path}` }} resizeMode="cover" />
                        <Pressable onPress={() => setLiked(x => !x)}>
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
                    <Overview style={{}}>
                        <Rating />
                    </Overview>
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
    marginTop:8px;
    marginBottom: 16px;
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
}))`height: 100%; flex: 1; paddingHorizontal:10px; borderWidth: 1px; borderColor: red `;