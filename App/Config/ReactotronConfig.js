import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import apisaucePlugin from 'reactotron-apisauce';  // <--- import
import { reactotronRedux } from 'reactotron-redux';
// import sagaPlugin from 'reactotron-redux-saga';

console.tron = Reactotron;

Reactotron
  .configure() // we can use plugins here -- more on this later
  .use(trackGlobalErrors()) // <--- here we go!
  .use(apisaucePlugin())
  .use(reactotronRedux())
  // .use(sagaPlugin())
  .connect(); // let's connect!

export default Reactotron;