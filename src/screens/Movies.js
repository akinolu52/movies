import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useQuery } from 'react-query';
import styled from "styled-components";
import { Movie } from '../components';
import { api, MOVIE_DB_API_KEY, ROUTES } from '../utils';

const Movies = ({ navigation }) => {
    const { data, isLoading, isFetched } = useQuery({
        queryKey: 'movies',
        queryFn: () => api.get(`popular?api_key=${MOVIE_DB_API_KEY}`)
    });
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (isFetched) {
            const { results } = data;
            const _movies = results?.sort((a, b) => a?.title?.localeCompare(b?.title));
            setMovies(_movies);

        }
    }, [isLoading, isFetched, data])

    // console.log(movies);

    const moveToDetails = item => navigation.navigate(ROUTES.MOVIE_DETAILS, { movie: item })

    return (
        <Container
            refreshing={isLoading || false}
            ListHeaderComponent={<Title>The movie directory</Title>}
            data={movies}
            renderItem={({ item }, index) => (
                <Pressable key={index} onPress={() => moveToDetails(item)}>
                    <Movie {...item} />
                </Pressable>
            )}
            keyExtractor={item => item?.id}
        />
    );
};

export default Movies;

const Title = styled.Text`
  fontSize: 20px;
    lineHeight: 28px;
    letterSpacing: -0.6px;
    fontWeight: bold;
    color: #02075C;
    marginTop:8px;
    marginBottom: 20px;
`;

const Container = styled.FlatList`
  flex: 1;
  paddingHorizontal:10px;
`;

// const Container = styled.ScrollView.attrs(() => ({
//     contentContainerStyle: {
//         flexGrow: 1,
//     }
// }))`height: 100%; flex: 1; paddingHorizontal:10px;`;