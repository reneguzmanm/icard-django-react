import React from 'react';
import "./TableUsers.scss";
import {Table, Button, Icon, TableHeader, TableRow, TableBody, TableCell} from "semantic-ui-react";
import { map } from "lodash";

export function TableUsers(props) {
    const { users, updateUser, onDeleteUser} = props;
  return (
    <Table className='table-users-admin'>
        <TableHeader>
            <TableRow>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Apellidos</Table.HeaderCell>
                <Table.HeaderCell>Activo</Table.HeaderCell>
                <Table.HeaderCell>Staff</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </TableRow>
        </TableHeader>

        <TableBody>
            {map(users, (user, index) => (
                <Table.Row key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell className='status'>
                        {user.is_active ? <Icon name='check'/> : <Icon name='close'/>}
                    </TableCell>
                    <TableCell className='status'>
                    {user.is_staff ? <Icon name='check'/> : <Icon name='close'/>}
                    </TableCell>
                    <Actions user={user} updateUser={updateUser} onDeleteUser={onDeleteUser}/>
                </Table.Row>
            ))}
        </TableBody>
    </Table>
  )
}

function Actions(props){
    const {user, updateUser, onDeleteUser} = props;
    return(
        <Table.Cell textAlign='right'>
            <Button icon onClick={() => updateUser(user)}>
                <Icon name='pencil' />
            </Button>
            <Button icon negative onClick={ () => onDeleteUser(user)}>
                <Icon name='trash' />
            </Button>
        </Table.Cell>
    )
}