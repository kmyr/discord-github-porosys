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
    :regional_indicator_p: :regional_indicator_r: :arrow_heading_down: 
   > ## ${pullRequestStateToProps.pullRequestTitle.toUpperCase()}
    Merging ${pullRequestStateToProps.headBranchRef.toUpperCase()} into ${pullRequestStateToProps.baseBranchRef.toUpperCase()}
    Repo Name: ${pullRequestStateToProps.repositoryName.toUpperCase()}
    
    ***PR Link:*** ${pullRequestStateToProps.pullRequestLink}`,
  });

  return pullRequestStateToProps;
};

module.exports = {
  receiveGithubPullRequest,
};
