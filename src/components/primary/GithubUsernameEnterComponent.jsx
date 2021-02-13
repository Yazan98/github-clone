import React, {useCallback, useRef} from 'react';
import '../styles/username_profile.scss';
import TextField from "@material-ui/core/TextField";
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
                <TextField id="item" label="Enter Github Username" margin="normal" fullWidth={true} variant="outlined" inputRef={textChangeRef} />
                <Fab onClick={() => {onUsernameChanged()}} id="item" variant="extended">Search</Fab>
            </div>
        </div>
    );
}
