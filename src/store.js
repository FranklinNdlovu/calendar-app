import { reactive } from "vue";
import { seedData } from "./seed";

export const store = {
    state: {
        data: reactive(seedData)
    },
    getActiveDay() {
        return this.state.data.find(day => day.active);
    },
    setActiveDay(dayId) {
        this.state.data.forEach(day => day.active = (day.id == dayId));
    },
    submitEvent(eventDetails) {
        const day = this.getActiveDay();
        day.events.push({ "details": eventDetails, "edit": false });
    },
    editEvent(dayId, eventDetails) {
        this.resetEditOfAllEvents();
        const event =this.getEvent(dayId, eventDetails);
        event.edit = true;
    },
    resetEditOfAllEvents() {
        this.state.data.forEach(day => day.events.forEach(event => event.edit = false));
    },
    updateEvent(dayId, originalEventDetails, updatedEventDetails){
        const event =this.getEvent(dayId, originalEventDetails);
        event.details = updatedEventDetails;
        event.edit = false;

    },
    getEvent(dayId, eventDetails) {
        const day = this.state.data.find(day => day.id == dayId);
        return day.events.find(event => event.details == eventDetails);
    },
    deleteEvent(dayId, eventDetails) {
        const day = this.state.data.find(day => day.id == dayId);
        const indexOfEventToDelete = day.events.findIndex(event => event.details == eventDetails);
        day.events.splice(indexOfEventToDelete, 1);
    }
};