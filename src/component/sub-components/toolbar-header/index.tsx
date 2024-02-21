import { Button, Card, Flex, Text } from '@sanity/ui';
import { map } from 'lodash/fp';

import SwitchWithLabel from '../switch-with-label';

type ToolbarHeaderProps = {
  fileDefinitions: any[];
  isShowingEdgeLabels: boolean;
  isShowingFields: boolean;
  onChangeShowFields: () => void;
  onChangeShowEdgeLabels: () => void;
  onSaveClicked: (item: any) => void;
};

const ToolbarHeader = ({
  fileDefinitions,
  isShowingEdgeLabels,
  isShowingFields,
  onChangeShowFields,
  onChangeShowEdgeLabels,
  onSaveClicked,
}: ToolbarHeaderProps) => {
  return (
    <Flex padding={4}>
      <Card flex={1}>
        <Text size={4} weight={'bold'}>
          Content Model Graph
        </Text>
      </Card>
      <div>
        <SwitchWithLabel checked={isShowingFields} label="Show fields" onChange={onChangeShowFields} />
        <SwitchWithLabel checked={isShowingEdgeLabels} label="Show edge labels" onChange={onChangeShowEdgeLabels} />
        <br />

        {map(
          (item) => (
            <Button key={item.fileType} type="button" onClick={() => onSaveClicked(item)}>
              Save .{item.fileType}
            </Button>
          ),
          fileDefinitions,
        )}
      </div>
    </Flex>
  );
};

export default ToolbarHeader;
