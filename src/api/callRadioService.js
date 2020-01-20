import { corsHelperLink, radioCallLink } from '../helpers/links';

const callRadioService = () => fetch(`${corsHelperLink}/${radioCallLink}`).then(response => response.json())

export default callRadioService;
