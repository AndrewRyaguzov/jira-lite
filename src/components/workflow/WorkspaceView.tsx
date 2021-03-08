import {Component} from 'react'
import React from 'react';
import { AppBar, Button, createStyles, IconButton, Tab, Tabs, Toolbar, withStyles, WithStyles} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import TasksView from './TasksView';

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

type Props = {} & WithStyles<typeof styles>;

class WorkspaceView extends Component<Props> {
    handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {

    }

    render() {
        const {classes} = this.props;

        return(
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Tabs value={12} onChange={this.handleTabChange} aria-label="simple tabs example">
                            <Tab label="Задачи" />
                            <Tab label="Сотрудники"/>
                        </Tabs>
                        <IconButton className={classes.buttons}>
                            <AccountCircleOutlinedIcon fontSize='large' htmlColor='C2C8E1' />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <TasksView/>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(WorkspaceView);