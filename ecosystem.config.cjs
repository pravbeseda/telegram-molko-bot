module.exports = {
  apps: [
    {
      name: 'telegram-molko-bot',
      script: 'npx',
      args: 'tsx bot.ts',
      cwd: '/home/telegram-molko-bot',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/home/telegram-molko-bot/logs/err.log',
      out_file: '/home/telegram-molko-bot/logs/out.log',
      log_file: '/home/telegram-molko-bot/logs/combined.log',
      time: true,
      // Restart policy
      min_uptime: '10s',
      max_restarts: 10,
      // Advanced options
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 8000
    }
  ]
};