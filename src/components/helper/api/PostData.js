import React from 'react';

export default async function PostData(obj, sidebar_choice) {
    try {
        const response = await fetch(`https://rzp-training.herokuapp.com/team2/${sidebar_choice}`, { method: "POST", 
            body: JSON.stringify(obj), headers: { "Content-type": "application/json; charset=UTF-8"}
        });
        const data = await response.json();
        return data;
        // if (data.statusCode === 400)
        //     alert(data.error.description);
        // else if (data.entity === sidebar_choice.slice(0, sidebar_choice.length - 1) || data.id)
        //     changeContentChoice('list');
        // else
        //     alert(data);
    }
    catch (error) {
        return error;
    }
}