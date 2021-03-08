import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField, WithStyles, createStyles, withStyles } from '@material-ui/core';
import React, { Component } from 'react'

const styles = (theme: any) => createStyles({
    button: {
        marginRight: theme.spacing(1),
        
    },
    buttons: {
        marginLeft: 'auto',
    }
});

type Props = {} & WithStyles<typeof styles>;

type States = {
    isOpen: boolean;

    login: string;
    password: string;
};


class LoginDialog extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false,
            login: '',
            password: ''
        };
    }

    handleLoginChange = (value: string) => {
        this.setState({login: value});
    }

    handlePasswordChange = (value: string) => {
        this.setState({password: value});
    }

    handleClickOpen = () => {
        this.setState({ isOpen: true });
    };

    handleClose = () => {
        this.setState({ isOpen: false, login: '', password: '' });
    };

    handleLogin = () => {
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        const { isOpen, login, password } = this.state;

        return (
            <>
                <Button className={classes.button}
                        variant="contained" 
                        color="secondary"
                        onClick={this.handleClickOpen}>Войти
                </Button>
                <Dialog open={isOpen} onClose={this.handleClose}>
                    <DialogTitle>Войти в пространство компании</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Логин"
                            type="text"
                            fullWidth
                            onChange={x => this.handleLoginChange(x.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Пароль"
                            type="password"
                            fullWidth
                            onChange={x => this.handlePasswordChange(x.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleLogin}
                            className={classes.button}>
                            Отмена
                        </Button>
                        <Button disabled={login === '' || password === ''}
                            variant="contained"
                            color="primary"
                            onClick={this.handleLogin} 
                            className={classes.button}>
                            Войти
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(LoginDialog);
