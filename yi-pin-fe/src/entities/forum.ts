export interface Forum {
    /**
     * 发起者的uid
     */
    author: string;
    /**
     *
     * 内容URL，为内容本身为一个独立的HTML页面，用户发帖的时候编写markdown，返回服务器的时候会马上编译为HTML保存到服务器文件系统中，然后数据库中保存该文档的路径，在此返回。前端会放在iframe中渲染
     */
    "content": string;
    /**
     * 创建时间，帖子创建的时间
     */
    "create-time": string;
    /**
     * 主键
     */
    id: string;
    /**
     * 标题，大号标题显示
     */
    title: string;
}
