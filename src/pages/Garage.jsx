import React, {useEffect, useState} from 'react'
import ClientsTable from '../tables/ClientsTable'
import ServicesTable from '../tables/ServicesTable'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text } from '@chakra-ui/react'
import EventsTable from '../tables/EventsTable'

function Garage({clientlist, eventlist, servicelist, getEvents, getServices, getClients}){

    useEffect(() => {     
        getEvents();
        getServices();
        getClients();
    },[])

    return(
        <>
        <Flex w="100%" justify={'center'} mt={10}>
        <Tabs isFitted variant='enclosed' colorScheme='orange' w="90%">
            <TabList >
                <Tab _selected={{ color: 'orange', textDecorationLine: 'underline', textDecorationThickness:'2px'}} >Citas</Tab>
                <Tab _selected={{ color: 'orange', textDecorationLine: 'underline', textDecorationThickness:'2px'}}>Servicios</Tab>
                <Tab _selected={{ color: 'orange', textDecorationLine: 'underline', textDecorationThickness:'2px'}}>Clientes</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <EventsTable datelist={eventlist} servicelist={servicelist} clientlist={clientlist}/>
                </TabPanel>
                <TabPanel>
                    <ServicesTable servicelist={servicelist} />
                </TabPanel>
                <TabPanel>
                    <ClientsTable clientlist={clientlist} />
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Flex> 
        </>
    );
}

export default Garage;