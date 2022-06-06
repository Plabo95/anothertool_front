import React, {useState, useEffect, useContext, useRef} from 'react'
import {Box, Table,Thead,Tbody,Tr,Th,Td,TableContainer,Switch,Flex, IconButton, useToast} from '@chakra-ui/react'
import PopoverDelete from '../components/PopoverDelete'
import moment from 'moment';
import adminApi from '../api/adminApi'
import AuthContext from '../auth/AuthContext'
import useApi from '../hooks/useApi'

import {AiOutlineCheck} from 'react-icons/ai';
import {ImCross} from 'react-icons/im';

function AdminPanel(){

    const {user, authTokens} = useContext(AuthContext)
    const getUsersApi = useApi(adminApi.getAllUsers);
    const updateUserApi = useApi(adminApi.updateUser);
    const deleteUserApi = useApi(adminApi.deleteUser);

    const toast = useToast()
    const[users, setUsers] = useState([])

    const updateTable = async () => {
        const {data, error} = await getUsersApi.request(user,authTokens);
        error? console.log('Error fetching...', error) 
            : setUsers(data)
    }

    const handleUpdate= async(user, active, staff)=>{
        user['is_staff'] = staff
        user['is_active'] = active
        console.log('active', active, 'staff', staff)
        const {error} = await updateUserApi.request(user, authTokens)
        if(error){
            toast({
                title: 'Error al guardar ',
                description: "Código de error"+ error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
                })
        }
        else{
            updateTable()
            toast({
                title: 'Usuario actualizado',
                status: 'success',
                duration: 6000,
                isClosable: true,
                }) 
        }
    }
    const handleDelete = async (id) =>{
        const {error} = await deleteUserApi.request(id, authTokens)
        if(!error){
            toast({
                title: 'Usuario borrado',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            updateTable()
        }   
        else{
            console.log('error es:', error)
            toast({
                title: 'Error al borrar ',
                description: "Código de error"+ error +' intentalo mas tarde' ,
                status: 'error',
                duration: 6000,
                isClosable: true,
            })
        }    
    }

    useEffect(() => {  
        updateTable()        
      },[])

    return(
        <>
        <Flex>    
            <Box>
            <TableContainer mt='5%' borderRadius='lg' bg="white">
                <Table variant='simple' size='md'>
                <Thead>
                    <Tr>
                    <Th>Id</Th>
                    <Th>Username</Th>
                    <Th>email</Th>
                    <Th>Last Login</Th>
                    <Th>Date Joined</Th>              
                    <Th>Is SuperUser</Th>
                    <Th>Is Active</Th>
                    <Th>Is Staff</Th>        
                    <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user=>
                        <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.username}</Td>
                            <Td>{user.email}</Td>                
                            <Td>{moment(user.last_login).format("DD/MM/YYYY, hh:mm")}</Td>
                            <Td>{moment(user.date_joined).format("DD/MM/YYYY, hh:mm")}</Td>
                            <Td>{user.is_superuser
                            ?<AiOutlineCheck className='svg-green' />
                            : <ImCross className='svg-red'/>}</Td>
                            <Td>                    
                                <Switch size='sm' colorScheme='green' 
                                isChecked={user.is_active} onChange={()=>handleUpdate(user, !user.is_active, user.is_staff)} />
                            </Td>
                            <Td>                    
                                <Switch size='sm' colorScheme='green' 
                                isChecked={user.is_staff} onChange={()=>handleUpdate(user, user.is_active, !user.is_staff)} />
                            </Td>
                            <Td>
                                <PopoverDelete onDelete={handleDelete} id={user.id} />
                            </Td>
                        </Tr>
                    )}
                </Tbody>
                </Table>
            </TableContainer>  
            </Box>                
      </Flex>
      </>
    );
}

export default AdminPanel;