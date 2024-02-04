import Config from 'react-native-config';

const URL = Config.DOMAIN_URL?.substring(0, Config.DOMAIN_URL.length - 1);

export default URL;
