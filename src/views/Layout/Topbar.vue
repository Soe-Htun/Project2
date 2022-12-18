<template>
    <div class="navbar-custom">
      <div class="container-fluid">
         <ul class="list-unstyled topnav-menu float-end mb-0">
            <li class="dropdown d-none d-lg-inline-block">
               <a
                  class="
                     nav-link
                     dropdown-toggle
                     arrow-none
                     waves-effect waves-light
                  "
                  href="/"
                  target="_blank"
               >
                  <i class="fe-home noti-icon"></i>
               </a>
            </li>
            <li class="dropdown notification-list topbar-dropdown">
               <a
                  class="
                     nav-link
                     dropdown-toggle
                     nav-user
                     me-0
                     waves-effect waves-light
                  "
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
               >
                  <img
                     src="../../assets/image/user.png"
                     alt="user-image"
                     class="rounded-circle bg-white"
                  />
                  <span class="pro-user-name ms-1">
                     {{ store.getAuthName }} 
                     <i class="mdi mdi-chevron-down"></i>
                  </span>
               </a>
               <div class="dropdown-menu dropdown-menu-end profile-dropdown">
                  <div class="dropdown-header noti-title">
                     <h6 class="text-overflow m-0">Welcome !</h6>
                  </div>
                  <a
                     href="javascript:void(0);"
                     class="dropdown-item notify-item"
                     @click="logout"
                  >
                     <i class="fe-log-out"></i>
                     <span>Logout</span>
                  </a>
               </div>
            </li>
         </ul>
      </div>
   </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../../stores/modules/auth.js';

const store = useAuth();
const router = useRouter();
function logout() {
   //Clear all state after logout
   
   router.push({name: 'login'});
   store.$reset();
}
</script>