import  {useState } from 'react'
import {Flex, Divider, Avatar, Heading, Text, IconButton, Button, Box} from '@chakra-ui/react'

//comps
import NavItem from './NavItem';
//icons
import {MdOutlineAdminPanelSettings} from 'react-icons/md'; 
import {FiLogOut} from 'react-icons/fi';
import {AiOutlineCalendar} from 'react-icons/ai';
import {BiWrench} from 'react-icons/bi';
import {VscGraph} from 'react-icons/vsc';
import {FaUserTie} from 'react-icons/fa';
//images
import Logo from '../../img/logos/logo_navbar.png'
//auth
import { useSignOut } from 'react-auth-kit'

export default function Navbar(){

    const signOut = useSignOut()

    return(
        <Flex direction='column' bg='darkblue' justify='space-between' py='4em' minH='100vh' px='2em'>

            <Flex direction='column'>
                <NavItem icon={MdOutlineAdminPanelSettings} title="AdminPanel" slash='/none' />
                <NavItem icon={AiOutlineCalendar} title="Calendario" slash='/calendar' />
                <NavItem icon={BiWrench} title="Mi taller" slash='/taller' />      
                <NavItem icon={VscGraph} title="Estadisticas" slash='/none' />
            </Flex>

            <Flex direction='column' gap='2em'>
                <Divider/>
                <Flex _hover={{bg:'darkblue'}} _focus={{bg:'darkblue'}}  gap='1em' cursor={'pointer'}>
                    <FiLogOut style={{ background: 'none', color: 'white', fontSize: '25px', padding: '0px', _hover:{background:'none'}, _focus:{background:'none'} }}/> 
                    <Text color="whiteAlpha.800"
                    onClick={() => signOut()}
                    > Cerrar sesión </Text>
                </Flex>
                <Flex >
                    <Avatar size="sm" icon={<FaUserTie fontSize='1.5rem' />}/> 
                    <Flex direction="column" ml="4"  >
                        <Heading color="whiteAlpha.800" size="sm"> Romario </Heading>
                        <Text color="whiteAlpha.800" >Jefe de taller</Text>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
        
    )
}

