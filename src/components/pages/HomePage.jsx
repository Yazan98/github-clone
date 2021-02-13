import React from 'react';
import FooterComponent from "../shared/FooterComponent";
import {ToolbarComponent} from "../shared/ToolbarComponent";
import {PopularRepositoriesComponent} from "../primary/PopularRepositoriesComponent";

export const HomePage = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const callback = React.useCallback((e) => {
        setSearchQuery(e)
        console.log(e)
    }, [])

    return (
        <div className={"homepage-container"}>
            <ToolbarComponent onSearchTextClicked={callback} userImageUrl={"https://www.w3schools.com/w3images/avatar2.png"} />
            <main>
                <PopularRepositoriesComponent onSearchQuery={searchQuery} />
            </main>
            <FooterComponent />
        </div>
    );
}
