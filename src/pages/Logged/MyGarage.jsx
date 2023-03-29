import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, } from "@chakra-ui/react"

//comps
import Navbar from "../../components/navbar/Navbar"
import ClientsTable from '../../components/myGarage/tables/ClientsTable'
import CarsTable from '../../components/myGarage/tables/CarsTable'
import OrdersTable from "../../components/myGarage/tables/OrdersTable"
import InvoicesTable from "../../components/myGarage/tables/InvoicesTable"

export default function MyGarage(){


    return(
        <Flex>
            <Navbar/>
            <Tabs variant='unstyled' colorScheme='orange'  w='100%' p='4em'>
                <TabList >
                    <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Ordenes</Tab>
                    <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Clientes</Tab>
                    <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Coches</Tab>
                    <Tab px='10' rounded='5px' _selected={{ color: 'white', bg: 'blue', rounded: '5px' }}>Facturas</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <OrdersTable/>
                    </TabPanel>
                    <TabPanel>
                        <ClientsTable/>
                    </TabPanel>
                    <TabPanel>
                        <CarsTable/>
                    </TabPanel>
                    <TabPanel>
                        <InvoicesTable/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}