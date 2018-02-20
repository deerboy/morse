// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCsOo2S9WGGu2eLxx4SOiPUl55VfXZIoUw',
    authDomain: 'morse-9fb3d.firebaseapp.com',
    databaseURL: 'https://morse-9fb3d.firebaseio.com',
    projectId: 'morse-9fb3d',
    storageBucket: 'morse-9fb3d.appspot.com',
    messagingSenderId: '489116828012'
  }
};
