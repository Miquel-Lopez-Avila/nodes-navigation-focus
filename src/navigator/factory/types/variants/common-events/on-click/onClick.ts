import { addEvent } from 'common/utils/events';
import { Events } from 'common/enums/events';
import store from 'core/store/instance/instance';
import { IState } from 'core/store/utils/interfaces/store';
import { ICommonEvent } from 'navigator/factory/types/variants/common-events/utils/interfaces';

export const onClick = ({ node, configuration }: ICommonEvent) => {
    const { onClick } = configuration;

    addEvent(node, Events.ON_CLICK, () => {
        const parentConfiguration = store.getParentConfiguration(configuration.focusKey)

        store.setState((state: IState) => ({
                ...state,
                pressedNode: {
                    lastFocused: state.focusedNode.current,
                    current: { node, configuration, sectionKey: parentConfiguration.configuration.focusKey }
                }
        }))
        onClick?.(configuration)
    });
};
