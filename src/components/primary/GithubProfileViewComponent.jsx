import React, { useState, useEffect } from 'react';
import {ProfileResponse, RepositoryModelResponse} from "../info/ModelsResponse";
import '../styles/username_profile.scss';
import {getProfileRepositories, getProfileView} from "../info/AxiosManager";
import RoomIcon from '@material-ui/icons/Room';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Paper from "@material-ui/core/Paper";
import {RepositoryCardComponent} from "./RepositoryCardComponent";
import {Bar, Pie} from 'react-chartjs-2';
import {getColorCodeByLanguage} from "../info/ColorsMapper";

export const GithubProfileViewComponent = ({ username, onProfileImageCallback }) => {
    const [profile, updateProfile] = useState(ProfileResponse | undefined);
    const [repositories, updateRepositories] = useState([RepositoryModelResponse] | undefined);
    useEffect(() => {
        async function fetchProfileInfo() {
            updateProfile(undefined);
            let response = await getProfileView(username);
            let reposResponse = await getProfileRepositories(username)
            updateProfile(response.data);
            updateRepositories(reposResponse.data);
            console.log(reposResponse);
            onProfileImageCallback(response.data.avatar_url);
        }

        fetchProfileInfo();
    }, [])

    return (
        <div className={"github-profile"}>
            <h3>Github Profile View</h3>
            <div className={"page-container"}>
                <div className={"profile-view"}>
                    {profile ? getProfileViewComponent(profile) : null}
                    {repositories ? getChartsViewByRepositories(repositories) : null}
                    <div className={"repos-view"}>
                        <div className={"grid-list"}>
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
                                        isLinearLayout={false}
                                    />
                                );
                            }) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function getChartsViewByRepositories(repos = [RepositoryModelResponse]) {
    let reposNames = []
    let langaugesNames = []
    let repositoriesJsonElement = []
    let langaugesRepositoriesRanked = []
    let starsRepos = repos.filter((item) => {
        return item.watchers_count > 0 || item.open_issues_count > 0 || item.forks_count > 0
    });
    let newRankedSortArray = starsRepos.sort((a, b) => a.watchers_count - b.open_issues_count)

    for (let i = 0; i < newRankedSortArray.length; i++) {
        let currentItem = newRankedSortArray[i]
        reposNames.push(currentItem.full_name)
        repositoriesJsonElement.push({
            label: currentItem.full_name,
            backgroundColor:  getColorCodeByLanguage(currentItem.language),
            data: [currentItem.watchers_count, currentItem.open_issues_count, currentItem.forks_count]
        })
    }

    for (let i = 0; i < repos.length; i++) {
        let currentItem = repos[i]
        let savedLanguage = langaugesNames.includes(currentItem.language)
        if (!savedLanguage && currentItem.language) {
            langaugesNames.push(currentItem.language)
        }
    }

    for (let i = 0; i < langaugesNames.length; i++) {
        let currentItem = langaugesNames[i]
        let languagesRepos = repos.filter((item) => {
            return item.language === currentItem
        })

        for (let i = 0; i < languagesRepos.length; i++) {
            langaugesRepositoriesRanked.push({
                label: currentItem,
                backgroundColor: getColorCodeByLanguage(languagesRepos[i].language),
                data: [languagesRepos[i].language, languagesRepos[i].open_issues_count, languagesRepos[i].forks_count]
            })
        }

    }

    const state = {
        labels: reposNames,
        datasets: repositoriesJsonElement
    }

    const languagesState = {
        labels: langaugesNames,
        datasets: langaugesRepositoriesRanked
    }

    return (
        <div className={"charts-container"}>
            <Bar
                className={"item"}
                data={state}
                options={{
                    title:{
                        display:true,
                        text:'Top Repositories',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            />

            <Pie
                className={"item"}
                data={languagesState}
                options={{
                    title:{
                        display:true,
                        text:'Top Languages',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            />
        </div>
    );
}

export function getProfileViewComponent(profile = ProfileResponse) {
    return (
        <div className={"profile-content"}>
            <img src={profile.avatar_url} alt={"User Image"} className={"profile-image"} />
            <div className={"name-container"}>
                <p>{profile.login}</p>
                <h1>{profile.name}</h1>
            </div>
            <p className={"des"}>{profile.bio}</p>
           <div className={"icons-container"}>
               {profile.location ? (
                   <div id={"item"} className={"location"}>
                    <RoomIcon />
                    <h5>{profile.location}</h5>
                   </div>
               ) : null}

               {profile.created_at ? (
                   <div id={"item"} className={"location"}>
                       <DateRangeIcon />
                       <h5>{new Date(profile.created_at).toDateString()}</h5>
                   </div>
               ) : null}
           </div>
            <div className={"numbers-container"}>
                <Paper id={"item"}>
                    <p>{profile.public_repos}</p>
                    <p className={"text"}>Repositories</p>
                </Paper>
                <Paper id={"item"}>
                    <p>{profile.followers}</p>
                    <p className={"text"}>Followers</p>
                </Paper>
                <Paper id={"item"}>
                    <p>{profile.following}</p>
                    <p className={"text"}>Following</p>
                </Paper>
            </div>
        </div>
    );
}
