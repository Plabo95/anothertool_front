import React, { useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import Nextsidebar from '../components/Nextsidebar'
import {Drawer, DrawerHeader, DrawerOverlay,DrawerContent,DrawerCloseButton, useDisclosure} from '@chakra-ui/react'
import { Flex,} from '@chakra-ui/react'
import EventForm from '../forms/EventForm'


export default function CalendarComp({localizer, eventlist, getEvents, servicelist, getServices, clientlist, getClients}) {

      //fetch events when page Loads
  const[myEvents, setEvents] = useState(eventlist)
  const[creating, setCreating] = useState(false)
  const {isOpen, onOpen, onClose } = useDisclosure()
  const titleInput = React.useRef()
  const [sEvent, setSEvent] = useState()  //event selected
  const [bcView, setBCView] = useState('week');

  useEffect(() => {           //Cargo los eventos en el estado cada vez que cambie el fetch
    setEvents(eventlist);
    },[eventlist])

  const events = myEvents.map((event)=>{
    return {
      id: event.id,
      service: event.service,
      client: event.client,
      start: new Date(event.start),
      end: new Date(event.end),
      allDay: false,
      }
      })

//Manage del selection timeframe
  function handleSelectSlot ({ start, end }){
    if(bcView==='month'){
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
    <Flex w="100%" p="5" gap={6}>
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
          <EventForm onClose={onClose} handleClose={handleClose} onSave={handleSave} is_creating={creating} event={sEvent} events={eventlist} servicelist={servicelist} clientlist={clientlist} setEvents={setEvents} />
        </DrawerContent>
      </Drawer>    
      </>
    )
}

CalendarComp.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}