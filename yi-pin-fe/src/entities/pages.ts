import MainPage from "@/components/main.page/MainPage.vue";
import ProfilePage from "@/components/main.page/ProfilePage.vue";
import InvitePage from "@/components/invite.page/InvitePage.vue";
import InfoPage from "@/components/info.page/InfoPage.vue";
import CondPage from "@/components/cond.page/CondPage.vue";
import ForumPage from "@/components/forum.page/ForumPage.vue";
import AppPage from "@/components/app.page/AppPage.vue";
import WrittenTestsTrain from "@/components/main.page/areas/tests-trains/WrittenTestsTrain.vue";
import InterviewTrain from "@/components/main.page/areas/tests-trains/InterviewTrain.vue";



export const links =  [{
    phrase: "首页",
    path: '/',
    paths: "/",
    name: "main",
    component: MainPage,
}, {
    phrase: "公司概况",
    path: '/cpng',
    paths: [["/cpng#short-intro", "公司简介"], ['/cpng#org-con', "组织架构"], ['/cpng#culture', "公司文化及价值观"]],
    name: "cond",
    component: CondPage,
}, {
    phrase: "人才招聘",
    path: '/invite',
    paths: "/invite",
    name: "invite",
    component: InvitePage,
}, {
    phrase: "信息公开",
    path: '/info',
    paths: [['/info#official', '奕品官网'], ['/info#info', '信息公开']],
    name: "info",
    component: InfoPage,
}, {
    phrase: "论坛",
    path: '/forum',
    paths: "/forum",
    name: "forum",
    component: ForumPage,
}, {
    phrase: "App",
    path: '/app',
    paths: "/app",
    name: "app",
    component: AppPage,
}]

export const routes = [
    ...links, {
    path: "/profile",
    name: 'profile',
    component: ProfilePage,
}, {
    path: '/written-train',
    name: 'written-train',
    component: WrittenTestsTrain
}, {
    path: '/interview-train',
    name: 'interview-train',
    component: InterviewTrain
}]