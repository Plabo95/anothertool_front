import {Flex, Divider, Avatar, Heading, Text, IconButton, Button, Box} from '@chakra-ui/react'
import SvgMenu from  '../../dist/Menu'
import SvgAnalytics from  '../../dist/Analytics'
import SvgCalendar from  '../../dist/Calendar'
import SvgServicios from  '../../dist/Servicios'
import SvgLogo from  '../../dist/Logo'
import {AiOutlineCalendar} from 'react-icons/ai';
import {BiWrench} from 'react-icons/bi';
import {VscGraph} from 'react-icons/vsc';
import {FaUserTie} from 'react-icons/fa';
import React, {useState, useContext } from 'react'
import NavItem from './NavItem';
import AuthContext from '../../auth/AuthContext'

import {MdOutlineAdminPanelSettings} from 'react-icons/md'; 
import {FiLogOut} from 'react-icons/fi'; 

function Navbar(){
    const [show, setShow] = useState(false)
    const handleToggle = () => setShow(!show)

    const [navSize, setNavSize] = useState("small")
    const {user, logoutUser} = useContext(AuthContext)

    if (user) {
    return(
        <>
        <Box bg='transparent' h="100vh" w={navSize === "small"? "75px": "200px"}>
            <Flex direction="column"  p={navSize === "small"? "11px": "16px"} align={navSize === "small"? "flex-start": "flex-start"}  >
                <NavItem navSize={navSize} icon={MdOutlineAdminPanelSettings} title="AdminPanel" slash='/none' />
                <NavItem navSize={navSize} icon={AiOutlineCalendar} title="Calendario" slash='/none' />
                <NavItem navSize={navSize} icon={BiWrench} title="Mi taller" slash='/none' />      
                <NavItem navSize={navSize} icon={VscGraph} title="Estadisticas" slash='/none' /> 
            </Flex>
        </Box> 
        <Flex bg='darkblue' h="100%" position='fixed' flexFlow='column wrap' justify="space-between" zIndex='50'
        w={navSize === "small"? "75px": "200px"}>
            <Box pos="absolute" top="30px" right="-2" zIndex='100' bg='blue' borderRadius='10' cursor='pointer'
            onClick={()=> {
                if (navSize === "small")
                    setNavSize("large")
                else 
                    setNavSize("small")
            }}>
                <Flex alignItems='center' justifyContent='center' color="white" w='17px' h='17px'>
                    { navSize === "small"
                        ? '>'
                        : '<'
                    }
                </Flex>
            </Box>
            <Flex direction="column"  p="8px" align={navSize === "small"? "flex-start": "flex-start"}  >
                <Box pl='4' pr='3' pt='10px'>
                    <Flex alignItems='center'>
                        <Box>
                            <IconButton align='center' size='xs' pb='20px' color="white" background="none" mt="5" _hover={{bg:'none'}} _focusWithin={{bg:'none'}} icon={<SvgLogo/>} 
                            onClick={()=> {
                                if (navSize === "small")
                                    setNavSize("large")
                                else 
                                    setNavSize("small")
                            }}
                            >
                            </IconButton>
                        </Box>
                        { navSize === "large" && 
                            <Button background="none" _hover={{bg : 'none'}} _focusWithin={{bg:'none'}}
                            onClick={()=> {
                                if (navSize === "small")
                                    setNavSize("large")
                                else 
                                    setNavSize("small")
                            }}>
                                <Heading size='sm' color={'white'} >another</Heading><Heading size='sm' color={'blue'}>tool</Heading> 
                            </Button>
                        }
                    </Flex>
                </Box>
                {user.is_staff && 
                    <NavItem navSize={navSize} icon={MdOutlineAdminPanelSettings} title="AdminPanel" slash='/adminpanel' />
                }
                <NavItem navSize={navSize} icon={AiOutlineCalendar} title="Calendario" slash='/calendar' />
                <NavItem navSize={navSize} icon={BiWrench} title="Mi taller" slash='/garage' />      
                <NavItem navSize={navSize} icon={VscGraph} title="Estadisticas" slash='/analytics' /> 
            </Flex>

            <Flex p='2' flexFlow='column wrap' w="100%" mb={4} gap='3'
            align={navSize === "small"? "flex-start": "flex-start"}  
            >
                <Divider display={navSize === "small"? "none": "flex"}/>
                <Box pl='2' pr='3'>
                    <Button size='sm' onClick={logoutUser} bg='darkblue' padding='0px' _hover={{bg:'darkblue'}} _focus={{bg:'darkblue'}} justify='flex-start'>
                        <Box pl='2'>
                            <FiLogOut style={{ background: 'none', color: 'white', fontSize: '25px', padding: '0px', _hover:{background:'none'}, _focus:{background:'none'} }}/> 
                        </Box>
                        <Flex ml="4" display={navSize === "small"? "none": "flex"} >
                            <Text color="whiteAlpha.800"> Cerrar sesión </Text>
                        </Flex>     
                    </Button>  
                </Box> 
                <Flex mt="4" px='3' align="center" h='50px'> 
                    <Box>
                        <Avatar size="sm" icon={<FaUserTie fontSize='1.5rem' />}/> 
                    </Box>
                    <Flex direction="column" ml="4" display={navSize === "small"? "none": "flex"} >
                        <Heading color="whiteAlpha.800" size="sm"> {user.username} </Heading>
                        <Text color="whiteAlpha.800" >Jefe de taller</Text>
                    </Flex>
                </Flex>
            </Flex>

        </Flex> 
        </> 
    )
    }

}

export default Navbar;