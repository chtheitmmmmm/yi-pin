import {reactive} from "vue";
import type {User} from "@/entities/user";
import type {RawUser} from "@/entities/user";

export interface Session {
    id: null | string,
    user: null | User,
    login(rawUser: RawUser): void;
}

export const session = reactive<Session>({
    id: null,   // 会话id
    user: null,  // 用户数据,
    login(rawUser: RawUser) {
        this.id = rawUser.uid
        this.user = {
            ...rawUser,
            profile: URL.createObjectURL(
              new Blob(
                [new Int8Array(rawUser.profile.data)],
                {type: "image/png"}
              )
            )
        }
    }
})