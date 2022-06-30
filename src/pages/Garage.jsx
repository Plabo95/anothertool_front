import React, {useEffect, useContext} from 'react'

import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text, Heading, Container } from '@chakra-ui/react'


//components
import EventsTable from '../tables/EventsTable'
import ClientsTable from '../tables/ClientsTable'
import ServicesTable from '../tables/ServicesTable'
import CarsTable from '../tables/CarsTable'


function Garage(){
    
    return(
        <Container maxW='1750px'>
        <Flex w="100%" direction={'column'} minH='100vh' align='center'>
        <Flex py='4' justify={'start'} w='80%'>
            <Heading>Mi taller</Heading>
        </Flex>
        <Flex w='80%' align='center' >
        <Tabs variant='unstyled' colorScheme='orange' w='100%'>
            <TabList >
                <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Citas</Tab>
                <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Servicios</Tab>
                <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Clientes</Tab>
                <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Coches</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <EventsTable/>
                </TabPanel>
                <TabPanel>
                    <ServicesTable/>
                </TabPanel>
                <TabPanel>
                    <ClientsTable/>
                </TabPanel>
                <TabPanel>
                    <CarsTable/>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Flex>
        </Flex> 
        </Container>
    );
}

export default Garage;