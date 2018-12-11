module.exports = {
  apps: [{
    name: 'myApp',
    script: './app.js',
    out_file: "./logs/my_out.log",
    error_file: "./logs/my_error.log",
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '172.16.0.45',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/data/frontend/prod/myapp',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev: {
      user: 'root',
      host: '172.16.0.45',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/data/frontend/dev/myapp',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev'
    },
  }
};
