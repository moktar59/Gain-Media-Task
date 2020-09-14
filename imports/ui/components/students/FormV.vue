<template>
    <div>   
        <br/>  
        <b-row class="text-center">
            <b-col class="title-text"><h1>{{ title }}</h1></b-col>
            <b-col cols="2">
                <b-button>
                    <router-link :to="{ name:'studentsList' }">List</router-link>
                </b-button>
            </b-col>
        </b-row>  
        <hr/>
        <div class="text-left">
            <b-alert variant="success" v-model="showDismissibleAlert"  dismissible> {{ message }}</b-alert>
            <form >
                <div class="form-group">
                    <label for="text-password">Name</label>
                    <b-input type="text" id="name" aria-describedby="name-help-block" v-model="student.name" :state="validation.name.status"></b-input>
                    <b-form-invalid-feedback id="name-help-block" :state="validation.name.status">  
                        {{ validation.name.txt}}              
                    </b-form-invalid-feedback>
                </div>
                <div class="form-group">
                    <label for="text-password">Email</label>
                    <b-input type="email" id="email" aria-describedby="email-help-block" v-model="student.email" :state="validation.email.status"></b-input>
                    <b-form-invalid-feedback id="email-help-block" :state="validation.email.status">  
                        {{ validation.email.txt }}              
                    </b-form-invalid-feedback>
                </div>

                <div class="form-group">
                    <label for="text-password">Phone</label>
                    <b-input type="number" id="phone" aria-describedby="phone-help-block" v-model="student.phone" :state="validation.phone.status"></b-input>
                    <b-form-invalid-feedback id="phone-help-block" :state="validation.phone.status"> 
                        {{ validation.phone.txt }}                
                    </b-form-invalid-feedback>
                </div>

                <div class="form-group">
                    <label for="text-password">Date of birth</label>
                    <b-input type="date" id="text-name" aria-describedby="date-help-block" v-model="student.dob" :state="validation.dob.status"></b-input>
                    <b-form-invalid-feedback id="date-help-block" :state="validation.dob.status">   
                        {{ validation.dob.txt }}            
                    </b-form-invalid-feedback>
                </div>
                <div class="text-center">
                    <b-button variant="primary" @click="addStudent">Save</b-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { Students } from '../../../api/students';

    export default {
        data() {
            return {
                title: "Add Student",
                student: {
                    name: "",
                    email: "",
                    phone: "",
                    dob: ""
                },
                validation: {
                    name: {
                        status: null,
                        txt: ''
                    },
                    email: {
                        status: null,
                        txt: ''
                    },
                    phone: {
                        status: null,
                        txt: ''
                    },
                    dob: {
                        status: null,
                        txt: ''
                    }
                },   
                showDismissibleAlert: false,
                message: ""             
            };
        },
        created() {
            if (!Boolean(this.$route.params.id)) {
                return;
            }
            
            this.title = "Update Student";
            //Get Student and populate form
            let studentObj = Students.findOne(this.$route.params.id);
            studentObj.dob = new Date(studentObj.dob).toISOString().slice(0, 10);
            this.student = studentObj;
        },
        
        methods: {
            addStudent() {
                //Check form validation
                if (!this.formValidation()) {
                    return;
                }

                if (!Boolean(this.$route.params.id)) {
                    //Insert data to db
                    this.insertData();
                } else {
                    //Update data
                    Students.update(this.$route.params.id, {                        
                        name: this.student.name,
                        email: this.student.email,
                        phone: this.student.phone,
                        dob: new Date(this.student.dob)                
                    });

                    this.message = "Student successfully updated."
                }
                
                
                //Reset form validation
                this.validation = {
                    name: {
                        status: null,
                        txt: ''
                    },
                    email: {
                        status: null,
                        txt: ''
                    },
                    phone: {
                        status: null,
                        txt: ''
                    },
                    dob: {
                        status: null,
                        txt: ''
                    }
                };

                this.showDismissibleAlert = true;
            },
            insertData() {
                Students.insert({
                    name: this.student.name,
                    email: this.student.email,
                    phone: this.student.phone,
                    dob: new Date(this.student.dob)
                });

                //Clear form after insert
                this.student = {
                    name: '',
                    email: '',
                    phone: '',
                    dob: ''
                };
                
                this.message = "Student Successfully added";
            },
            formValidation() {
                let validationSuccess = true;

                //Check is empty or too short
                if (!Boolean(this.student.name)) {
                    this.validation.name.status = false;
                    this.validation.name.txt = "Name field is required";
                    validationSuccess = false;
                } else if (this.student.name.length < 2) {
                    this.validation.name.status = false;
                    this.validation.name.txt = "Name is too short.";
                    validationSuccess = false;
                } else {
                    this.validation.name.status = true;
                }

                //Check email is empty or invalid
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
                if (!Boolean(this.student.email)) {
                    this.validation.email.status = false;
                    this.validation.email.txt = "Email field is required";
                    validationSuccess = false;
                } else if (!reg.test(String(this.student.email).toLowerCase())) {
                    this.validation.email.status = false;
                    this.validation.email.txt = "Invalid email";
                    validationSuccess = false;
                } else {
                    this.validation.email.status = true;
                }

                //check phone is empty or too short
                if (!Boolean(this.student.phone)) {
                    this.validation.phone.status = false;
                    this.validation.phone.txt = "Phone field is required";
                    validationSuccess = false;
                } else if (this.student.phone.length < 5) {
                    this.validation.phone.status = false;
                    this.validation.phone.txt = "Invalid phone";
                    validationSuccess = false;
                } else {
                    this.validation.phone.status = true;

                }

                //check date of birth provided or not
                if (!Boolean(this.student.dob)) {
                    this.validation.dob.status = false;
                    this.validation.dob.txt = "Phone field is required";
                    validationSuccess = false;
                } else {
                    this.validation.dob.status = true;
                }

                return validationSuccess;
            }

        },
    };
</script>
<style scoped>
    label {
        text-align: left;
    }
</style>