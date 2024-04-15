<template>
  <div class="ui container">
    <div class="header">
      <div><h1>Contact</h1></div>
      <div class="tag">Add</div>
    </div>
    <form class="form" @submit.prevent="validateForm">
      <div class="ui input form-input" v-for="input in inputs" :key="input.label">
        <label class="input-label">
          {{ input.label }}<span v-if="input.required" class="required">*</span>
        </label>
        <input :type="input.type" :placeholder="input.label" v-model="newContact[input.model]" :required="input.required" :pattern="input.pattern"/>
        <div v-if="!valid" class="error">Invalid input</div>
      </div>
      <div class="button-group">
        <button class="ui primary button" type="submit"><i class="save icon"></i>Save</button>
        <router-link to="/contact"><button class="ui button"><i class="times icon"></i>Close</button></router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter();

const newContact = ref({
    "cid": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "mobile": "",
    "facebook": "",
    "imageUrl": ""
})

const valid = ref(true);

const inputs = [
  { label: 'Contact ID', type: 'text', model: 'cid', required: true, pattern: "\\d+" },
  { label: 'First Name', type: 'text', model: 'firstname', required: true, pattern: "[A-Za-z]+" },
  { label: 'Last Name', type: 'text', model: 'lastname', required: true, pattern: "[A-Za-z]+" },
  { label: 'Mobile No', type: 'text', model: 'mobile', required: true, pattern: "\\d{10}" },
  { label: 'Email', type: 'text', model: 'email', required: false, pattern: ".+@.+\..+" },  
  { label: 'Facebook', type: 'text', model: 'facebook', required: false },
  { label: 'Image Url', type: 'text', model: 'imageUrl', required: false },
]

const addToAPI = () =>{
    axios.post('http://localhost:5001/contacts', newContact.value)
    .then(() => {
      router.replace('/contact')
    })
    .catch((err)=>console.error(err))
}

const validateForm = () => {
  valid.value = inputs.every(input => new RegExp(input.pattern).test(newContact.value[input.model]));
  if (valid.value) {
    addToAPI();
  }
}
</script>

<style scoped>
.header {
  display: flex;
  border-bottom: 3px solid rgb(222, 222, 222);
  padding: 20px 0 20px 18px;
}

.form {
  margin: 20px 0;
  padding-left: 18px;
}

.form-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-label {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.required {
  color: red;
}

.button-group {
  display: flex;
  justify-content: center;
}

.tag {
  background-color: rgb(66, 135, 112);
  display: flex;
  align-items: center;
  margin: 5px 0 5px 5px;
  padding: 0 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
}

.error {
  color: red;
}
</style>