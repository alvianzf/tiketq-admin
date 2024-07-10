module.exports = {
  apps: [
    {
      name: 'admin',
      script: 'node_modules/.bin/vite',
      args: 'serve',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        VITE_PORT: 3030,
      },
      env_production: {
        NODE_ENV: 'production',
        VITE_PORT: 3030,
      },
    },
  ],
}
