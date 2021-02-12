import React from 'react';
import Paper from "@material-ui/core/Paper";
import '../styles/repo_style.scss';
import {getColorCodeByLanguage} from "../info/ColorsMapper";
import VisionIcon from '../images/vision.svg';

export const RepositoryCardComponent = ({name, fullName, ownerName, ownerImage, ownerUrl, description, createdAt, watchers = 0, language, issuesCount}) => {
    return (
        <div className={"repo-container"}>
            <Paper className={"paper"}>
                <div className={"owner-section"}>
                    <div className={"content"}>
                        <img src={ownerImage} alt={"Owner Image"} className={"owner-image"} />
                        <label id={"text"}>{ownerName}</label>
                    </div>
                    <a id={"text"} href={ownerUrl} target="_blank">Open Repository</a>
                </div>
                <h4>{name}</h4>
                <p>{description}</p>
                <div className={"language-container"}>
                    <div className={"content"}>
                        <div className={"color"} style={{ backgroundColor: getColorCodeByLanguage(language) }} />
                        <label>{language}</label>
                    </div>
                    <div className={"watchers"}>
                        <img src={VisionIcon} className={"icon"} alt={"Image Watch"}/>
                        <label>{watchers}</label>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
