<template>
    <div>
        <PageHeader v-bind:head="{pageTitle: 'Students List', routeName: 'studentsAdd', linkType: 'Add'}" />

        <div class="content">
            <b-table :fields="fields" :items="items"  striped hover responsive="sm"  v-if="items.length > 0">
                <template v-slot:cell(_id)="row">
                    <b-button size="sm" class="mr-2">                        
                        <router-link :to="{ name:'studentsEdit', params: { id: row.item._id }}">
                          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                        </router-link>
                    </b-button>
                    <b-button size="sm" @click="deleteStudent(row)" class="mr-2" variant="danger">
                        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                    </b-button>
                </template>
            </b-table>
            <div  v-if="items.length <= 0">
              <hr/>
              <p class="text-danger">You did not added any Student yet.</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import PageHeader from '../common/PageHeader';
    import { Students } from '../../../api/students';
    import { Subjects } from '../../../api/subjects';

    export default {
      components: {
        PageHeader
      },
        data() {
          return {
            allSubjects: [],
            fields: [
              {
                key: 'name',
                label: 'Name',
                sortable: true
              },
              {
                key: 'email',
                label: 'Email',
                sortable: true
              },
              {
                key: 'phone',
                sortable: true
              },
              {
                key: 'dob',
                label: 'Date of birth',
                sortable: true,
              },
              {
                  key: 'subject',
                  label: 'Subjects'
              },
              {
                  key: '_id',
                  label: 'Manage'
              }
            ],
            items: []
          }
        },
        methods: {
          getSubjects() {
            this.allSubjects = Subjects.find({}).fetch();
            let mergedSubjects = [];

            this.allSubjects.forEach(function(obj) {
              if (!Boolean(mergedSubjects[obj.studentId])) {
                mergedSubjects[obj.studentId] = obj.subject;
              } else {
                mergedSubjects[obj.studentId] += ", " + obj.subject;
              }
            })

            return mergedSubjects;
          },
          studentsList() {
            let studentList = Students.find({}).fetch();
            let mergedSubjects = this.getSubjects();
            let tmpList = [];

            studentList.forEach(function(obj) {
              let tmpObj = {
                _id: obj._id,
                name: obj.name,
                email: obj.email,
                phone: obj.phone,
                dob: new Date(obj.dob).toLocaleString().split(',')[0].replace("/", '-').replace("/", '-'),
                subject: Boolean(mergedSubjects[obj._id])? mergedSubjects[obj._id] : ""
              };

              tmpList.push(tmpObj);
            });

            this.items = tmpList;
            
            return studentList;
          },
          deleteStudent(row) {
            if (!confirm("Are you sure to delete?")) {
              return;
            }

            Students.remove(row.item._id);

            //Delete Subjects of that student
            this.deleteSubjects(row.item.subject, row.item._id);

            //Repopulate table after deleteing
            this.studentsList();
          },
          deleteSubjects(subjects, studentId) {
            if (!Boolean(subjects)) {
              return;
            }

            let targetSubjects = subjects.split(",").map(item => item.trim());

            this.allSubjects.forEach(function(obj) {
              if (obj.studentId === studentId && targetSubjects.indexOf(obj.subject)) {
                Subjects.remove(obj._id);
              }
            });
          }
        },
        meteor: {
          // studentsList() {
          //   let studentList = Students.find({}).fetch();
          //   console.log('getStudentList=', studentList);
          // }
        },
        created() {
          this.studentsList();
        }
        
    };
</script>
