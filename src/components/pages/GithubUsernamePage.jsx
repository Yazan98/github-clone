import React, { useState, useCallback } from 'react';
import '../styles/username_profile.scss';
import {ToolbarComponent} from "../shared/ToolbarComponent";
import FooterComponent from "../shared/FooterComponent";
import {GithubUsernameEnterComponent} from "../primary/GithubUsernameEnterComponent";
import {GithubProfileViewComponent} from "../primary/GithubProfileViewComponent";

export default function GithubUsernamePage() {
    const [userName, updateUsername] = useState("");
    const [profileImage, updateProfileImage] = useState("https://www.w3schools.com/w3images/avatar2.png");
    const onUsernameClickedCallback = useCallback((username) => {
        updateUsername(username);
        console.log("New Username Changed : ", username)
    }, [])

    const onProfileImageCallback = useCallback((newProfileImage) => {
        updateProfileImage(newProfileImage);
    }, [])

    return (
        <div className={"username-container"}>
            <ToolbarComponent shouldShowSearch={false} userImageUrl={profileImage} />
            <main>
                {userName ? (<GithubProfileViewComponent username={userName} onProfileImageCallback={onProfileImageCallback} />) : (
                    <GithubUsernameEnterComponent onUsernameClicked={onUsernameClickedCallback} dummyProfileImage={profileImage} />
                )}
            </main>
            <FooterComponent />
        </div>
    );
}