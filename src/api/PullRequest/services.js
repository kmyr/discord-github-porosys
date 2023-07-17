const axios = require("axios");
const config = require("../../common/helper/configs/app.config");

const receiveGithubPullRequest = async (payload) => {
  const pullRequestStateToProps = {
    repositoryName: payload.repository.name,
    pullRequestLink: payload.pull_request.html_url,
    pullRequestTitle: payload.pull_request.title,
    headBranchRef: payload.pull_request.head.ref,
    baseBranchRef: payload.pull_request.base.ref,
    senderName: payload.sender.login,
    senderAvatar: payload.sender.avatar_url,
  };

  if (payload.action !== "opened") return;

  await axios.post(config.discord_webhook, {
    username: pullRequestStateToProps.senderName,
    avatar_url: pullRequestStateToProps.senderAvatar,
    content: `
    :bust_in_silhouette: **User**: ${pullRequestStateToProps.senderName}
    :herb: **Branch**: ${pullRequestStateToProps.headBranchRef} 
    :open_file_folder: **Repository**: ${pullRequestStateToProps.repositoryName}
    :deciduous_tree: **Base Branch**: ${pullRequestStateToProps.baseBranchRef}
    :link: **Pull Request Link**: ${pullRequestStateToProps.pullRequestLink}
`,
  });

  return pullRequestStateToProps;
};

module.exports = {
  receiveGithubPullRequest,
};
