import { IEvents } from 'core/store/utils/interfaces/store';
import { onClick } from '../../variants/common-events/on-click/onClick';
import { onMouseOut } from '../../variants/common-events/on-mouse-out/onMouseOut';
import { onMouseOver } from '../../variants/common-events/on-mouse-over/onMouseOver';

const sonEventsHandler = (params: IEvents) => {
    onClick(params)
    onMouseOut(params)
    onMouseOver(params)
}

export default sonEventsHandler
