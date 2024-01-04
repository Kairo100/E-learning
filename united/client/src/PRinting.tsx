// import React from 'react';
// import { PDFDownloadLink, PDFViewer, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   heading: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   paragraph: {
//     fontSize: 12,
//     marginBottom: 8,
//   },
// });

// const DataReport = () => {
//   const ReportContent = () => (
//     <Document>
//       <Page size="A5" style={styles.page}>
//         <Text style={styles.section}>
//           <Text style={styles.heading}>Data Report</Text>
          
//         </Text>
//       </Page>
//     </Document>
//   );

//   return (
//     <div>
//       <h1>Data Report</h1>
//       <PDFDownloadLink document={<ReportContent />} fileName="data_report.pdf">
//         {({ blob, url, loading, error }) =>
//           loading ? 'Generating PDF...' : 'Download PDF'
//         }
//       </PDFDownloadLink>
//       <PDFViewer width="1000" height="600">
//         <ReportContent />
//       </PDFViewer>
//     </div>
//   );
// };

// export default DataReport;
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';


const H: React.FC = () => {
  const [invoices, setInvoices] = useState([]);

  const handleCreateInvoice = (values: any) => {
    setInvoices([...invoices, values]);
  };

  return (
    <Router>
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/invoices">Invoices</Link>
            </Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '50px' }}>
          <Switch>
            <Route exact path="/">
              <InvoiceForm onSubmit={handleCreateInvoice} />
            </Route>
            <Route path="/invoices">
              <InvoiceList invoices={invoices} />
            </Route>
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
};

export default H;