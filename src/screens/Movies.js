import React from 'react';
import styled from "styled-components";
import { Movie } from '../components';
import { useQuery } from 'react-query';
import { MOVIE_DB_API_KEY, api } from '../utils';

const Movies = () => {
    const response = useQuery({
        queryKey: 'movies',
        queryFn: () => api.get(`/movie/popular?api_key=${MOVIE_DB_API_KEY}`)
    });

    console.log(response);

    return (
        <Container>
            <Title>The movie directory</Title>
            <Movie />
            <Movie />
            <Movie />
            <Movie />
            <Movie />
        </Container>
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

const Container = styled.View`
 flex: 1;
borderWidth: 1px;
borderColor: red;
`;
