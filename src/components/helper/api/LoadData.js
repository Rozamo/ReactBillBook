import React from 'react';

export default async function LoadData(sidebar_choice) {
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        return error;
    }
}