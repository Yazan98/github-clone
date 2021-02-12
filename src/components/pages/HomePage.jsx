import React, {Component} from 'react';
import FooterComponent from "../shared/FooterComponent";
import {ToolbarComponent} from "../shared/ToolbarComponent";
import {PopularRepositoriesComponent} from "../primary/PopularRepositoriesComponent";

class HomePage extends Component {
    render() {
        return (
            <div className={"homepage-container"}>
                <ToolbarComponent userImageUrl={"https://www.w3schools.com/w3images/avatar2.png"} />

                <main>
                    <PopularRepositoriesComponent />
                </main>

                <FooterComponent />
            </div>
        );
    }
}

export default HomePage;