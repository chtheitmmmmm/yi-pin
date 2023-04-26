import MainPage from "@/components/main.page/MainPage.vue";
import ProfilePage from "@/components/main.page/ProfilePage.vue";
import InvitePage from "@/components/invite.page/InvitePage.vue";
import InfoPage from "@/components/info.page/InfoPage.vue";
import CondPage from "@/components/cond.page/CondPage.vue";
import ForumPage from "@/components/forum.page/ForumPage.vue";
import AppPage from "@/components/app.page/AppPage.vue";



export const links =  [{
    phrase: "首页",
    path: "/",
    name: "main",
    component: MainPage
  }, {
    phrase: "公司概况",
    path: "/cond",
    name: "cond",
    component: CondPage
  }, {
    phrase: "人才招聘",
    path: "/invite",
    name: "invite",
    component: InvitePage
  }, {
    phrase: "信息公开",
    path: "/info",
    name: "info",
    component: InfoPage
  }, {
    phrase: "论坛",
    path: "/forum",
    name: "forum",
    component: ForumPage
}, {
    phrase: "App",
    path: "/app",
    name: "app",
    component: AppPage
}]

export const routes = [
    ...links, {
        path: "/profile",
        name: 'profile',
        component: ProfilePage,
        props: ['userData']
    },
]