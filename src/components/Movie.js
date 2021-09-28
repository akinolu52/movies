import React, { memo } from 'react';
import { View } from 'react-native';
import styled from "styled-components";
import poster from '../assets/movie-poster.jpg';
const Movie = memo(() => (
    <Container>
        <TopContainer>
            <TopContent>
                <SubTitle>02/10/1997</SubTitle>
                <SubTitle>4.9(ratings)</SubTitle>
            </TopContent>
        </TopContainer>
        <Image source={poster} />
        <Title>Title of the movie</Title>
    </Container>
));

export default Movie;

const Image = styled.Image`
height: 300px;
width: 100%;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
`;

const Title = styled.Text`
  fontSize: 16px;
    lineHeight: 24px;
    fontWeight: 600;
    color: #02075C;
    marginVertical: 4px;
`;

const SubTitle = styled.Text`
  fontSize: 14px;
    lineHeight: 20px;
    fontWeight: 500;
    color: #FFF;
`;

const TopContainer = styled.View`
 position: absolute;
 top: 10px;
 width: 100%;
 zIndex: 1;
`;

const TopContent = styled.View`
 paddingHorizontal: 10px;
 justifyContent: space-between;
 flexDirection: row;
`;

const Container = styled.View`
 overflow: hidden;
 borderRadius: 8px;
 backgroundColor: #EDF2F7;
 borderWidth: 1px;
 borderColor: #E2E9F0;
 justifyContent: center;
 alignItems: center;
 position: relative;
 marginBottom: 16px;
 /* height: 400px; */
`;
