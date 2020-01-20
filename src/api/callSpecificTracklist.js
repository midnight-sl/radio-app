import { corsHelperLink, radioTracksCallLink } from '../helpers/links';

const callSpecificTracklist = (tracklistID) => fetch(`${corsHelperLink}/${radioTracksCallLink}/${tracklistID}/tracks`).then(response => response.json())

export default callSpecificTracklist;
