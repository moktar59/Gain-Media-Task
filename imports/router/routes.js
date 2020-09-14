// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior
});


// Components
import Home from '../ui/pages/Home';
import StudentsList from '../ui/components/students/List';
import StudentsForm from '../ui/components/students/FormV';
import SubjectsList from '../ui/components/subjects/List';
import SubjectsForm from '../ui/components/subjects/FormV';

RouterFactory.configure(factory => {
  factory.addRoutes([
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/students/list',
      name: 'studentsList',
      component: StudentsList,
    },
    {
      path: '/students/add',
      name: 'studentsAdd',
      component: StudentsForm,
    },
    {
      path: '/students/edit/:id',
      name: 'studentsEdit',
      component: StudentsForm,
    },
    {
      path: '/subjects/list',
      name: 'subjectsList',
      component: SubjectsList,
    },
    {
      path: '/subjects/add',
      name: 'subjectsAdd',
      component: SubjectsForm,
    },
    {
      path: '/subjects/edit/:name',
      name: 'subjectsEdit',
      component: SubjectsForm,
    }

  ])
});

// Not found page
import NotFound from '/imports/ui/pages/NotFound.vue';

RouterFactory.configure(router => {
  router.addRoute({
    path: '*',
    component: NotFound,
  });
}, -1);

export default routerFactory;