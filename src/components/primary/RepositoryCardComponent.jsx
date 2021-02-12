import React from 'react';
import Paper from "@material-ui/core/Paper";
import '../styles/repo_style.scss';

export const RepositoryCardComponent = ({name, fullName, ownerName, ownerImage, ownerUrl, description, createdAt, watchers = 0, language, issuesCount}) => {
    return (
        <div className={"repo-container"}>
            <Paper className={"paper"}>
                <div className={"owner-section"}>
                    <img src={ownerImage} alt={"Owner Image"} className={"owner-image"} />
                    <label id={"text"}>{ownerName}</label>
                    <a id={"text"} href={ownerUrl} target="_blank">Open Profile</a>
                </div>
                <h4>{name}</h4>
                <p>{fullName}</p>
                <p>{}</p>
                <p>{description}</p>
            </Paper>
        </div>
    );
}
