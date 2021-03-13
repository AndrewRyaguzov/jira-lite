import {Component} from 'react'
import React from 'react';
import { AppBar, Button, createStyles, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, withStyles, WithStyles} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import TasksView from './TasksView';
import UsersView from './UsersView';
import { StorageService } from '../../services/StorageService';

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
    onLogout(): void;
} & WithStyles<typeof styles>;

type States = {
    currentTab: number;
    anchorEl: null | HTMLElement;
}

class WorkspaceView extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentTab: 0,
            anchorEl: null
        };
    }

    handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({currentTab: newValue});
    }

    handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({anchorEl: event.currentTarget});
    }
    handleProfileMenuClose = () => {
        this.setState({anchorEl: null});
    }

    handleLogout = () => {
        StorageService.removeToken();
        StorageService.removeCompany();
        this.setState({anchorEl: null});
        this.props.onLogout();
    }

    render() {
        const { currentTab, anchorEl } = this.state;
        const { classes, isAdmin } = this.props;
        return(
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Tabs value={currentTab} onChange={this.handleTabChange}>
                            <Tab label="Задачи" className={classes.toolBar}/>
                            {isAdmin && 
                            <Tab label="Сотрудники" className={classes.toolBar}/>}
                        </Tabs>
                        <IconButton className={classes.buttons}
                                    onClick={this.handleOpenMenu}>
                            <AccountCircleOutlinedIcon fontSize='large' htmlColor='C2C8E1' />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={this.handleProfileMenuClose}>
                            <MenuItem onClick={this.handleProfileMenuClose}>Профиль</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Выйти</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                {currentTab == 0 && <TasksView/>}
                {currentTab == 1 && <UsersView/>}
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(WorkspaceView);