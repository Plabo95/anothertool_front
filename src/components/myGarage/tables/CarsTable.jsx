import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Button,useToast,IconButton, Flex,} from '@chakra-ui/react'
import {Drawer,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,} from '@chakra-ui/react'

export default function CarsTable(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <Flex justify='end'>
            <Button variant='primary'>+ Añadir coche</Button>
        </Flex>
        <Flex w="100%">
        <TableContainer mt='5' borderRadius='lg' w="100%" bg='white' boxShadow='lg'>
        <Table variant='simple' size='md'>
            <Thead>
                <Tr>
                <Th>Matrícula</Th>
                <Th>Marca</Th>
                <Th>Modelo</Th>
                <Th>Cliente</Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {/* cars.map(car=> {
                return(
                    <Tr key={car.idplate}>
                        <Td>{car.idplate}</Td>
                        <Td>{car.brand}</Td>
                        <Td>{car.model}</Td>
                        <Td>{car.client? car.client: 'No asignado'}</Td>
                        <Td>
                            <IconButton mr={3} size='xs' background="none" icon={<SvgEdit/>}  onClick={()=> handleEdit(car)} ></IconButton>  
                            <PopoverDelete onDelete={handleDelete} id={car.idplate} />
                        </Td>    
                    </Tr>
                )})
                */}
            </Tbody>
        </Table>
        </TableContainer>
        </Flex>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Coche</DrawerHeader>
                {/* 
                <CarForm  onClose={onClose} /> 
                */}              
            </DrawerContent>
        </Drawer>                    
     
      </>
    );
}
