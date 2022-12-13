## Problem:

Need a dashboard to show ATD sensors status.

- Each numbered dot on ATD represents a sensor.
- Each Bit-String represents a state. 1=ok, 0=broken of corresponding sensor. First bit corresponds to 1st
  dot, second to 2nd dot and so on.
- Input is a List of bit-string. State of sensor can be determined as follows

1. Ok = Green, if all bitstrings has 1s for a corresponding sensor OR
2. Broken = Red, if last bitstring has 0 for a corresponding sensor OR
3. Unstable = Yellow, if bitstrings have 0s and 1s, for a corresponding sensor.

## To start dev server

Please run

```js
npm install
npm run dev
```

## To urn test cases

Please run

```js
npm run test
```

## Advanced

1. For the case of live stream of data bits, the `App.tsx` makes use of `readData` which is a generator function,
   so any pull-based data streaming service such as `firebase/ably` which would provide a `.cursor` for calling the `.next()`
   over the iteration will keep pulling subsequent data for live UI
2. The `Dummy.tsx` as of now is a wrapper around the markers, maintaining a state and sharing the setState with the children will help us to store the report of what is the final state of all `Markers` when `isComplete` is set to true,
   For permanent storage, we can make a `fetch` which `POST` the data to any log server for history/timeline

## Proposal for a scalable deployment

### Frontend

The UI can be built via ci/cd of GitHub/Jenkins as this would serve as artifactory with version number,
the deployment pipeline can be set accordingly to the env(test/dev/prod) based on the build params passed,
For MVP => deployment will be good with Firebase/Github pages as CI/CD support requires no extra VM instance(like Jenkins)
For Scalling=> 2/3 VM instances behind an Nginx reverse-proxy serving as load-balancer would be good, as there are not much of js/HTML/CSS assets as of now to be served (used CDN linking to artifactory version)

### Backend

Making use of `Ably` or any message queue to pull the live/file store data stream at any point would be better, as it would provide an effective soulution for scaling large number of UI clients,
Making use of serverless functions will be easy to push dump data to any file stores
making use of `Ably` for pushing data over a channel will be easy for real-time data subscription by the UI
