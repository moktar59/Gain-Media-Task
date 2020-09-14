<template>
    <div>   
        <br/>  
        <b-row class="text-center">
            <b-col class="title-text"><h1>Subjects List</h1></b-col>
            <b-col cols="2">
                <b-button>
                    <router-link :to="{ name:'subjectsAdd' }">Add</router-link>
                </b-button>
            </b-col>
        </b-row>  
        
        <div class="content">
            <b-table :fields="fields" :items="items"  striped hover responsive="sm" v-if="items.length > 0">
                <template v-slot:cell(_id)="row">
                    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                        <router-link :to="{ name:'subjectsEdit', params: { name: row.item.subject }}">
                          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                        </router-link>
                    </b-button>
                    <b-button size="sm" @click="deleteSubject(row)" class="mr-2" variant="danger">
                        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                    </b-button>
                </template>
            </b-table>
            <div  v-if="items.length <= 0">
              <hr/>
              <p class="text-danger">You did not added any Subject yet.</p>
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
                allSubjects: [],
                fields: [
              {
                key: 'subject',
                label: 'Name',
                sortable: true
              },
              {
                key: 'students',
                label: 'Students',
                sortable: true
              },
              {
                  key: '_id',
                  label: 'Manage'
              }
            ],
            items: []
            };
        },     
        methods: {
            getStudentList() {
                let allStudents = Students.find({}).fetch();
                let studentList = [];

                allStudents.forEach(function(obj) {
                    studentList[obj._id] = obj.name;
                });
                
                return studentList;
            },
            getSubjects() {
                let studentList = this.getStudentList();
                let uniqueSubjects  = [];

                this.allSubjects = Subjects.find({}).fetch();

                this.allSubjects.forEach(function(obj) {
                    if (!Boolean(uniqueSubjects[obj.subject])) {
                        uniqueSubjects[obj.subject] = studentList[obj.studentId];
                    } else {
                        uniqueSubjects[obj.subject] += ", " + studentList[obj.studentId];
                    }
                });

                let tmpSubjects = [];

                for (let key in uniqueSubjects) {
                    tmpSubjects.push({
                        subject: key,
                        students: uniqueSubjects[key]
                    });
                }

                this.items = tmpSubjects;
                
                return tmpSubjects;
            },
            deleteSubject(row) {
                if (!confirm("Are you sure to delete?")) {
                    return;
                }

                //As of code optization and security. this functionality wille moved to server alterr on.
                this.allSubjects.forEach(function(obj) {
                    if (row.item.subject === obj.subject) {
                        Subjects.remove(obj._id);
                    }
                });

                //Recreating the table data
                this.getSubjects();
            }
        }, 
        created() {
            this.getSubjects();
        }
    };
</script>