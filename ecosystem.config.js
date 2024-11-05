module.exports = {
  apps: [
    {
      name: "oppo-push", 
      script: "./src/app.js", 
      instances: "max", // 实例数量，"max" 表示使用所有可用 CPU 核心
      exec_mode: "cluster", // 执行模式，可以是 "fork" 或 "cluster"
      watch: true, // 启用文件监视（开发时可用）
      env: {
        NODE_ENV: "development", // 开发环境变量
      },
      env_production: {
        NODE_ENV: "production", // 生产环境变量
      },
      log_date_format: "YYYY-MM-DD HH:mm Z", 
    },
  ],
};
