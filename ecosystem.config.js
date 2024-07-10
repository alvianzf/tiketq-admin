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
      },
      env_production: {
        NODE_ENV: 'production',
        VITE_POSRT: 3030,
      },
    },
  ],
}
