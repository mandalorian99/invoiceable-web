/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Invoice } from '../types/invoice';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 24, marginBottom: 20 }
});

const PDFTemplate = ({ invoice }: { invoice: Invoice }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text style={styles.header}>Invoice #{invoice.id}</Text>
        {/* Add other fields */}
      </View>
    </Page>
  </Document>
);

export default PDFTemplate; 