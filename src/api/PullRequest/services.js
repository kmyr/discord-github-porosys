const axios = require("axios");
const config = require("../../common/helper/configs/app.config");

const sendDiscordMessage = async (pullRequestStateToProps) => {
  const branchRegex = [
    /\/(PS-\d+)\//i,
    /\/(ps-\d+)\//i,
    /\/(Ps-\d+)\//i,
    /\/(pS-\d+)\//i,
  ];

  let match;
  let branch;
  branchRegex.forEach((regex) => {
    match = pullRequestStateToProps.headBranchRef.match(regex);
    branch = match && match[1];
    if (branch) return;
  });

  return await axios.post(config.discord_webhook, {
    username: pullRequestStateToProps.senderName,
    avatar_url: pullRequestStateToProps.senderAvatar,
    content: `
  ${branch ? branch.toUpperCase() : ""}
  > :bust_in_silhouette: **User**: ${pullRequestStateToProps.pullRequestTitle}
   :herb: **Branch**: ${pullRequestStateToProps.headBranchRef}
   :deciduous_tree: **Base Branch**:  ${pullRequestStateToProps.baseBranchRef}
   :open_file_folder: **Repository**: ${pullRequestStateToProps.repositoryName}
   :link: **Pull Request Link**: ${pullRequestStateToProps.pullRequestLink}
`,
  });
};

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

  let response;

  do {
    response = await sendDiscordMessage(pullRequestStateToProps);
  } while (!(response.status === 204));

  return pullRequestStateToProps;
};

module.exports = {
  receiveGithubPullRequest,
};
