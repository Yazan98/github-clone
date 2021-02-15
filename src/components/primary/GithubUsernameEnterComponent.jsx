import React, {useCallback, useRef} from 'react';
import '../styles/username_profile.scss';
import FilledInput from '@material-ui/core/FilledInput';
import Fab from "@material-ui/core/Fab";

export const GithubUsernameEnterComponent = ({onUsernameClicked, dummyProfileImage}) => {
    const textChangeRef = useRef();
    const onUsernameChanged = useCallback(() => {
        onUsernameClicked(textChangeRef.current.value)
    }, [])

    return (
        <div className={"github-username-container"}>
            <div className={"container-username"}>
                <div className={"image"}>
                    <img id="item" src={dummyProfileImage} className={"icon"} alt={"Username Place Holder"} />
                </div>
                <FilledInput id="item" style={{ color: "white" }} color={"secondary"} placeholder="Enter Github Username" margin="normal" fullWidth={true} inputRef={textChangeRef} />
                <Fab onClick={() => {onUsernameChanged()}} id="item" variant="extended">Search</Fab>
            </div>
        </div>
    );
}
