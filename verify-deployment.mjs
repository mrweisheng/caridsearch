import fs from 'fs';
import path from 'path';

async function verifyDeployment() {
console.log('🔍 验证部署配置...\n');

// 检查必要的配置文件
const configFiles = [
  'next.config.ts',
  'tailwind.config.ts',
  'package.json'
];

console.log('📋 检查配置文件:');
configFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// 检查构建输出
const buildPath = '.next';
const staticPath = path.join(buildPath, 'static');

console.log('\n📦 检查构建输出:');
console.log(`  ${fs.existsSync(buildPath) ? '✅' : '❌'} .next 目录`);
console.log(`  ${fs.existsSync(staticPath) ? '✅' : '❌'} 静态资源目录`);

if (fs.existsSync(staticPath)) {
  const chunks = path.join(staticPath, 'chunks');
  const media = path.join(staticPath, 'media');
  
  console.log(`  ${fs.existsSync(chunks) ? '✅' : '❌'} chunks 目录`);
  console.log(`  ${fs.existsSync(media) ? '✅' : '❌'} media 目录`);
  
  // 检查CSS文件
  if (fs.existsSync(chunks)) {
    const cssFiles = fs.readdirSync(chunks).filter(file => file.endsWith('.css'));
    console.log(`  ${cssFiles.length > 0 ? '✅' : '❌'} CSS 文件 (${cssFiles.length} 个)`);
    cssFiles.forEach(file => console.log(`    - ${file}`));
  }
  
  // 检查字体文件
  if (fs.existsSync(media)) {
    const fontFiles = fs.readdirSync(media).filter(file => file.endsWith('.woff2'));
    console.log(`  ${fontFiles.length > 0 ? '✅' : '❌'} 字体文件 (${fontFiles.length} 个)`);
  }
}

// 检查Next.js配置
console.log('\n⚙️  检查Next.js配置:');
try {
  const { default: nextConfig } = await import('./next.config.ts');
  const config = nextConfig || {};
  
  console.log(`  ${config.basePath ? '✅' : '❌'} basePath: ${config.basePath || '未设置'}`);
  console.log(`  ${config.assetPrefix ? '✅' : '❌'} assetPrefix: ${config.assetPrefix || '未设置'}`);
  console.log(`  ${config.output ? '✅' : '❌'} output: ${config.output || '未设置'}`);
  console.log(`  ${config.trailingSlash ? '✅' : '❌'} trailingSlash: ${config.trailingSlash}`);
} catch {
  console.log('  ❌ 无法读取 next.config.ts');
}

// 生成部署清单
console.log('\n📋 部署清单:');
console.log('1. 上传以下文件到服务器:');
console.log('   - .next/ (完整目录)');
console.log('   - public/ (完整目录)');
console.log('   - package.json');
console.log('   - next.config.ts');
console.log('   - tailwind.config.ts');

console.log('\n2. 服务器配置要求:');
console.log('   - 设置正确的路径映射: /carcontant -> 应用目录');
console.log('   - 配置静态资源缓存');
console.log('   - 确保API代理正确设置');

console.log('\n3. 验证步骤:');
console.log('   - 访问: https://utils.huaxing.help/carcontant/');
console.log('   - 检查浏览器控制台无404错误');
console.log('   - 确认样式正确显示');

console.log('\n✨ 验证完成!');
}

// 运行验证
verifyDeployment().catch(console.error);