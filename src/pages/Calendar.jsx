import React, { useEffect, useState, useMemo, useContext } from 'react'
import moment from 'moment';
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import Nextsidebar from '../components/Nextsidebar'
import {Drawer, DrawerOverlay,DrawerContent, useDisclosure, Box} from '@chakra-ui/react'
import { Flex,} from '@chakra-ui/react'
import EventForm from '../forms/EventForm'
import useApi from '../hooks/useApi';
import eventsApi from '../api/eventsApi';
import AuthContext from '../auth/AuthContext';

export default function CalendarComp({localizer, servicelist, getServices, clientlist, getClients}) {

  const {user, authTokens} = useContext(AuthContext)

  //fetch events when page Loads
  const [myEvents, setEvents] = useState([])
  const[creating, setCreating] = useState(false)
  const {isOpen, onOpen, onClose } = useDisclosure()
  const titleInput = React.useRef()
  const [sEvent, setSEvent] = useState()  //event selected
  const [bcView, setBCView] = useState('week');
  const [yourDate, setYourDate] = useState();
 
  const getEventsApi = useApi(eventsApi.getAllEvents);
  //const getEventsApi = useApi(getAllEvents)
  useEffect(() => {          
    getEventsApi.request(user,authTokens)  
  },[])

  const events = getEventsApi.data?.map((event)=>{
    return {
      id: event.id,
      service: event.service,
      client: event.client,
      start: new Date(event.start),
      end: new Date(event.end),
      allDay: false,
      }
      })

  function handleNavigate(date) {
    setYourDate(moment(date).toDate())
  }

//Manage del selection timeframe
  function handleSelectSlot ({ start, end }){
    if(bcView==='month'){
      handleNavigate(start)
      setBCView('day')
    }
    else{
      if(creating) myEvents.pop()
      onOpen()
      setCreating(true)
      const newevent = {
        'start': (start),
        'end': (end),
      }
      setSEvent(newevent) 
      setEvents((myEvents) => [...myEvents, newevent])}
    }
    

  const handleSelectEvent = async (e) => {
    //console.log(e)
    //Si estaba creando un evento, lo borro de la lista cacheada
    if(creating) myEvents.pop()
    onOpen()
    setCreating(false)
    setSEvent(myEvents.filter(item => item.id===e.id)[0])     //Elijo posicion 0 porque sino me guarda un array
    }
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: [Views.MONTH, Views.DAY, Views.WEEK, Views.AGENDA],
    }),
    []
  ) 
  function handleClose(){
    if(creating){
      myEvents.pop()}
    setCreating(false)
    setSEvent()
    onClose()  
  }

  function handleSave(){
    myEvents.pop()
    setCreating(false)
    setSEvent()
    onClose()
  }

  //Calendar event name display props
  function handleEventName(e){
    let title = 'Untitled';
    let client = ''
    if(e.service){
      try{title = servicelist.filter(item => item.id===e.service)[0].name}
      catch{
        console.log('Nose encuentra name para service ', e.service)
      }
    }
    if(e.client){
      try{client ='  para  '+ clientlist.filter(item => item.id===e.client)[0].name}
      catch{
        console.log('Nose encuentra name para cliente ', e.client)
      }
    }
    return(title+client)
  }
  //Formatting the date
  let formats = {
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({
        start,
        end
      }, culture, local) =>
      local.format(start, 'HH:mm', culture) + '-' +
      local.format(end, 'HH:mm', culture),
    dayFormat: 'DD',
    weekdayFormat: 'dddd'
  }
  function eventPropGetter(event, start, end, isSelected) {
    let backgroundColor = 'grey';
    if(event.service){
      try{backgroundColor = servicelist.filter(item => item.id===event.service)[0].color}
      catch{
        console.log('Nose ha encontrado color para el servicio', event.service)
      }
    }
    const style = {
        backgroundColor: backgroundColor,
        borderRadius: '8px',
        opacity: 0.7,
        color: 'black',
        border: '2px',
        display: 'block'
    }
    return {
        style: style
    }
  }

  return (
    <>
    <Flex w="100%" p="5" gap={6} bg="white" >
        <Nextsidebar datelist={myEvents} />    
      <Calendar
      dayLayoutAlgorithm={'no-overlap'} //algoritmo no overlappin
      defaultDate={defaultDate}
      defaultView = {Views.WEEK}
      events={events}
      view={bcView}
      onView={setBCView}
      localizer={localizer}
      showMultiDayTimes
      views={views}
      formats = {formats}
      titleAccessor = {handleEventName}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      eventPropGetter={eventPropGetter}
      date={yourDate}
      onNavigate={handleNavigate}
      selectable
      min= {new Date(1972, 0, 1, 8, 0, 0)}
      max= {new Date(2022, 10, 0, 22, 0, 0)}
      step={15}
      timeslots={4}
      style={{ height: 800,width: '100%' }}
      messages={{
        next: ">>",
        previous: "<<",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día"
      }}
      />
      </Flex>
      <Drawer placement='right'  onClose={handleClose} initialFocusRef={titleInput} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <EventForm onClose={onClose} handleClose={handleClose} onSave={handleSave} is_creating={creating} event={sEvent} events={myEvents} servicelist={servicelist} clientlist={clientlist} setEvents={setEvents} />
        </DrawerContent>
      </Drawer>    
      </>
    )
}

CalendarComp.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}