import {Menu, MenuButton, MenuList, MenuItem, Text} from '@chakra-ui/react';
import {FC} from 'react';
import {uniqueId} from 'lodash';
import {useAppDispatch} from 'redux/store';
import {closePopover, openPopover} from 'redux/actions';

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
  todo?: {todoId: string; sectionId: string};
};

const ITEM_HEIGHT = 34;
const ITEM_PADDING = 16;

export const FilterMenu: FC<MenuType> = ({icon, items, background, todo}) => {
  const dispatch = useAppDispatch();

  const onOpen = () => {
    if (!todo) return;

    const popoverHeight = items.length * ITEM_HEIGHT + ITEM_PADDING;
    dispatch(openPopover({...todo, popoverHeight}));
  };

  const onClose = () => dispatch(closePopover());

  return (
    <Menu isLazy onOpen={onOpen} onClose={onClose}>
      <MenuButton h="32px" w="32px" backgroundColor={background ?? '#EBECF0'} borderRadius="4">
        {icon}
      </MenuButton>
      <MenuList boxShadow="0px 8px 16px 0px #0000001F">
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
};

export default FilterMenu;
