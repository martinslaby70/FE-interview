import styled from 'styled-components';

export const Text = styled.span<{color: string}>`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  background-color: transparent;
  color: ${(s) => s.color};
`;
