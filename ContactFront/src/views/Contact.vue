<template>
    <div class="ui segment" style="margin-top: 15px; ">
        <div class="ui teal segment" style="display: flex;">
            <div class="ui teal ribbon label big">Contacts</div>
            <div class="ui action input" style=" width: 100%;">
                <input type="text" placeholder="Search..." style="width: 90%;" v-model="search" />
                <button class="ui button" style="width: 80px; height: 40px;" @click="filterContacts">Search</button>
                <router-link to="/addContact"><button class="ui orange button" style="width: 80px; height: 40px;">+ Add</button></router-link>
            </div>
        </div>
        <div class="ui cards segment" style="margin:0px;">
            <Card v-for="contact in filteredContacts" :contact="contact"
                style="width: 24%;" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import Card from '../components/Card.vue';

export default {
    name: 'Contact',
    components: {
        Card
    },
    computed: {
        filteredContacts() {
            return this.contactList.filter(contact =>
                contact.firstname.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
                contact.lastname.toLowerCase().includes(this.filterSearch.toLowerCase())
            );
        }
    },
    methods: {
        filterContacts() {
            this.filterSearch = this.search
        }
    },
    data() {
        return {
            contactList: [],
            search: "",
            filterSearch: ""
        }
    },
    mounted() {
        axios.get('http://localhost:5001/contacts')
            .then((response) => {
                console.log(response.data)
                this.contactList = response.data
            })
    }
}
</script>

<style scoped></style>