<template>
    <div class="card">
        <div class="image">
            <img :src="contact.imageUrl">
        </div>
        <div class="content center aligned">
            <div class="header">{{contact.firstname}} {{contact.lastname}}</div>
            <div class="meta">
            <div class="date">Mobile: {{contact.mobile}}</div>
            <div class="date">Email: {{contact.email}}</div>
            <div class="date">Facebook: {{contact.facebook}}</div>
            </div>
        </div>
        <div class="extra content center aligned">
            <router-link :to="{ path: 'editContact', name: 'EditContact', params:{contactID: contact._id} }">
                <button class="ui blue icon button">
                    <i class="edit icon"></i>
                </button>
            </router-link>
            <button class="ui red icon button" @click.prevent="delContact(contact._id)">
                <i class="trash alternate icon"></i>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    methods: {
        delContact(ID){
            if(confirm("Are you sure to remove this contact?"))
            axios.delete(`http://localhost:5001/contacts/${ID}`)
            .then(() => window.location.reload())
            .catch(err=>console.log(err))
        }
    }
}
</script>

<style scoped>
.card {
  height: 55vh;
}

.image {
  height: 70%;
  overflow: hidden;
}

.image img {
  height: 100%;
  object-fit: cover;
}
</style>