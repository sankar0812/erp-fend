import styled from 'styled-components'

export const GraphDesignStyle = styled.div`
    height: 350px;
    .legend-container {
  display: flex;
  flex-direction: column;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.legend-icon {
  /* width: 12px;
  height: 12px; */
  border-radius: 30px;
  margin-right: 5px;
}
.cash-icon {
  background-color: #F3BC2E;
}
.credit-icon {
  background-color: #FCEECB;
}
@media screen and (max-width: 500px) {
  .legend-container {
    display: flow-root;
  }
  .legend-item {
    margin-bottom: 0;
  }
  /* .recharts-legend-wrapper {
    position: absolute !important;
    width: auto !important;
    height: auto !important;
    right: 30px !important;
    top: 0px !important;
    padding: 20px !important;
  } */
}
`