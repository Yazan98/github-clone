import React, {useEffect, useState} from 'react';
import {getPopularRepositories} from "../info/AxiosManager";
import '../styles/popular_repos.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import {RepositoryModelResponse} from "../info/ModelsResponse";
import {RepositoryCardComponent} from "./RepositoryCardComponent";
import GridImage from '../images/menu.svg';
import LinearImage from '../images/list-text.svg';

export const PopularRepositoriesComponent = () => {
    const [repositories, setRepositories] = useState([RepositoryModelResponse]);
    const [pageNumber, updatePageNumber] = useState(1);
    const [loadingState, updateLoadingState] = useState(false);
    const [errorListener, updateErrorListener] = useState("");
    const [isLinearListStyle, updateListStyle] = useState(true);

    useEffect(() => {
        async function fetchPopularPosts() {
            updateLoadingState(true);
            let response = await getPopularRepositories(pageNumber);
            if (response) {
                updateErrorListener("");
                console.log("Items : ", response.data.items)
                setRepositories(response.data.items);
                console.log(response.data.items)
                // updatePageNumber(pageNumber + 1);
                updateLoadingState(false);
            } else {
                updateErrorListener("Error While Fetching Data");
                updateLoadingState(false);
            }
        }

        fetchPopularPosts();
    }, [])

    return (
        <div className={"popular-repos-container"}>
            <div className={"title-content"}>
                <div className={"text-content"}>
                    <h3>Popular Repositories</h3>
                    {errorListener ? <p className={"error-message"}>{errorListener}</p> : null}
                </div>
                <div className={"rows-container"}>
                    <img className={isLinearListStyle ? "not-selected" : "selected"} src={GridImage} id={"image"} alt={"Grid Image"} onClick={(e) => {updateListStyle(false)}} />
                    <img className={isLinearListStyle ? "selected" : "not-selected"} src={LinearImage} id={"image"} alt={"Grid Image"}  onClick={(e) => {updateListStyle(true)}} />
                </div>
            </div>
            {loadingState ? getLoadingContainer() : null}
            <div className={isLinearListStyle ? "linear" : "grid-list"}>
                {repositories.map((item, index) => {
                    return (
                        <RepositoryCardComponent
                            key={index}
                            issues={item.open_issues_count}
                            description={item.description}
                            fullName={item.full_name}
                            language={item.language}
                            name={item.name}
                            ownerImage={item.owner.avatar_url}
                            ownerName={item.owner.login}
                            ownerUrl={item.owner.html_url}
                            watchers={item.watchers_count}
                            repoUrl={item.html_url}
                            isLinearLayout={isLinearListStyle}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export function getLoadingContainer() {
    return (
        <div className={"loading-container"}>
            <CircularProgress color={"inherit"}/>
        </div>
    );
}