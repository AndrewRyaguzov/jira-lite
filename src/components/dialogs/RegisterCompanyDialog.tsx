import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core';
import React, { Component } from 'react'
import InputMask from "react-input-mask";
import { SignupDto } from '../../models/SignupDto';
import { ApiService } from '../../services/ApiService';

const styles = (theme: any) => createStyles({
    stepperRoot: {
        padding: "10px 24px 24px 24px"
    },
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
    isLoading: boolean;
    
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
    inviteCode: string;

    constructor(props: Props) {
        super(props);
        this.inviteCode = '';
        
        this.state = {
            isOpen: false,
            isLoading: false,
            currentStep: 0,

            companyName: '',
            
            firstName: '',
            secondName: '',
            phone: '',

            login: '',
            password: ''
        };
    }

    handleCompanyChange = (value: string) => {
        this.inviteCode = '';
        this.setState({ companyName: value })
    }

    handleClose = () => {
        if (this.state.isLoading) return;
        
        if (this.inviteCode !== '') {
            this.setState({ isOpen: false, firstName: '', secondName: '', phone: '', login: '', password: '' });
        } else {
            this.setState({ currentStep: 0, isOpen: false, companyName: '', firstName: '', secondName: '', phone: '', login: '', password: '' });
        }
    };
    handleSuccessClose = () => {
        this.inviteCode = '';
        this.setState({ currentStep: 0, isOpen: false, isLoading: false, companyName: '', firstName: '', secondName: '', phone: '', login: '', password: '' });
    }

    handleNext = async () => {
        const {currentStep, companyName} = this.state;
        this.setState({isLoading: true})

        if (currentStep === Steps.length - 1) {
            const {login, password, phone, firstName, secondName} = this.state;
            
            if (this.inviteCode === '') {
                const companyResponse = await ApiService.createCompany(companyName)
                    .finally(() => this.setState({isLoading: false}));
                
                if (companyResponse?.ok) {
                    const response = await companyResponse.json();
                    this.inviteCode = response.inviteCode;
                } else {
                    // Вывести ошибку
                    return;
                }
            }

            this.setState({isLoading: true})
            const dto = new SignupDto(login, password, firstName, secondName, phone);
            const userResponse = await ApiService.signUp(dto, this.inviteCode)
            
            this.setState({isLoading: false});
            if (userResponse?.ok) {

            } else {
                // Вывести ошибку
                return;
            }
        }
        if(currentStep === Steps.length) {
            this.handleSuccessClose();
            return;
        }
        
        this.setState({ isLoading: false, currentStep: currentStep + 1 })
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
                        onChange={x => this.handleCompanyChange(x.target.value)}/>
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
        const {isLoading, currentStep, companyName, firstName, secondName, phone, login, password } = this.state;

        if (currentStep === 0) {
            return companyName === '';
        }
        if (currentStep === 1) {
            return firstName === '' || 
                secondName === '' || 
                phone === '' || 
                login === '' || 
                password === '' ||
                isLoading;
        }
        
        return false;
    }

    render() {
        const { classes } = this.props;
        const { isOpen, isLoading, currentStep } = this.state;

        return (
            <>
                <Button className={classes.button}
                    variant="contained"
                    color="default"
                    onClick={() => this.setState({ isOpen: true })}>
                    Зарегистрироваться
                </Button>
                <Dialog open={isOpen} onClose={this.handleClose}>
                    {isLoading && <LinearProgress/>}
                    <DialogTitle>Регистрация</DialogTitle>
                    <DialogContent>
                        <div >
                            <Stepper 
                                className={classes.stepperRoot}
                                activeStep={currentStep}>
                                {Steps.map(x => <Step key={x.id}>
                                            <StepLabel>{x.name}</StepLabel>
                                        </Step>)}
                            </Stepper>

                            {this.stepSwitch()}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {currentStep === Steps.length &&
                        <Button disabled={isLoading}
                                onClick={this.handleBack} 
                                className={classes.button}>
                            {currentStep === 0 ? 'Отмена' : 'Назад'}
                        </Button>}
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