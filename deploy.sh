#!/bin/bash

# 车辆信息搜索系统部署脚本

echo "开始部署车辆信息搜索系统..."

# 1. 清理旧的构建文件
echo "清理旧的构建文件..."
rm -rf .next
rm -rf out

# 2. 安装依赖
echo "安装依赖..."
npm ci

# 3. 运行类型检查
echo "运行类型检查..."
npx tsc --noEmit

# 4. 运行ESLint检查
echo "运行代码质量检查..."
npm run lint

# 5. 构建生产版本
echo "构建生产版本..."
NODE_ENV=production npm run build

# 6. 检查构建结果
echo "检查构建结果..."
if [ -d ".next" ]; then
    echo "✅ 构建成功"
    echo "静态文件列表："
    find .next/static -name "*.css" -o -name "*.js" | head -10
else
    echo "❌ 构建失败"
    exit 1
fi

echo "🎉 部署准备完成！"
echo ""
echo "部署说明："
echo "1. 将整个项目文件夹上传到服务器"
echo "2. 确保服务器配置正确的静态文件路径"
echo "3. 重启服务器应用"
echo ""
echo "重要提醒："
echo "- 确保服务器支持 /carcontant 路径"
echo "- 检查静态文件服务配置"
echo "- 验证环境变量设置"