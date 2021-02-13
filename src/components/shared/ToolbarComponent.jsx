import React, {useEffect, useState} from 'react';
import {LineDividerComponent} from "./LineDividerComponent";
import GithubLogoImage from '../images/github.svg';
import {NavLink} from "react-router-dom";
import NotificationsIcon from '../images/bell.svg';
import ShopIcon from '../images/shop.svg';
import '../styles/toolbar_style.scss';
import SearchIcon from '../images/magnifying-glass.svg';

export const ToolbarComponent = ({userImageUrl = "", onSearchTextClicked}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [onSearchButtonClicked, setSearchButtonClicked] = useState(false);

    useEffect(() => {
        if (onSearchButtonClicked) {
            setSearchButtonClicked(false)
            if (searchTerm) {
                onSearchTextClicked(searchTerm)
            } else {
                onSearchTextClicked("stars")
            }
        }
    }, [searchTerm, onSearchButtonClicked])

    return (
        <header>
            <div className={"toolbar-container"}>
                <div className={"links-side"}>
                    <img className={"image"} src={GithubLogoImage}  alt={"Logo"}/>
                    <div className={"links"}>
                        <NavLink to={"/"} className={"ButtonLink"}>Popular Repos</NavLink>
                        <NavLink to={"/profile"} className={"ButtonLink"}>Profile View</NavLink>
                    </div>
                </div>
                <div className={"search-item"}>
                    <div className={"background-container"}>
                        <input className={"search"} type={"text"} placeholder={"Search or Jump to"} onChange={(e) => {setSearchTerm(e.target.value)}}/>
                        <img className={"search-image"} src={SearchIcon} alt={"SearchItem"} onClick={(e) => {setSearchButtonClicked(true)}} />
                    </div>
                </div>
                <div className={"profile-item"}>
                    {getProfileIconsContainer(userImageUrl.toString())}
                </div>
            </div>
            <LineDividerComponent />
        </header>
    );
}

export function getProfileIconsContainer(userImageUrl = "") {
    if (userImageUrl) {
        return (
            <div className={"user-image-container"}>
                <img className={"notifications"} id={"image"} src={NotificationsIcon} alt={"Notifications"} />
                <img className={"shops"} id={"image"} src={ShopIcon} alt={"ShopIcon"} />
                <img className={"user-icon"} src={userImageUrl} alt={"UserIcon"} />
            </div>
        );
    } else {
        return null
    }
}
