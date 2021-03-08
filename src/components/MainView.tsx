import React, { Component } from 'react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialog from './dialogs/LoginDialog';
import RegisterCompanyDialog from './dialogs/RegisterCompanyDialog';

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


class MainView extends Component<Props> {
    render() {
        const {classes} = this.props;

        return(
            <>
            <AppBar position="static" color="primary">
                <Toolbar className={classes.toolBar}>
                    <div className={classes.buttons}>
                        <RegisterCompanyDialog/>
                        <LoginDialog/>
                    </div>
                </Toolbar>
            </AppBar>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MainView);
