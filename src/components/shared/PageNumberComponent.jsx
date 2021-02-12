import React, {Component} from 'react';
import '../styles/popular_repos.scss';

export const PageNumberComponent = React.memo(({number, onClickCallback}) => {
    return (
        <div onClick={() => onClickCallback(number)} className={"container"}>
            <h4>{number}</h4>
        </div>
    );
})
