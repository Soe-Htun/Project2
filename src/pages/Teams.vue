<template>
    <h3>Teams</h3>

    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <place-holder v-if="loading"></place-holder>
                    <div v-show="!loading">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center">
                                <span class="px-1">Search: </span>
                                <div class="input-group " style="width: 200px;">
                                    <input type="text" class="form-control py-1" v-model="searchValue"  />
                                    <i v-if="searchValue" @click="searchValue = ''"
                                        class="input-group-text fa fa-times"></i>
                                </div>
                            </div>
                            
                            <div class="d-flex align-items-center">
                                <button type="button" @click="createModal = true"
                                    class="btn btn-sm btn-blue waves-effect waves-light " >
                                    <i class="mdi mdi-plus-circle"></i> Add Team
                                </button>
                                <CreateTeam v-if="createModal" :createModal="createModal"
                                    @createTeam="createTeam" @close="createModal=false" />
                            </div>
                        </div>
                        

                        <EasyDataTable
                            :headers="headers"
                            :items="teamData"
                            :search-value="searchValue"
                            :rows-items="[10,20,25]"
                            :rows-per-page="10"
                            :buttons-pagination="true"
                            show-index
                            alternating
                            table-class-name="customize-table"
                            row-background-color="#6c757d"
                        >
                            
                            <template #item-action="data">
                                <!-- <div class="modal fade" id="sentConfirm" tabindex="-1" aria-labelledby="sentConfirm"
                                    data-bs-backdrop="static" aria-hidden="true">
                                    <confirmDialog label="Are you sure to delete this players?" @remove="remove" buttonName="Delete"/>
                                </div> -->
                                
                                <i @click="editTeamForm(data)"  class="mdi mdi-square-edit-outline"></i>
                                <i class="fas fa-trash text-danger px-3" 
                                    @click="deleteConfirm(data)"></i>
                            </template>
                        </EasyDataTable>
                    </div>

                    <confirmDialog v-if="deleteModal" :deleteModal="deleteModal"
                        label="Are you sure to delete this teams?"
                        @close="close" @remove="remove" buttonName="Delete"/>

                    <UpdateTeam v-if="updateModal" :updateModal="updateModal" :editData="editData" 
                        @close="updateModal = false" @editTeam="editTeam"
                    />

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { HTTP } from '../service/http-common';
import { useToast } from 'vue-toastification';
import { players } from '../stores/modules/players';
import confirmDialog from '../shared/ConfirmDialog.vue';
import UpdateTeam from '../shared/UpdateTeam.vue';
import CreateTeam from '../shared/CreateTeam.vue';

const store = players()
const loading = ref([]);
const teamData = ref([])
const toast = useToast();

const createModal = ref(false)
const updateModal = ref(false)
const editData = ref({})
const deleteModal = ref(false)

const teamIndex = ref();

const searchValue = ref("");
const headers =  ref([
    { text: "Team's Name", value: "name", sortable: true },
    { text: "Team's Fullname", value: "fullname", sortable: true },
    { text: "Team's City", value: "city", sortable: true },
    { text: "Team's Division", value: "division", sortable: true },
    { text: 'Action', value:"action" }
])
onMounted(() => {
    getUser();
});

async function getUser() {
    loading.value = true;
    await HTTP.get('v1/players').then(res => {
        loading.value =false;
        
        teamData.value = res.data.data?.map(user => {
            return {
                "id": user.team.id,
                "name": user.team.name,
                "fullname": user.team.full_name,
                "city": user.team.city,
                "division": user.team.division
            }
        });
        store.teams = teamData.value

    }).catch(err => {
        loading.value = false;
        toast.error("Something went wrong")
    })
    loading.value = false;
}
function createTeam(data) {
    store.teams.push(data);
    createModal.value = false;
    toast.success("successfully created")
}

function editTeamForm(data) {
    updateModal.value = true;
    editData.value = {
        id: data.id,
        name: data.name,
        fullname: data.fullname,
        city: data.city,
        division: data.division
    }
}
function deleteConfirm(data) {
    deleteModal.value = true;
    teamIndex.value = data;
}
function remove() {
    let index = teamData.value.findIndex((e)=> {
        return e.id == teamIndex.value.id
    })
    teamData.value.splice(index, 1);
    deleteModal.value = false;
    store.teams = teamData.value
    toast.success("successfully delete")
}
function close() {
    deleteModal.value = false;
}
function editTeam(data) {
    updateModal.value = false;
    let index = teamData.value.findIndex((e)=> {
        return e.id == data.id
    });
    teamData.value.splice(index, 1);
    store.teams = teamData.value
    store.teams.push(data);
    toast.success("successfully update")
}
</script>