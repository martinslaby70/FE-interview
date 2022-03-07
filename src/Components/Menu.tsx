import {Menu, MenuButton, MenuList, MenuItem, Text} from '@chakra-ui/react';
import {FC} from 'react';
import {uniqueId} from 'lodash';

export type MenuItemType = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
  textColor?: string;
};
type MenuType = {
  icon: JSX.Element;
  items: MenuItemType[];
  background?: string;
};

export const FilterMenu: FC<MenuType> = ({icon, items, background}) => (
  <Menu isLazy>
    <MenuButton h="32px" w="32px" backgroundColor={background ?? '#EBECF0'} borderRadius="4">
      {icon}
    </MenuButton>
    <MenuList>
      {items.map((item) => (
        <MenuItem py="10px" key={uniqueId()} onClick={item.onClick}>
          {item.icon}
          <Text fontSize="14px" fontWeight={400} color={item.textColor}>
            {item.title}
          </Text>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default FilterMenu;
