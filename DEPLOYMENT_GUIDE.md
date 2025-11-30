# GitHub Pages 部署详细指南

本指南将详细说明如何将 Airport-Web 项目部署到 GitHub Pages，让其他用户可以通过网址访问您的网站。

## 📋 前置要求

1. 拥有 GitHub 账号（如果没有，请先到 [github.com](https://github.com) 注册）
2. 已安装 Git（如果没有，请到 [git-scm.com](https://git-scm.com/) 下载安装）
3. 已安装 Node.js 和 npm（用于本地测试，可选）

## 🚀 部署步骤

### 步骤 1: 在 GitHub 上创建新仓库

1. 登录您的 GitHub 账号
2. 点击右上角的 **"+"** 按钮，选择 **"New repository"**（新建仓库）
3. 填写仓库信息：
   - **Repository name**（仓库名称）: 例如 `airport-web` 或 `Airport-Web`
   - **Description**（描述）: 可选，例如 "Airport Flight Management System"
   - **Visibility**（可见性）: 选择 **Public**（公开）或 **Private**（私有）
     - ⚠️ **注意**: 免费 GitHub Pages 只支持 Public 仓库，如果选择 Private 需要 GitHub Pro
   - **不要**勾选 "Initialize this repository with a README"（用 README 初始化仓库）
4. 点击 **"Create repository"**（创建仓库）

### 步骤 2: 初始化本地 Git 仓库并推送代码

打开 PowerShell 或命令提示符，执行以下命令：

```bash
# 1. 进入项目目录
cd C:\Users\leung\Documents\Airport-Web

# 2. 初始化 Git 仓库（如果还没有初始化）
git init

# 3. 添加所有文件到 Git
git add .

# 4. 提交文件
git commit -m "Initial commit: Airport Flight Management System"

# 5. 添加远程仓库（将 YOUR_USERNAME 替换为您的 GitHub 用户名，REPO_NAME 替换为仓库名）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 例如：如果用户名是 leung，仓库名是 airport-web，则命令是：
# git remote add origin https://github.com/leung/airport-web.git

# 6. 将代码推送到 GitHub（首次推送）
git branch -M main
git push -u origin main
```

**如果遇到身份验证问题**：
- GitHub 已不再支持密码验证，需要使用 Personal Access Token
- 访问：https://github.com/settings/tokens
- 点击 "Generate new token" → "Generate new token (classic)"
- 勾选 `repo` 权限
- 生成后复制 token，在输入密码时使用这个 token

### 步骤 3: 配置 GitHub Pages

有两种方式配置 GitHub Pages：

#### 方法 A: 使用 GitHub Actions（推荐，自动部署）

1. 在 GitHub 仓库页面，点击 **"Settings"**（设置）标签
2. 在左侧菜单中找到 **"Pages"**（页面）选项
3. 在 **"Source"**（源）部分：
   - 选择 **"GitHub Actions"** 作为部署源
4. 保存设置

现在，每次您推送代码到 `main` 分支时，GitHub Actions 会自动构建并部署您的网站。

#### 方法 B: 手动部署（如果方法 A 不工作）

1. 在本地构建项目：
   ```bash
   cd C:\Users\leung\Documents\Airport-Web
   npm install
   npm run build
   ```

2. 如果您的仓库名不是根路径（例如 `airport-web`），需要修改 `vite.config.js`：
   ```js
   base: '/airport-web/',  // 改为您的仓库名
   ```
   然后重新构建：
   ```bash
   npm run build
   ```

3. 创建一个新分支 `gh-pages` 并推送构建文件：
   ```bash
   git checkout -b gh-pages
   git add dist
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

4. 在 GitHub 仓库设置中，选择 `gh-pages` 分支作为源

### 步骤 4: 等待部署完成

- 如果使用 GitHub Actions，可以在仓库的 **"Actions"** 标签页查看部署进度
- 部署通常需要 1-3 分钟
- 当看到绿色的 ✓ 标记时，表示部署成功

### 步骤 5: 访问您的网站

部署完成后，您的网站可以通过以下网址访问：

**格式 1（如果仓库名是 `airport-web`）：**
```
https://YOUR_USERNAME.github.io/airport-web/
```

**格式 2（如果使用自定义域名）：**
```
https://YOUR_USERNAME.github.io/
```

**示例：**
- 如果您的 GitHub 用户名是 `leung`，仓库名是 `airport-web`
- 网址将是：`https://leung.github.io/airport-web/`

⚠️ **重要提示**：
- 如果您的仓库名包含大写字母，GitHub Pages URL 会保持相同的大小写
- 首次部署可能需要等待几分钟才能访问
- 如果访问 404，请检查 `vite.config.js` 中的 `base` 配置是否正确

## 🔧 配置 base 路径

如果您的网站无法正常加载资源（CSS、JS 文件），可能需要调整 `base` 配置：

1. 打开 `vite.config.js`
2. 根据您的仓库名修改 `base` 值：

```js
// 如果仓库名是 airport-web
base: '/airport-web/',

// 如果仓库名是 Airport-Web（注意大小写）
base: '/Airport-Web/',

// 如果使用自定义域名或根路径
base: '/',
```

3. 重新构建并推送：
```bash
npm run build
git add .
git commit -m "Update base path"
git push
```

## 🔄 更新网站内容

当您修改代码后，只需：

```bash
# 1. 进入项目目录
cd C:\Users\leung\Documents\Airport-Web

# 2. 添加修改的文件
git add .

# 3. 提交更改
git commit -m "描述您的更改"

# 4. 推送到 GitHub
git push origin main
```

GitHub Actions 会自动重新构建和部署，通常 1-3 分钟后更新就会生效。

## ✅ 验证部署

部署成功后，您可以：

1. **访问网站**：在浏览器中打开您的 GitHub Pages URL
2. **测试功能**：
   - 查看航班列表
   - 添加新航班
   - 编辑航班
   - 删除航班
   - 使用筛选功能
3. **检查数据持久化**：刷新页面后，数据应该仍然存在（存储在浏览器 localStorage 中）

## 🐛 常见问题排查

### 问题 1: 网站显示 404

**解决方案：**
- 检查 `vite.config.js` 中的 `base` 配置是否与仓库名匹配
- 确认 GitHub Pages 设置中选择了正确的源（GitHub Actions 或分支）
- 等待几分钟后重试（首次部署需要时间）

### 问题 2: 样式或脚本无法加载

**解决方案：**
- 检查浏览器控制台（F12）查看错误信息
- 确认 `base` 路径配置正确
- 清除浏览器缓存后重试

### 问题 3: GitHub Actions 部署失败

**解决方案：**
- 在仓库的 "Actions" 标签页查看详细错误信息
- 确认 `package.json` 中的依赖版本正确
- 检查 `.github/workflows/deploy.yml` 文件是否存在且格式正确

### 问题 4: 数据丢失

**说明：**
- 本应用使用浏览器的 `localStorage` 存储数据
- 数据存储在用户的浏览器中，不会同步到服务器
- 清除浏览器数据会删除所有航班记录
- 这是正常行为，因为这是静态网站

## 📝 分享网站

部署完成后，您可以将网址分享给其他用户：

1. **直接分享 URL**：
   ```
   https://YOUR_USERNAME.github.io/REPO_NAME/
   ```

2. **创建 README 徽章**（可选）：
   在 README.md 中添加：
   ```markdown
   [![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://YOUR_USERNAME.github.io/REPO_NAME/)
   ```

## 🎉 完成！

现在您的网站已经部署到 GitHub Pages，任何人都可以通过您提供的网址访问和使用您的机场航班管理系统了！

---

**需要帮助？** 如果遇到问题，可以：
- 查看 GitHub Pages 文档：https://docs.github.com/pages
- 检查 GitHub Actions 日志：在仓库的 "Actions" 标签页
- 查看浏览器控制台错误信息（按 F12）

