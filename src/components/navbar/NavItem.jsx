import {Flex, Text, IconButton, Menu, Link, MenuButton, } from '@chakra-ui/react'
import { Link as ReachLink, useMatch, useResolvedPath } from 'react-router-dom';
import {useState } from 'react'

function NavItem({navSize, icon, title, slash}){
    let resolved = useResolvedPath(slash);
    let active = useMatch({ path: resolved.pathname, end: true });
    //let isHover = false;
    const [isHover,setIsHover] = useState(false)
    return(
    <Flex
        mt={15}
        direction = "column"
        w="100%"
        align={navSize === "small"? "flex-start": "flex-start"}
    >
        <Menu>
            <Link
            //backgroundColor={active && "blue"}
            py="3"
            borderRadius={8}
            _hover={{bg:'blue'}}
            onMouseOver={()=>{setIsHover(true)}}
            onMouseLeave={()=>{setIsHover(false)}}
            w={navSize === "large" && "100%"}
            as={ReachLink}
            to={slash}
            >
                <MenuButton w="100%">
                    <Flex>
                        <IconButton as={icon} bg='none' size='xs' color={active ? "white": "orange" }  className={active && !isHover ? 'svg-blue' : 'svg-white'} />
                        <Text display={navSize === "small"? "none": "flex"} ml="5" color={active && !isHover ? 'blue' : 'whiteAlpha.800'}> {title} </Text>
                    </Flex>
                </MenuButton>
            </Link>
        </Menu>
    </Flex>

    )
}

export default NavItem;