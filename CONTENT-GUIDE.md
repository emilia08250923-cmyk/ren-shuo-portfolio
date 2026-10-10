# 更新 Foldcraft 作品集

当前作品、照片位置、介绍和简历 PDF 是明确标记的示例。请在求职前换成真实资料。

## 日常运行

```sh
npm install
npm run dev
npm run images:optimize
npm run typecheck
npm run lint
npm run build
```

项目延续原有 React / Next.js-compatible Vinext 环境，没有重新初始化。支持 npm；本次本机使用 pnpm 安装。

## 修改姓名、经历、联系方式、简历

编辑 `data/profile.ts`：`name`、`bio`、`experience`、`education`、`tools`、`phone`、`wechat` 和 `socials`。目前唯一已提供的真实联系资料是 QQ 邮箱。示例介绍和能力不是经核实的个人履历。

真实照片也放入 `assets-source`，优化后将 `portrait` 填成 `/media/.../文件名`。将真实 PDF 放在 `public/resume/`，更新 `resume` 路径，并设 `resumeIsTemplate: false`。写好真实介绍后设 `bioIsDraft: false`。

## 新增设计项目

1. 原图放入 `assets-source/design/项目slug/`，例如 `cover.jpg`、`01.png`。
2. 执行 `npm run images:optimize`。
3. 在 `data/projects.ts` 的 `projects` 数组增加一个 `DesignProject` 对象。
4. `cover` 和 `images[].base` 只填写无扩展名的路径，如 `/media/design/new-project/01`。不需要手写四个尺寸。
5. `carouselType` 选择 `normal` 或 `showcase`。设 `selected: true` 可加入首页，建议总数保持 6—8。真实作品设 `demo: false`。

例子：
```ts
{
  id: 100, slug: "new-project", title: "真实项目名称", type: "design",
  category: "poster", year: "2026", description: "真实项目介绍",
  cover: "/media/design/new-project/cover", carouselType: "normal",
  role: ["Visual Design"], tools: ["Photoshop"], demo: false, selected: true,
  images: [{ base: "/media/design/new-project/01", alt: "作品完整描述" }],
  process: [{ title: "Brief", text: "项目目标与个人贡献" }],
}
```

脚本只扫描 JPG/JPEG/PNG，保留源文件与相对目录，自动旋转 EXIF、按原比例缩小、以 quality 82 输出 WebP，保留透明。输出宽度为不超过原宽的 640/960/1440/1920；小于 640 的图片输出原宽版本。最大有效输出可能小于原图，这可避免无意义放大。生成清单位于 `data/media-manifest.json`，未变动原图会跳过。同目录不要同时放 `01.jpg` 和 `01.png`（输出名冲突）。

`assets-source` 不在静态 public 目录，浏览器不能访问原图。站点只请求 `public/media` 的优化资源。轮播使用 contain，列表封面可做构图裁切；完整作品永不裁切。超长作品可使用放大按钮查看。

## 新增视频 / Showreel

封面同上处理到 `assets-source/video/项目slug/cover.jpg`。

在项目数组增加 `VideoProject`，填写 `bilibiliUrl`、`duration`、`role` 和 `tools`。URL 使用完整 `https://www.bilibili.com/video/BV...`，可附带 `?p=2`。短链接 `b23.tv` 需要先换成完整网址。也可以直接填写 `bvid`，必要时填写数字字符串 `cid`。无链接或非法链接不会创建 iframe。

首页 Showreel 在 `data/profile.ts` 的 `showreel` 中配置。列表永不加载 iframe；详情页和 Showreel 在用户点击后才加载播放器，且 `autoplay=0`。Bilibili 播放器自身可用性、登录或地区限制由 Bilibili 控制。

## 联系表单

当前是前端版本：字段验证后打开邮件应用的草稿，用户自行确认发送。页面不会伪称已经发送。

预留 `POST /api/contact`（当前明确返回 501）。接入真实邮件服务后更新此接口，并设置 `profile.contactApi: "/api/contact"`。服务端应处理校验、速率限制、邮件发送与错误返回；只在成功投递后返回 2xx。不要将服务密钥放到客户端。

## 验证

```sh
npm run test:media
npm run test:content
npm run typecheck
npm run lint
npm run build
```

测试覆盖透明、小尺寸、EXIF 旋转、超宽/超高、缓存、命名冲突、Bilibili URL 安全解析和项目资源引用。浏览器还应检查轮播拖动/触摸、过滤、下载、表单与不同屏宽。

新增项目后页面与独立 metadata 自动生成；项目 OG 图片使用真实封面资源，不额外生成预览图。`siteOrigin` 保留当前已发布站点地址。


海报命名规则：按网站展示顺序命名为「海报 1、海报 2……」，不使用上传文件名或文件编号。新增图片继续按展示顺序编号；删除或调整排序时同步重新编号。当前海报分类仅保留用户上传的八张作品。

Banner 同样按网站展示顺序命名为「Banner 1、Banner 2……」，不使用文件编号；当前仅保留上传的八张作品。

IP 分类仅展示 6 张上传作品，按展示顺序命名为 IP 1 至 IP 6；重复的 ip 4 剪贴板图片不重复收录。

启动页分类仅展示三张上传作品，按展示顺序命名为启动页 1–3。
