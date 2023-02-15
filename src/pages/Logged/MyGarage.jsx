import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, } from "@chakra-ui/react"

//comps
import Navbar from "../../components/navbar/Navbar"
//import EventsTable from '../../components/myGarage/tables/EventsTable'
import ClientsTable from '../../components/myGarage/tables/ClientsTable'
import CarsTable from '../../components/myGarage/tables/CarsTable'
//import ServicesTable from "../../components/myGarage/tables/ServicesTable"

export default function MyGarage(){


    return(
        <Flex w='100%' justify='center'  >
            <Navbar/>
            <Tabs variant='unstyled' colorScheme='orange'  w='100%' p='4em'>
                <TabList >
                    <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Clientes</Tab>
                    <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Coches</Tab>
                </TabList>
                <TabPanels>
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