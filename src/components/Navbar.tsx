import { HStack, Image } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColourModeSwitch from './ColourModeSwitch';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (searchText: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
  return (
    <div>
      <HStack padding="10px">
        <Image src={logo} boxSize="60px" />
        <SearchInput onSearch={onSearch} />
        <ColourModeSwitch />
      </HStack>
    </div>
  );
};

export default Navbar;
