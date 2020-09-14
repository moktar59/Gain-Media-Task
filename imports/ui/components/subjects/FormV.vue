<template>
    <div>   
        <br/>  
        <b-row class="text-center">
            <b-col class="title-text"><h1>Add/Remove {{ this.$route.params.name }} Subject</h1></b-col>
            <b-col cols="2">
                <b-button>
                    <router-link :to="{ name:'subjectsList' }">List</router-link>
                </b-button>
            </b-col>
        </b-row>  
        <hr/>
        <div class="content text-left">
            <b-alert variant="danger" v-model="showDismissibleAlert"  dismissible> Already added</b-alert>

            <div class="form-group">
                <label>Student</label>
                <v-select :options="options" :reduce="option => option.id" label="name" v-model="studentId" />
                <b-form-invalid-feedback id="name-help-block" :state="validation.studentId.status">  
                    {{ validation.studentId.txt}}              
                </b-form-invalid-feedback>
            </div>
            <div class="form-group" v-bind:style="{ display: hideShow }">
                <label for="text-password">Subject</label>
                <b-input type="text" aria-describedby="name-help-block" v-model="subject" :state="validation.subject.status"></b-input>
                <b-form-invalid-feedback id="name-help-block" :state="validation.subject.status">  
                    {{ validation.subject.txt}}              
                </b-form-invalid-feedback>
            </div>
            <div class="text-center">
                <b-button variant="primary" @click="addSubject">Add</b-button>
            </div>
            
            <br/>
            <div>
                <table class="table striped hover">
                    <tr>
                        <th>Student</th>
                        <th>Subject</th>
                        <th></th>
                    </tr>
                    <tr v-for="subject in subjectList" v-bind:key="subject._id">
                        <td>{{ studentList[subject.studentId] }}</td>
                        <td>{{ subject.subject }}</td>
                        <td><b-button variant="danger" @click="deleteSubject(subject._id)">Delete</b-button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { Students } from '../../../api/students';
    import { Subjects } from '../../../api/subjects';

    export default {
        data() {
            return {
                studentId: "",
                options: [{id: 1, name: 'Canada'}, {id: 2, name: 'USA'}],
                subject: "",
                subjectList: [],
                studentList: [],
                validation: {
                    studentId: {
                        status: null,
                        txt: ''
                    },
                    subject: {
                        status: null,
                        txt: ''
                    }
                },
                hideShow: Boolean(this.$route.params.name) ? "none" : "",
                showDismissibleAlert: false
            };
        },
        methods: {
            getOptions() {
                let studentList = Students.find({}).fetch();            
                let tmpList = [];
                let tmpStudentList = [];

                studentList.forEach(function(obj) {
                    tmpList.push({
                        id: obj._id,
                        name: obj.name
                    });
                    tmpStudentList[obj._id] = obj.name;
                });

                this.options = tmpList;                
                this.studentList = tmpStudentList;
                return studentList;
            },
            addSubject() {
                //Check Validation
                if(!this.formValidation()) {
                    return;
                }

                //Check if that subject already assigned to this student
                const counts = Subjects.find({subject: this.subject, studentId: this.studentId}).count();
                
                if (counts > 0) {
                    this.showDismissibleAlert = true;
                    return;
                }

                //Insert data to db
                Subjects.insert({
                    studentId: this.studentId,
                    subject: this.subject
                });

                //Clear Subject
                this.subject = "";
                this.subjectList = this.getSubjects();
            },
            getSubjects() {
                if (Boolean(this.$route.params.name)) {
                    this.subject = this.$route.params.name;
                    return Subjects.find({subject: this.$route.params.name}).fetch();
                }

                return Subjects.find({}).fetch();
            },
            deleteSubject(id) {
                Subjects.remove(id);
                this.subjectList = this.getSubjects();
            },
            formValidation() {
                let validationSuccess = true;

                if (!Boolean(this.subject)) {
                    this.validation.subject.status = false;
                    this.validation.subject.txt = "Subject field is required";
                    validationSuccess = false;
                } else {
                    this.validation.subject.status = null;
                }

                if (!Boolean(this.studentId)) {
                    this.validation.studentId.status = false;
                    this.validation.studentId.txt = "Select a Student";
                    validationSuccess = false;
                    allValidationSuccess = false;
                } else {
                    this.validation.studentId.status = null;
                }

                return validationSuccess;
            }

            
        },
        created() {
            this.getOptions();
            this.subjectList = this.getSubjects();
        }
    };
</script>