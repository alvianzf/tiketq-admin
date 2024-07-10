module.exports = {
  apps: [
    {
      name: 'admin',
      script: 'npx',
      args: 'vite',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        args: 'vite --port 3030',
      },
    },
  ],
}
