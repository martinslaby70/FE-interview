import {Menu, MenuButton, MenuList, MenuItem, Text} from '@chakra-ui/react';
import {FC} from 'react';
import {uniqueId} from 'lodash';

export type MenuItemType = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
};
type MenuType = {
  icon: JSX.Element;
  items: MenuItemType[];
};

// TODO: fix popper CSS warnings

const FilterMenu: FC<MenuType> = ({icon, items}) => (
  <Menu isLazy>
    <MenuButton h="32px" w="32px" backgroundColor="#EBECF0" borderRadius="4">
      {icon}
    </MenuButton>
    <MenuList>
      {items.map((item) => (
        <MenuItem py="10px" key={uniqueId()}>
          {item.icon}
          <Text fontSize="14px" fontWeight={400}>
            {item.title}
          </Text>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default FilterMenu;
