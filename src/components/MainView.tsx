import React, { Component } from 'react'
import { AppBar, Toolbar} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
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

type Props = {
    onLogin();
} & WithStyles<typeof styles>;


class MainView extends Component<Props> {
    render() {
        const {classes, onLogin} = this.props;
        return(
            <>
            <AppBar position="static" color="primary">
                <Toolbar className={classes.toolBar}>
                    <div className={classes.buttons}>
                        <RegisterCompanyDialog/>
                        <LoginDialog onLogin={onLogin}/>
                    </div>
                </Toolbar>
            </AppBar>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MainView);
