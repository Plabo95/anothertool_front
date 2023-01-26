import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, } from "@chakra-ui/react"

//comps
import Navbar from "../../components/navbar/Navbar"
import EventsTable from '../../components/myGarage/tables/EventsTable'
import ClientsTable from '../../components/myGarage/tables/ClientsTable'
import CarsTable from '../../components/myGarage/tables/CarsTable'

export default function MyGarage(){


    return(
        <Flex w='100%'>
            <Navbar/>
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
                        <ClientsTable/>
                    </TabPanel>
                    <TabPanel>
                        <CarsTable/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}