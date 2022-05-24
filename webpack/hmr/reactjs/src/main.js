import React from "react";
import {createRoot} from "react-dom/client";

class Welcome extends React.Component {
    render() {
        return <h1>Welcome , { this.props.name }.</h1>
    }
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Welcome name="Lele"></Welcome>)
    

if(module.hot) {
    module.hot.accept();
}