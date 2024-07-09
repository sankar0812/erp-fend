import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  margin: 0 auto;
`;

const Nav = styled.nav`
  margin: 50px 0;
  background-color: #E64A19;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
`;

const Li = styled.li`
  display: inline-block;
  background-color: #E64A19;
`;

const A = styled.a`
  display: block;
  padding: 0 10px;
  color: #FFF;
  font-size: 20px;
  line-height: 60px;
  text-decoration: none;

  &:hover {
    background-color: #000000;
  }
`;

const DropdownUl = styled(Ul)`
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
`;

const DropdownLi = styled(Li)`
  width: 170px;
  float: none;
  display: list-item;
  position: relative;
`;

// Main navigation component
export const Demo = () => {
  return (
    <Container>
      <Nav>
        <Ul>
          <NavItem link="#" text="Home" />
          <NavItem link="#" text="WordPress" dropdownItems={['Themes', 'Plugins', 'Tutorials']} />
          <NavItem link="#" text="Web Design" dropdownItems={['Resources', 'Links', 'Tutorials']} nestedDropdownItems={['HTML/CSS', 'jQuery', 'Other']} />
          <NavItem link="#" text="Graphic Design" />
          <NavItem link="#" text="Inspiration" />
          <NavItem link="#" text="Contact" />
          <NavItem link="#" text="About" />
        </Ul>
      </Nav>
      <h1>Pure CSS Drop Down Menu</h1>
      <p>A simple dropdown navigation menu made with CSS Only. Dropdowns are marked with a plus sign (+)</p>
    </Container>
  );
}

// Navigation item component
const NavItem = ({ link, text, dropdownItems, nestedDropdownItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <A href={link}>{text}</A>
      {dropdownItems && isOpen && <DropdownMenu items={dropdownItems} nestedItems={nestedDropdownItems} />}
    </Li>
  );
}

// Dropdown menu component
const DropdownMenu = ({ items, nestedItems }) => {
  return (
    <DropdownUl>
      {items.map((item, index) => (
        <DropdownLi key={index}>
          <A href="#">{item}</A>
          {nestedItems && index === 2 && <NestedDropdownMenu items={nestedItems} />}
        </DropdownLi>
      ))}
    </DropdownUl>
  );
}

// Nested dropdown menu component
const NestedDropdownMenu = ({ items }) => {
  return (
    <DropdownUl>
      {items.map((item, index) => (
        <DropdownLi key={index}>
          <A href="#">{item}</A>
        </DropdownLi>
      ))}
    </DropdownUl>
  );
}

