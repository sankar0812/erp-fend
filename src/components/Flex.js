import styled, { css } from 'styled-components'

const defaultStyles = ({
    center,
    right,
    centervertically,
    flexend,
    spacebetween,
    spacearound,
    spaceevenly,
    column,
    cursor,
    wrap,
    aligncenter,
    end,
    flexstart,
    baseLine,
    flexFlow,
    alignend,
    H_100,
    w_100,
    gap,
    margin,
    spcPading,
    spcPadding
}) =>

    css`
    display: flex;
    ${H_100 && 'height:100%;'}
    ${w_100 && 'width:100%;'}
    ${gap && `gap:${gap};`}
    ${margin && `margin:${margin};`}
    ${center && 'justify-content: center;'}
    ${right && 'justify-content: flex-end;'}
    ${spacebetween && 'justify-content: space-between;'}
    ${spacearound && 'justify-content: space-around;'}
    ${spaceevenly && 'justify-content: space-evenly;'}
    ${flexend && 'justify-content: flex-end;'}
    ${centervertically && 'align-items: center;'}
    ${column && 'flex-direction: column;'}
    ${cursor && 'cursor: pointer;'}
    ${wrap && 'flex-wrap: wrap;'}
    ${aligncenter && 'align-items: center;'}
    ${end && 'justify-content: end;'}
    ${flexstart && 'align-items: flex-start;'}
    ${baseLine && 'align-items: baseline;'}
    ${flexFlow && 'flex-flow: wrap;'}
    ${alignend && 'align-items: end;'}
    ${spcPading && 'padding: 7px 0;'}
    ${spcPadding && 'padding: 3px 0;'}
  `
  
const Flex = styled.div`
  ${defaultStyles}
  ${props => props.style}
  gap: ${props => props.gap || '0px'};
  margin: ${props => props.margin || '0px'};
`

export default Flex
