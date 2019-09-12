# Pulse-Cloud

Pulse-Cloud is an API server for collecting wearable analytics,
providing member and classroom data for mobile and dashboard.


## Installation

1. Fork pulse-cloud repository. Click fork button on top-right of repository page on Github.
![Fork Image](/images/fork.png)


2. Click `Clone or download` and copy the provided link. The link will be different from the picture
   since you are cloning from your forked repo.
   ![Clone Image](/images/clone.png)


3. Clone repository to your local. In terminal:
```bash
git clone <link that you copied>
```

4. Go into directory.
```bash
cd pulse-cloud
```

5. Use package manager to install dependencies.
```bash
npm install
```

6. Nodemon is needed to hot reload the app when changes are made. Install nodemon globally.
```bash
npm install -g nodemon
```

8. Compile TS code in JS and watch for changes. This process will run in the foreground indefinitely, as long as the terminal session isn't closed.
```bash
tsc -w
```

7. Open a new terminal and go to pulse-server directory. Start server by running npm run script. This will run nodemon on `/dist` directory in development mode.
```bash
npm run dev
```
Any changes made to TS files in `/src` will be picked up by the TypeScript compiler and transcompiled and outputted to `/dist`. Nodemon will pick up the changes in `/dist` and restart the server.


## Authentication

Authentication is handed off to Firebase. In order to utilize Firebase SDK, you will need to provide service account key.
This is done by exporting the path of the service account file (JSON) as an environment variable.

1. Request service account key from project owner (Avi).

2. Copy absolute path of the file location.

3. Copy `.env` to project root. We do this to prevent git from picking up changes. From project root:
```bash
cp configs/.env .
```

4. Take the path from step 2 and paste it into GOOGLE_APPLICATION_CREDENTIALS environment variable `.env` file.
```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/file"
```

5. Source the environment variable.
```bash
source .env
```

6. Authentication middleware is ran on `prod` and `start` npm scripts.
```bash
npm run prod
```
or
```bash
npm start
```

To ignore authentication run `dev`.
```bash
npm run dev
```


## Database

Currently, development is done using a database server from DigitalOcean.
In order to connect to the database, your IP needs to be whitelisted. Provide the project owner with your IPv4.
Credentials will be needed to connect to the database.

1. TypeORM library expects ormconfig.json in project root. Copy it over from configs to project root:
```bash
cp configs/ormconfig.json .
```

2. Request the credentials from the project owner. You will need to fill in `username`, `password`, and `database` in ormconfig.json.


## Contributing

All changes will be merged into development.

1. Track my repo as upstream.
```bash
git remote add upstream https://github.com/avipatel91/pulse-cloud.git
```

2. Check out develop
```bash
git checkout develop
```

3. Pull latest develop
```bash
git pull upstream develop
```

4. Check out a new branch off develop and name it the feature you are working on.
```bash
git checkout -b example-feature
```

5. Add changed files.
```bash
git add -p
```

6. Commit changes.
```bash
git commit
```
Guidelines for commit message:
* Separate subject from body with a blank line.
* Limit the subject line to 50 characters.
* Capitalize the subject line.
* Do not end the subject line with a period.
* Use the imperative mood in the subject line.
* Wrap the body at 72 characters.
* Use the body to explain what and why vs. how.


7. Upstream develop might have changed since your changes. Pull latest upstream.
```bash
git checkout develop
git pull upstream develop
```

8. Check out your branch and rebase it onto develop.
```bash
git checkout example-feature
git rebase -i develop
```

9. Select your commit message and address any conflicts that might arise.

10. Push your branch to GitHub. If you already pushed commits before rebase and are pushing the rebased version,
    then append the following flag: --force-with-lease.
```bash
git push origin example-feature
```

11. From UI, visit branches page and create a pull request for your example-feature branch.
   Request to pull it into my develop. I will review and provide feedback. Once I believe it
   is good, I will merge it into my develop.


12. Keep your develop up-to-date.
```bash
git checkout develop
git pull upstream develop
```

13. Repeat steps 4-12 for next feature.
