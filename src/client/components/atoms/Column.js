import styled from 'styled-components'

export const Column = styled.div`
  width: 100%;
  float: left;
  padding-right: 0.9375rem;
  padding-left: 0.9375rem;

  &:last-child:not(:first-child) {
    float: right;
  }

  &.end:last-child:last-child {
    float: left; 
  }

`
