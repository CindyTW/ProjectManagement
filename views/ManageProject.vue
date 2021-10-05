
// Just an example View for the Gantt page with better comments for Vue.js to help. 
// Read it for understanding and inspiring your work.

//=============================================================================
// Template: Squeletton of the page
//=============================================================================
<template>
  
    <label class="gantt_title">{{ this.title }} 甘特圖 </label>
    <label>{{ this.detail }}</label>
    
    <frappe-gantt
            ref="gantt"
            :view-mode="mode"
            :tasks="tasks"
            @task-updated="debugEventLog.push($event)"
            @task-date-updated="debugEventLog.push($event)"
            @task-progress-change="debugEventLog.push($event)" 
    />


    <div class="d-flex">
        <button class="btn-outline" @click="handleSubmit"><strong>回主頁</strong></button>
        <button class="btn-outline" @click="addRandomTask"><strong>新增任務</strong></button>
        <button class="btn-outline" @click="cancel"><strong>取消</strong></button>
    </div>

</template>


//=============================================================================
// Script: Behaviour of the page
//=============================================================================
<script>

//------------------------------------
// Imports: Components, Dependencies
//------------------------------------
import FrappeGantt from "../components/Gantt.vue"
import { v4 as uuidv4 } from 'uuid'

//------------------------------------
// Export: Declaration of reusable component
//------------------------------------
export default {
    name:"ManageProject",
    //------------------------------------
    // Props: Register attributes that can be passed to this components by a parent
    //------------------------------------
    props: {
        id: String
    },
    //------------------------------------
    // Components: Declaration of child components
    //------------------------------------
    components: {
        FrappeGantt
    },
    //------------------------------------
    // Setup: Runs before the components is created and has props as parameter 
    //------------------------------------
    setup(props){
        console.debug("ManageProject Component Setup Begins");
    },
    //------------------------------------
    // Data: On creation of the component, returns an object of the component's properties
    //  those properties are exposed directly in the instance
    //------------------------------------
    data() {
        console.debug("ManageProject Component Data Creation");
        return {
            count: 0,
            mode: 'day',
            uri: "http://localhost:8080/manageproject/",
            tasks: [

                {
                    id: '1',
                    name: 'Hello',
                    start: '2019-01-01',
                    end: '2019-01-05',
                    progress: 10,
                },
                                {
                    id: '2',
                    name: 'World',
                    start: '2019-01-05',
                    end: '2019-01-10',
                    progress: 20,
                    dependencies: '1'
                },
                {
                    id: '3',
                    name: 'From',
                    start: '2019-01-10',
                    end: '2019-01-15',
                    progress: 30,
                    dependencies: '2'
                },
                {
                    id: '4',
                    name: 'King of P',
                    start: '2019-01-15',
                    end: '2019-01-20',
                    progress: 40,
                    dependencies: '3'
                },
                {
                    id: '5',
                    name: 'T',
                    start: '2019-01-15',
                    end: '2019-01-20',
                    progress: 40,
                    dependencies: '2'
                }
            ],
            debugEventLog: []
        };
    },
    //------------------------------------
    // Created: Called after the instance has been created but before mounted(displayed)
    //  it is better to use this instead of mounted to pre-load api related calls
    //  as it will give the feeling of snappier response times
    //------------------------------------
    created(){
        console.debug("ManageProject Component Data Created");
       fetch(this.uri)
            .then((res) => res.json())
            .then((data) => {
            this.title = data.title;
            this.details = data.details;
            });
    },
    //------------------------------------
    // Mounted: Called after the instance has been created and mounted(displayed)
    //------------------------------------
    mounted() {
        console.debug("ManageProject Component Mounted");
    },
    //------------------------------------
    // Update: Called on instance DOM update
    //------------------------------------
    updated() {
        console.debug("ManageProject Component Updated");
    },
    //------------------------------------
    // Methods: Callable functions of the component with automatic bind of the 'this' keyword referencing to the instance of the component
    //------------------------------------
    methods: {
        handleSubmit() {
            fetch(this.uri, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: this.title, details: this.details }),
            })
            .then(() => {
                this.$router.push("/");
            })
            .catch((err) => console.log(err));
        },
        cancel() {
             this.$router.push("/manageproject/:id");
        },
        addRandomTask () {
            // this.$refs.gantt.addTask(uuidv4(), this.count++, '2019-01-01', '2019-01-05', Math.random() * 100)
            this.$router.push('/addTask');
        }
    },
    //------------------------------------
    // Computed: dynamic properties that are automatically updated when underlying values for calculation are udpated
    //------------------------------------
    computed: {

    },
    //------------------------------------
    // Watch: Monitor a property change and execute code on update
    //------------------------------------
    watch: {

    }
};
</script>

<style>
.sub-btn {
  display: flex;
  margin-left: 120px;
  margin-right: 170px;
}

label.gantt_title {
    font-size: 32px;
    text-align: center;
    color: #a3a3a3;
    
}


.d-flex, .btn-outline {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
    border-radius: 8px;
    padding: 8px 5px;
    width: 30%;
    font-size: 18px;
}

.btn-outline{
    border: 2px solid #00ce89;
    color: #00ce89;
}

.btn-outline:hover {
    background:#00ce89 ;
    color: white;
    cursor: pointer;
    font-size: 20px;
}


</style>