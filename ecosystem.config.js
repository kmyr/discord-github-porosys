module.exports = {
  apps: [
    {
      append_env_to_name: true,
      autorestart: true,
      env_production: {
        HOST: "194.5.188.224",
        NODE_ENV: "prod",
        PORT: 6001,
      },
      interpreter: "node@14.19.0",
      instances: 1,
      name: "discord-github",
      script: "./app.js",
      watch: true,
    },
  ],
  deploy: {
    production: {
      host: "194.5.188.224",
      key: "~/.ssh/poroshat",
      path: "/home/deploy/repositories/discord-github/production",
      "pre-deploy": "git fetch && git reset --hard origin/main",
      "post-deploy":
        "yarn install && pm2 startOrReload ecosystem.config.js --env production",
      "pre-deploy-local": "echo 'Starting Deployment to production'",
      ref: "origin/main",
      repo: "git@github.com:Porosys/discord-github.git",
      ssh_options: "StrictHostKeyChecking=no",
      user: "deploy",
    },
  },
};
