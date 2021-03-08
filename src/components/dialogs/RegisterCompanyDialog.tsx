import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core';
import { Label } from '@material-ui/icons';
import React, { Component } from 'react'
import InputMask from "react-input-mask";

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

    currentStep: number;

    companyName: string;

    firstName: string;
    secondName: string;
    phone: string;

    login: string;
    password: string;
};

const Steps = [{ id: 1, name: "Регистрация компании" }, { id: 2, name: "Регистрация администратора компании" }];

class RegisterCompanyDialog extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false,
            currentStep: 0,

            companyName: '',
            
            firstName: '',
            secondName: '',
            phone: '',

            login: '',
            password: ''
        };
    }

    handleCompanyNameChange = (value: string) => {
        this.setState({ companyName: value });
    }


    handleClickOpen = () => {
        this.setState({ isOpen: true });
    };

    handleClose = () => {
        this.setState({ isOpen: false });

        this.setState({ companyName: '', firstName: '', secondName: '', phone: '', login: '', password: '' });
        // Попытка избавится от эффекта перезаписи (после заврешения загружается первый шаг :( )
        this.setState({ currentStep: 0 });
    };

    handleNext = () => {
        const {currentStep} = this.state;

        if (currentStep === Steps.length) {
            // Отправить инфу на сервер
            this.handleClose();        
            return;
        }
        if (currentStep === 0) {
            // Отправить инфу на сервер, проверить имя компании, если все окей, идем дальше
            this.setState({ currentStep: currentStep + 1 })
            return;
        }
        if (currentStep === 1) {
            // Отправить инфу на сервер, проверить имя компании, если все окей, идем дальше
            this.setState({ currentStep: currentStep + 1 })
            return;
        }
    }
    handleBack = () => {
        const {currentStep} = this.state;

        if (currentStep === 0) {
            this.handleClose();
            return;
        }
        this.setState({ currentStep: this.state.currentStep - 1 })
    }

    stepSwitch = () => {
        switch (this.state.currentStep) {
            case 0: {
                return this.renderCompanyStep();
            }
            case 1: {
                return this.renderAdminStep();
            }
            case 2: {
                return (<div>
                        <Typography>Поздравляем с завершением регистрации!</Typography>
                    </div>);
            }
            default: {
                return;
            }
        }
    }
    renderCompanyStep = () => {
        return(
            <div>
                <Typography>Создайте пространство компании</Typography>
                <TextField autoFocus
                        margin="dense"
                        label="Название компании"
                        type="text"
                        fullWidth
                        value={this.state.companyName}
                        onChange={x => this.handleCompanyNameChange(x.target.value)}/>
            </div>
        );
    }
    renderAdminStep = () => {
        return(
            <div>
                <Typography>Создайте пользователя-администратора</Typography>
                <TextField autoFocus
                           margin="dense"
                           label="Имя"
                           type="text"
                           fullWidth
                           value={this.state.firstName}
                           onChange={x => this.setState({ firstName: x.target.value })}/>
                <TextField margin="dense"
                           label="Фамилия"
                           type="text"
                           fullWidth
                           value={this.state.secondName}
                           onChange={x => this.setState({ secondName: x.target.value })}/>
                <InputMask
                mask="+7 999 999 99 99"
                value={this.state.phone}
                onChange={x => this.setState({ phone: x.target.value })}
                disabled={false}
                maskChar=" "
                >
                {() => <TextField margin="dense"
                           label="Телефон"
                           type="text"
                           fullWidth/>}
                </InputMask>

                <TextField margin="dense"
                           label="Логин"
                           type="text"
                           fullWidth
                           value={this.state.login}
                           onChange={x => this.setState({ login: x.target.value })}/>
                <TextField margin="dense"
                           label="Пароль"
                           type="password"
                           fullWidth
                           value={this.state.password}
                           onChange={x => this.setState({ password: x.target.value })}/>
            </div>
        );
    }

    buttonIsDisabled = (): boolean => {
        const {currentStep, companyName, firstName, secondName, phone, login, password } = this.state;

        if (currentStep === 0) {
            return companyName === '';
        }
        if (currentStep === 1) {
            return firstName === '' || 
                secondName === '' || 
                phone === '' || 
                login === '' || 
                password === '';
        }
        
        return false;
    }

    render() {
        const { classes } = this.props;
        const { isOpen, currentStep } = this.state;

        return (
            <>
                <Button className={classes.button}
                    variant="contained"
                    color="default"
                    onClick={this.handleClickOpen}>
                    Зарегистрироваться
                </Button>
                <Dialog open={isOpen} onClose={this.handleClose}>
                    <DialogTitle>Регистрация</DialogTitle>
                    <DialogContent>
                        <div>
                            <Stepper activeStep={currentStep}>
                                {Steps.map(x => <Step key={x.id}>
                                            <StepLabel>{x.name}</StepLabel>
                                        </Step>)}
                            </Stepper>

                            {this.stepSwitch()}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleBack} 
                                className={classes.button}>
                            {currentStep === 0 ? 'Отмена' : 'Назад'}
                        </Button>
                        <Button disabled={this.buttonIsDisabled()}
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}>
                            {currentStep === Steps.length ? 'Заверишть' : 'Далее'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(RegisterCompanyDialog);