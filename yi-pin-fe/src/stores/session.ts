import type {User} from "@/entities/user";
import type {RawUser} from "@/entities/user";
import jsCookie from "js-cookie";
import {defineStore} from "pinia";
import {profileToURL} from "@/entities/user";
import {computed, ref} from "vue";

export const useSessionStore = defineStore('session', ()  => {
    const id = ref<string | null>(null);
    const user = ref<User | null>(null);
    const ifLoggedIn = computed(() => id !== null);
    function login(rawUser: RawUser) {
        id.value = rawUser.uid;
        user.value = {
            ...rawUser,
            profile: profileToURL(rawUser.profile)
        } as User;
    }
    function logout() {
        id.value = null;
        user.value = null;
        jsCookie.remove('uid')
    }
    return {
        id,
        user,
        ifLoggedIn,
        login,
        logout
    }
})
