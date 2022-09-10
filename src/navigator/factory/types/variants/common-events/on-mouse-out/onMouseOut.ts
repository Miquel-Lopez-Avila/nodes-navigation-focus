import { addEvent } from 'common/utils/events';
import { Events } from 'common/enums/events';
import { ICommonEvent } from 'navigator/factory/types/variants/common-events/utils/interfaces';

export const onMouseOut = ({ node, configuration }: ICommonEvent) => {
    const { onMouseOut } = configuration

    addEvent(node, Events.ON_MOUSE_OUT, () => {
        onMouseOut?.(configuration)
    })
};
