import { Component } from 'react'
import React from 'react';
import { AppBar, Button, createStyles, IconButton, Toolbar, withStyles, WithStyles } from '@material-ui/core';

import { DataGrid, GridCellParams, GridColDef, GridRowSelectedParams, GridSelectionModelChangeParams, ValueGetterParams } from '@material-ui/data-grid';

import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';

import { ApiService } from '../../services/ApiService';
import { UserDto } from '../../models/UserDto';

const columns: GridColDef[] = [
    { field: 'lastName', headerName: 'Фамилия', width: 130 },
    { field: 'firstName', headerName: 'Имя', width: 130 },
    { field: 'type', headerName: 'Тип',  width: 130 },
    { field: 'phone', headerName: 'Телефон',  width: 130 },
    { field: 'status', headerName: 'Статус',  width: 130 },
  ];

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
type States = {
    rows: UserDto[];
    selectedIds: string[];
    isLoading: boolean;
}
class UsersView extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            rows: [] as UserDto[],
            selectedIds: [] as string[],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.fetchUsers();    
    }
    fetchUsers = () => {
        this.setState({isLoading: true});
        ApiService.getCompanyUsers("")
        .then(x => x.json())
        .then(x => {
            this.setState({ rows: JSON.parse(x) as UserDto[], isLoading: false })
        })
        .finally(() => this.setState({ isLoading: false }));
    }
    getRows = () => {
        //return [{id: 121, lastName: 'Snow', firstName: 'Jon', type: "Что-то", phone: "+799999999", status: "UserStat" }];
        return this.state.rows.map(x => {
            return {
            id: x.id,
            lastName: x.lastName, 
            firstName: x.name,
            type: (x.isAdmin ? "Администратор" : "Пользователь"),
            phone: x.phone,
            status: x.state};
        });
    }

    handleRowSelected = (params: GridSelectionModelChangeParams) => {
        this.setState({selectedIds: params.selectionModel as string[]});
    }

    handleSetAdmin = () => {
        const id = this.state.selectedIds[0];
        const index = this.state.rows.findIndex(x => x.id === id);
        const data =  this.state.rows[index];

        if(data.isAdmin) {
            ApiService.setUserNotAdmin(id)
            .then(() => this.fetchUsers())
            .finally(() => this.setState({ isLoading: false }));
        } else {
            ApiService.setUserAdmin(id)
            .then(() => this.fetchUsers())
            .finally(() => this.setState({ isLoading: false }));
        }
    }
    handleArchive = () => {
        const ids = this.state.selectedIds;
        
        this.setState({isLoading: true});

        ids.forEach(async id => {
            await ApiService.setUserArchived(id);
        });
        
        this.fetchUsers();
    }
    handleActivate = () => {
        const ids = this.state.selectedIds;
        
        this.setState({isLoading: true});

        ids.forEach(async id => {
            await ApiService.setUserActive(id)
        });
        
        this.fetchUsers();
    }

    render() {
        const { classes } = this.props;
        const preparedRows = this.getRows();

        return (
            <>

                <AppBar position="static" color='default'>
                    <Toolbar>
                        Кнопки фильтрации
                        <div className={classes.buttons}>
                            <IconButton onClick={this.handleSetAdmin} disabled={this.state.selectedIds.length !== 1}>
                                <SupervisorAccountOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={this.handleActivate} disabled={this.state.selectedIds.length === 0}>
                                <CheckCircleOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={this.handleArchive} disabled={this.state.selectedIds.length === 0}>
                                <ArchiveOutlinedIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={{ width: '100%' }}>
                    <DataGrid rows={preparedRows} 
                              columns={columns} 
                              checkboxSelection 
                              autoHeight 
                              loading={this.state.isLoading}
                              onSelectionModelChange={this.handleRowSelected}/>
                </div>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(UsersView);