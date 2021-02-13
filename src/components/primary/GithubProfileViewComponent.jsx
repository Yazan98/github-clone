import React, { useState, useEffect } from 'react';
import {ProfileResponse} from "../info/ModelsResponse";
import '../styles/username_profile.scss';
import { getProfileView } from "../info/AxiosManager";
import RoomIcon from '@material-ui/icons/Room';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Paper from "@material-ui/core/Paper";

export const GithubProfileViewComponent = ({ username, onProfileImageCallback }) => {
    const [profile, updateProfile] = useState(ProfileResponse | undefined);
    useEffect(() => {
        async function fetchProfileInfo() {
            updateProfile(undefined);
            let response = await getProfileView(username);
            console.log(response.data);
            updateProfile(response.data);
        }

        fetchProfileInfo();
    }, [])

    return (
        <div className={"github-profile"}>
            <h3>Github Profile View</h3>
            <div className={"page-container"}>
                <div className={"profile-view"}>
                    {profile ? getProfileViewComponent(profile) : null}
                </div>
                <div className={"repos-view"}>

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
