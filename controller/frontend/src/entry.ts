import Test from "./index.svelte";

import { Communicator } from "./Communicator";

const setupFrontend = () => {
  new Communicator({
    url: "ws://localhost:8080/ws",
  });
};

setupFrontend();

new Test({
  target: document.body,
});
