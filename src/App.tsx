import React, {Component} from 'react'
import MainView from './components/MainView';
import WorkspaceView from './components/workflow/WorkspaceView';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { StorageService } from './services/StorageService';

type States = {
    loggedIn: boolean;
    isAdmin: boolean;
}

class App extends Component<{},States> {
    constructor(props: any) {
        super(props);

        let loggedIn = false;
        let isAdmin = false;
        const token = StorageService.getDetailToken();
        if (token) {
            // TODO: Влепить проверку, что у меня в сторедже вообще нормальный токен, а не мусор
            loggedIn = true;
            isAdmin = token.roles.some(x => x === 'ADMIN');
        }

        const company = StorageService.getCompany();
        if (!company) {
            loggedIn = false;
            isAdmin = false;
            StorageService.removeToken();
        }

        this.state = {
            loggedIn: loggedIn,
            isAdmin: isAdmin
        }
    }
    
    handleLogin = () => {
        this.setState({loggedIn: true});
    }
    handleLogout = () => {
        this.setState({loggedIn: false});
    }

    render() {
        const { loggedIn, isAdmin } = this.state;
        return(
            <div>
                <Router>
                    <Route exact path="/">
                        {loggedIn ? <Redirect to="/workspace" /> : <MainView onLogin={this.handleLogin}/>}
                    </Route>
                    <Route exact path="/workspace">
                        {loggedIn ? <WorkspaceView isAdmin={isAdmin} onLogout={this.handleLogout}/> : <Redirect to="/"/>}
                    </Route>
                </Router>
            </div>
        );
    }
}

export default App;
