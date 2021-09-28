import React, { useState } from 'react';
import StarRating from 'react-native-star-rating';
import { useMutation } from 'react-query';
import { api } from '../utils';

const Rate = ({ movie_id }) => {
    const { mutateAsync } = useMutation(api.post);
    const [starCount, setStarCount] = useState(0);

    const onRate = async rating => {
        try {
            setStarCount(rating);
            // const values = { ...payload, agentId: user.agentId };
            // const response = await mutateAsync([`movie/${movie_id}/rating?api_key=${MOVIE_DB_API_KEY}`, values]);
            // navigation.navigate(ROUTES.ACCOUNT_HOME);

            // console.log("response >>>>", response);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <StarRating
            disabled={false}
            maxStars={5}
            rating={starCount}
            selectedStar={(rating) => onRate(rating)}
        />

    );
};

export default Rate;