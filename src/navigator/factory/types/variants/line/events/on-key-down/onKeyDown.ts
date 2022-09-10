import store from 'core/store/instance/instance';
import { lineDisplacement } from 'common/enums/displacement/line';
import { operations } from 'common/utils/math';
import { nonExists } from 'core/config/variables';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onKeyDown = ({
  event: { key }, parentConfiguration, nodeConfiguration
}: ITypeParams) => {
  const data = lineDisplacement[key];
  const operation = data.operation?.[parentConfiguration.flow]

  const calculatedDisplacement = operation ? operations()[operation](
    nodeConfiguration[data.label],
    data.displacement,
  ) : nonExists;

  store.updateFocusedNode({
    parentConfiguration,
    nodeConfiguration,
    newReferences: [{ name: 'position', value: calculatedDisplacement }],
    onOut: parentConfiguration.onOut,
    direction: key,
    sectionKey: parentConfiguration.focusKey,
  })
};
