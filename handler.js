"use strict";
const { IncomingMessage } = require("http");
const { Socket } = require("net");
const Cleantalk = require("cleantalk");
const CleantalkRequest = require("cleantalk/src/CleantalkRequest");

const authKey = process.env.CLEANTALK_AUTH_KEY || null;
const language = "en";

module.exports.hello = async (event) => {
  const data = {
    sender_email: "",
    sender_nickname: "",
    sender_ip: "",
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
  // BREAKING: Nope, can't do this. request must be of type http.IncomingMessage. Gaa.
  // Can't leave request as undefined because CleantalkRequest.js@131 references request.headers[].
  const request = new IncomingMessage(new Socket());
  const decision = await client.isAllowMessage(
    new CleantalkRequest({ data, request })
  );

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
