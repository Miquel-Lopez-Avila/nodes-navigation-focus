import { addEvent } from 'common/utils/events';
import { Events } from 'common/enums/events';
import { ICommonEvent } from 'navigator/factory/types/variants/common-events/utils/interfaces';

export const onMouseOver = ({ node, configuration }: ICommonEvent) => {
    const { onMouseOver } = configuration

    addEvent(node, Events.ON_MOUSE_OVER, () => {
        onMouseOver?.(configuration)
    })
};
