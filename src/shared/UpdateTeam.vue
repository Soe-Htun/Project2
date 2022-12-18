<template>
    <div class="modal fade round" :class="{ show: updateModal, 'd-block': updateModal }" tabindex="-1"
       style="background-color: rgba(0, 0, 0, 0.3);" aria-hidden="false">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100" id="exampleModalLabel">Team Update </h4>
                    <button type="button" class="btn-close" @click="close" data-bs-dismiss="modal"></button>
                </div>
                <!-- Modal body center -->
                <div class="modal-body">
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="name" class="form-label"> Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="name" 
                               class="form-control" />
                        </div>
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="email" class="form-label"> Full Name</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="full_name" 
                                class="form-control" />
                        </div>
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="employee_id" class="form-label"> City</label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="city" 
                                class="form-control" />
                        </div>
                    </div>
                    <div class="row justify-content-center mb-2">
                        <div class="col-4">
                            <label for="bu" class="form-label">Division </label>
                        </div>
                        <div class="col-6">
                            <input type="text" id="simpleinput" v-model="division" 
                            class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center mt-3">
                    <button type="submit" @click="editTeam" class="btn btn-primary">Submit</button>
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
const name = ref()
const full_name= ref();
const city=ref();
const division = ref();

onMounted(() => {
    name.value = props.editData.name
    full_name.value = props.editData.fullname
    city.value = props.editData.city
    division.value = props.editData.division
})

// close function pass into parent components
const emit = defineEmits(["close", "editTeam"]);
function close() {
    emit('close');
}
function editTeam() {
    let data = {
        id: props.editData.id,
        name: name.value,
        fullname: full_name.value,
        city: city.value,
        division: division.value
    }
    emit('editTeam', data)
}
</script>
