import {Component} from 'react'
import React from 'react';
import { AppBar, Button, createStyles, IconButton, Tab, Tabs, Toolbar, withStyles, WithStyles} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import TasksView from './TasksView';
import UsersView from './UsersView';

const styles = (theme: any) => createStyles({
    toolBar: {
        height: '80px'
    },
    button: {
        marginRight: theme.spacing(1),        
    },
    buttons: {
        marginLeft: 'auto',
    }
});

type Props = {
    isAdmin: boolean;
} & WithStyles<typeof styles>;

type States = {
    currentTab: number;
}

class WorkspaceView extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentTab: 0,
        };
    }

    handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({currentTab: newValue});
    }

    render() {
        const { currentTab } = this.state;
        const {classes, isAdmin} = this.props;
        return(
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Tabs value={currentTab} onChange={this.handleTabChange}>
                            <Tab label="Задачи" className={classes.toolBar}/>
                            <Tab label="Сотрудники" disabled={!isAdmin} className={classes.toolBar}/>
                        </Tabs>
                        <IconButton className={classes.buttons}>
                            <AccountCircleOutlinedIcon fontSize='large' htmlColor='C2C8E1' />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {currentTab == 0 && <TasksView/>}
                {currentTab == 1 && <UsersView/>}
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(WorkspaceView);