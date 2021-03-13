import { Component } from 'react'
import { AppBar, createStyles, IconButton, InputLabel, MenuItem, TextField, Toolbar, Typography, withStyles, WithStyles } from '@material-ui/core';

import { DataGrid, GridColDef, GridSelectionModelChangeParams, ValueGetterParams } from '@material-ui/data-grid';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { TaskDto } from '../../models/TaskDto';
import { Select } from '@material-ui/core';
import React from 'react';
import { TaskStatus } from '../../models/TaskStatus';
import { UserDto } from '../../models/UserDto';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Название', width: 400 },
    { field: 'setter', headerName: 'Постановщик', width: 250 },
    { field: 'executor', headerName: 'Исполнитель', width: 250 },
    { field: 'type', headerName: 'Статус',  width: 130 },
    { field: 'creationDate', headerName: 'Дата создания',  width: 150 },
    { field: 'deadline', headerName: 'Дэдлайн',  width: 150 },
  ];


const styles = (theme: any) => createStyles({
    filter: {
        height: '70px'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    dateSpaceing: {
        marginRight: theme.spacing(3),
    },
    filterSpaceing: {
        marginRight: theme.spacing(4),
    },
    userSelect: {
        minWidth: 200,
    },
    statusSelect: {
        minWidth: 100,
    },
    buttons: {
        marginLeft: 'auto',
    }
});

type Props = {} & WithStyles<typeof styles>;
type States = {
    data: TaskDto[];
    selectedIds: string[];
    isLoading: boolean;

    dateFrom?: Date;
    dateTo?: Date;
    
    status?: TaskStatus;

    setters?: UserDto[];
    executors?: UserDto[];

    selectedStatus?: UserDto[];

    selectedSetter?: UserDto;
    selectedExecutor?: UserDto;
};

class TasksView extends Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            data: [] as TaskDto[],
            selectedIds: [] as string[],
            isLoading: false
        };
    }
    
    componentDidMount() {
        this.fetchTasks();
        this.fetchUsers();
    }
    fetchTasks = () => {

    }
    fetchUsers = () => {

    }

    renderFilters = () => {
        const { classes } = this.props;
        const TaskStatusArray = [TaskStatus.ACTIVE, TaskStatus.ARCHIVE];

        return(
            <>
                <div>
                    <InputLabel>Дата создания</InputLabel>
                    <div className={classes.filterSpaceing}>
                        <TextField
                            className={classes.dateSpaceing}
                            type="date"
                            defaultValue={Date.now}
                            value={this.state.dateFrom}
                            //className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="date"
                            type="date"
                            defaultValue={Date.now}
                            value={this.state.dateTo}
                            //className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.filterSpaceing}>
                    <InputLabel>Статус</InputLabel>
                    <div>
                        <Select className={classes.statusSelect}
                                value={this.state.selectedStatus}
                                onChange={x => this.setState({status: x.target.value as TaskStatus})}>
                            <MenuItem value={TaskStatus.NONE}>
                                <em>None</em>
                            </MenuItem>
                            {TaskStatusArray.map(x => <MenuItem value={x}>{x}</MenuItem>)}
                        </Select>
                    </div>
                </div>
                <div className={classes.filterSpaceing}>
                    <InputLabel>Постановщик</InputLabel>
                    <div>
                        <Select className={classes.userSelect}
                                value={this.state.selectedSetter}
                                onChange={x => this.setState({selectedSetter: x.target.value as UserDto})}>
                            <MenuItem value={TaskStatus.NONE}>
                                <em>None</em>
                            </MenuItem>
                            {this.state.setters?.map(x => <MenuItem value={x.lastName + ' ' + x.name}>WTF</MenuItem>)}
                        </Select>
                    </div>
                </div>
                <div>
                    <InputLabel>Исполнитель</InputLabel>
                    <div>
                        <Select className={classes.userSelect}
                                value={this.state.selectedExecutor}
                                onChange={x => this.setState({selectedSetter: x.target.value as UserDto})}>
                            <MenuItem value={TaskStatus.NONE}>
                                <em>None</em>
                            </MenuItem>
                            {this.state.executors?.map(x => <MenuItem value={x.lastName + ' ' + x.name}>WTF</MenuItem>)}
                        </Select>
                    </div>
                </div>
            </>
        );
    }


    // Метод маппит из Dto в "табличный вид"
    getRows = () => {
        return this.state.data.map(x => {
            return {
                id: x.id,
                name: x.name,
                setter: x.setter,
                executor: x.executor,
                tpye: x.type,
                creationDate: x.creationDate,
                deadline: x.deadline
            };
        });
    }

    handleRowSelected = (params: GridSelectionModelChangeParams) => {
        this.setState({selectedIds: params.selectionModel as string[]});
    }
    handleAddTask = () => {

    }
    handleRemoveTask = () => {

    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <AppBar position="static" color='default'>
                    <Toolbar className={classes.filter}>
                        {this.renderFilters()}
                        <div className={classes.buttons}>
                            <IconButton onClick={this.handleAddTask}>
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={this.handleRemoveTask} disabled={this.state.selectedIds.length !== 1}>
                                <DeleteOutlinedIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={{ width: '100%' }}>
                    <DataGrid rows={this.getRows()}
                              columns={columns}
                              checkboxSelection
                              autoHeight
                              pageSize={25}
                              rowsPerPageOptions={[25]}
                              loading={this.state.isLoading}
                              onSelectionModelChange={this.handleRowSelected}/>
                </div>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(TasksView);