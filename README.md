# SyncApp
 An App made by me for me. Nothing big to say.


 ## Origins 
 * Cloned from this repository: `https://github.com/HsuanXyz/ionic3-chat.git`.

 ## Running
 * Clone this repository : https://github.com/moda20/SyncApp.git
 * Run `npm install` from the project root.
 * If you do not install the ionic CLI (`npm install -g ionic`)
 * Run `ionic serve` in a terminal from the project root.


 ## File Structure
 ```
 .
 ├── LICENSE
 ├── README.md
 ├── config.xml
 ├── ionic.config.json
 ├── package.json
 ├── resources
 ├── src
 │   ├── index.html
 │   ├── app
 │   │   ├── app.component.ts
 │   │   ├── app.html
 │   │   ├── app.module.ts
 │   │   ├── app.scss
 │   │   └── main.ts
 │   ├── assets
 │   │   └── mock
 │   │       └── msg-list.json                 * mock json
 │   │   └── icon
 │   │       └── favicon.ico
 │   │   └── to-user.jpg
 │   │   └── user.jpg
 │   ├── components/emoji-picker               * emoji-picker component
 │   │   └── emoji-picker.html
 │   │   └── emoji-picker.module.ts
 │   │   └── emoji-picker.scss
 │   │   └── emoji-picker.ts
 │   ├── providers
 │   │   └── db-services  
 │   │       └── db-services.ts               * Everything related to Database ( cached /not cached )
 │   │   └── chat-service.ts                  * chat-service
 │   │   └── emoji.ts                         * emoji-provider
 │   ├── pipes
 │   │   └── relative-time.ts                 * relative time pipes
 │   ├── pages
 │   │   ├── home
 │   │   │   ├── home.html        
 │   │   │   ├── home.scss         
 │   │   │   └── home.ts           
 │   │   ├── chat                             * chat page
 │   │   │   ├── chat.html                    * chat template
 │   │   │   ├── chat.scss                    * chat stylesheet
 │   │   │   ├── chat.ts                      * chat code
 │   │   │   └── chat.module.ts               * chat module
 │   │   └── tabs
 │   │       ├── tabs.html
 │   │       └── tabs.ts
 │   ├── service-worker.js
 │   └── theme
 │       └── variables.scss
 ├── tsconfig.json
 └── tslint.json
 ```   
