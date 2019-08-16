import path from 'path';
import { promises } from 'fs';


export async function updateServerRates( context, args ) {
  try {
    const { rates: { solo, party, drop, ship, fairy } } = args;
    const configFile = await promises.readFile( path.join( __dirname, '..', '..', '..', 'config', 'config.json' ), 'utf8' );
    const currentServerRates = JSON.parse( configFile );
    
    currentServerRates.rates = {
      solo: solo ? solo : currentServerRates.solo,
      party: party ? party : currentServerRates.party,
      drop: drop ? drop : currentServerRates.drop,
      ship: ship ? ship : currentServerRates.ship,
      fairy: fairy ? fairy : currentServerRates.fairy
    };
    
    await promises.writeFile( path.join( __dirname, '..', '..', '..', 'config', 'config.json' ), JSON.stringify( currentServerRates, null, 2 ) );
    return currentServerRates.rates;
  } catch ( err ) {
    return err;
  }
}