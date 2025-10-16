# 服务器配置说明

## 问题分析

线上版本出现静态资源404错误的原因：
1. **路径不匹配**：应用部署在 `/carcontant` 路径下，但静态资源路径配置不正确
2. **版本不一致**：线上部署的构建版本与当前代码版本不匹配
3. **缺少Tailwind配置**：导致CSS样式生成不完整

## 解决方案

### 1. Next.js 配置修复
- ✅ 添加了 `assetPrefix` 和 `basePath` 配置
- ✅ 设置了正确的生产环境路径 `/carcontant`
- ✅ 配置了静态文件导出选项

### 2. Tailwind CSS 配置
- ✅ 创建了 `tailwind.config.ts` 配置文件
- ✅ 确保样式文件正确扫描和生成

### 3. 部署流程优化
- ✅ 创建了自动化部署脚本
- ✅ 包含完整的构建验证流程

## 服务器配置要求

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name utils.huaxing.help;
    
    # 主应用路径
    location /carcontant {
        alias /path/to/your/app;
        try_files $uri $uri/ /carcontant/index.html;
        
        # 静态资源配置
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
    }
    
    # API 路由
    location /carcontant/api {
        proxy_pass http://localhost:3000/carcontant/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Apache 配置示例
```apache
<VirtualHost *:80>
    ServerName utils.huaxing.help
    DocumentRoot /path/to/your/app
    
    # 主应用别名
    Alias /carcontant /path/to/your/app
    
    <Directory "/path/to/your/app">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # 静态资源缓存
        <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
            ExpiresActive On
            ExpiresDefault "access plus 1 year"
        </FilesMatch>
    </Directory>
    
    # API 代理
    ProxyPass /carcontant/api http://localhost:3000/carcontant/api
    ProxyPassReverse /carcontant/api http://localhost:3000/carcontant/api
</VirtualHost>
```

## 部署步骤

### 1. 本地构建
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

### 2. 上传文件
将以下文件/文件夹上传到服务器：
- `.next/` (构建输出)
- `public/` (静态资源)
- `package.json`
- `next.config.ts`
- 其他必要的配置文件

### 3. 服务器启动
```bash
# 安装依赖
npm ci --production

# 启动应用
NODE_ENV=production npm start
```

## 验证清单

部署完成后，请检查：
- [ ] 主页能正常访问：`https://utils.huaxing.help/carcontant/`
- [ ] CSS样式正确加载（无404错误）
- [ ] JavaScript文件正确加载
- [ ] API接口正常工作
- [ ] 图片资源正确显示

## 常见问题

### Q: 仍然出现404错误
A: 检查服务器配置中的路径映射是否正确，确保 `/carcontant` 路径指向正确的应用目录

### Q: 样式不生效
A: 确认Tailwind CSS配置文件存在，并且构建过程中正确生成了CSS文件

### Q: API接口无法访问
A: 检查代理配置，确保API请求正确转发到Node.js应用

## 联系支持

如果遇到问题，请提供：
1. 浏览器控制台错误信息
2. 服务器错误日志
3. 当前的服务器配置文件