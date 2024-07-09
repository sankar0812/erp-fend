// import React from "react";
// import {
//   Document,
//   Page,
//   View,
//   Text,
//   Image,
//   StyleSheet,
// } from "@react-pdf/renderer";

//  const PayslipPdf = () => {
//   return (
//     <Document>
//       <Page>
//         <View>
//           <Text>Albin Rajesh</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };
// export default PayslipPdf

import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const PayslipPdf = ({ dataSource }) => {
  return (
    <Document>
      <Page>
        <View>
          <Text>Pay Slip</Text>

          {/* CustomRow with Employee and Pay Period */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Employee:</Text>
              <Text style={styles.value}>gsdfgsdfg</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Pay Period:</Text>
              <Text style={styles.value}>gdsfgsdg</Text>
            </View>
          </View>

          {/* CustomRow with ID Number and Email */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>ID Number:</Text>
              <Text style={styles.value}>gsdgdsfg</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>23-12-2023</Text>
            </View>
          </View>

          {/* Bank Details */}
          <View style={styles.row}>
            <Text style={styles.label}>Bank Details:</Text>
            <Text style={styles.value}>Albin</Text>
          </View>

          {/* Tax Number */}
          <View style={styles.row}>
            <Text style={styles.label}>Tax Number:</Text>
            <Text style={styles.value}>Albin</Text>
          </View>

          {/* Table for Earnings and Deductions */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>Earning</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Amount</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Deductions</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Amount</Text>
              </View>
            </View>

            {/* Add your table data here */}
            {/* You can map through your data to populate the table rows */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
  table: {
    display: "table",
    width: "100%",
    border: "1pt solid black",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid black",
  },
  tableCell: {
    width: "25%",
    padding: 5,
    textAlign: "center",
  },
});

export default PayslipPdf;

