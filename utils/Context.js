export let QA = 'http://202.182.117.196';
export let QA2 = 'http://45.77.26.205';
export let QA2v6 = 'http://[2001:19f0:7001:161a:5400:2ff:fe0b:fdf3]';
let LOCAL = 'http://192.168.1.5';
export let context = {host: LOCAL, port: "3001", socketPort: "3002"};
export let switchHost = (newHost) => {
  context.host = newHost;
}
