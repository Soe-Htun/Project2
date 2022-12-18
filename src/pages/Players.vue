<template>
    <h3>Players</h3>

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
                                <button type="button" @click="showCreatePlayerForm"
                                    class="btn btn-sm btn-blue waves-effect waves-light " >
                                    <i class="mdi mdi-plus-circle"></i> Add Player
                                </button>
                                <CreatePlayer v-if="createModal" :createModal="createModal"
                                    @createPlayer="createPlayer" @close="createModal=false" />
                            </div>
                        </div>
                        

                        <EasyDataTable
                            :headers="headers"
                            :items="store.players"
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
                                <i @click="editPlayerForm(data)"  class="mdi mdi-square-edit-outline"></i>
                                <i class="fas fa-trash text-danger px-3"
                                    @click="deleteConfirm(data)"></i>
                            </template>
                        </EasyDataTable>
                    </div>
                    <confirmDialog v-if="deleteModal" :deleteModal="deleteModal"
                        label="Are you sure to delete this players?" @remove="remove" @close="close"
                        buttonName="Delete"/>

                    <UpdatePayer v-if="updateModal" :updateModal="updateModal" :editData="editData" 
                        @close="updateModal = false" @editPlayer="editPlayer"
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
// import { useAuth } from '../stores/modules/auth';
import { players } from '../stores/modules/players';
import confirmDialog from '../shared/ConfirmDialog.vue'
import UpdatePayer from '../shared/UpdatePayer.vue';
import CreatePlayer from '../shared/CreatePlayer.vue';

const store = players()
const loading = ref([]);
const playerData = ref([]);
// const teamList = ref([])
const toast = useToast();

const createModal = ref(false)
const updateModal = ref(false)
const deleteModal = ref(false)
const editData = ref({})

const playersIndex = ref({});

const searchValue = ref("");
const headers =  ref([
    { text: "First Name", value: "first_name", sortable: true },
    { text: "Last Name", value: "last_name", sortable: true },
    { text: "Position", value: "position", sortable: true },
    { text: "Team's Name", value: "team.name", sortable: true },
    { text: 'Action', value:"action" }
])
onMounted(() => {
    getUser();
});

async function getUser() {
    loading.value = true;
    await HTTP.get('v1/players').then(res => {
        loading.value =false;
        
        playerData.value = res.data.data;
        store.players = playerData.value;

    }).catch(err => {
        loading.value = false;
        toast.error("Something went wrong")
    })
    loading.value = false;
}
function editPlayerForm(data) {
    updateModal.value = true;
    editData.value = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        position: data.position,
        team: data.team.name
    }
}
function deleteConfirm(data) {
    deleteModal.value = true;
    playersIndex.value = data
}
function remove() {
    let index = playerData.value.findIndex((e)=> {
        return e.id == playersIndex.value.id
    })
    playerData.value.splice(index, 1);
    deleteModal.value = false;
    toast.success("successfully delete")
    store.players = playerData.value
}
function close() {
    deleteModal.value = false;
}

function showCreatePlayerForm() {
    createModal.value = true;
}
function createPlayer(data) {
    store.players.push(data);
    createModal.value = false;
    toast.success("successfully created")
}
function editPlayer(data) {

    updateModal.value = false;
    let index = playerData.value.findIndex((e)=> {
        return e.id == data.id
    });
    playerData.value.splice(index, 1);
    store.players = playerData.value
    store.players.push(data);
    toast.success("successfully update")

}
</script>