<template>
    <div class="row">
      <div class="col-lg-6 col-xl-6 d-md-none d-sm-none d-none d-md-block d-lg-block" >
        <div class="d-flex vh-100 justify-content-center align-items-center ">
          <div class="w-100 d-flex justify-content-center">
            <img src="../../assets/image/meety.png" class="w-75" alt="..." />
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-xl-6 col-md-9 col-sm-12 ">
        <div class="d-flex vh-100 w-100 justify-content-center align-items-center">
          <div class="container w-75" >
            <div class="card-title text-center">
              <h2 class="p-4">MOM</h2>
            </div>
            <div class="card-body">
                <div class="mb-4">
                  <div class="input-group input-group-lg mb-1">
                      <input type="text" v-model="formData.name" class="form-control py"
                        placeholder="Enter Employee ID" @keyup.enter="login"
                      >
                        <span class="input-group-text">
                          @
                        </span>
                  </div>
                  <p class="text-danger mb-3" v-for="error in v$.name.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </div>
                
                <div class="mb-4">
                  <div class="input-group input-group-lg mb-1">
                      <input type="password" @keyup.enter="login"
                        v-model="formData.password" class="form-control py"
                        placeholder="Enter password"
                        >
                        <span class="input-group-text" id="password">
                          <i class="fas fa-lock"></i>
                        </span>
                  </div>
                  <p class="text-danger mb-3" v-for="error in v$.password.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </div>

                <div class="form-group form-check mb-5 d-flex justify-content-between">
                  <div class="remember">
                    <input class="form-check-input mr-2" type="checkbox" id="remember" />
                    <label for="remember" class="text-black-50">Remember me</label>
                  </div>
                  <span class="text-primary">Recovery Password</span>
                </div>
                <div class="form-group d-flex mb-5">
                  <button id="login"
                    @click="login"
                    class="btn m-1 btn-lg flex-fill text-white py">Login</button>
                </div>

                <div class="text-black-50 mb-2 text-center">Don't have an account yet?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed, reactive, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from '@vuelidate/validators';

import { useRouter } from "vue-router";
import { useAuth } from "../../stores/modules/auth";

import { useToast } from "vue-toastification";

const router = useRouter();

const toast = useToast();
const store = useAuth();

const formData = reactive({
  name: '',
  password: ''
})
const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage("Name is required", required)
        },
        password: {
            required: helpers.withMessage("Password is required", required)
        },
    }
})

const v$ = useVuelidate(rules, formData)

async function login() {
  let result = await v$.value.$validate();
  if(result) {
    store.login(formData.name).then(() => {
      router.push({name: "home"});
      toast.success("Successfully Login")
    })
  }
}
</script>
