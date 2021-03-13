import { Dialog, 
         DialogContent, 
         DialogTitle, 
         DialogActions, 
         Button, 
         TextField, 
         WithStyles, 
         createStyles, 
         withStyles,
         LinearProgress } from '@material-ui/core';
import React, { Component } from 'react'
import { ApiService } from '../../services/ApiService';
import { StorageService } from '../../services/StorageService';

const styles = (theme: any) => createStyles({
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

type States = {
    isOpen: boolean;
    isLoading: boolean;

    login: string;
    password: string;
};


class LoginDialog extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false,
            isLoading: false,

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

    handleLogin = async () => {
        const {login, password} = this.state;
        this.setState({isLoading: true})

        const signInResponse = await ApiService.signIn(login, password)
            .finally(() => this.setState({isLoading: false}));
        
        if(signInResponse.ok) {
            try {
                const response = await signInResponse.json();
                StorageService.setToken(response.token);
                StorageService.setCompany(response.company.id);
            } catch (e) {
                console.log(e);
                return
            }
            this.handleClose();
            this.props.onLogin();
        } else {
            // Вывести ошибку
            this.setState({password: ''});
        }
    };

    render() {
        const { classes } = this.props;
        const { isOpen, isLoading, login, password } = this.state;

        return (
            <>
                <Button className={classes.button}
                        variant="contained" 
                        color="secondary"
                        onClick={this.handleClickOpen}>Войти
                </Button>
                <Dialog open={isOpen} onClose={this.handleClose}>
                    {isLoading && <LinearProgress/>}
                    <DialogTitle>Войти в пространство компании</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Логин"
                            type="text"
                            fullWidth
                            value={login}
                            onChange={x => this.handleLoginChange(x.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Пароль"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={x => this.handlePasswordChange(x.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}
                            className={classes.button}>
                            Отмена
                        </Button>
                        <Button disabled={login === '' || password === '' || isLoading}
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
