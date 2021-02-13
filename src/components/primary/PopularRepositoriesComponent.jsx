import React, {useEffect, useState, useCallback} from 'react';
import {getPopularRepositories} from "../info/AxiosManager";
import '../styles/popular_repos.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import {RepositoryModelResponse} from "../info/ModelsResponse";
import {RepositoryCardComponent} from "./RepositoryCardComponent";
import GridImage from '../images/menu.svg';
import LinearImage from '../images/list-text.svg';
import {PageNumberComponent} from "../shared/PageNumberComponent";

export const PopularRepositoriesComponent = ({onSearchQuery}) => {
    const [repositories, setRepositories] = useState([RepositoryModelResponse] | undefined);
    const [pageNumber, updatePageNumber] = useState(1);
    const [loadingState, updateLoadingState] = useState(false);
    const [errorListener, updateErrorListener] = useState("");
    const [isLinearListStyle, updateListStyle] = useState(true);
    const onPageClickCallback = useCallback((numberOfPage) => {
        setRepositories(null)
        updatePageNumber(numberOfPage)
    }, [pageNumber])

    useEffect(() => {
        async function fetchPopularPosts() {
            updateLoadingState(true);
            setRepositories(undefined);
            let response = await getPopularRepositories(pageNumber, onSearchQuery);
            if (response) {
                updateErrorListener("");
                setRepositories(response.data.items);
                updateLoadingState(false);
            } else {
                updateErrorListener("Error While Fetching Data");
                updateLoadingState(false);
            }
        }

        fetchPopularPosts();
    }, [pageNumber, onSearchQuery])

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
                {repositories ? repositories.map((item, index) => {
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
                }) : null}
            </div>

            {getPagesView(onPageClickCallback)}
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

export function getPagesView(onPageClickFunction) {
    const pagesItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className={"pages-container"}>
            <div className={"items"}>
                {pagesItems.map((item, index) => {
                    return (
                        <PageNumberComponent number={item} key={index} onClickCallback={onPageClickFunction} />
                    );
                })}
            </div>
        </div>
    );
}
