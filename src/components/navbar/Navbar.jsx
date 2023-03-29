import {Flex, Divider, Avatar, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

//comps
import NavItem from './NavItem';
//icons
import {MdOutlineAdminPanelSettings} from 'react-icons/md'; 
import {FiLogOut} from 'react-icons/fi';
import {AiOutlineCalendar} from 'react-icons/ai';
import {BiWrench} from 'react-icons/bi';
//import {VscGraph} from 'react-icons/vsc';
import {BsSticky} from 'react-icons/bs'
import {FaUserTie} from 'react-icons/fa';
//images
//auth
import { useSignOut, useAuthUser } from 'react-auth-kit'

export default function Navbar(){

    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()

    return(
        <Flex w='150px' direction='column' bg='darkblue' justify='space-between' py='4em' minH='100vh'>

            <Flex direction='column' gap='2em'>
                <NavItem icon={MdOutlineAdminPanelSettings} title="AdminPanel" slash='/none' />
                <NavItem icon={AiOutlineCalendar} title="Dashboard" slash='/dashboard' />
                <NavItem icon={BsSticky} title="Ordenes" slash='/ordenes' />
                <NavItem icon={BiWrench} title="Datos" slash='/datos' /> 
                <NavItem icon={BiWrench} title="Taller" slash='/taller' />      
            </Flex>

            <Flex direction='column' gap='2em' justify='center'  align='center'  >
                <Divider w='100px' color='lightgray' />
                <Button variant='darkblue' py='2em' w='100%'>
                    <Flex direction='column' align='center' gap='0.5em' onClick={() =>{ signOut(); navigate('/')}} >
                        <FiLogOut size='20px' />
                        <Text fontSize='14px' color= 'whiteAlpha.800'> Signout </Text>
                    </Flex>
                </Button>
                <Button variant='darkblue' py='4em' w='100%'>
                    <Flex direction='column' justify='center' align='center' gap='0.5em'>
                        <Avatar size="sm" icon={<FaUserTie />}/> 
                        <Text color="whiteAlpha.800" fontWeight='bold' fontSize='16px' > {auth()?.email} </Text>
                        <Text color="whiteAlpha.800" fontSize='14px'>Jefe de taller</Text>
                    </Flex>
                </Button>
            </Flex>

        </Flex>
        
    )
}

