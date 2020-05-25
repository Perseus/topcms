Vue.component( 'step-1', {

  data() {
    return {
      serverName: 'topCMS',
      websiteURL: '',
      errors: [],
      isLoading: false,
      isInstallingNPM: false,
      isCompilingTS: false,
    };
  },

  computed: {
    proceedNextStepBtnText() {
      if ( this.isInstallingNPM ) {
        return 'Installing API packages. This may take some time';
      }

      if ( this.isCompilingTS ) {
        return 'Compiling TypeScript. This may take some time';
      }

      if ( this.isLoading ) {
        return 'Processing data.';
      }

      return 'Next step';
    }
  },

  methods: {
    async proceedToNextStep() {
      if ( this.serverName === '' ) {
        if ( this.errors.length === 0 ) {
          this.errors.push( 'Please enter a server name' );
        }

        return;
      }

      this.isLoading = true;
      try {
        await axios.post( '/api/general-info', {
          serverName: this.serverName,
          websiteUrl: this.websiteURL,
        } );

        this.isInstallingNPM = true;
        await axios.post( '/api/api-npm-install' );

        this.isInstallingNPM = false;
        this.isCompilingTS = true;
        await axios.post( '/api/compile-ts', {
          data: null
        } );

        this.$emit( 'goToStep', { step: 2 } );
        this.isLoading = false;
      } catch ( err ) {
        console.log( err );
        this.isLoading = false;
      }
    }
  },

  template: `
    <div class="step-1">
      <div class="step-1-heading"> General Server Information </div>

      <div class="step-1-content">

        <div class="input-wrapper">
          <label class="input-label"> Server Name <span class="input-sublabel">(this will be the title of your website)</span> </label>
          <input class="step-input" v-model="serverName" required />
        </div>

        <div class="input-wrapper">
          <label class="input-label"> Website URL <span class="input-sublabel">(this is where your website is hosted)</span> </label>
          <input class="step-input" v-model="websiteURL" placeholder="http://localhost:3000" />
        </div>

        <div class="form-errors">
          <div class="form-error" v-for="error in errors">
            {{ error }}
          </div>
        </div>

        <button class="proceed-next-step-btn" @click="proceedToNextStep" > {{ proceedNextStepBtnText }} <i class="material-icons loading-icon anim-spin md-16" v-if="isLoading" >autorenew</i></button>
      </div>
    </div>
  `,
} );


Vue.component( 'step-2', {

  data() {
    return {
      AccountServer: {
        dbName: 'AccountServer',
        dbHost: '127.0.0.1',
        dbUsername: 'sa',
        dbPassword: 'Y87dc#$98',
        isConnectionTested: false,
      },
      GameDB: {
        dbName: 'GameDB',
        dbHost: '127.0.0.1',
        dbUsername: 'sa',
        dbPassword: 'Y87dc#$98',
        isConnectionTested: false,
      },

      errors: [],
      dbErrors: [],
      isLoading: false,
    };
  },

  methods: {
    async proceedToNextStep() {
      this.errors = [];

      if ( this.AccountServer.isConnectionTested && this.GameDB.isConnectionTested ) {
        try {
          this.isLoading = true;
          await axios.post( '/api/write-db-creds', {
            AccountServer: this.AccountServer,
            GameDB: this.GameDB
          } );

          this.$emit( 'goToStep', { step: 3 } );
        } catch ( err ) {
          this.isLoading = false;
          this.errors.push( err );
        }

        return;
      }


      Object.keys( this.AccountServer ).forEach( ( key ) => {
        const el = this.AccountServer[ key ];
        if ( key === 'isConnectionTested' ) {
          return;
        }
        if ( !el ) {
          this.errors.push( `Please enter a valid value for AccountServer - ${key}` );
        }
      } );
      Object.keys( this.GameDB ).forEach( ( key ) => {
        const el = this.AccountServer[ key ];

        if ( key === 'isConnectionTested' ) {
          return;
        }

        if ( !el ) {
          this.errors.push( `Please enter a valid value for GameDB - ${key}` );
        }
      } );

      if ( this.errors.length > 0 ) {
        return;
      }

      this.dbErrors = [];

      try {
        this.isLoading = true;
        const response = await axios.post( '/api/test-db-connection', {
          AccountServer: this.AccountServer,
          GameDB: this.GameDB
        } );
        const isAccountServerAuthenticated = response.data.AccountServer.isAuthenticated;
        const isGameDBAuthenticated = response.data.GameDB.isAuthenticated;

        if ( !isAccountServerAuthenticated ) {
          this.dbErrors.push( `AccountServer failed to authenticate: ${response.data.AccountServer.error}` );
        }

        if ( !isGameDBAuthenticated ) {
          this.dbErrors.push( `GameDB failed to authenticate: ${response.data.GameDB.error}` );
        }

        this.isLoading = false;

        if ( this.dbErrors.length > 0 ) {
          return;
        }

        this.AccountServer.isConnectionTested = true;
        this.GameDB.isConnectionTested = true;
      } catch ( err ) {
        this.isLoading = false;
      }
    },
  },

  computed: {
    proceedNextStepBtnText() {
      console.log( this.AccountServer, this.GameDB );
      if ( this.AccountServer.isConnectionTested && this.GameDB.isConnectionTested ) {
        return 'Finalize connection details';
      }

      return 'Test Connections';
    }
  },

  template: `
  <div class="step-2">
    <div class="step-1-heading"> Database Information </div>

    <div class="step-1-content">

      <h3 class="input-heading"> AccountServer </h3>

      <div class="input-wrapper">
        <label class="input-label"> DB Name <span class="input-sublabel">(Name of your database)</span> </label>
        <input class="step-input" v-model="AccountServer.dbName" required />
      </div>
      <div class="input-wrapper">
        <label class="input-label"> DB Host <span class="input-sublabel">(this is the IP of the host where your database is hosted)</span> </label>
        <input class="step-input" v-model="AccountServer.dbHost" required />
      </div>
      <div class="input-wrapper">
        <label class="input-label"> MSSQL Username <span class="input-sublabel">(this is your MSSQL username)</span> </label>
        <input class="step-input" v-model="AccountServer.dbUsername" required />
      </div>
      <div class="input-wrapper">
        <label class="input-label"> MSSQL Password <span class="input-sublabel">(this is your MSSQL password)</span> </label>
        <input class="step-input" v-model="AccountServer.dbPassword" required />
      </div>

      <h3 class="input-heading"> GameDB </h3>

      <div class="input-wrapper">
        <label class="input-label"> DB Name <span class="input-sublabel">(Name of your database)</span> </label>
        <input class="step-input" v-model="GameDB.dbName" required />
      </div>
      <div class="input-wrapper">
        <label class="input-label"> DB Host <span class="input-sublabel">(this is the IP of the host where your database is hosted)</span> </label>
        <input class="step-input" v-model="GameDB.dbHost" required />
      </div>
      <div class="input-wrapper">
        <label class="input-label"> MSSQL Username <span class="input-sublabel">(this is your MSSQL username)</span> </label>
        <input class="step-input" v-model="GameDB.dbUsername" required />
      </div>
      <div class="input-wrapper">
        <label class="input-label"> MSSQL Password <span class="input-sublabel">(this is your MSSQL password)</span> </label>
        <input class="step-input" v-model="GameDB.dbPassword" required />
      </div>



      <div class="form-errors">
        <div class="form-error" v-for="error in errors">
          {{ error }}
        </div>
        <div class="form-error" v-for="error in dbErrors">
          {{ error }}
        </div>
        <div class="form-success" v-if="AccountServer.isConnectionTested && GameDB.isConnectionTested">
          Connections successful!
        </div>
      </div>

      <button class="proceed-next-step-btn" @click="proceedToNextStep" > {{ proceedNextStepBtnText }} <i class="material-icons loading-icon anim-spin md-16" v-if="isLoading" >autorenew</i></button>
    </div>
  </div>
`,
} );

Vue.component( 'step-3', {
  data() {
    return {
      isLoading: false,
      isGeneratingWebBundle: false,
      isGeneratingJWT: false,
      isMigratingDB: false,
      isFinalized: false,
    };
  },

  methods: {
    async finalize() {
      try {
        this.isLoading = true;
        this.isGeneratingWebBundle = true;
        await axios.post( '/api/web-bundle' );

        this.isGeneratingJWT = true;
        await axios.post( '/api/jwt' );

        this.isMigratingDB = true;
        await axios.post( '/api/migrate' );

        this.isFinalized = true;
      } catch ( err ) {
        this.isLoading = false;
        console.log( err );
      }
    }
  },

  computed: {
    proceedNextStepBtnText() {
      if ( this.isMigratingDB ) {
        return 'Migrating Database Tables';
      }

      if ( this.isGeneratingJWT ) {
        return 'Generating JWT secret';
      }

      if ( this.isGeneratingWebBundle ) {
        return 'Compiling web bundle. This may take a while';
      }

      return 'Finalize Installation';
    }
  },

  template: `
    <div class="step-1">
      <h1 v-if="isFinalized" style="text-align:middle;"> Installation Finalized. Please shut down this server and start the website. </h1>
      <button class="proceed-next-step-btn" @click="finalize" v-if="!isFinalized" > {{ proceedNextStepBtnText }} <i class="material-icons loading-icon anim-spin md-16" v-if="isLoading" >autorenew</i></button>
    </div>
  `
} );


Vue.component( 'wizard-container', {

  data() {
    return {
      currentStep: 0,
    };
  },

  methods: {
    handleStepChange( { step } ) {
      this.currentStep = step;
    }
  },

  template: `
    <div class="wizard">

      <h1 class="wizard-heading"> topCMS Installation </h1>
      <h2 class="wizard-subheading"> Please do not refresh this page while the installation is going on </h2>

      <button class="start-installation-btn" @click="currentStep = 1" v-if="this.currentStep === 0"> Click here to begin the wizard </button>

      <step-1 v-if="currentStep === 1" @goToStep="handleStepChange"></step-1>
      <step-2 v-if="currentStep === 2" @goToStep="handleStepChange"></step-2>
      <step-3 v-if="currentStep === 3"></step-3>

    </div>
  `,
} );

Vue.component( 'main-page', {

  data() {
    return {
      illustrations: [
        './assets/img/scene1.jpg',
        './assets/img/scene2.jpg',
        './assets/img/scene3.jpg',
      ],
      currentIllustrationIndex: 0,
    };
  },

  mounted() {
    this.illustrationInterval = setInterval( () => {
      this.currentIllustrationIndex += 1;
      this.currentIllustrationIndex = this.currentIllustrationIndex % 3;
    }, 3000 );
  },
  computed: {
    currentIllustration() {
      return this.illustrations[ this.currentIllustrationIndex ];
    }
  },

  template: `
    <div class="main-page"> 
      <div class="wizard-container">
        <div class="illustrations">
          <transition name="fade">
            <img :src="currentIllustration" :key="currentIllustration" class="illustration" />
          </transition>
        </div>

        <wizard-container></wizard-container>
      </div>
    </div>
  `,
} );


const app = new Vue( {
  el: '#app',
  template: `
  <main-page></main-page>
  `
} );
