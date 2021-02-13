import React, { useState, useEffect } from 'react';
import {ProfileResponse, RepositoryModelResponse} from "../info/ModelsResponse";
import '../styles/username_profile.scss';
import {getProfileRepositories, getProfileView} from "../info/AxiosManager";
import RoomIcon from '@material-ui/icons/Room';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Paper from "@material-ui/core/Paper";
import {RepositoryCardComponent} from "./RepositoryCardComponent";

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
