import { Component } from 'react'
import React from 'react';
import { AppBar, Button, createStyles, IconButton, Toolbar, withStyles, WithStyles } from '@material-ui/core';

//import { DataGrid, GridColDef, ValueGetterParams } from '@material-ui/data-grid';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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

class TasksView extends Component<Props> {
    handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {

    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <AppBar position="static" color='default'>
                    <Toolbar>
                        Кнопки фильтрации


                        <div className={classes.buttons}>
                            <IconButton>
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <DeleteOutlinedIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(TasksView);