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
                    <img src={GridImage} id={"image"} alt={"Grid Image"} />
                    <img src={LinearImage} id={"image"} alt={"Grid Image"} />
                </div>
            </div>
            {loadingState ? getLoadingContainer() : null}
            <ul>
                {repositories.map((item, index) => {
                    return (
                        <li key={index}>
                            <RepositoryCardComponent
                                createdAt={item.created_at}
                                description={item.description} fullName={item.full_name}
                                issuesCount={item.open_issues}
                                language={item.language} name={item.name}
                                ownerImage={item.owner.avatar_url} ownerName={item.owner.login}
                                ownerUrl={item.owner.url} watchers={item.watchers_count}
                            />
                        </li>
                    );
                })}
            </ul>
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