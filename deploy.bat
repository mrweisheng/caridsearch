@echo off
chcp 65001 >nul

echo 开始部署车辆信息搜索系统...

REM 1. 清理旧的构建文件
echo 清理旧的构建文件...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

REM 2. 安装依赖
echo 安装依赖...
call npm ci

REM 3. 运行类型检查
echo 运行类型检查...
call npx tsc --noEmit
if errorlevel 1 (
    echo ❌ 类型检查失败
    pause
    exit /b 1
)

REM 4. 运行ESLint检查
echo 运行代码质量检查...
call npm run lint
if errorlevel 1 (
    echo ❌ 代码质量检查失败
    pause
    exit /b 1
)

REM 5. 构建生产版本
echo 构建生产版本...
set NODE_ENV=production
call npm run build
if errorlevel 1 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

REM 6. 检查构建结果
echo 检查构建结果...
if exist .next (
    echo ✅ 构建成功
    echo 静态文件列表：
    dir .next\static\chunks\*.css /b 2>nul
    dir .next\static\chunks\*.js /b 2>nul | findstr /v "map" | head -5
) else (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo.
echo 🎉 部署准备完成！
echo.
echo 部署说明：
echo 1. 将整个项目文件夹上传到服务器
echo 2. 确保服务器配置正确的静态文件路径
echo 3. 重启服务器应用
echo.
echo 重要提醒：
echo - 确保服务器支持 /carcontant 路径
echo - 检查静态文件服务配置
echo - 验证环境变量设置

pause