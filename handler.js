"use strict";
const { IncomingMessage } = require("http");
const { Socket } = require("net");
const Cleantalk = require("cleantalk");
const CleantalkRequest = require("cleantalk/src/CleantalkRequest");

const authKey = process.env.CLEANTALK_AUTH_KEY || null;
const language = "en";

module.exports.hello = async (event) => {
  const data = {
    sender_email: "someone@example.com",
    sender_nickname: "someone",
    sender_ip: "192.168.0.1",
    js_on: true,
    submit_time: 3,
    sender_info: { remote_addr: "" },
    post_info: {
      REFFERRER: "",
      USER_AGENT: "",
    },
    message: "",
    stoplist_check: false,
  };

  const client = new Cleantalk({ auth_key: authKey, language });
  // Documentation: https://cleantalk.org/help/api-check-message
  const decision = await client.checkMessage(data);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        decision,
      },
      null,
      2
    ),
  };
};
