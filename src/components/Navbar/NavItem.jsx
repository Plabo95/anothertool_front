import {Flex, Text, IconButton, Menu, Link, MenuButton, } from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom';

function NavItem({navSize, icon, title, active, slash}){
    return(
    <Flex
        mt={30}
        direction = "column"
        w="100%"
        align={navSize === "small"? "center": "flex-start"}
    >
        <Menu>
            <Link
            backgroundColor={active && "orange"}
            p="3"
            borderRadius={8}
            _hover={{textDecor: 'none', backgroundColor:"orange", color:"white"}}
            w={navSize === "large" && "100%"}
            as={ReachLink}
            to={slash}
            
            >
                <MenuButton w="100%">
                    <Flex>
                        <IconButton as={icon} bg='none' size='xs' color={active? "white": "orange" }  />
                        <Text display={navSize === "small"? "none": "flex"} ml="5" color="whiteAlpha.800" > {title} </Text>
                    </Flex>
                </MenuButton>
            </Link>
        </Menu>
    </Flex>

    )
}

export default NavItem;