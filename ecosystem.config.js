module.exports = {
  apps: [{
    name: 'food',
    script: 'dist/app/app.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production'
    },
    node_args: '--max-old-space-size=1024',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};