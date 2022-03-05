module.exports = {
  apps: [
    {
      append_env_to_name: true,
      autorestart: true,
      env_production: {
        HOST: "185.79.156.89",
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
      host: "185.79.156.89",
      key: "~/.ssh/poroshat",
      path: "/home/deploy/repositories/workflow-api/staging",
      "pre-deploy": "git fetch && git reset --hard origin/main",
      "post-deploy":
        "cd backend && yarn install && yarn build && pm2 startOrReload ecosystem.config.js --env production",
      "pre-deploy-local": "echo 'Starting Deployment to production'",
      ref: "origin/main",
      repo: "git@github.com:Porosys/porosys.git",
      ssh_options: "StrictHostKeyChecking=no",
      user: "deploy",
    },
  },
};
