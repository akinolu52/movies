import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useQuery } from 'react-query';
import styled from "styled-components";
import illustration from '../assets/illustration.png';
import { Movie } from '../components';
import {
    api,
    // clearData,
    getData, MOVIE_DB_API_KEY, ROUTES
} from '../utils';

const ListEmpty = () => (
    <View style={{
        backgroundColor: '#EDF2F7', borderRadius: 8,
        justifyContent: 'center', alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 16
    }}>
        <Image source={illustration} style={{ width: 116.47, height: 98.56, marginBottom: 100 }} />
        <Title>No movie in this category.</Title>
    </View>
);

const ListHeader = ({ activeTab, setActiveTab }) => (
    <Content>
        <Pressable onPress={() => setActiveTab(1)}>
            <Title>The movie directory</Title>
        </Pressable>

        <Pressable onPress={() => setActiveTab(2)}>
            <SubTitle active={activeTab === 2}>Fav Movies</SubTitle>
        </Pressable>
    </Content>
)

const Movies = ({ navigation }) => {
    const { data, isLoading, isFetched } = useQuery({
        queryKey: 'movies',
        queryFn: () => api.get(`popular?api_key=${MOVIE_DB_API_KEY}`)
    });
    const [movies, setMovies] = useState([]);
    const [favMovie, setFavMovie] = useState([]);
    const [activeTab, setActiveTab] = useState(1);

    const loadFav = async () => {
        let _favMovie = await getData('favMovie') || [];

        setFavMovie(_favMovie);
    }

    useFocusEffect(
        useCallback(() => {
            loadFav();
        }, [favMovie])
    );

    useEffect(() => {
        loadFav();
    }, []);

    useEffect(() => {
        if (isFetched) {
            const { results } = data;
            const _movies = results?.sort((a, b) => a?.title?.localeCompare(b?.title));
            setMovies(_movies);

        }
    }, [isLoading, isFetched, data]);

    const moveToDetails = item => navigation.navigate(ROUTES.MOVIE_DETAILS, { movie: item });

    return (
        <Container
            refreshing={isLoading || false}
            ListEmptyComponent={<ListEmpty />}
            ListHeaderComponent={<ListHeader activeTab={activeTab} setActiveTab={setActiveTab} />}
            data={activeTab === 1 ? movies : favMovie}
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
`;

const SubTitle = styled.Text`
  fontSize: 16px;
    lineHeight: 24px;
    fontWeight: 500;
    color: #02075C;
    textDecorationLine: ${props => props.active ? 'underline' : 'none'};
`;

const Container = styled.FlatList`
  flex: 1;
  paddingHorizontal:10px;
`;

const Content = styled.View`
  marginBottom: 10px;
  flex-direction: row;
  alignItems: center;
  justifyContent: space-between;
    marginTop:8px;
    marginBottom: 20px;
`;
