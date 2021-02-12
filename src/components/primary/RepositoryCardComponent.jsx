import React from 'react';
import Paper from "@material-ui/core/Paper";
import '../styles/repo_style.scss';
import {getColorCodeByLanguage} from "../info/ColorsMapper";
import VisionIcon from '../images/vision.svg';
import ProfileImage from '../images/profile-user.svg';
import RepoLinkIcon from '../images/repository.svg';
import ProblemImage from '../images/caution.svg';

export const RepositoryCardComponent = ({name, fullName, ownerName, ownerImage, ownerUrl, description, issues, watchers = 0, language, repoUrl, isLinearLayout = false}) => {
    const widthSize = isLinearLayout ? 90 : 30
    return (
        <div className={"repo-container"} style={{width: widthSize + "vw"}}>
            <Paper className={"paper"}>
               <div className={"paper-body"}>
                   <div className={"owner-section"}>
                       <div className={"content"}>
                           <img src={ownerImage} alt={"Owner Image"} className={"owner-image"} />
                           <div className={"texts"}>
                               <h3 id={"text"}>{ownerName}</h3>
                               <label id={"text"}>{fullName}</label>
                           </div>
                       </div>
                       <div className={"links"}>
                           <a id={"text"} href={ownerUrl} target="_blank"><img className={"icon"} src={ProfileImage} alt={"User Profile Link"} /></a>
                           <a id={"text"} href={repoUrl} target="_blank"><img className={"icon"} src={RepoLinkIcon} alt={"Repo Link"} /></a>
                       </div>
                   </div>
                   <h4>{name}</h4>
                   <p className={"description"}>{description}</p>
                   <div className={"language-container"}>
                       <div className={"content"}>
                           <div className={"color"} style={{ backgroundColor: getColorCodeByLanguage(language) }} />
                           <label>{language}</label>
                       </div>
                       <div className={"watchers"}>
                           <img src={VisionIcon} className={"icon"} alt={"Image Watch"}/>
                           <label>{watchers}</label>

                           <img id={"IssuesIcon"} src={ProblemImage} className={"icon"} alt={"Image Watch"}/>
                           <label>{issues}</label>
                       </div>
                   </div>
               </div>
            </Paper>
        </div>
    );
}
