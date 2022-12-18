<template>
    <div class="modal fade round" :class="{ show: updateModal, 'd-block': updateModal }" tabindex="-1"
       style="background-color: rgba(0, 0, 0, 0.3);" aria-hidden="false">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100" id="exampleModalLabel">Player Update </h4>
                    <button type="button" class="btn-close" @click="close" data-bs-dismiss="modal"></button>
                </div>
                <!-- Modal body center -->
                <div class="modal-body">
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="name" class="form-label"> First Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="first_name" 
                               class="form-control" />
                        </div>
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="email" class="form-label"> Last Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="last_name" 
                                class="form-control" />
                        </div>
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="employee_id" class="form-label"> Positioin</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="position" 
                                class="form-control" />
                        </div>
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="bu" class="form-label">Team Name </label>
                        </div>
                        <div class="col-6">
                            <v-select :clearable="false" v-model="team_name" :options="store.players?.map(e=> e.team)"
                                label="name" return-object filled>
                            </v-select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center mt-3">
                    <button type="submit" @click="editPlayer" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { players } from '../stores/modules/players';

const props = defineProps({
    updateModal: {
        type: Boolean,
        default: false
    },
    editData: {
        type: Object
    }
})

const store = players()
const first_name = ref()
const last_name= ref();
const position=ref();
const team_name = ref();

onMounted(() => {
    first_name.value = props.editData.first_name
    last_name.value = props.editData.last_name
    position.value = props.editData.position
    team_name.value = store.players.find(e=> {
        return e.id == props.editData.id
    }).team
})

// close function pass into parent components
const emit = defineEmits(["close", "editPlayer"]);
function close() {
    emit('close');
}
function editPlayer() {
    let data = {
        id: props.editData.id,
        first_name: first_name.value,
        last_name: last_name.value,
        position: position.value,
        team: team_name.value,
    }
    emit('editPlayer', data)
}
</script>
