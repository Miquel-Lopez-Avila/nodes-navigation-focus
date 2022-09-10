import store from 'core/store/instance/instance';
import { wheelDirection } from 'navigator/factory/types/events-handlers/parent-events-handler/utils/helpers/helpers';
import { lineWheelDisplacement } from 'common/enums/displacement/line';
import { operations } from 'common/utils/math';
import { nonExists } from 'core/config/variables';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onWheel = ({
  event: { deltaY }, parentConfiguration, nodeConfiguration
}: ITypeParams) => {
  const direction = wheelDirection(deltaY)
  const data = lineWheelDisplacement[direction];
  const operation = data.operation?.[parentConfiguration.flow]

  const calculatedDisplacement = operation ? operations()[operation](
      nodeConfiguration[data.label],
      data.displacement,
  ) : nonExists;

  store.updateFocusedNode({
    parentConfiguration,
    nodeConfiguration,
    onOut: parentConfiguration.onOut,
    direction,
    sectionKey: parentConfiguration.focusKey,
    newReferences: [{ name: 'position', value: calculatedDisplacement }],
  })
};
